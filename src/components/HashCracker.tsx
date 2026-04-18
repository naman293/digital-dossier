import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "@/lib/audio";

const MAX_ATTEMPTS = 8;
const CODE_LENGTH = 4;
const DIGITS = "0123456789";

interface Guess {
  code: string;
  correct: number;
  misplaced: number;
}

function generateSecret(): string {
  let code = "";
  const available = DIGITS.split("");
  for (let i = 0; i < CODE_LENGTH; i++) {
    const idx = Math.floor(Math.random() * available.length);
    code += available[idx];
    available.splice(idx, 1);
  }
  return code;
}

function evaluate(guess: string, secret: string): { correct: number; misplaced: number } {
  let correct = 0;
  let misplaced = 0;
  const secretArr = secret.split("");
  const guessArr = guess.split("");

  const checked = new Array(CODE_LENGTH).fill(false);
  const used = new Array(CODE_LENGTH).fill(false);

  for (let i = 0; i < CODE_LENGTH; i++) {
    if (guessArr[i] === secretArr[i]) {
      correct++;
      checked[i] = true;
      used[i] = true;
    }
  }

  for (let i = 0; i < CODE_LENGTH; i++) {
    if (checked[i]) continue;
    for (let j = 0; j < CODE_LENGTH; j++) {
      if (used[j]) continue;
      if (guessArr[i] === secretArr[j]) {
        misplaced++;
        used[j] = true;
        break;
      }
    }
  }

  return { correct, misplaced };
}

function ScrambleDigit({ char, delay }: { char: string; delay: number }) {
  const [display, setDisplay] = useState("█");
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (settled) return;
    const scrambleChars = "█▓▒░╬╠╣╚╝│┤├┐└┘┌";
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      if (frame > delay) {
        setDisplay(char);
        setSettled(true);
        clearInterval(interval);
      } else {
        setDisplay(scrambleChars[Math.floor(Math.random() * scrambleChars.length)]);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [char, delay, settled]);

  return (
    <span
      style={{
        color: settled ? "oklch(0.65 0.22 18)" : "oklch(0.35 0.08 18)",
        textShadow: settled ? "0 0 10px oklch(0.55 0.22 18 / 50%)" : "none",
        transition: "all 0.3s",
      }}
    >
      {display}
    </span>
  );
}

export default function HashCracker({
  onClose,
  onWin,
}: {
  onClose: () => void;
  onWin: () => void;
}) {
  const [secret, setSecret] = useState(() => generateSecret());
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [gameState, setGameState] = useState<"playing" | "cracked" | "locked">("playing");
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [gameState]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [guesses]);

  const handleSubmit = useCallback(() => {
    if (gameState !== "playing") return;
    if (currentInput.length !== CODE_LENGTH) return;

    if (guesses.some((g) => g.code === currentInput)) {
      soundEngine.playClick();
      setCurrentInput("");
      return;
    }

    soundEngine.playClick();
    const result = evaluate(currentInput, secret);
    const newGuess: Guess = { code: currentInput, ...result };
    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);
    setCurrentInput("");

    if (result.correct === CODE_LENGTH) {
      setGameState("cracked");
      onWin();
    } else if (newGuesses.length >= MAX_ATTEMPTS) {
      setGameState("locked");
    }
  }, [currentInput, gameState, guesses, secret, onWin]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const resetGame = () => {
    setSecret(generateSecret());
    setGuesses([]);
    setCurrentInput("");
    setGameState("playing");
    setShowHint(false);
  };

  const attemptsLeft = MAX_ATTEMPTS - guesses.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-8 font-mono overflow-hidden"
      style={{ background: "oklch(0.13 0.005 260)" }}
    >
      {/* Background overlays */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 scanline-overlay" />
        <div className="grid-pattern absolute inset-0" />
      </div>

      <div className="relative z-10 w-full max-w-xl">
        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-border pb-4 mb-5 uppercase">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-crimson rounded-full animate-pulse" />
            <span className="text-crimson font-bold tracking-[0.2em] text-xs">
              HASH_CRACKER_v4.2
            </span>
          </div>
          <div className="flex items-center gap-8 text-[10px]">
            <div className="flex flex-col items-end">
              <span className="opacity-40 tracking-widest text-[8px]">ATTEMPTS</span>
              <span className="text-crimson font-bold">
                {guesses.length}/{MAX_ATTEMPTS}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="opacity-40 tracking-widest text-[8px]">STATUS</span>
              <span
                className="font-bold"
                style={{
                  color:
                    gameState === "cracked"
                      ? "oklch(0.7 0.2 145)"
                      : gameState === "locked"
                        ? "oklch(0.55 0.22 18)"
                        : "oklch(0.60 0.18 18)",
                }}
              >
                {gameState === "cracked" ? "CRACKED" : gameState === "locked" ? "LOCKED" : "ACTIVE"}
              </span>
            </div>
          </div>
        </div>

        {/* ── Target Hash Display ── */}
        <div className="dossier-panel p-5 mb-5">
          <div className="terminal-label mb-3">
            TARGET SYSTEM PASSWORD [{CODE_LENGTH}-DIGIT NUMERIC]
          </div>
          <div className="flex items-center gap-4 text-2xl tracking-[0.5em] justify-center">
            {Array.from({ length: CODE_LENGTH }).map((_, i) => (
              <span
                key={i}
                className="text-center"
                style={{
                  width: "44px",
                  color:
                    gameState === "cracked"
                      ? "oklch(0.65 0.22 18)"
                      : "oklch(0.30 0.05 260)",
                  textShadow:
                    gameState === "cracked"
                      ? "0 0 12px oklch(0.55 0.22 18 / 60%)"
                      : "none",
                }}
              >
                {gameState === "cracked" ? (
                  <ScrambleDigit char={secret[i]} delay={8 + i * 6} />
                ) : (
                  "█"
                )}
              </span>
            ))}
          </div>
        </div>

        {/* ── Guess Log ── */}
        <div
          className="dossier-panel p-4 mb-5 max-h-[260px] overflow-y-auto custom-scrollbar"
        >
          {/* Column headers */}
          <div
            className="flex items-center text-[9px] tracking-widest pb-2 mb-2 border-b border-border"
            style={{ color: "oklch(0.50 0.01 260)" }}
          >
            <span className="w-8">#</span>
            <span className="flex-1">INPUT</span>
            <span className="w-20 text-center">EXACT</span>
            <span className="w-20 text-center">PARTIAL</span>
            <span className="w-20 text-center">RESULT</span>
          </div>

          {guesses.length === 0 && (
            <div className="text-[10px] py-6 text-center text-muted-foreground">
              {">"} Awaiting first brute-force attempt...
            </div>
          )}

          {guesses.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center py-2 text-xs border-b border-border/30"
            >
              <span className="w-8 text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 tracking-[0.3em] font-bold text-foreground">
                {g.code}
              </span>
              <span
                className="w-20 text-center font-bold"
                style={{
                  color: g.correct > 0 ? "oklch(0.65 0.22 18)" : "oklch(0.30 0.01 260)",
                  textShadow: g.correct > 0 ? "0 0 6px oklch(0.55 0.22 18 / 40%)" : "none",
                }}
              >
                {g.correct} ●
              </span>
              <span
                className="w-20 text-center"
                style={{
                  color: g.misplaced > 0 ? "oklch(0.75 0.15 60)" : "oklch(0.30 0.01 260)",
                }}
              >
                {g.misplaced} ◐
              </span>
              <span
                className="w-20 text-center text-[9px] font-semibold"
                style={{
                  color:
                    g.correct === CODE_LENGTH
                      ? "oklch(0.7 0.2 145)"
                      : g.correct === 0 && g.misplaced === 0
                        ? "oklch(0.55 0.22 18)"
                        : "oklch(0.65 0.12 60)",
                }}
              >
                {g.correct === CODE_LENGTH
                  ? "ACCESS"
                  : g.correct === 0 && g.misplaced === 0
                    ? "NULL"
                    : "PARTIAL"}
              </span>
            </motion.div>
          ))}
          <div ref={logEndRef} />
        </div>

        {/* ── Input Area ── */}
        <AnimatePresence mode="wait">
          {gameState === "playing" ? (
            <motion.div
              key="input"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="dossier-panel flex items-center gap-3 p-4">
                <span className="text-xs text-crimson-dim">{">"} crack</span>
                <input
                  ref={inputRef}
                  type="text"
                  maxLength={CODE_LENGTH}
                  value={currentInput}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setCurrentInput(val);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="____"
                  className="flex-1 bg-transparent outline-none text-sm tracking-[0.4em] font-bold text-foreground placeholder:text-foreground/20"
                  style={{ caretColor: "oklch(0.55 0.22 18)" }}
                  autoFocus
                />
                <button
                  onClick={handleSubmit}
                  disabled={currentInput.length !== CODE_LENGTH}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="font-mono text-[10px] tracking-widest border border-crimson text-crimson px-4 py-2 hover:bg-crimson/10 transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                >
                  INJECT
                </button>
              </div>

              <div className="flex items-center justify-between mt-3 px-1">
                <div className="text-[9px] text-muted-foreground">
                  {attemptsLeft} attempt{attemptsLeft !== 1 ? "s" : ""} remaining │ {CODE_LENGTH} unique digits │ 0-9
                </div>
                {guesses.length >= 3 && !showHint && (
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setShowHint(true);
                    }}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="text-[9px] text-crimson-dim hover:text-crimson transition-colors cursor-pointer"
                  >
                    [REQUEST HINT]
                  </button>
                )}
                {showHint && (
                  <span className="text-[9px] text-crimson">
                    INTEL: First digit is {secret[0]}
                  </span>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              {gameState === "cracked" ? (
                <>
                  <div className="text-2xl font-black text-white mb-2 tracking-tighter drop-shadow-[0_0_15px_white]">
                    SYSTEM_BREACHED
                  </div>
                  <div
                    className="text-[10px] font-bold mb-8 tracking-[0.3em] uppercase"
                    style={{ color: "oklch(0.7 0.2 145)" }}
                  >
                    Cracked in {guesses.length} attempt{guesses.length !== 1 ? "s" : ""} │ Status: Hacker Elite Verified
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={resetGame}
                      onMouseEnter={() => soundEngine.playHover()}
                      className="px-8 py-3 border border-border text-muted-foreground hover:text-crimson hover:border-crimson transition-all font-bold tracking-widest text-xs cursor-pointer"
                    >
                      RE_PLAY
                    </button>
                    <button
                      onClick={onClose}
                      onMouseEnter={() => soundEngine.playHover()}
                      className="px-8 py-3 bg-white text-black font-bold tracking-widest hover:bg-white/90 transition-all text-xs cursor-pointer"
                    >
                      EXIT_SYSTEM
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-2xl font-black text-crimson mb-2 tracking-tighter">
                    SYSTEM_LOCKOUT
                  </div>
                  <div className="text-[10px] opacity-60 mb-2 tracking-[0.3em]">
                    MAXIMUM ATTEMPTS EXCEEDED
                  </div>
                  <div className="text-[10px] text-muted-foreground mb-8">
                    Password was:{" "}
                    <span className="text-crimson font-bold tracking-[0.3em]">{secret}</span>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={resetGame}
                      onMouseEnter={() => soundEngine.playHover()}
                      className="px-8 py-3 bg-crimson/10 border border-crimson text-crimson hover:bg-crimson hover:text-white transition-all font-bold tracking-widest text-xs cursor-pointer"
                    >
                      RE_INITIALIZE
                    </button>
                    <button
                      onClick={onClose}
                      onMouseEnter={() => soundEngine.playHover()}
                      className="px-8 py-3 border border-border text-muted-foreground hover:text-crimson hover:border-crimson transition-all font-bold tracking-widest text-xs cursor-pointer"
                    >
                      DISCONNECT
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Footer ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-3 border-t border-border">
          <div className="flex items-center gap-6 opacity-50 text-[9px] tracking-widest uppercase">
            <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded text-foreground/80 font-bold">
              ● = EXACT
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded text-foreground/80 font-bold">
              ◐ = MISPLACED
            </div>
          </div>

          <button
            onClick={onClose}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-6 py-2 border border-border text-muted-foreground hover:text-crimson hover:border-crimson transition-all text-[10px] font-bold tracking-widest uppercase cursor-pointer"
          >
            DISCONNECT
          </button>
        </div>
      </div>
    </motion.div>
  );
}
