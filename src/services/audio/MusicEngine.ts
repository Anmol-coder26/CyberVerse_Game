// src/services/audio/MusicEngine.ts
// A thin class wrapper around Tone.js. All raw audio-node wiring lives here,
// isolated from React, so the audio graph can be reasoned about (and tested
// or swapped out) independently of any component's render cycle.

import * as Tone from "tone";
import { getMoodForAccent, NEUTRAL_MOOD, type MoodProfile } from "../../engine/MissionEngine";

const CHORDS: string[][] = [
  ["C3", "Eb3", "G3"],
  ["Ab2", "C3", "Eb3"],
  ["Bb2", "D3", "F3"],
  ["G2", "Bb2", "D3"],
];

export class MusicEngine {
  private ready = false;
  private filter: Tone.Filter | null = null;
  private chimeSynth: Tone.PolySynth | null = null;
  private moodSemitones = 0;
  private baseBrightness = NEUTRAL_MOOD.filterBrightness;
  private dangerActive = false;

  async start(): Promise<void> {
    if (this.ready) return;
    this.ready = true;

    await Tone.start();

    this.filter = new Tone.Filter(NEUTRAL_MOOD.filterBrightness, "lowpass").toDestination();
    const reverb = new Tone.Reverb({ decay: 7, wet: 0.45 }).connect(this.filter);
    const pad = new Tone.PolySynth(Tone.Synth, {
      volume: -20,
      envelope: { attack: 2.2, decay: 1, sustain: 0.8, release: 4 },
    }).connect(reverb);
    const bass = new Tone.Synth({ volume: -24, oscillator: { type: "sine" } }).connect(this.filter);
    const blip = new Tone.MetalSynth({ volume: -34, envelope: { decay: 0.3 } }).connect(this.filter);

    this.chimeSynth = new Tone.PolySynth(Tone.Synth, {
      volume: -12,
      envelope: { attack: 0.005, decay: 0.2, sustain: 0, release: 0.3 },
    }).toDestination();

    let i = 0;
    Tone.Transport.bpm.value = 64;

    new Tone.Loop((time) => {
      const semis = this.moodSemitones;
      const chord = CHORDS[i % CHORDS.length].map((note) => Tone.Frequency(note).transpose(semis).toFrequency());
      const rootFreq = Tone.Frequency(CHORDS[i % CHORDS.length][0]).transpose(semis).toFrequency();
      pad.triggerAttackRelease(chord, "2n", time);
      bass.triggerAttackRelease(rootFreq, "1n", time);
      i++;
    }, "2n").start(0);

    new Tone.Loop((time) => {
      if (Math.random() > 0.6) blip.triggerAttackRelease("C6", "16n", time);
    }, "4n").start(0);

    Tone.Transport.start();
  }

  /** Shifts the ambient score's key/brightness to match a chapter's accent color. */
  setMood(accentColor: string | null): void {
    const mood: MoodProfile = getMoodForAccent(accentColor);
    this.moodSemitones = mood.semitoneShift;
    this.baseBrightness = mood.filterBrightness;
    if (this.filter && !this.dangerActive) {
      this.filter.frequency.rampTo(mood.filterBrightness, 1.4);
    }
  }

  /** Brightens the filter under time pressure, relaxes back once danger passes. */
  setTension(active: boolean): void {
    this.dangerActive = active;
    if (this.filter) {
      this.filter.frequency.rampTo(active ? 2400 : this.baseBrightness, 1.1);
    }
  }

  /** Short generated chime on a correct or incorrect decision. */
  playChime(kind: "success" | "fail"): void {
    if (!this.chimeSynth) return;
    const now = Tone.now();
    if (kind === "success") {
      this.chimeSynth.triggerAttackRelease(["C5"], "16n", now);
      this.chimeSynth.triggerAttackRelease(["E5"], "16n", now + 0.09);
      this.chimeSynth.triggerAttackRelease(["G5"], "16n", now + 0.18);
    } else {
      this.chimeSynth.triggerAttackRelease(["F3"], "8n", now);
      this.chimeSynth.triggerAttackRelease(["D3"], "8n", now + 0.12);
    }
  }

  toggleMute(): boolean {
    Tone.Destination.mute = !Tone.Destination.mute;
    return Tone.Destination.mute;
  }
}
