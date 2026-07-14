// src/constants/chapters.ts
// All 10 playable cases plus the locked "coming soon" slot. Each chapter is
// a single data object - adding a new case is a content change here, not a
// code change anywhere else in the app. This is what InvestigationScene,
// MissionPage, and the dashboard all render from.

import { COLORS } from "./theme";
import type { Chapter } from "../types";

export const CHAPTERS: Chapter[] = [
  {
    id: "ch1", num: "01", title: "The ₹2 Lakh SMS", tag: "OTP fraud", icon: "chat", hook: "A ten-minute deadline and a fake bank domain.",
    intro: "ARIA: This tower — Priya Sharma's apartment. She just received an urgent bank SMS. Go in, and see it for yourself before she reacts.",
    location: { name: "Priya's apartment", atmosphere: "rain", palette: { a: "#1a1440", b: "#050609", accent: COLORS.purple } },
    appType: "chat", app: { name: "Messages", icon: "chat" },
    thread: { from: "SecureBank-Alert", time: "Now", segments: [
      { text: "Your a/c will be SUSPENDED in " }, { text: "10 mins", clue: { id: "urgency", label: "Artificial urgency" } },
      { text: " due to KYC mismatch. Update immediately: " }, { text: "secure-bank-kyc.verify-now.in", clue: { id: "domain", label: "Fake domain, not the bank's" } },
      { text: " — call 1800-XXX-XXX with your " }, { text: "OTP", clue: { id: "otp", label: "Real banks never ask for this" } }, { text: " to reverse." },
    ]},
    actions: [
      { id: "a", icon: "phone", label: "Call the number, give the OTP", correct: false, reaction: "The line goes quiet a second too long. ₹1,84,000 gone." },
      { id: "b", icon: "chat", label: "Open the link, update KYC", correct: false, reaction: "The page looked real. Somewhere across the city, a screen lit up with her card details." },
      { id: "c", icon: "shieldAlert", label: "Ignore it — check the real banking app", correct: true, reaction: "No suspension notice ever existed. She blocks the number." },
    ],
    mentor: { whyItHappened: "Spoofed sender ID plus manufactured urgency so the target acts before thinking.", warningSigns: ["A hard deadline in minutes", "A link that isn't the bank's real domain", "Any OTP request by call or SMS"], immediateSteps: "Never share an OTP over a call or message. Verify only inside the official app.", recoverySteps: "Call the bank's real helpline immediately to freeze the account.", helpline: "1930", portal: "cybercrime.gov.in" },
    spotTheFake: { prompt: "Which one could really be your bank?", a: { label: "\"Update KYC now: secure-bank-kyc.verify-now.in\"", fake: true }, b: { label: "A notice to visit your home branch with ID proof", fake: false } },
  },
  {
    id: "ch2", num: "02", title: "The Hacked Friend", tag: "Social fraud", icon: "chat", hook: "Your best friend needs money urgently — or does he?",
    intro: "ARIA: New signal — Rohan, on the metro home. His best friend Aman is messaging for urgent money. Aman's account was hijacked six hours ago.",
    location: { name: "Line 3 Metro", atmosphere: "metro", palette: { a: "#062230", b: "#050609", accent: COLORS.cyan } },
    appType: "chat", app: { name: "WhatsApp", icon: "chat" },
    thread: { from: "Aman (Best Friend)", time: "2 min ago", segments: [
      { text: "Bro, hospital needs advance payment, my card isn't working. Send 15k to this " }, { text: "UPI ID", clue: { id: "upi", label: "Urgent payment, chat-only request" } },
      { text: "? Will return tomorrow, " }, { text: "please hurry", clue: { id: "urgency2", label: "Pressure to skip verifying" } }, { text: "." },
    ]},
    actions: [
      { id: "a", icon: "chat", label: "Send it now, he's your best friend", correct: false, reaction: "Three more of Aman's contacts get the exact same message within a minute." },
      { id: "b", icon: "phone", label: "Call Aman's real number first", correct: true, reaction: "Aman picks up, confused — he never sent that. The scam is cut off before it spreads." },
      { id: "c", icon: "shieldAlert", label: "Ask for proof in the chat, then send", correct: false, reaction: "The reply is fast and convincing. It isn't Aman typing." },
    ],
    mentor: { whyItHappened: "Attackers hijack an account, then message the real contacts — exploiting trust in a familiar identity.", warningSigns: ["Money requests only over chat, never a call", "Excuses when asked to talk live", "Pressure to act before verifying"], immediateSteps: "Verify through a second channel — a call or video — before sending anyone money.", recoverySteps: "Report the compromised account, warn mutual contacts, file with the cyber portal.", helpline: "1930", portal: "cybercrime.gov.in" },
    spotTheFake: { prompt: "What's the safer response to an urgent money request?", a: { label: "Reply in the same chat asking \"are you sure?\"", fake: true }, b: { label: "Call the person's saved number directly", fake: false } },
  },
  {
    id: "ch3", num: "03", title: "The ₹500 Cashback QR", tag: "QR / UPI fraud", icon: "qr", hook: "A sticker promises cashback. It really wants your PIN.",
    intro: "ARIA: Local market, evening rush. A sticker taped near the chai stall promises cashback for scanning a QR. Someone's about to scan it.",
    location: { name: "Sarojini Market", atmosphere: "dust", palette: { a: "#3a2410", b: "#050609", accent: COLORS.saffron } },
    appType: "qr",
    qr: { label: "SCAN FOR ₹500 CASHBACK — RECHARGE OFFER", result: { merchant: "Unknown Enterprises Pvt Ltd", clue1: { id: "pin", label: "Asks for UPI PIN to \"receive\" money" }, clue2: { id: "mismatch", label: "Merchant name doesn't match the stall" } } },
    actions: [
      { id: "a", icon: "qr", label: "Scan and enter UPI PIN for the cashback", correct: false, reaction: "The PIN authorizes a debit, not a credit. ₹9,000 leaves the account instantly." },
      { id: "b", icon: "shieldAlert", label: "Ignore the sticker, pay the vendor's real UPI ID", correct: true, reaction: "The chai stall owner confirms — that sticker isn't theirs. Someone pasted it over the real code." },
      { id: "c", icon: "camera", label: "Screenshot the QR and scan it later at home", correct: false, reaction: "Curiosity gets the better of it later that night. Same trap, same PIN prompt." },
    ],
    mentor: { whyItHappened: "A UPI PIN is only ever needed to send money. Scam QR codes disguise a payment request as a reward to trick you into authorizing a debit.", warningSigns: ["Any \"scan to receive money\" offer", "A UPI PIN prompt for a reward or refund", "A QR sticker pasted over a merchant's real code"], immediateSteps: "Never enter a UPI PIN to receive money — only to send it. Verify the merchant name shown before paying.", recoverySteps: "Report the fraudulent transaction to your bank and UPI provider immediately, then file with the cyber portal.", helpline: "1930", portal: "cybercrime.gov.in" },
    spotTheFake: { prompt: "When do you actually need to enter your UPI PIN?", a: { label: "To receive a cashback or refund", fake: true }, b: { label: "To send a payment you initiated", fake: false } },
  },
  {
    id: "ch4", num: "04", title: "The Digital Arrest", tag: "Video call scam", icon: "phone", hook: "\"You're under digital arrest.\" No, you're not.",
    intro: "ARIA: A man in Pune is on a live video call with someone claiming to be a Cyber Cell officer. He's been told not to hang up. This one moves fast.",
    location: { name: "Home office", atmosphere: "dust", palette: { a: "#3a0f18", b: "#050609", accent: COLORS.crimson } },
    appType: "call", app: { name: "Video call", icon: "phone" },
    thread: { from: "\"Officer\" Rakesh Kumar — Cyber Cell", time: "Live", segments: [
      { text: "Your Aadhaar has been used in a money-laundering case. " }, { text: "You are under digital arrest", clue: { id: "noArrest", label: "\"Digital arrest\" doesn't exist in Indian law" } },
      { text: ". Stay on this call — do not disconnect, or a warrant will be issued. Transfer your funds now to this " },
      { text: "RBI verification account", clue: { id: "rbiAcct", label: "RBI never collects personal funds" } }, { text: " to clear your name." },
    ]},
    actions: [
      { id: "a", icon: "phone", label: "Stay on the call, transfer the funds for verification", correct: false, reaction: "₹6,40,000 moves to the \"verification account.\" It's gone within the hour." },
      { id: "b", icon: "shieldAlert", label: "Hang up, call 1930 to verify independently", correct: true, reaction: "The cyber cell confirms — no such case exists. There is no such thing as a digital arrest." },
      { id: "c", icon: "mail", label: "Ask for an official notice by post first", correct: false, reaction: "A convincing fake notice PDF appears on screen in seconds. The pressure resumes." },
    ],
    mentor: { whyItHappened: "Fraudsters impersonate police or ED officers on video and invent a fake legal process — \"digital arrest\" — to pressure a transfer before the target can verify anything.", warningSigns: ["Any claim that you're under \"digital arrest\"", "Pressure to stay on a call and never hang up", "A request to transfer money for \"verification\""], immediateSteps: "Disconnect immediately. No Indian agency arrests anyone over video call or asks for money to \"verify\" funds.", recoverySteps: "Report immediately to 1930 or cybercrime.gov.in with the call details and any transaction reference.", helpline: "1930", portal: "cybercrime.gov.in" },
    spotTheFake: { prompt: "Which is real police procedure?", a: { label: "\"You're under digital arrest, stay on this call\"", fake: true }, b: { label: "A summons to visit the station in person, in writing", fake: false } },
  },
  {
    id: "ch5", num: "05", title: "The ₹48,760 Refund", tag: "Phishing email", icon: "mail", hook: "A tax refund with a suspiciously tight deadline.",
    intro: "ARIA: An office inbox, 9 AM. An email claims a tax refund is waiting — with a very tight deadline.",
    location: { name: "Office desk", atmosphere: "dust", palette: { a: "#0d2a1c", b: "#050609", accent: COLORS.emerald } },
    appType: "email", app: { name: "Mail", icon: "mail" },
    thread: { from: "refunds@incometax-govt-verify.com", time: "9:14 AM", segments: [
      { text: "Dear Taxpayer, you are eligible for a refund of ₹48,760. Verify your bank details at " },
      { text: "incometax-govt-verify.com", clue: { id: "domain2", label: "Not the real incometax.gov.in domain" } },
      { text: " within " }, { text: "24 hours", clue: { id: "urgency3", label: "Refunds don't expire in 24 hours" } },
      { text: " or it will be forfeited. You'll need your PAN and " }, { text: "net-banking password", clue: { id: "creds", label: "Real portals never ask for your password by email" } }, { text: " to complete verification." },
    ]},
    actions: [
      { id: "a", icon: "mail", label: "Click the link, enter PAN and net-banking password", correct: false, reaction: "The \"refund portal\" captures the password. The account is drained by morning." },
      { id: "b", icon: "shieldAlert", label: "Delete it, check refund status on the real incometax.gov.in", correct: true, reaction: "No refund was ever pending. The official portal shows nothing unusual." },
      { id: "c", icon: "chat", label: "Reply asking them to confirm the amount first", correct: false, reaction: "A very convincing, doctored refund certificate arrives within a minute." },
    ],
    mentor: { whyItHappened: "The email imitates a government domain and pairs a reward with a deadline, so the reader acts before reading carefully.", warningSigns: ["A sender domain that isn't the real government one", "A deadline measured in hours", "Any request for a password by email"], immediateSteps: "Never enter a banking password via an email link. Type the official URL yourself instead of clicking through.", recoverySteps: "If details were entered, change the net-banking password immediately and inform the bank.", helpline: "1930", portal: "cybercrime.gov.in" },
    spotTheFake: { prompt: "Which is the real Income Tax department domain?", a: { label: "incometax.gov.in", fake: false }, b: { label: "incometax-govt-verify.com", fake: true } },
  },
  {
    id: "ch6", num: "06", title: "The Fake Support Call", tag: "Vishing", icon: "phone", hook: "\"Amazon support\" wants remote access to your phone.",
    intro: "ARIA: A call comes in about a ₹85,000 order that was never placed. \"Amazon support\" is on the line, offering a fast refund.",
    location: { name: "Living room", atmosphere: "rain", palette: { a: "#241a3a", b: "#050609", accent: COLORS.saffron } },
    appType: "call", app: { name: "Phone call", icon: "phone" },
    thread: { from: "\"Amazon Support\" +91-8XXXXXXXXX", time: "Just now", segments: [
      { text: "To cancel this order and refund you, please install " }, { text: "AnyDesk", clue: { id: "remoteApp", label: "Remote access apps hand over full control" } },
      { text: " so our executive can process it. Then share the 9-digit code and your " }, { text: "debit card number", clue: { id: "cardDetails", label: "No refund ever needs your card number" } }, { text: " to complete the reversal." },
    ]},
    actions: [
      { id: "a", icon: "phone", label: "Install the app, share the code and card number", correct: false, reaction: "The \"executive\" now controls the phone. Three UPI transfers go out before the screen unlocks again." },
      { id: "b", icon: "shieldAlert", label: "Hang up, check order history in the real Amazon app", correct: true, reaction: "There was no such order. Amazon never calls about order cancellations." },
      { id: "c", icon: "mail", label: "Ask them to email a refund confirmation instead", correct: false, reaction: "A convincing fake confirmation arrives within a minute — from a lookalike domain." },
    ],
    mentor: { whyItHappened: "Numbers found via search ads or fake listings impersonate real companies' \"support,\" then use remote-access apps to take the device over directly.", warningSigns: ["A support call asking you to install a remote-access app", "A request for your card number to process a refund", "A phone number found through a random web search"], immediateSteps: "Never install remote-access apps for a caller. Check order issues only inside the official app.", recoverySteps: "Uninstall the remote app immediately, disconnect from the internet, and call your bank to block cards.", helpline: "1930", portal: "cybercrime.gov.in" },
    spotTheFake: { prompt: "What would real Amazon support never ask for?", a: { label: "Your order ID", fake: false }, b: { label: "Your debit card number, over a call", fake: true } },
  },
  {
    id: "ch7", num: "07", title: "The Login From Lagos", tag: "Instagram takeover", icon: "userX", hook: "Your Instagram security alert isn't from Instagram.",
    intro: "ARIA: A student's Instagram just got a \"login alert\" from a new device abroad. She has an hour to \"secure\" the account, apparently.",
    location: { name: "Hostel room", atmosphere: "dust", palette: { a: "#2a1440", b: "#050609", accent: COLORS.purple } },
    appType: "chat", app: { name: "Instagram", icon: "chat" },
    thread: { from: "Instagram Security", time: "Just now", segments: [
      { text: "We noticed a login from a new device in Lagos, Nigeria. If this wasn't you, secure your account within " },
      { text: "1 hour", clue: { id: "igUrgency", label: "Real alerts don't expire in an hour" } }, { text: " at " },
      { text: "instagram-secure-login.net", clue: { id: "igDomain", label: "Not Instagram's real domain" } },
      { text: ". Enter your " }, { text: "username and password", clue: { id: "igCreds", label: "Instagram never asks for your password via a link" } }, { text: " to confirm it's you." },
    ]},
    actions: [
      { id: "a", icon: "chat", label: "Click the link, log in to confirm identity", correct: false, reaction: "The \"security page\" captures the password. The real account starts posting a crypto giveaway scam within minutes." },
      { id: "b", icon: "shieldAlert", label: "Ignore the link, check login activity in the real app", correct: true, reaction: "The app shows no suspicious login. The message was fake — reported and blocked." },
      { id: "c", icon: "mail", label: "Reply asking for more details first", correct: false, reaction: "The account isn't run by Instagram. The reply just confirms the number is active — more scam messages follow." },
    ],
    mentor: { whyItHappened: "Fake \"security alerts\" imitate a platform's real login-activity warnings, pairing urgency with a lookalike domain to harvest passwords.", warningSigns: ["A domain that isn't the platform's real one", "A password request outside the official app", "A short deadline to \"secure\" the account"], immediateSteps: "Never enter a password through a link in a message. Check login activity only inside the official app.", recoverySteps: "If compromised, use the platform's account recovery flow immediately and warn followers not to trust new posts.", helpline: "1930", portal: "cybercrime.gov.in" },
    spotTheFake: { prompt: "Where should you check real login activity?", a: { label: "A link sent in a message", fake: true }, b: { label: "Settings inside the official app", fake: false } },
  },
  {
    id: "ch8", num: "08", title: "₹3,000/Day, No Interview", tag: "Job fraud", icon: "briefcase", hook: "Guaranteed income, zero interview, one small fee.",
    intro: "ARIA: A Telegram message offers a work-from-home typing job with guaranteed daily pay. There's just one small step before it starts.",
    location: { name: "Café corner table", atmosphere: "dust", palette: { a: "#123024", b: "#050609", accent: COLORS.emerald } },
    appType: "chat", app: { name: "Telegram", icon: "chat" },
    thread: { from: "HR — BrightFuture Careers", time: "11:02 AM", segments: [
      { text: "Congratulations! You're selected for a work-from-home typing job, ₹3,000/day guaranteed. To activate your ID, pay a refundable " },
      { text: "registration fee of ₹499", clue: { id: "fee", label: "Real employers never charge you to get hired" } },
      { text: " via UPI. Task list starts once payment is confirmed. " },
      { text: "No interview needed", clue: { id: "noInterview", label: "Legitimate jobs almost always verify you first" } }, { text: "." },
    ]},
    actions: [
      { id: "a", icon: "chat", label: "Pay the ₹499 to activate the job", correct: false, reaction: "The \"registration fee\" account asks for another \"security deposit\" the next day. There was never a real job." },
      { id: "b", icon: "shieldAlert", label: "Ask for the company's official website, verify independently", correct: true, reaction: "No such registered company exists. The offer disappears the moment it's questioned." },
      { id: "c", icon: "creditCard", label: "Pay a smaller token amount just to \"test\" it", correct: false, reaction: "Any payment confirms you're a willing target. More \"fees\" follow immediately." },
    ],
    mentor: { whyItHappened: "Fake recruiters promise easy money for simple work, then monetize victims through upfront \"fees\" rather than real employment.", warningSigns: ["Any job that asks you to pay to get hired", "Guaranteed high pay for minimal work", "No real interview or verification process"], immediateSteps: "Never pay money to accept a job offer. Verify the company independently before sharing any details.", recoverySteps: "Stop all payments immediately and report the recruiter's account to the platform and cyber portal.", helpline: "1930", portal: "cybercrime.gov.in" },
    spotTheFake: { prompt: "Which is a sign of a fake job offer?", a: { label: "Asked to pay a \"registration fee\" before starting", fake: true }, b: { label: "Asked to complete an interview round", fake: false } },
  },
  {
    id: "ch9", num: "09", title: "Loan Approved. Pay Us First.", tag: "Loan app scam", icon: "creditCard", hook: "The loan is \"approved\" — for a fee, of course.",
    intro: "ARIA: A loan app message claims approval on a ₹25,000 loan. There's just a small processing charge standing between here and the money.",
    location: { name: "Rented flat", atmosphere: "rain", palette: { a: "#3a0f18", b: "#050609", accent: COLORS.crimson } },
    appType: "chat", app: { name: "QuickCash Loan", icon: "chat" },
    thread: { from: "QuickCash Loan Support", time: "4:45 PM", segments: [
      { text: "Your loan of ₹25,000 is approved! To release funds, pay a " },
      { text: "processing charge of ₹1,500", clue: { id: "advanceFee", label: "Real loans deduct fees from the amount, never need money upfront" } },
      { text: " via UPI right now. Approval expires in " }, { text: "30 minutes", clue: { id: "loanUrgency", label: "Genuine banks don't cancel approvals in 30 minutes" } }, { text: "." },
    ]},
    actions: [
      { id: "a", icon: "creditCard", label: "Pay the processing charge immediately", correct: false, reaction: "The ₹1,500 vanishes. The \"loan amount\" was never real, and the app now threatens to leak contacts unless more is paid." },
      { id: "b", icon: "shieldAlert", label: "Check the lender's RBI registration before paying anything", correct: true, reaction: "The app isn't RBI-registered — a red flag lenders are legally required to disclose. The offer is dropped entirely." },
      { id: "c", icon: "chat", label: "Ask for the fee to be deducted from the loan instead", correct: false, reaction: "They agree, then ask for a \"refundable security deposit\" instead. Same trap, different name." },
    ],
    mentor: { whyItHappened: "Unregistered lending apps demand upfront fees for a loan that never actually gets disbursed, often with permissions to access contacts for later harassment.", warningSigns: ["Any loan needing payment before disbursal", "Extremely short approval deadlines", "An app without visible RBI registration"], immediateSteps: "Never pay to receive a loan. Verify any lending app is RBI-registered before installing or applying.", recoverySteps: "Uninstall the app, revoke its permissions, and report both the app and any threats to the cyber portal.", helpline: "1930", portal: "cybercrime.gov.in" },
    spotTheFake: { prompt: "What should a genuine loan never require upfront?", a: { label: "Payment before the loan is disbursed", fake: true }, b: { label: "Proof of income and ID verification", fake: false } },
  },
  {
    id: "ch10", num: "10", title: "The Free SIM Upgrade", tag: "SIM swap", icon: "smartphone", hook: "A \"free\" upgrade that hands over your number.",
    intro: "ARIA: A call claims a free 5G SIM upgrade. All it needs is a code that just arrived by SMS. That code is the whole scam.",
    location: { name: "Bus stop", atmosphere: "metro", palette: { a: "#22124a", b: "#050609", accent: COLORS.purple } },
    appType: "call", app: { name: "Phone call", icon: "phone" },
    thread: { from: "\"Telecom Support\" +91-7XXXXXXXXX", time: "Just now", segments: [
      { text: "We're upgrading your SIM to 5G for free. To complete activation, please share the " },
      { text: "OTP you just received", clue: { id: "simOtp", label: "This OTP can authorize a full SIM swap" } },
      { text: " and confirm your registered number and the " },
      { text: "last 4 digits of your Aadhaar", clue: { id: "aadhaarDigits", label: "Real telecom upgrades don't need this over a call" } }, { text: "." },
    ]},
    actions: [
      { id: "a", icon: "phone", label: "Share the OTP and Aadhaar digits for the upgrade", correct: false, reaction: "The SIM deactivates an hour later. A new SIM with the same number is now active elsewhere — every OTP now goes to the attacker." },
      { id: "b", icon: "shieldAlert", label: "Hang up, visit the telecom store in person to check", correct: true, reaction: "The store confirms — no such upgrade was ever requested. The SIM stays safe." },
      { id: "c", icon: "chat", label: "Share only the OTP, withhold the Aadhaar digits", correct: false, reaction: "The OTP alone is enough to complete the SIM swap request already in progress." },
    ],
    mentor: { whyItHappened: "A \"free upgrade\" call tricks the victim into sharing an OTP that actually authorizes a SIM swap, letting the attacker receive all future OTPs on a new SIM.", warningSigns: ["Any unsolicited call about a \"free SIM upgrade\"", "A request for an OTP over a call", "A request for ID digits to \"confirm\" identity"], immediateSteps: "Never share an OTP over a call, ever. Verify any SIM-related request only at an official telecom store.", recoverySteps: "If your SIM stops working unexpectedly, contact your telecom provider and bank immediately — that's the first sign of a completed SIM swap.", helpline: "1930", portal: "cybercrime.gov.in" },
    spotTheFake: { prompt: "When is it safe to share an OTP over a phone call?", a: { label: "When a telecom \"executive\" asks to confirm an upgrade", fake: true }, b: { label: "Never — OTPs are for you to enter, not to speak aloud", fake: false } },
  },
  { id: "ch11", num: "11", title: "More cases incoming", tag: "Deepfakes · Crypto · Courier · KYC scams", icon: "lock", lockedForever: true, hook: "" },
];
