/* Simone client portal data. Duplicate this file + the HTML shell per
   client to spin up /clients/[name]; only this config + the clip folder
   need to change. Placeholder copy/dates are marked EDIT, swap for real
   values before sharing the link. */
window.AIM_CLIENT = {
  name: "Simone",
  slug: "simone",
  password: "bisou", // EDIT, cosmetic gate only, not real auth
  phase: "Documentation",
  location: "Auckland, New Zealand", // EDIT — generic per-client profile, used by discovery + AI tools
  niche_keywords: ["bodybuilding", "IFBB competition prep", "personal training", "fitness coaching"], // EDIT
  countdown: { label: "Auckland IFBB", date: "26 SEP 2026", dateISO: "2026-09-26" }, // EDIT
  targetPractice: [
    { n: "01", key: "ORIGIN", status: "current", note: "Drafted from voice notes, call still needed to lock it in" },
    { n: "02", key: "IDENTITY", status: "locked" },
    { n: "03", key: "AUDIENCE TRUTH", status: "locked" },
    { n: "04", key: "NARRATIVE ENGINE", status: "locked" },
    { n: "05", key: "DECISION MAP", status: "locked" }
  ],
  // Pulled from the Stage 01 working document, the "why" behind the work,
  // kept in plain view for Simone. Update as later stages lock in.
  origin: {
    proposition: "Training is the vehicle. The larger outcome is helping people become more capable, confident and intentional in their everyday lives.",
    coreTension: "Simone isn't selling injury-prevention PT. She's using her own transformation, in the final weeks before Auckland IFBB, as proof that she knows who she is, and she wants to help other people find that same self-knowledge. The content has to be about her: her training, her intensity, her identity. That's what earns her the right to say she can help someone else get there too.",
    quote: "I know exactly who I am, this year, that's what I'm bringing to the stage."
  },
  // Milestones double as content opportunities, shown on the dashboard
  // countdown expand and in the Content Queue's "Coming up" list. EDIT dates/ideas.
  milestones: [
    { label: "Posing mock test", date: "12 SEP", idea: "Behind-the-scenes practice footage builds anticipation for the stage." },
    { label: "Physique check-in", date: "18 SEP", idea: "A strong before/after moment worth capturing on its own." },
    { label: "Peak week starts", date: "20 SEP", idea: "Show the shift in intensity and discipline as the final push begins." },
    { label: "Competition day", date: "26 SEP", idea: "The payoff moment the whole archive has been building towards." }
  ]
};

/* Strategy content, pulled from the Stage 01 working document and the
   AIM Target Practice framework (anideasmerchant.com). Locked stages
   show the general framework description so Simone is reminded why
   each stage matters even before her own answers are in. */
window.AIM_STRATEGY = {
  targetPractice: [
    {
      num: "01", name: "Origin / Awareness", role: "Foundation", output: "The Core Tension Statement",
      figure: "assets/glyphs/s1-origin.png", status: "current",
      statusLabel: "Origin drafted from voice notes, call still needed to lock it in",
      whatWeKnow: "Draft Core Tension Statement, not locked, needs confirmation: \"Simone isn't selling injury-prevention PT. She's using her own transformation, in the final weeks before Auckland IFBB, as proof that she knows who she is, and she wants to help other people find that same self-knowledge. The content has to be about her: her training, her intensity, her identity.\" Her own words: \"I know exactly who I am, this year, that's what I'm bringing to the stage.\"",
      decisions: "Offer direction: online personal training and lifestyle coaching, not bodybuilder-only. Positioning centres on her own visible transformation and mindset shift, not a credentials-led physio or PT pitch."
    },
    { num: "02", name: "Identity", role: "Foundation", output: "The Decision Filter", figure: "assets/glyphs/s2-identity.png", status: "locked", statusLabel: "Not yet started",
      why: "Before a brand can speak, it has to know what it is and what it refuses to be. This stage defines the role it plays in someone's life, guide, rebel, translator or protector, and sets the filter every future decision gets run through." },
    { num: "03", name: "Audience Truth", role: "Strategy", output: "The Audience Pressure Point", figure: "assets/glyphs/s3-audience.png", status: "locked", statusLabel: "Not yet started",
      why: "Demographics don't tell you who someone is. This stage gets at what they're actually tired of, what they secretly want, and what moment in their life they're standing in, so the work speaks to a real person, not a segment." },
    { num: "04", name: "Narrative Engine", role: "Strategy", output: "The Narrative Arc", figure: "assets/glyphs/s4-narrative.png", status: "locked", statusLabel: "Not yet started",
      why: "Every brand is telling a story whether it means to or not. This stage shapes that story deliberately, where someone starts, what shifts, who they become on the other side, and turns it into language that can actually be used." },
    { num: "05", name: "Decision Map", role: "Execution", output: "A 90-Day Action Spine", figure: "assets/glyphs/s5-process.png", status: "locked", statusLabel: "Not yet started",
      why: "Clarity means nothing without action. This stage cuts the noise down to what actually matters right now, what's premature, and what moves the needle first, so the next 90 days have a spine, not a wish list." }
  ],
  // Content pillars, written back in Simone's own words from her Stage 01
  // answers, so reading them reflects her own reasoning back to her.
  pillars: [
    { name: "Training", body: "I document real training, technique and intensity, because that's the proof I know exactly who I am, and it's what earns me the right to help someone else find that out about themselves." },
    { name: "Road to Competition", body: "I show the physical and psychological reality of prepping for Auckland IFBB, because the messy middle is the part people actually need to see, not just the stage moment." },
    { name: "Knowledge", body: "I share what training and this profession have actually taught me, because it turns my experience into something someone else can use." },
    { name: "Lifestyle", body: "I let people see how training fits around my work, relationships, food and recovery, because it proves this is a life, not just a programme." },
    { name: "Wellbeing", body: "I frame fitness as one part of feeling and functioning well, because that's the bigger outcome I'm actually offering, beyond a workout plan." },
    { name: "Personality", body: "I let my humour and opinions come through, because people follow people, and I don't need to perform someone else's version of a coach." },
    { name: "Coaching", body: "Eventually, I show exactly how I help other people make progress, because it's the natural extension of doing the work on myself first." }
  ],
  window: {
    start: "2026-08-15", end: "2026-09-26", competitionDate: "2026-09-26",
    shootDates: ["2026-08-02", "2026-08-15"],
    note: "Do not miss the story. 17 kinds of moments are worth catching, from training sessions to competition day. Not everything needs publishing; the archive itself has long-term value."
  },
  actions: {
    now: ["Continue documenting training.", "Finish and select the strongest candid stills.", "Begin publishing without waiting for the entire strategy to be complete."],
    nextTopic: "Instagram Strategy",
    nextOutcome: "Leave with a simple publishing system that can operate immediately through the remaining competition preparation period.",
    beforeIfbb: "Build enough consistency that competition day feels like the culmination of an existing documented story rather than the first time the audience encounters it."
  }
};

/* Clip stills grouped in 3s to demo hover-scrub (mouse-x picks a frame).
   Swap `frames` for a single `video` src per clip once real H.264 files
   are ready; the scrub handler already checks for either. Clips are
   organised by shoot day; each day gets a title card you can scrub
   through to preview everything captured that day. */
const base = "assets/clients/simone/clips/";
const baseH = "assets/clients/simone/clips-henderson/";
window.AIM_CLIP_GROUPS = [
  { title: "Flex Pt Chev", date: "02.08.26", location: "Flex Fitness, Pt Chevalier", clips: [
    { frames: [base+"Timeline 1_01_07_45_24.jpg", base+"Timeline 1_01_27_50_21.jpg", base+"Timeline 1_01_34_40_21.jpg"], dur: "0:03" },
    { frames: [base+"Timeline 1_01_41_53_00.jpg", base+"Timeline 1_01_48_06_04.jpg", base+"Timeline 1_01_50_39_13.jpg"], dur: "0:02" },
    { frames: [base+"Timeline 1_01_51_25_18.jpg", base+"Timeline 1_01_56_54_05.jpg", base+"Timeline 1_01_57_11_13.jpg"], dur: "0:03" },
    { frames: [base+"Timeline 1_01_57_51_07.jpg", base+"Timeline 1_01_59_23_18.jpg", base+"Timeline 1_02_03_51_06.jpg"], dur: "0:03" },
    { frames: [base+"Timeline 1_02_06_19_12.jpg", base+"Timeline 1_02_06_33_14.jpg", base+"Timeline 1_02_07_14_11.jpg"], dur: "0:02" },
    { frames: [base+"Timeline 1_02_07_24_06.jpg", base+"Timeline 1_02_07_58_21.jpg", base+"Timeline 1_02_11_06_15.jpg"], dur: "0:03" },
    { frames: [base+"Timeline 1_02_11_36_00.jpg", base+"Timeline 1_02_12_20_10.jpg", base+"Timeline 1_02_13_07_03.jpg"], dur: "0:02" },
    { frames: [base+"Timeline 1_02_16_49_24.jpg", base+"Timeline 1_02_16_57_23.jpg", base+"Timeline 1_02_17_22_21.jpg"], dur: "0:03" },
    { frames: [base+"Timeline 1_02_17_38_04.jpg", base+"Timeline 1_02_41_04_14.jpg", base+"Timeline 1_02_41_15_02.jpg"], dur: "0:02" }
  ]},
  { title: "Flex Henderson", date: "15.08.26", location: "Flex Fitness, Henderson", clips: [
    { frames: [baseH+"IMG_9344.JPG", baseH+"IMG_9346.JPG", baseH+"IMG_9348.JPG"], dur: "0:03" },
    { frames: [baseH+"IMG_9349.JPG", baseH+"IMG_9351.JPG", baseH+"IMG_9352.JPG"], dur: "0:02" },
    { frames: [baseH+"IMG_9353.JPG", baseH+"IMG_9355.JPG", baseH+"IMG_9356.JPG"], dur: "0:03" },
    { frames: [baseH+"IMG_9360.JPG", baseH+"IMG_9371.JPG", baseH+"IMG_9374.JPG"], dur: "0:02" }
  ]},
  { title: "Session Stills", location: "", date: "", clips: [
    { frames: [base+"Timeline 1_01_07_45_24.jpg"], dur: "Photo" },
    { frames: [base+"Timeline 1_01_41_53_00.jpg"], dur: "Photo" },
    { frames: [base+"Timeline 1_01_51_25_18.jpg"], dur: "Photo" },
    { frames: [base+"Timeline 1_01_57_51_07.jpg"], dur: "Photo" },
    { frames: [base+"Timeline 1_02_06_19_12.jpg"], dur: "Photo" },
    { frames: [base+"Timeline 1_02_07_24_06.jpg"], dur: "Photo" },
    { frames: [base+"Timeline 1_02_11_36_00.jpg"], dur: "Photo" },
    { frames: [base+"Timeline 1_02_16_49_24.jpg"], dur: "Photo" },
    { frames: [base+"Timeline 1_02_17_38_04.jpg"], dur: "Photo" },
    { frames: [baseH+"IMG_9344.JPG"], dur: "Photo" },
    { frames: [baseH+"IMG_9349.JPG"], dur: "Photo" },
    { frames: [baseH+"IMG_9353.JPG"], dur: "Photo" },
    { frames: [baseH+"IMG_9360.JPG"], dur: "Photo" }
  ]}
];

/* Grade previews. `filter` is a CSS approximation shown until a real
   .cube LUT is supplied. Once CLIENT grades carry a `cubeUrl`, swap
   the apply() call in the portal script for a WebGL 3D-LUT lookup pass
   instead of the CSS filter (same call site, same UI). */
window.AIM_GRADES = [
  { key: "neutral", label: "Neutral", filter: "none" },
  { key: "warm", label: "Warm Editorial", filter: "sepia(0.18) saturate(1.12) brightness(1.03) contrast(1.05)" },
  { key: "cool", label: "Cool Filmic", filter: "saturate(0.88) contrast(1.08) brightness(0.97) hue-rotate(-6deg)" }
];
