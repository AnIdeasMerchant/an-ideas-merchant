/* Kat client portal data. Duplicate this file + the HTML shell per
   client to spin up /clients/[name]; only this config + the media
   folder need to change. */
window.AIM_CLIENT = {
  name: "Kat",
  slug: "kat",
  password: "tatoueuse", // EDIT, cosmetic gate only, not real auth
  phase: "Getting Started",
  // no countdown event yet, omit entirely and the dashboard hides that card
  targetPractice: [
    { n: "01", key: "ORIGIN", status: "locked" },
    { n: "02", key: "IDENTITY", status: "locked" },
    { n: "03", key: "AUDIENCE TRUTH", status: "locked" },
    { n: "04", key: "NARRATIVE ENGINE", status: "locked" },
    { n: "05", key: "DECISION MAP", status: "locked" }
  ],
  // no origin content yet, omit entirely and the dashboard shows a placeholder
  milestones: []
};

window.AIM_STRATEGY = { notStarted: true };

const baseK = "vault/portraits/";
window.AIM_CLIP_GROUPS = [
  { title: "Portrait Session", location: "", date: "", clips: [
    { frames: [baseK+"IMG_2644.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2660.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2661.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2662.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2664.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2670.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2671.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2672.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2673.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2674.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2675.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2676.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2677.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2678.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2679.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2680.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2683.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2686.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2687.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2688.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2689.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2690.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2691.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2692.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2694.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2695.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2696.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2697.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2701.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2702.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2703.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2704.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2710.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2713.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2714.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2715.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2716.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2717.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2718.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2720.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2723.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2728.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2730.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2731.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2732.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2733.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2734.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2754.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2757.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2758.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2771.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2788.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2789.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2791.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2793.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2799.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2800.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2801.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2802.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2814.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2815.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2816.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2817.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2818.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2819.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2821.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2822.JPG"], dur: "Photo" },
    { frames: [baseK+"IMG_2823.JPG"], dur: "Photo" }
  ]}
];

/* Portrait edit previews: CSS filter approximations of common portrait
   grades, so Kat can preview a look before committing to a real edit.
   Same cycling "Apply LUT" button as the video grades, just tuned for
   skin tones and tattoo linework rather than footage. */
window.AIM_GRADES = [
  { key: "neutral", label: "Neutral", filter: "none" },
  { key: "warm-studio", label: "Warm Studio", filter: "sepia(0.16) saturate(1.15) brightness(1.04) contrast(1.04)" },
  { key: "soft-portrait", label: "Soft Portrait", filter: "saturate(0.92) brightness(1.05) contrast(0.94) blur(0.2px)" },
  { key: "ink-contrast", label: "Ink Contrast", filter: "contrast(1.22) saturate(0.85) brightness(0.98)" },
  { key: "mono", label: "Black & White", filter: "grayscale(1) contrast(1.12) brightness(1.02)" }
];
