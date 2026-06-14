# Lost Light

世界から光が消えた。5つの問いで、記憶の底に沈んだ“光”の正体を探す静かな物語ゲーム。

記憶の奥にかすかな灯りを残した存在 **LUX** に5回だけ問いかけ、返ってくる断片的な言葉から「失われた光」の正体を推理する。AIを使うが、UIはチャットボット風ではなく、暗闇の中で灯りを取り戻すノベルゲーム体験として設計している。

## 技術スタック

- Next.js (App Router) + TypeScript + Tailwind CSS
- OpenAI API（任意・未設定時はMock Mode）
- Supabase（任意・未接続時はLocalStorageフォールバック）

## ゼロ・コンフィグ動作

環境変数を一切設定しなくても、Mock Mode + LocalStorage でタイトルから結果画面まで1プレイ完結する。

```bash
npm install
npm run dev
# http://localhost:3000
```

## 環境変数（任意）

`.env.example` を `.env.local` にコピーして設定する。

| 変数 | 用途 | 未設定時 |
|---|---|---|
| `OPENAI_API_KEY` | LUXの応答・採点・判定をAIで生成 | Mock応答にフォールバック |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | プレイ結果をDB保存 | LocalStorageに保存 |
| `NEXT_PUBLIC_FORCE_MOCK_MODE` | `true`で常にMock | `false` |

## Supabase（任意・加点）

`supabase.sql` を Supabase の SQL Editor で実行する。RLSポリシーで anon に insert/select を許可済み。

## デプロイ

GitHub に push → Vercel で Import。Next.js は自動検出される。AIやSupabaseを使う場合は Vercel の Environment Variables に上記キーを設定し、Redeploy する。

## 画像素材について

`gen-image.mjs` / `gen-all-images.mjs` で `OPENAI_API_KEY` を使い背景・LUXの画像を生成できる（品質 `medium`）。未生成でもCSSグラデーションと インラインSVGの灯りで動作するため、画像は加点要素。
