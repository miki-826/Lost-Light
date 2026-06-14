import { HAS_SUPABASE, supabase } from "./supabase";
import type { FinalResult, SavedSession } from "@/lib/types";

const KEY_SESSION = "lost-light-current-session";
const KEY_RESULT = "lost-light-last-result";
const KEY_HISTORY = "lost-light-history";

function safeGet(key: string): string | null {
  try {
    return typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    if (typeof window !== "undefined") window.localStorage.setItem(key, value);
  } catch {
    // 保存失敗してもゲームは継続する
  }
}

export function saveSession(session: SavedSession): void {
  safeSet(KEY_SESSION, JSON.stringify(session));
}

export function loadSession(): SavedSession | null {
  const raw = safeGet(KEY_SESSION);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SavedSession;
  } catch {
    return null;
  }
}

export function loadLastResult(): FinalResult | null {
  const raw = safeGet(KEY_RESULT);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as FinalResult;
  } catch {
    return null;
  }
}

export async function saveResult(
  result: FinalResult,
  meta: { sessionId: string; finalAnswer: string }
): Promise<void> {
  safeSet(KEY_RESULT, JSON.stringify(result));

  const raw = safeGet(KEY_HISTORY);
  let history: unknown[] = [];
  try {
    history = raw ? JSON.parse(raw) : [];
  } catch {
    history = [];
  }
  history.push({ ...result, ...meta, savedAt: new Date().toISOString() });
  safeSet(KEY_HISTORY, JSON.stringify(history.slice(-20)));

  if (HAS_SUPABASE && supabase) {
    try {
      await supabase.from("results").insert({
        session_id: meta.sessionId.startsWith("local-") ? null : meta.sessionId,
        final_answer: meta.finalAnswer,
        true_answer: result.trueAnswer,
        is_correct: result.isCorrect,
        rank: result.rank,
        total_score: result.totalScore,
        title: result.title,
      });
    } catch {
      // Supabase保存に失敗してもLocalStorageに保存済みなので継続
    }
  }
}
