import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const jobs = [
  ["public/images/title-bg.png", "1536x1024",
    "quiet dark fantasy web game background, a small broken lantern glowing faintly in the center, deep night landscape, soft cyan and warm candle light, subtle dust particles, poetic atmosphere, hand-crafted storybook feeling, not futuristic UI, no text, no logo, web game background"],
  ["public/images/game-bg.png", "1536x1024",
    "silent night room with old records and a faint glowing lantern, soft shadows, deep navy and black, small floating light particles, emotional story game atmosphere, empty center area for UI cards, not cyberpunk, no text, no logo, web game background"],
  ["public/images/result-success-bg.png", "1536x1024",
    "dawn light returning to a dark world, warm golden light spreading gently, hopeful quiet atmosphere, soft particles, emotional fantasy story ending, no text, no logo, web game background"],
  ["public/images/result-fail-bg.png", "1536x1024",
    "faint blue light fading in a silent dark world, lonely lantern almost extinguished, melancholic but gentle atmosphere, soft painterly style, no text, no logo, web game background"],
  ["public/images/lux-lantern.png", "1024x1024",
    "small mysterious lantern containing a soft living light, cracked glass, gentle cyan glow, floating dust, emotional fantasy object, centered composition, not robot, not chatbot, no text, no logo, dark background"],
  ["public/images/light-fragment.png", "1024x1024",
    "small glowing light fragment, warm cyan and gold, simple fantasy UI asset, gentle glow, no text, no logo, dark background"],
];

for (const [out, size, prompt] of jobs) {
  if (existsSync(out)) {
    console.log(`SKIP ${out}`);
    continue;
  }
  console.log(`GEN  ${out} (${size})`);
  const r = spawnSync("node", ["gen-image.mjs", prompt, out, size, "medium"], {
    stdio: "inherit",
  });
  if (r.status !== 0) console.log(`FAIL ${out}`);
}
console.log("DONE");
