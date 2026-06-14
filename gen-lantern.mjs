import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("ERROR: OPENAI_API_KEY が未設定");
  process.exit(1);
}

const prompt =
  "a single small mysterious lantern floating in the center, surrounded entirely by deep pure black darkness, cracked glass holding a soft living cyan light with a gentle warm golden core, faint floating dust near the glow, the light gently fades out into solid black at all edges, strong dark vignette, the lantern is the only lit object, painterly emotional fantasy game asset, centered composition on pitch black background, no scene, no floor, no horizon, no text, no logo";

const outPath = "public/images/lux-lantern.png";

const res = await fetch("https://api.openai.com/v1/images/generations", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "gpt-image-2",
    prompt,
    size: "1024x1024",
    quality: "medium",
    n: 1,
  }),
});

if (!res.ok) {
  console.error(`API error ${res.status}:\n${await res.text()}`);
  process.exit(1);
}

const data = await res.json();
const b64 = data?.data?.[0]?.b64_json;
if (!b64) {
  console.error("画像データが返ってきませんでした");
  process.exit(1);
}

await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, Buffer.from(b64, "base64"));
console.log(outPath);
