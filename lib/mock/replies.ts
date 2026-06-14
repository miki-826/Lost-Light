const MOCK_REPLIES: Record<string, string> = {
  default:
    "……遠くで、小さな灯りが揺れています。それは、誰かを前へ進ませるものでした。",
  future:
    "はい。まだ来ていない朝を、それでも待とうとする心に近いものです。",
  memory:
    "記憶とも少しつながっています。けれど、それは過去よりも、これからを照らしていました。",
  emotion: "人の胸の奥で、消えそうになりながら残っていた灯りです。",
  visible:
    "目に見える光ではありません。けれど、それがある時、人は暗闇でも歩けました。",
  name: "名前そのものではありません。でも、誰かの名を呼ぶ勇気を支えていたのかもしれません。",
};

const ROUTES: { key: keyof typeof MOCK_REPLIES; words: string[] }[] = [
  { key: "future", words: ["未来", "明日", "これから", "先", "信じ", "夢", "希望"] },
  { key: "memory", words: ["記憶", "過去", "思い出", "昔", "覚え"] },
  { key: "emotion", words: ["感情", "心", "気持ち", "愛", "悲し", "うれし", "想い"] },
  { key: "visible", words: ["見える", "見え", "色", "形", "姿", "物", "もの"] },
  { key: "name", words: ["名前", "呼", "誰", "人", "名"] },
];

export function pickMockReply(question: string): string {
  const q = question.toLowerCase();
  for (const route of ROUTES) {
    if (route.words.some((w) => q.includes(w.toLowerCase()))) {
      return MOCK_REPLIES[route.key];
    }
  }
  return MOCK_REPLIES.default;
}

export const MOCK_RESULT_COMMENTS = {
  correct:
    "ありがとう。あなたの問いが、消えかけた灯りをもう一度ともしてくれました。夜は、明けます。",
  near: "惜しいところまで来ていました。あなたの言葉は、確かに光のそばに触れていました。",
  wrong:
    "見つけられなくても、あなたが問いかけてくれたこと。それだけで、わたしの灯りは少し温かくなりました。",
};
