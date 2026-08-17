/* Simone client portal data. Duplicate this file + the HTML shell per
   client to spin up /clients/[name]; only this config + the clip folder
   need to change. Placeholder copy/dates are marked EDIT, swap for real
   values before sharing the link. */
window.AIM_CLIENT = {
  name: "Simone",
  slug: "simone",
  password: "bisou", // EDIT, cosmetic gate only, not real auth
  phase: "Documentation",
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
    northStar: "Help people make meaningful changes in their everyday lives and empower them to smash their fitness and wellbeing goals, beyond just teaching exercises or programming workouts.",
    coreTension: "Simone isn't selling injury-prevention PT. She's using her own transformation, in the final weeks before Auckland IFBB, as proof that she knows who she is, and she wants to help other people find that same self-knowledge. The content has to be about her: her training, her intensity, her identity. That's what earns her the right to say she can help someone else get there too.",
    quote: "I know exactly who I am, this year, that's what I'm bringing to the stage."
  },
  milestones: [ // EDIT, replace with real dates
    { label: "Physique check-in", date: "18 SEP" },
    { label: "Posing mock test", date: "12 SEP" },
    { label: "Peak week starts", date: "20 SEP" },
    { label: "Competition day", date: "26 SEP" }
  ]
};

/* Strategy doc content, pulled from the Stage 01 working document. */
window.AIM_STRATEGY = {
  northStar: {
    ambition: "Help people make meaningful changes in their everyday lives and empower them to smash their fitness and wellbeing goals, beyond just teaching exercises or programming workouts.",
    direction: ["Personal training", "Lifestyle coaching", "Fitness and wellbeing coaching", "Online/digital coaching", "Content and education", "Location-independent work", "Opportunities to live and work overseas"],
    proposition: "Training is the vehicle. The larger outcome is helping people become more capable, confident and intentional in their everyday lives."
  },
  targetPractice: [
    {
      num: "01", name: "Origin / Awareness", role: "Foundation", output: "The Core Tension Statement",
      figure: "../../assets/glyphs/s1-origin.png", active: true,
      statusLabel: "Origin drafted from voice notes, call still needed to lock it in",
      whatWeKnow: "Draft Core Tension Statement, not locked, needs confirmation: \"Simone isn't selling injury-prevention PT. She's using her own transformation, in the final weeks before Auckland IFBB, as proof that she knows who she is, and she wants to help other people find that same self-knowledge. The content has to be about her: her training, her intensity, her identity.\" Her own words: \"I know exactly who I am, this year, that's what I'm bringing to the stage.\"",
      decisions: "Offer direction: online personal training and lifestyle coaching, not bodybuilder-only. Positioning centres on her own visible transformation and mindset shift, not a credentials-led physio or PT pitch."
    },
    { num: "02", name: "Identity", role: "Foundation", output: "The Decision Filter", figure: "../../assets/glyphs/s2-identity.png", statusLabel: "Not yet completed" },
    { num: "03", name: "Audience Truth", role: "Strategy", output: "The Audience Pressure Point", figure: "../../assets/glyphs/s3-audience.png", statusLabel: "Not yet completed" },
    { num: "04", name: "Narrative Engine", role: "Strategy", output: "The Narrative Arc", figure: "../../assets/glyphs/s4-narrative.png", statusLabel: "Not yet completed" },
    { num: "05", name: "Decision Map", role: "Execution", output: "A 90-Day Action Spine", figure: "../../assets/glyphs/s5-decision.png", statusLabel: "Not yet completed" }
  ],
  pillars: [
    { name: "Training", body: "Real workouts, technique, progression and intensity." },
    { name: "Road to Competition", body: "The physical and psychological reality of preparing for Auckland IFBB." },
    { name: "Knowledge", body: "What Simone has learned through training and professional experience." },
    { name: "Lifestyle", body: "How training fits around work, relationships, food, recovery and ordinary life." },
    { name: "Wellbeing", body: "Fitness as part of a larger approach to feeling and functioning well." },
    { name: "Personality", body: "Humour, candid moments, opinions, interests and life outside structured fitness content." },
    { name: "Coaching", body: "Eventually demonstrating how Simone helps other people make progress." }
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
  },
  insightLog: [
    { date: "14 Aug 2026", tag: "efficiency", obs: "Target Practice Stage 01 has voice notes but nothing transcribed yet, every other stage is blocked behind it.", sug: "Transcribe/summarise the Stage 01 voice notes before the next shoot. This is the single highest-leverage task on the board right now." },
    { date: "16 Aug 2026", tag: "awareness", obs: "Simone mentioned loving the pink cycle lane near her and walking it often, an unprompted, specific detail from the Stage 01 voice notes.", sug: "Worth a shoot there. It's her own environment rather than a gym, which fits the Lifestyle content pillar and gives the archive a location beyond Flex Fitness." },
    { date: "16 Aug 2026", tag: "efficiency", obs: "The North Star's working brand proposition and Stage 01's draft Core Tension Statement are circling the same idea from two different directions.", sug: "Reconcile them into one statement once Stage 01 is confirmed, rather than carrying two competing drafts." }
  ],
  parkingLot: ["PT business model", "Lifestyle coaching offer", "Online coaching", "Website", "Brand identity", "Logo / wordmark", "Client photography", "Testimonials", "Educational series", "Long-form video", "International audience", "Remote coaching", "Partnerships", "Sponsorship", "Products/programmes", "Email/community", "Overseas positioning"],
  postReview: {
    target: "Late September / Early October 2026",
    items: ["Review the complete six-week archive.", "Review Instagram performance.", "Identify content Simone enjoyed creating.", "Identify audience response.", "Review Target Practice conclusions.", "Evaluate emerging positioning.", "Identify strongest visual patterns.", "Define the next 90-day objective.", "Begin converting the documented journey into a more deliberate coaching brand."]
  }
};

/* Clip stills grouped in 3s to demo hover-scrub (mouse-x picks a frame).
   Swap `frames` for a single `video` src per clip once real H.264 files
   are ready; the scrub handler already checks for either. Clips are
   organised by shoot day; each day gets a title card you can scrub
   through to preview everything captured that day. */
const base = "vault/clips/";
const baseH = "vault/clips-henderson/";
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
