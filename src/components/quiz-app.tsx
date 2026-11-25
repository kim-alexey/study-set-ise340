import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpen, Moon, RotateCcw, Shuffle, Sun } from "lucide-react";
import {
  QUESTIONS,
  questionById,
  shuffleQuestions,
  type Letter,
  type Question,
} from "@/data/questions";

type Mode = "learn" | "exam";

type Session = {
  order: string[];
  index: number;
  picks: Record<string, Letter>;
  revealed: boolean;
  mode: Mode;
  label: string;
};

type Memory = {
  everCorrect: string[];
  stillMissed: string[];
  last?: { correct: number; total: number; mode: Mode; at: string };
};

const MEMORY_KEY = "ise340-memory-v1";
const SESSION_KEY = "ise340-session-v1";
const THEME_KEY = "ise340-theme";

const emptyMemory = (): Memory => ({ everCorrect: [], stillMissed: [] });

function loadMemory(): Memory {
  try {
    const raw = localStorage.getItem(MEMORY_KEY);
    if (!raw) return emptyMemory();
    const parsed = JSON.parse(raw) as Memory;
    return {
      everCorrect: parsed.everCorrect ?? [],
      stillMissed: parsed.stillMissed ?? [],
      last: parsed.last,
    };
  } catch {
    return emptyMemory();
  }
}

function saveMemory(memory: Memory) {
  localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
}

function loadSession(): Session | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Session;
    if (!parsed.order?.length) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveSession(session: Session | null) {
  if (!session) {
    sessionStorage.removeItem(SESSION_KEY);
    return;
  }
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function applyResults(memory: Memory, order: string[], picks: Record<string, Letter>): Memory {
  const ever = new Set(memory.everCorrect);
  const missed = new Set(memory.stillMissed);
  let correct = 0;
  for (const id of order) {
    const question = questionById(id);
    const pick = picks[id];
    if (!question || !pick) continue;
    if (pick === question.answer) {
      correct += 1;
      ever.add(id);
      missed.delete(id);
    } else {
      missed.add(id);
    }
  }
  return {
    everCorrect: [...ever],
    stillMissed: [...missed],
    last: {
      correct,
      total: order.length,
      mode: memory.last?.mode ?? "learn",
      at: new Date().toISOString(),
    },
  };
}

export function QuizApp() {
  const [memory, setMemory] = useState<Memory>(emptyMemory);
  const [hydrated, setHydrated] = useState(false);
  const [resume, setResume] = useState<Session | null>(null);
  const [mode, setMode] = useState<Mode>("learn");
  const [session, setSession] = useState<Session | null>(null);
  const [done, setDone] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setMemory(loadMemory());
    setResume(loadSession());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveSession(session && !done ? session : null);
  }, [session, done, hydrated]);

  const deck = useMemo(() => {
    if (!session) return [];
    return session.order
      .map((id) => questionById(id))
      .filter((item): item is Question => Boolean(item));
  }, [session]);

  const current = session ? deck[session.index] : undefined;
  const total = deck.length;
  const answeredCount = session ? Object.keys(session.picks).length : 0;

  function start(source: Question[], label: string, nextMode: Mode = mode) {
    const order = shuffleQuestions(source).map((item) => item.id);
    setDone(false);
    setShowAll(false);
    setSession({
      order,
      index: 0,
      picks: {},
      revealed: false,
      mode: nextMode,
      label,
    });
  }

  function finish(next: Session) {
    const updated = applyResults(memory, next.order, next.picks);
    updated.last = {
      correct: next.order.filter((id) => questionById(id)?.answer === next.picks[id]).length,
      total: next.order.length,
      mode: next.mode,
      at: new Date().toISOString(),
    };
    setMemory(updated);
    saveMemory(updated);
    setSession(next);
    setDone(true);
    saveSession(null);
  }

  function choose(letter: Letter) {
    if (!session || !current || done) return;
    if (session.mode === "learn" && session.revealed) return;
    const picks = { ...session.picks, [current.id]: letter };
    const next = { ...session, picks, revealed: session.mode === "learn" };
    setSession(next);
  }

  function goNext() {
    if (!session || !current) return;
    if (!session.picks[current.id]) return;
    if (session.index >= total - 1) {
      finish({ ...session, revealed: false });
      return;
    }
    setSession({
      ...session,
      index: session.index + 1,
      revealed: false,
    });
  }

  function quit() {
    setSession(null);
    setDone(false);
    saveSession(null);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!session || done || !current) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      const key = event.key.toUpperCase();
      if (["A", "B", "C", "D", "E"].includes(key)) {
        const letter = key as Letter;
        if (current.choices.some((choice) => choice.letter === letter)) {
          choose(letter);
        }
      }
      if (event.key === "Enter") {
        const picked = session.picks[current.id];
        if (picked && (session.mode === "exam" || session.revealed)) goNext();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // choose/goNext close over latest session; rebinding each render is intended.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  if (!session) {
    return (
      <Home
        hydrated={hydrated}
        memory={memory}
        resume={resume}
        mode={mode}
        onMode={setMode}
        onStartAll={() => start(QUESTIONS, "Full set")}
        onStartMissed={() => {
          const missed = memory.stillMissed
            .map((id) => questionById(id))
            .filter((item): item is Question => Boolean(item));
          if (missed.length) start(missed, "Missed only");
        }}
        onResume={() => {
          if (!resume) return;
          setMode(resume.mode);
          setSession(resume);
          setDone(false);
        }}
        onClearMemory={() => {
          const blank = emptyMemory();
          setMemory(blank);
          saveMemory(blank);
        }}
      />
    );
  }

  if (done) {
    return (
      <Results
        session={session}
        deck={deck}
        showAll={showAll}
        onToggleAll={() => setShowAll((value) => !value)}
        onAgain={() => {
          const source = session.order
            .map((id) => questionById(id))
            .filter((item): item is Question => Boolean(item));
          start(source, session.label, session.mode);
        }}
        onMissed={() => {
          const missed = session.order
            .filter((id) => questionById(id)?.answer !== session.picks[id])
            .map((id) => questionById(id))
            .filter((item): item is Question => Boolean(item));
          if (missed.length) start(missed, "Missed only", session.mode);
        }}
        onHome={quit}
      />
    );
  }

  if (!current) return null;

  const pick = session.picks[current.id];
  const revealed = session.mode === "learn" && session.revealed;
  const correct = pick === current.answer;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-widest text-stamp uppercase">ISE 340</p>
          <p className="text-sm text-muted">
            {session.label} · {session.mode === "learn" ? "Learn" : "Exam"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={quit}
            className="min-h-11 rounded-full border border-line bg-sheet px-4 text-sm font-medium text-ink"
          >
            End
          </button>
        </div>
      </header>

      <div className="mb-6">
        <div className="mb-2 flex items-baseline justify-between text-sm text-muted">
          <span>
            Question {session.index + 1} of {total}
          </span>
          <span>{answeredCount} answered</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-line">
          <div
            className="h-full bg-stamp transition-all"
            style={{ width: `${((session.index + (pick ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
      </div>

      <article className="rounded-card border border-line bg-sheet p-5 shadow-sm sm:p-8">
        <p className="mb-4 text-sm text-muted">{current.asked}</p>
        <h1 className="font-serif text-2xl leading-snug font-medium text-ink sm:text-3xl">
          {current.prompt}
        </h1>
        <ul className="mt-6 flex flex-col gap-3">
          {current.choices.map((choice) => {
            const selected = pick === choice.letter;
            const isAnswer = choice.letter === current.answer;
            let tone = "border-line bg-paper text-ink";
            if (revealed && isAnswer) tone = "border-good bg-good-soft text-ink";
            else if (revealed && selected && !isAnswer) tone = "border-bad bg-bad-soft text-ink";
            else if (selected) tone = "border-ink bg-ink text-sheet";
            return (
              <li key={choice.letter}>
                <button
                  type="button"
                  onClick={() => choose(choice.letter)}
                  disabled={revealed}
                  className={`flex min-h-11 w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${tone}`}
                >
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-current text-sm font-semibold">
                    {choice.letter}
                  </span>
                  <span className="pt-0.5 text-base leading-normal">{choice.text}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {revealed && (
          <p className={`mt-5 text-base font-medium ${correct ? "text-good" : "text-bad"}`}>
            {correct
              ? `Correct. Answer ${current.answer}.`
              : `Not quite. Correct answer: ${current.answer}.`}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">Keys A–{current.choices.at(-1)?.letter}. Enter for next.</p>
          <button
            type="button"
            onClick={goNext}
            disabled={!pick || (session.mode === "learn" && !revealed)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-stamp px-5 text-sm font-semibold text-stamp-ink disabled:opacity-40"
          >
            {session.index === total - 1 ? "See results" : "Next question"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </article>
    </main>
  );
}

function Home({
  hydrated,
  memory,
  resume,
  mode,
  onMode,
  onStartAll,
  onStartMissed,
  onResume,
  onClearMemory,
}: {
  hydrated: boolean;
  memory: Memory;
  resume: Session | null;
  mode: Mode;
  onMode: (mode: Mode) => void;
  onStartAll: () => void;
  onStartMissed: () => void;
  onResume: () => void;
  onClearMemory: () => void;
}) {
  const mastered = memory.everCorrect.length;
  const missed = memory.stillMissed.length;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-8 sm:px-6 sm:py-14">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold tracking-widest text-stamp uppercase">Stony Brook · ISE 340</p>
        <ThemeToggle />
      </div>
      <h1 className="mt-3 max-w-xl font-serif text-4xl leading-tight font-medium text-ink sm:text-5xl">
        Class questions, shuffled. Same wording as the packet.
      </h1>
      <p className="mt-4 max-w-xl text-base leading-normal text-muted">
        {QUESTIONS.length} questions from August 25 through November 19. Choices stay in
        A–E order so the letters match the answer key. Two items are repeated in the
        original packet, so they appear twice here too.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Stat label="In the set" value={String(QUESTIONS.length)} />
        <Stat label="Gotten right once" value={hydrated ? String(mastered) : "—"} />
        <Stat label="Still missed" value={hydrated ? String(missed) : "—"} />
      </div>

      <fieldset className="mt-8">
        <legend className="text-sm font-medium text-ink">How to run it</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <ModeCard
            active={mode === "learn"}
            title="Learn"
            body="See the correct letter right after you answer."
            onClick={() => onMode("learn")}
          />
          <ModeCard
            active={mode === "exam"}
            title="Exam"
            body="No answers until you finish the whole set."
            onClick={() => onMode("exam")}
          />
        </div>
      </fieldset>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={onStartAll}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-stamp px-6 text-base font-semibold text-stamp-ink"
        >
          <Shuffle className="size-4" aria-hidden="true" />
          Shuffle all {QUESTIONS.length}
        </button>
        {hydrated && resume && (
          <button
            type="button"
            onClick={onResume}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line bg-sheet px-6 text-base font-semibold text-ink"
          >
            <BookOpen className="size-4" aria-hidden="true" />
            Resume question {resume.index + 1} of {resume.order.length}
          </button>
        )}
        <button
          type="button"
          onClick={onStartMissed}
          disabled={!hydrated || missed === 0}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line bg-sheet px-6 text-base font-semibold text-ink disabled:opacity-40"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Retry missed only{hydrated && missed ? ` (${missed})` : ""}
        </button>
      </div>

      {hydrated && memory.last && (
        <p className="mt-6 text-sm text-muted">
          Last run: {memory.last.correct} / {memory.last.total} in {memory.last.mode} mode.
          {mastered > 0 && (
            <button type="button" onClick={onClearMemory} className="ml-3 underline">
              Reset progress
            </button>
          )}
        </p>
      )}
    </main>
  );
}

function Results({
  session,
  deck,
  showAll,
  onToggleAll,
  onAgain,
  onMissed,
  onHome,
}: {
  session: Session;
  deck: Question[];
  showAll: boolean;
  onToggleAll: () => void;
  onAgain: () => void;
  onMissed: () => void;
  onHome: () => void;
}) {
  const rows = deck.map((question) => ({
    question,
    pick: session.picks[question.id],
    ok: session.picks[question.id] === question.answer,
  }));
  const correct = rows.filter((row) => row.ok).length;
  const missed = rows.filter((row) => !row.ok);
  const visible = showAll ? rows : missed;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold tracking-widest text-stamp uppercase">Results · {session.label}</p>
        <ThemeToggle />
      </div>
      <h1 className="mt-3 font-serif text-4xl leading-tight font-medium text-ink">
        {correct} / {rows.length}
      </h1>
      <p className="mt-2 text-base text-muted">
        {missed.length === 0
          ? "Clean run. Shuffle again if you want the order to feel new."
          : `${missed.length} still need another pass. The correct letter is next to each one.`}
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onAgain}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-stamp px-5 text-sm font-semibold text-stamp-ink"
        >
          <Shuffle className="size-4" aria-hidden="true" />
          Shuffle this set again
        </button>
        <button
          type="button"
          onClick={onMissed}
          disabled={missed.length === 0}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-sheet px-5 text-sm font-semibold text-ink disabled:opacity-40"
        >
          Retry missed
        </button>
        <button
          type="button"
          onClick={onHome}
          className="inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-ink"
        >
          Home
        </button>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">
          {showAll ? "Every question" : "Missed"}
        </h2>
        <button type="button" onClick={onToggleAll} className="min-h-11 text-sm font-medium text-stamp underline">
          {showAll ? "Only missed" : "Show all"}
        </button>
      </div>

      <ul className="mt-3 flex flex-col gap-3 pb-10">
        {visible.length === 0 && (
          <li className="rounded-2xl border border-line bg-sheet p-4 text-sm text-muted">Nothing missed.</li>
        )}
        {visible.map(({ question, pick, ok }) => (
          <li key={question.id} className="rounded-2xl border border-line bg-sheet p-4">
            <p className="text-xs text-muted">{question.asked}</p>
            <p className="mt-1 font-serif text-lg leading-snug text-ink">{question.prompt}</p>
            <p className={`mt-2 text-sm font-medium ${ok ? "text-good" : "text-bad"}`}>
              {ok ? "Correct" : `Your answer: ${pick ?? "—"}`}
              {" · "}
              Correct answer: {question.answer}
            </p>
            <p className="mt-1 text-sm leading-normal text-muted">
              {question.answer}) {question.choices.find((choice) => choice.letter === question.answer)?.text}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}


function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-full border border-line bg-sheet px-3 text-ink"
    >
      {dark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
      <span className="pr-1 text-sm font-medium">{dark ? "Light" : "Dark"}</span>
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-sheet px-4 py-3">
      <p className="text-xs tracking-wide text-muted uppercase">{label}</p>
      <p className="mt-1 font-serif text-3xl text-ink">{value}</p>
    </div>
  );
}

function ModeCard({
  active,
  title,
  body,
  onClick,
}: {
  active: boolean;
  title: string;
  body: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-11 rounded-2xl border px-4 py-4 text-left ${
        active ? "border-ink bg-ink text-sheet" : "border-line bg-sheet text-ink"
      }`}
    >
      <span className="block text-base font-semibold">{title}</span>
      <span className={`mt-1 block text-sm leading-normal ${active ? "text-sheet" : "text-muted"}`}>{body}</span>
    </button>
  );
}
