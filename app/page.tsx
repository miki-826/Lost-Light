"use client";
import { useState } from "react";
import { Bgm } from "@/components/Bgm";
import { TitleScreen } from "@/components/TitleScreen";
import { HowToScreen } from "@/components/HowToScreen";
import { PrologueScreen } from "@/components/PrologueScreen";
import { GameScreen } from "@/components/GameScreen";
import { FinalAnswerScreen } from "@/components/FinalAnswerScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { saveResult, saveSession } from "@/lib/storage";
import type {
  FinalResult,
  GamePhase,
  Message,
  QuestionResult,
  StartResult,
} from "@/lib/types";

const QUESTION_LIMIT = 5;

export default function Home() {
  const [phase, setPhase] = useState<GamePhase>("title");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [history, setHistory] = useState<Message[]>([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [questionScores, setQuestionScores] = useState<number[]>([]);
  const [lightGauge, setLightGauge] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isMockMode, setIsMockMode] = useState(false);
  const [finalResult, setFinalResult] = useState<FinalResult | null>(null);
  const [yourAnswer, setYourAnswer] = useState("");

  const reset = () => {
    setSessionId(null);
    setHistory([]);
    setQuestionCount(0);
    setQuestionScores([]);
    setLightGauge(0);
    setFinalResult(null);
    setYourAnswer("");
  };

  const persist = (next: Partial<{
    phase: GamePhase;
    history: Message[];
    questionCount: number;
    questionScores: number[];
    lightGauge: number;
    sessionId: string;
  }>) => {
    saveSession({
      sessionId: next.sessionId ?? sessionId ?? `local-${Date.now()}`,
      phase: next.phase ?? phase,
      aiName: "LUX",
      answerId: "mock-case-001",
      questionLimit: QUESTION_LIMIT,
      questionCount: next.questionCount ?? questionCount,
      lightGauge: next.lightGauge ?? lightGauge,
      history: next.history ?? history,
      questionScores: next.questionScores ?? questionScores,
      createdAt: new Date().toISOString(),
    });
  };

  const beginGame = async () => {
    reset();
    setPhase("loading");
    try {
      const res = await fetch("/api/game/start", { method: "POST" });
      const data = (await res.json()) as StartResult & { mockMode?: boolean };
      setSessionId(data.sessionId);
      setIsMockMode(!!data.mockMode);
      const opening: Message = { role: "assistant", content: data.openingMessage };
      setHistory([opening]);
      setPhase("playing");
      persist({ phase: "playing", sessionId: data.sessionId, history: [opening] });
    } catch {
      // start が失敗してもローカルで開始する
      const local = `local-${Date.now()}`;
      setSessionId(local);
      setIsMockMode(true);
      setHistory([]);
      setPhase("playing");
    }
  };

  const ask = async (question: string) => {
    const withUser: Message = { role: "user", content: question };
    const baseHistory = [...history, withUser];
    setHistory(baseHistory);
    setIsLoading(true);
    try {
      const res = await fetch("/api/game/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          question,
          history,
          questionCount,
          lightGauge,
        }),
      });
      const data = (await res.json()) as QuestionResult;
      const reply: Message = { role: "assistant", content: data.aiReply };
      const newHistory = [...baseHistory, reply];
      const newCount = questionCount + 1;
      const newScores = [...questionScores, data.questionScore];
      setHistory(newHistory);
      setQuestionCount(newCount);
      setQuestionScores(newScores);
      setLightGauge(data.lightGauge);
      persist({
        history: newHistory,
        questionCount: newCount,
        questionScores: newScores,
        lightGauge: data.lightGauge,
      });
      if (newCount >= QUESTION_LIMIT) {
        setTimeout(() => setPhase("finalAnswer"), 900);
      }
    } catch {
      const reply: Message = {
        role: "assistant",
        content: "……記憶が、少し霞んでいます。もう一度、問いかけてください。",
      };
      setHistory([...baseHistory, reply]);
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async (answer: string) => {
    setYourAnswer(answer);
    setIsLoading(true);
    setPhase("loading");
    try {
      const res = await fetch("/api/game/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          finalAnswer: answer,
          history,
          questionScores,
          lightGauge,
        }),
      });
      const data = (await res.json()) as FinalResult;
      setFinalResult(data);
      setPhase("result");
      await saveResult(data, {
        sessionId: sessionId ?? `local-${Date.now()}`,
        finalAnswer: answer,
      });
    } catch {
      setPhase("finalAnswer");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-[100dvh]">
      <Bgm />

      {phase === "title" && (
        <TitleScreen onStart={beginGame} onHowTo={() => setPhase("howto")} />
      )}

      {phase === "howto" && <HowToScreen onBack={() => setPhase("title")} />}

      {phase === "prologue" && (
        <PrologueScreen onBegin={beginGame} />
      )}

      {phase === "loading" && (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4">
          <div className="h-3 w-3 animate-ping rounded-full bg-cyan-quiet" />
          <p className="font-serif tracking-widest text-mist animate-pulse">
            LUX が記憶を探しています…
          </p>
        </div>
      )}

      {phase === "playing" && (
        <GameScreen
          history={history}
          lightGauge={lightGauge}
          questionCount={questionCount}
          questionLimit={QUESTION_LIMIT}
          isLoading={isLoading}
          isMockMode={isMockMode}
          onAsk={ask}
        />
      )}

      {phase === "finalAnswer" && (
        <FinalAnswerScreen
          lightGauge={lightGauge}
          isLoading={isLoading}
          onSubmit={submitAnswer}
        />
      )}

      {phase === "result" && finalResult && (
        <ResultScreen
          result={finalResult}
          yourAnswer={yourAnswer}
          onRetry={beginGame}
          onTitle={() => {
            reset();
            setPhase("title");
          }}
        />
      )}
    </main>
  );
}
