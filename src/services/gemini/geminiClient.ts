// src/services/gemini/geminiClient.ts
//
// STATUS: Not yet implemented.
//
// Reserved for AI-generated mission content (Phase 2 of the roadmap): new
// scam scenarios, artifacts, and mentor explanations generated server-side
// so no two playthroughs repeat. This must only ever be called from a
// backend function (see /server) - never from the browser, so a Gemini API
// key is never exposed to the client.

export interface GeneratedMissionRequest {
  chapterCategory: string;
  difficulty: "rookie" | "investigator" | "expert";
}

export async function requestGeneratedMission(
  _request: GeneratedMissionRequest
): Promise<never> {
  throw new Error(
    "Gemini mission generation is not implemented yet. See server/services for the planned backend proxy."
  );
}
