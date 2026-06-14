以下をそのまま `main.md` に貼り付けてください。
添付案の内容をベースに、**UIがAIチャットっぽく見えない**ように「物語・灯り・手触り・静かな絵本的SF」寄りへ書き換えています。

````markdown
# Lost Light — main.md

## 0. プロジェクト基本情報

| 項目 | 内容 |
|---|---|
| アプリ名 | Lost Light |
| 英語名 | Lost Light |
| ジャンル | AI推理ゲーム / 物語型対話ゲーム |
| 想定プレイ時間 | 3〜5分 |
| 開発目的 | 「光」を希望・記憶・感情として解釈し、5つの問いで失われた光の正体を推理するWebゲームを作る |
| GitHub Repository | https://github.com/miki-826/Lost-Light.git |
| デプロイ予定 | Vercel |
| 使用技術 | Next.js App Router / TypeScript / Tailwind CSS / OpenAI API / Supabase / LocalStorage |
| 最優先方針 | APIキーなしでもMock Modeで1プレイ完結し、3時間以内にデモ可能なMVPを完成させる |

---

## 1. 一言コンセプト

世界から光が消えた。  
5つの問いで、記憶の底に沈んだ“光”の正体を探す。

---

## 2. アプリ概要

Lost Lightは、世界から失われた「光」の正体を、5回の質問だけで推理する短編Webゲームです。

プレイヤーは、記憶を失った存在「LUX」に問いかけます。  
LUXは答えを直接言わず、風景・記憶・感情の断片として返答します。

このアプリではAIを使いますが、UI上では**AIアプリ感を出しすぎない**ことを重視します。  
チャットボット風の画面ではなく、暗闇の中の灯り、古い記録、記憶の断片をたどるような体験にします。

AIは以下を担当します。

- LUXとしての詩的な応答
- 質問の有効度採点
- 光ゲージの増加判定
- 最終回答の意味ベース判定
- 結果画面の物語コメント生成

OpenAI APIやSupabaseが未設定でも、Mock Modeで必ず動作します。  
APIが失敗しても、固定データ・簡易判定・LocalStorage保存でタイトルから結果画面まで完走できます。

---

## 3. コア体験

```text
タイトル画面
↓
世界から光が消えたプロローグを読む
↓
失われた光の正体が内部で決まる
↓
プレイヤーがLUXに5回だけ問いかける
↓
LUXが記憶の断片として答える
↓
問いの良さに応じて光が少しずつ戻る
↓
プレイヤーが最後の推理を入力する
↓
正解判定と物語的な結果が表示される
````

---

## 4. MVP必須機能

| 優先度 | 機能             | 内容                            |
| --- | -------------- | ----------------------------- |
| A   | タイトル画面         | アプリ名、サブコピー、開始ボタン、遊び方ボタン       |
| A   | 遊び方画面          | 5回質問して光の正体を当てるルール説明           |
| A   | プロローグ画面        | 世界観とLUXに問いかける理由を提示            |
| A   | メイン体験画面        | 質問入力、会話ログ、光ゲージ、LUXの表示         |
| A   | ユーザー入力         | 質問入力、最終回答入力                   |
| A   | AI応答またはMock応答  | OpenAI APIがあればAI応答、なければMock応答 |
| A   | 結果画面           | 正解判定、スコア、ランク、LUXの言葉           |
| A   | Mock Mode      | APIキーなし・API失敗時でも1プレイ完結        |
| A   | LocalStorage保存 | Supabaseなしでも直近プレイ結果を保存        |
| A   | レスポンシブ対応       | スマホ幅でも崩れないUI                  |
| B   | 光の演出           | 光ゲージに応じて背景・LUX・パネルが明るくなる      |
| B   | AI感を抑えたUI      | チャットアプリ風ではなく、物語カード風にする        |
| C   | Supabase保存     | 接続できる場合のみプレイ履歴を保存             |

---

## 5. 後回しにする機能

| 機能        | 後回しにする理由          |
| --------- | ----------------- |
| ログイン      | 3時間MVPでは不要        |
| ランキング     | DB設計が増え、実装時間を圧迫する |
| SNS共有     | コア体験完成後でよい        |
| 複雑なDB     | LocalStorageで代替可能 |
| 課金        | ハッカソンMVPに不要       |
| 管理画面      | 不要                |
| 詳細なユーザー設定 | 初回体験を45秒以内にするため不要 |
| 大量のエンディング | 固定データ数件で十分        |
| リアルタイム通信  | ゲーム性に不要           |
| 高度な3D演出   | 3時間では重い           |

---

## 6. 画面一覧

実装速度を優先し、基本は `/` だけで状態切り替えするSPA風にする。
Next.js App Routerのページ分割は必須ではない。

| 画面名     | パス例         | 内容                |
| ------- | ----------- | ----------------- |
| タイトル画面  | `/`         | タイトル、開始、遊び方       |
| 遊び方画面   | `/` の state | ルール説明、戻るボタン       |
| プロローグ画面 | `/` の state | 世界観テキスト、LUXの最初の言葉 |
| 質問画面    | `/` の state | 5回質問、記憶ログ、光ゲージ    |
| 最終回答画面  | `/` の state | 失われた光の正体を入力       |
| 結果画面    | `/` の state | 正解判定、スコア、ランク、コメント |

---

## 7. UIデザイン方針

| 項目        | 内容                                       |
| --------- | ---------------------------------------- |
| テーマ       | 暗闇の中で、記憶の灯りを少しずつ取り戻す物語                   |
| キーワード     | 灯り、余白、静けさ、古い記録、記憶の粒、ランタン、夜明け前            |
| 見た目の方向性   | AIチャット画面ではなく、短編ノベルゲーム・絵本・記録帳のようなUI       |
| UI演出      | 光ゲージ上昇、背景の明転、LUXの淡い発光、結果時の光の広がり          |
| 読みやすさ     | 文字量を詰め込まず、余白を広めに取る                       |
| AI感を抑える方針 | 「AI」「生成」「チャット」「プロンプト」などの技術語をUIに出さない      |
| LUXの見せ方   | ロボットやチャットボットではなく、記憶を宿した灯り・ランタン・光の核として見せる |

### UIで避ける表現

```text
AIが回答しています
AI生成中
チャットを開始
プロンプト
モデル
推論中
Bot
アシスタント
システムメッセージ
```

### UIで使う表現

```text
LUXが記憶を探しています
記憶の断片
問いかける
灯りが少し戻った
最後の推理へ
光を取り戻す
記録を閉じる
もう一度、夜を歩く
```

---

## 8. カラーパレット

| 用途       | 色名              | HEX       |
| -------- | --------------- | --------- |
| 背景       | Night Black     | `#05060A` |
| パネル背景    | Ink Navy        | `#0D1320` |
| メイン文字    | Candle White    | `#F5F1E8` |
| サブ文字     | Faded Mist      | `#A8B0BD` |
| アクセント色   | Quiet Cyan      | `#67E8F9` |
| 警告色      | Dusk Violet     | `#8B5CF6` |
| 成功色      | Dawn Gold       | `#F6D365` |
| 境界線      | Faint Blue Line | `#20334D` |
| ボタン背景    | Deep Teal       | `#0E7490` |
| ボタンHover | Pale Cyan       | `#22D3EE` |
| 不正解背景    | Lost Purple     | `#1A1026` |
| 正解ハイライト  | Morning Light   | `#FFF4C2` |

---

## 9. 主要UI文言

```text
タイトル:
Lost Light

サブコピー:
5つの問いで、失われた光を取り戻せ。

開始ボタン:
夜を歩きはじめる

遊び方ボタン:
遊び方を読む

質問ボタン:
問いかける

最終回答ボタン:
光を取り戻す

結果後ボタン:
もう一度、夜を歩く

戻るボタン:
記録を閉じる

ラベル:
光の戻り
残された問い
あなたの問い
LUXの記憶
最後の推理
失われた光
```

---

## 10. 遊び方テキスト

```text
この世界から「光」が消えました。

あなたが話せる相手は、
記憶の奥にかすかな灯りを残した存在、LUXだけです。

問いかけられるのは5回まで。

LUXの答えは、正解そのものではありません。
風景、記憶、感情の断片として返ってきます。

その言葉を手がかりに、
失われた光の正体を推理してください。

良い問いを重ねるほど、
世界には少しずつ光が戻ります。
```

---

## 11. ゲーム画面レイアウト

### PC表示

```text
┌────────────────────────────────────────────┐
│ Lost Light                 光の戻り 62%     │
│ 残された問い 2                              │
├───────────────────────┬────────────────────┤
│                       │                    │
│        LUX             │  記憶の断片         │
│   淡く光るランタン      │  あなた: ...       │
│                       │  LUX: ...          │
│                       │                    │
├───────────────────────┴────────────────────┤
│ あなたの問い                                │
│ [                                      ]    │
│ [ 問いかける ]                              │
└────────────────────────────────────────────┘
```

### スマホ表示

```text
┌────────────────────┐
│ Lost Light          │
│ 光の戻り 62%        │
│ 残された問い 2       │
├────────────────────┤
│        LUX           │
│   淡く光るランタン    │
├────────────────────┤
│ 記憶の断片            │
│ あなた: ...          │
│ LUX: ...             │
├────────────────────┤
│ あなたの問い          │
│ [                ]   │
│ [問いかける]          │
└────────────────────┘
```

### UI実装メモ

```text
チャットアプリの吹き出し感を強くしない
LINE風・ChatGPT風のUIにしない
会話ログは「記憶の断片」「古い記録」のように見せる
LUXの返答はカードや記録紙のような表示にする
入力欄は大きすぎず、物語の余白を残す
```

---

## 12. 結果画面レイアウト

```text
判定:
LIGHT RESTORED / LIGHT LOST

失われた光:
希望 / 記憶 / 声 など

あなたの答え:
ユーザー入力

スコア:
総合スコア
問いの深さ
推理の近さ
光の戻り

ランク:
S / A / B / C / D

称号:
光を導く者 など

解説:
なぜ正解または不正解だったか

LUXの言葉:
短い物語的コメント

ボタン:
もう一度、夜を歩く
タイトルへ戻る
```

---

## 13. 評価・スコア・ランク設計

### 評価項目

| 項目    | 内容                            |
| ----- | ----------------------------- |
| 問いの深さ | 5回の質問スコア平均                    |
| 推理の近さ | 最終回答の正解度                      |
| 光の戻り  | 光ゲージ                          |
| 総合スコア | 問いの深さ30% + 推理の近さ50% + 光の戻り20% |
| ランク   | 総合スコアに応じてS〜D                  |
| 称号    | ランクに応じて固定表示                   |

### ランク

| ランク |   条件 | 称号       |
| --- | ---: | -------- |
| S   | 90以上 | 光を導く者    |
| A   | 75以上 | 記憶を照らす者  |
| B   | 60以上 | 闇に問いかける者 |
| C   | 40以上 | 迷える観測者   |
| D   | 39以下 | 光を見失った者  |

### スコア計算

```ts
const totalScore = Math.round(
  questionPower * 0.3 +
  reasoningPower * 0.5 +
  lightRecovery * 0.2
);
```

---

## 14. Mock Mode要件

Mock Modeは必須。
以下の条件では必ずMock Modeに切り替える。

```text
OPENAI_API_KEY がない
Supabase環境変数がない
OpenAI APIエラー
OpenAI APIのレスポンスが不正
JSON parse失敗
Vercel本番で環境変数未設定
NEXT_PUBLIC_FORCE_MOCK_MODE=true
通信タイムアウト
```

Mock Modeでやること。

```text
固定の正解データを使用する
固定または簡易ロジックでLUXの言葉を返す
質問内容に含まれるキーワードで質問スコアを計算する
最終回答をキーワード一致・類義語一致で判定する
結果画面まで進める
LocalStorageにプレイ結果を保存する
Supabase未接続でもエラー表示で止めない
```

UI上のMock表示は小さく控えめにする。

```text
デモ用の記録で進行中
```

「Mock Mode」「API未接続」などの技術語は、通常UIには大きく出さない。

---

## 15. Mock正解データ

```json
{
  "id": "mock-case-001",
  "title": "失われた明日の灯",
  "genre": "symbolic_mystery",
  "difficulty": "normal",
  "aiName": "LUX",
  "story": "世界から光が消え、人々は朝を待つ理由を忘れてしまった。LUXはかつて、その光を守るために作られた存在だった。",
  "answer": "希望",
  "theme": "未来を信じて前に進む力",
  "truth": "失われた光の正体は、物理的な明かりではなく、人々が明日を信じるための希望だった。",
  "explanation": "希望を失った世界では、朝日が昇っても誰も前に進めない。LUXが守っていたのは、暗闇の中でも未来を信じる心だった。",
  "hidden_facts": [
    "光は目に見えるものとは限らない",
    "人々は朝を待つ理由を忘れている",
    "LUXは未来に関係するものを守っていた",
    "失われた光は人の心に宿る",
    "それは誰かを前に進ませる力"
  ],
  "keywords": [
    "希望",
    "未来",
    "明日",
    "信じる",
    "前に進む",
    "あきらめない",
    "期待",
    "夢"
  ],
  "near_answers": [
    "未来を信じる心",
    "明日への期待",
    "夢",
    "生きる理由",
    "前に進む力"
  ],
  "mock_answers": {
    "default": "……遠くで、小さな灯りが揺れています。それは、誰かを前へ進ませるものでした。",
    "future": "はい。まだ来ていない朝を、それでも待とうとする心に近いものです。",
    "memory": "記憶とも少しつながっています。けれど、それは過去よりも、これからを照らしていました。",
    "emotion": "人の胸の奥で、消えそうになりながら残っていた灯りです。",
    "visible": "目に見える光ではありません。けれど、それがある時、人は暗闇でも歩けました。",
    "name": "名前そのものではありません。でも、誰かの名を呼ぶ勇気を支えていたのかもしれません。"
  }
}
```

---

## 16. Mock判定ロジック

API未使用でも以下で判定する。

```text
1. ユーザー質問にキーワードが含まれていれば質問スコアを加点
2. 「未来」「明日」「信じる」「感情」「心」などは高得点
3. 関係ない質問でも物語的な返答を返す
4. 最終回答が answer / keywords / near_answers に近ければ正解
5. ひらがな・カタカナ・全角半角の差はできる範囲で吸収
6. 推理力は完全一致100、near_answers一致85、keywords一致70、それ以外30
```

```ts
function scoreQuestion(question: string): number {
  const q = question.toLowerCase();

  const strong = ["希望", "未来", "明日", "信じ", "前に進", "夢"];
  const medium = ["感情", "心", "記憶", "人", "理由", "朝"];
  const weak = ["光", "暗闇", "世界", "lux"];

  let score = 30;

  if (strong.some((word) => q.includes(word))) score += 45;
  if (medium.some((word) => q.includes(word))) score += 25;
  if (weak.some((word) => q.includes(word))) score += 10;

  return Math.min(score, 100);
}

function calcLightDelta(score: number): number {
  if (score >= 81) return 20;
  if (score >= 61) return 14;
  if (score >= 31) return 8;
  return 3;
}

function judgeFinalAnswer(input: string): {
  isCorrect: boolean;
  similarityScore: number;
} {
  const normalized = input.trim().toLowerCase();

  const exact = ["希望"];
  const near = ["未来を信じる心", "明日への期待", "夢", "生きる理由", "前に進む力"];
  const keywords = ["未来", "明日", "信じる", "期待", "夢"];

  if (exact.some((word) => normalized.includes(word))) {
    return { isCorrect: true, similarityScore: 100 };
  }

  if (near.some((word) => normalized.includes(word))) {
    return { isCorrect: true, similarityScore: 85 };
  }

  if (keywords.some((word) => normalized.includes(word))) {
    return { isCorrect: true, similarityScore: 72 };
  }

  return { isCorrect: false, similarityScore: 35 };
}
```

---

## 17. OpenAI API使用箇所

| タイミング  | 用途        | 必須度 | Mock代替           |
| ------ | --------- | --: | ---------------- |
| ゲーム開始時 | 正解テーマ生成   |   低 | 固定リストから選択        |
| 質問時    | LUXとして応答  |   高 | mock_answersから返す |
| 質問時    | 質問の有効度採点  |   中 | キーワード採点          |
| 最終回答時  | 意味ベース判定   |   高 | near_answers判定   |
| 結果画面   | LUXの言葉を生成 |   中 | 固定コメント           |
| 画像生成   | 背景画像生成    |   低 | CSS背景・グラデーション    |

---

## 18. API設計

### POST `/api/game/start`

| 項目       | 内容                                                                                                        |
| -------- | --------------------------------------------------------------------------------------------------------- |
| 役割       | セッション開始、正解テーマ決定                                                                                           |
| Request  | `{ "mockMode?: boolean" }`                                                                                |
| Response | `{ "sessionId": string, "aiName": "LUX", "openingMessage": string, "questionLimit": 5, "lightGauge": 0 }` |
| 注意点      | 正解そのものはフロントに返さない                                                                                          |

### POST `/api/game/question`

| 項目       | 内容                                                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 役割       | 質問に対するLUXの言葉、質問スコア、光ゲージ増加量を返す                                                                                                                    |
| Request  | `{ "sessionId": string, "question": string, "history": Message[], "questionCount": number, "lightGauge": number }`                               |
| Response | `{ "aiReply": string, "questionScore": number, "lightDelta": number, "lightGauge": number, "evaluation": string, "remainingQuestions": number }` |
| 注意点      | 正解単語を直接含めない。JSON parse失敗時はMock応答へ切り替える                                                                                                           |

### POST `/api/game/answer`

| 項目       | 内容                                                                                                                                                                                                                                     |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 役割       | 最終回答の判定、スコア、ランク、コメント生成                                                                                                                                                                                                                 |
| Request  | `{ "sessionId": string, "finalAnswer": string, "history": Message[], "questionScores": number[], "lightGauge": number }`                                                                                                               |
| Response | `{ "isCorrect": boolean, "similarityScore": number, "trueAnswer": string, "rank": string, "title": string, "resultMessage": string, "aiComment": string, "questionPower": number, "reasoningPower": number, "lightRecovery": number }` |
| 注意点      | 結果画面では正解表示のため trueAnswer を返してよい                                                                                                                                                                                                        |

---

## 19. OpenAI用プロンプト

### 生成用プロンプト

```text
あなたはWebゲーム「Lost Light」のゲームマスターです。

「光」をテーマに、プレイヤーが5回の質問で推理できる抽象的な正解を1つ作ってください。

条件:
- 正解は日本語の短い名詞
- 例: 希望、記憶、声、約束、夢、名前
- 3〜5分で遊べる内容
- 暗いが美しい物語に合うこと
- ヒントを5つ作ること
- 理不尽な正解にしないこと
- UI上でAIらしさを強調しないため、言葉は自然で詩的にすること
- 技術用語、AI用語、チャットボット風の表現は避けること

出力は必ずJSONのみ。
Markdownは禁止。

JSON形式:
{
  "answer": string,
  "theme": string,
  "story": string,
  "hidden_facts": string[],
  "keywords": string[],
  "near_answers": string[]
}
```

### 応答用プロンプト

```text
あなたは「Lost Light」というゲーム内の存在 LUX です。

世界から失われた光の正体は「{{answer}}」です。
正解の意味は「{{theme}}」です。

ただし、絶対に正解単語「{{answer}}」を直接言ってはいけません。

ユーザーは5回だけ問いかけることができます。
あなたは機械的なAIアシスタントではありません。
記憶の奥に灯りを残した、静かな存在として答えてください。

ユーザーの質問:
{{question}}

これまでの記録:
{{history}}

現在の質問回数:
{{questionCount}} / 5

現在の光ゲージ:
{{lightGauge}}

役割:
1. ユーザーの問いに、詩的かつ断片的に答える
2. 正解に近い問いなら、少し具体的な手がかりを出す
3. 正解から遠い問いなら、曖昧だが美しい記憶として答える
4. 質問の有効度を0〜100で採点する
5. lightDeltaを3、8、14、20のいずれかで返す

文体:
- 静か
- やさしい
- 少し寂しい
- 希望が残る
- 人間味がある

禁止:
- 「私はAIです」と言う
- 「生成しました」と言う
- 「データ」「モデル」「プロンプト」「システム」などの技術語を使う
- チャットボットのような事務的回答にする
- 正解単語を直接出す

制約:
- aiReplyは120文字以内
- ホラーにしすぎない
- 日本語で返す
- 出力は必ずJSONのみ
- Markdownは禁止

返却JSON:
{
  "aiReply": string,
  "questionScore": number,
  "lightDelta": number,
  "evaluation": string
}
```

### 判定用プロンプト

```text
あなたは「Lost Light」の最終判定を行います。

正解は「{{answer}}」です。
正解の意味は「{{theme}}」です。

ユーザーの最後の推理:
{{finalAnswer}}

これまでの記録:
{{history}}

質問スコア:
{{questionScores}}

光ゲージ:
{{lightGauge}}

判定基準:
- 完全一致でなくても、意味が近ければ正解
- 比喩的に近い回答も評価する
- 理不尽な不正解にしない
- 全く関係ない回答は不正解
- similarityScoreは0〜100
- rankは総合評価で決める

文体:
- 結果コメントは物語的にする
- AIっぽい技術用語は使わない
- 「判定AI」「解析」「モデル」などと言わない

出力は必ずJSONのみ。
Markdownは禁止。

返却JSON:
{
  "isCorrect": boolean,
  "similarityScore": number,
  "trueAnswer": string,
  "rank": "S" | "A" | "B" | "C" | "D",
  "title": string,
  "resultMessage": string,
  "aiComment": string,
  "reason": string,
  "questionPower": number,
  "reasoningPower": number,
  "lightRecovery": number
}
```

---

## 20. Supabase設計

Supabaseは必須ではない。
環境変数がある場合のみ保存し、未接続ならLocalStorageのみで動かす。

```sql
create table if not exists game_sessions (
  id uuid primary key default gen_random_uuid(),
  answer text,
  theme text,
  light_gauge integer default 0,
  question_count integer default 0,
  is_completed boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists game_logs (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references game_sessions(id) on delete cascade,
  role text check (role in ('user', 'assistant', 'system')),
  content text not null,
  score integer,
  created_at timestamp with time zone default now()
);

create table if not exists results (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references game_sessions(id) on delete cascade,
  final_answer text,
  true_answer text,
  is_correct boolean,
  rank text,
  total_score integer,
  title text,
  created_at timestamp with time zone default now()
);
```

保存ルール:

```text
Supabase接続あり:
- game_sessionsに開始情報を保存
- game_logsに質問とLUXの返答を保存
- resultsに最終結果を保存

Supabase接続なし:
- エラーにしない
- LocalStorageに保存
- UI上は通常プレイを継続
```

---

## 21. LocalStorage設計

### Key

```text
lost-light-current-session
lost-light-last-result
lost-light-history
```

### 保存JSON

```json
{
  "sessionId": "local-1700000000000",
  "phase": "playing",
  "aiName": "LUX",
  "answerId": "mock-case-001",
  "questionLimit": 5,
  "questionCount": 2,
  "lightGauge": 36,
  "history": [
    {
      "role": "user",
      "content": "それは目に見えるものですか？"
    },
    {
      "role": "assistant",
      "content": "目に見える光ではありません。けれど、それがある時、人は暗闇でも歩けました。"
    }
  ],
  "questionScores": [72, 80],
  "createdAt": "2026-06-15T00:00:00.000Z"
}
```

---

## 22. 状態管理

```ts
type GamePhase =
  | "title"
  | "howto"
  | "prologue"
  | "loading"
  | "playing"
  | "finalAnswer"
  | "result";

type Role = "user" | "assistant" | "system";

type Message = {
  role: Role;
  content: string;
};

type GameAnswer = {
  id: string;
  answer: string;
  theme: string;
  story: string;
  hidden_facts: string[];
  keywords: string[];
  near_answers: string[];
};

type QuestionResult = {
  aiReply: string;
  questionScore: number;
  lightDelta: number;
  lightGauge: number;
  evaluation: string;
  remainingQuestions: number;
};

type FinalResult = {
  isCorrect: boolean;
  similarityScore: number;
  trueAnswer: string;
  rank: "S" | "A" | "B" | "C" | "D";
  title: string;
  resultMessage: string;
  aiComment: string;
  reason: string;
  questionPower: number;
  reasoningPower: number;
  lightRecovery: number;
  totalScore: number;
};

type GameState = {
  phase: GamePhase;
  sessionId: string | null;
  aiName: "LUX";
  questionLimit: 5;
  questionCount: number;
  lightGauge: number;
  history: Message[];
  questionScores: number[];
  finalResult: FinalResult | null;
  isMockMode: boolean;
  isLoading: boolean;
  errorMessage: string | null;
};
```

---

## 23. 画像生成指定

`gen-image.mjs` で生成する画像。
AIっぽすぎる見た目を避けるため、**サイバー感よりも静かな物語感、灯り、手描き感、古い記録感**を優先する。
画像生成に失敗してもCSSグラデーションとプレースホルダで動作させる。

| 用途     | 保存先                                   | サイズ       | 形式  | 優先度 | プロンプト                                                                                                                                                                                                                                                                                     |
| ------ | ------------------------------------- | --------- | --- | --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| タイトル背景 | `public/images/title-bg.png`          | 1536x864  | png | A   | `quiet dark fantasy web game background, a small broken lantern glowing faintly in the center, deep night landscape, soft cyan and warm candle light, subtle dust particles, poetic atmosphere, hand-crafted storybook feeling, not futuristic UI, no text, no logo, web game background` |
| ゲーム背景  | `public/images/game-bg.png`           | 1536x864  | png | A   | `silent night room with old records and a faint glowing lantern, soft shadows, deep navy and black, small floating light particles, emotional story game atmosphere, empty center area for UI cards, not cyberpunk, no text, no logo, web game background`                                |
| 結果成功背景 | `public/images/result-success-bg.png` | 1536x864  | png | B   | `dawn light returning to a dark world, warm golden light spreading gently, hopeful quiet atmosphere, soft particles, emotional fantasy story ending, no text, no logo, web game background`                                                                                               |
| 結果失敗背景 | `public/images/result-fail-bg.png`    | 1536x864  | png | B   | `faint blue light fading in a silent dark world, lonely lantern almost extinguished, melancholic but gentle atmosphere, soft painterly style, no text, no logo, web game background`                                                                                                      |
| LUX    | `public/images/lux-lantern.png`       | 1024x1024 | png | A   | `small mysterious lantern containing a soft living light, cracked glass, gentle cyan glow, floating dust, emotional fantasy object, centered composition, not robot, not chatbot, no text, no logo, transparent background`                                                               |
| 光の欠片   | `public/images/light-fragment.png`    | 512x512   | png | C   | `small glowing light fragment, warm cyan and gold, simple fantasy UI asset, gentle glow, no text, no logo, transparent background`                                                                                                                                                        |

---

## 24. BGM・音声素材

BGMは任意。
素材がない場合は無音でよい。

推奨配置:

```text
public/audio/bgm.mp3
public/audio/correct.mp3
public/audio/wrong.mp3
public/audio/click.mp3
```

実装ルール:

```text
音声ファイルが存在しない場合は再生しない
再生失敗してもゲーム進行を止めない
初回クリック後にBGM再生する
BGMは静かな環境音やピアノ系にする
電子音や近未来的すぎる音は避ける
音量は控えめにする
```

---

## 25. 動画素材

動画は任意。
素材がない場合は結果カードのみ表示する。

推奨配置:

```text
public/video/correct.mp4
public/video/wrong.mp4
```

実装ルール:

```text
動画が存在しない場合はCSSアニメーションに切り替える
正解時は夜明けのように背景を明るくする
不正解時は灯りが小さく揺れて消えかける演出にする
動画読み込み失敗で画面を止めない
```

---

## 26. エラー処理

| エラー            | 対応                   |
| -------------- | -------------------- |
| OpenAI APIキーなし | Mock Modeに切り替える      |
| OpenAI API失敗   | Mock応答を返し、ゲームを継続     |
| Supabase未接続    | LocalStorage保存に切り替える |
| 画像未生成          | CSSグラデーション背景を表示      |
| BGMなし          | 無音で継続                |
| 動画なし           | 結果カードとCSS演出のみ表示      |
| JSON parse失敗   | Mock JSONを返す         |
| 入力が空           | 「問いを入力してください」と表示     |
| 入力が長すぎる        | 200文字以内に制限           |
| 5回以上質問         | 最後の推理画面へ誘導           |
| LocalStorage失敗 | 保存なしで継続              |

---

## 27. セキュリティ要件

```text
OPENAI_API_KEY はサーバー側のみで使用する
クライアントにAPIキーを渡さない
.env* をGitに含めない
Supabase service_roleキーをクライアントで使わない
正解情報を不要なタイミングでフロントに返さない
最終結果表示時のみ trueAnswer を返す
入力文字数制限を行う
ユーザー入力はHTMLとして直接描画しない
dangerouslySetInnerHTMLを使わない
APIレスポンスのJSON schemaを検証する
```

---

## 28. 環境変数

未設定でもMock Modeで動く。

```env
OPENAI_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_FORCE_MOCK_MODE=false
```

判定ルール:

```text
OPENAI_API_KEY が空ならLUXの応答はMock
Supabase URLまたはANON KEYが空ならDB保存はLocalStorage
NEXT_PUBLIC_FORCE_MOCK_MODE=true なら常にMock
```

---

## 29. package.json scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "gen:image": "node gen-image.mjs"
  }
}
```

---

## 30. ディレクトリ構成

```text
lost-light/
├─ app/
│  ├─ api/
│  │  └─ game/
│  │     ├─ start/
│  │     │  └─ route.ts
│  │     ├─ question/
│  │     │  └─ route.ts
│  │     └─ answer/
│  │        └─ route.ts
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ TitleScreen.tsx
│  ├─ HowToScreen.tsx
│  ├─ PrologueScreen.tsx
│  ├─ GameScreen.tsx
│  ├─ FinalAnswerScreen.tsx
│  ├─ ResultScreen.tsx
│  ├─ LightGauge.tsx
│  ├─ LuxLantern.tsx
│  └─ MemoryLog.tsx
├─ lib/
│  ├─ mock/
│  │  ├─ answers.ts
│  │  ├─ replies.ts
│  │  └─ judge.ts
│  ├─ openai.ts
│  ├─ supabase.ts
│  ├─ storage.ts
│  ├─ scoring.ts
│  └─ types.ts
├─ public/
│  ├─ images/
│  │  ├─ title-bg.png
│  │  ├─ game-bg.png
│  │  ├─ result-success-bg.png
│  │  ├─ result-fail-bg.png
│  │  ├─ lux-lantern.png
│  │  └─ light-fragment.png
│  ├─ audio/
│  │  ├─ bgm.mp3
│  │  ├─ correct.mp3
│  │  └─ wrong.mp3
│  └─ video/
│     ├─ correct.mp4
│     └─ wrong.mp4
├─ gen-image.mjs
├─ package.json
├─ tailwind.config.ts
├─ tsconfig.json
└─ README.md
```

---

## 31. 実装時の重要ルール

```text
まずMock Modeで完成させる
APIキーなしでビルド成功させる
Supabaseなしで1プレイ完結させる
画像がなくてもUIが壊れない
npm run build を最優先
45秒以内にゲーム開始
正解情報をフロントに不要に持たせない
最初からログイン・ランキングを作らない
APIのJSON parse失敗を必ずcatchする
入力欄は200文字以内にする
UIにAIっぽい技術用語を出さない
チャットボット風ではなく物語カード風にする
LUXをロボットではなく灯りとして表現する
```

---

## 32. 3時間ハッカソン想定の開発順

```text
0:00〜0:30
- Next.js / Tailwind初期構築
- タイトル、遊び方、プロローグ画面を作る
- GamePhaseの状態管理を作る

0:30〜1:00
- Mock正解データを作る
- 質問画面、記憶ログ、入力欄を作る
- 5回質問制限を実装する

1:00〜1:30
- Mock質問応答ロジックを作る
- 質問スコア、lightDelta、光ゲージを実装する
- LUXの灯り演出をCSSで作る

1:30〜2:00
- 最終回答画面を作る
- Mock判定ロジックを作る
- 結果画面、ランク、称号を表示する

2:00〜2:30
- OpenAI API Routeを追加する
- API失敗時のMock fallbackを実装する
- LocalStorage保存を追加する

2:30〜3:00
- スマホ表示調整
- AIっぽいUI文言を削る
- npm run build確認
- Vercelデプロイ確認
- デモ用のプレイ導線を確認する
```

---

## 33. 発表用説明文

Lost Lightは、「光」を単なる明るさではなく、希望・記憶・感情の象徴として扱った推理ゲームです。

プレイヤーは、記憶の奥に灯りを残した存在「LUX」に5回だけ問いかけます。
LUXの返す断片的な言葉から、世界から失われた光の正体を推理します。

AIは裏側で、問いへの応答、問いの深さの採点、最後の推理判定を行っています。
ただしUIではAIチャットらしさを出さず、暗闇の中で記憶をたどる物語体験として設計しました。

APIキーがなくてもMock Modeで最初から最後まで遊べるため、Vercel上でも安定してデモできます。

---

## 34. 受け入れ条件

```text
[ ] npm run build が成功する
[ ] APIキーなしで動く
[ ] Supabaseなしで動く
[ ] タイトル画面から開始できる
[ ] 遊び方を表示できる
[ ] プロローグを表示できる
[ ] 5回まで質問できる
[ ] LUXの返答が表示される
[ ] 光ゲージが増える
[ ] 最終回答を入力できる
[ ] 結果表示できる
[ ] ランクと称号が表示される
[ ] LocalStorageに結果保存できる
[ ] スマホで崩れない
[ ] GitHubにpushできる
[ ] Vercelで表示できる
[ ] 45秒以内にコア体験へ入れる
[ ] UI上にAIチャット感が強く出ていない
[ ] 技術用語ではなく物語的な文言になっている
```

---

## 35. 最終ゴール

審査員がURLを開いたら、すぐに暗い世界へ入り、LUXに5回問いかけ、失われた光の正体を推理できること。

AIを使っているが、見た目はAIチャットではなく、
**静かな物語の中で灯りを取り戻すWebゲーム**として体験できること。

```
```
