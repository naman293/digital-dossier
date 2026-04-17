import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bug, Shield, Crosshair } from "lucide-react";
import { soundEngine } from "@/lib/audio";

interface Entity {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface BugEntity extends Entity {
  type: number;
}

interface GameState {
  bugs: BugEntity[];
  bullets: Entity[];
}

export default function DossierInvaders({ onClose, onWin }: { onClose: () => void; onWin: () => void }) {
  // Game dimensions
  const GAME_WIDTH = 800;
  const GAME_HEIGHT = 600;

  // Unified State for Entities
  const [entities, setEntities] = useState<GameState>({ bugs: [], bullets: [] });
  const [playerX, setPlayerX] = useState(GAME_WIDTH / 2);
  const [wave, setWave] = useState(1);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "gameover" | "victory">("playing");
  const [lastShotTime, setLastShotTime] = useState(0);

  const requestRef = useRef<number>();
  const bugsDirection = useRef<1 | -1>(1);
  const bugsMoveTimer = useRef(0);
  const keys = useRef<{ [key: string]: boolean }>({});

  // Initialize Wave
  const initWave = useCallback((w: number) => {
    const newBugs: BugEntity[] = [];
    const rows = 4;
    const cols = 8;
    const spacingX = 60;
    const spacingY = 50;
    const startX = (GAME_WIDTH - (cols * spacingX)) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        newBugs.push({
          id: `bug-${w}-${r}-${c}`,
          x: startX + c * spacingX,
          y: 50 + r * spacingY,
          width: 24,
          height: 24,
          type: r % 3
        });
      }
    }
    setEntities({ bugs: newBugs, bullets: [] });
    setGameState("playing");
  }, []);

  useEffect(() => {
    initWave(1);
  }, [initWave]);

  // Input handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key] = true;
      if (e.key === " ") e.preventDefault();
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key] = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const shoot = useCallback(() => {
    const now = Date.now();
    if (now - lastShotTime < 250) return;
    
    const newBullet = {
      id: `bullet-${now}-${Math.random()}`,
      x: playerX + 12,
      y: GAME_HEIGHT - 60,
      width: 8,
      height: 12
    };

    setEntities(prev => ({
      ...prev,
      bullets: [...prev.bullets, newBullet]
    }));
    
    setLastShotTime(now);
    soundEngine.playClick();
  }, [playerX, lastShotTime]);

  const update = useCallback(() => {
    if (gameState !== "playing") return;

    // A. Move Player (Independent Check)
    if (keys.current["ArrowLeft"] || keys.current["a"]) {
      setPlayerX(px => Math.max(20, px - 7));
    }
    if (keys.current["ArrowRight"] || keys.current["d"]) {
      setPlayerX(px => Math.min(GAME_WIDTH - 40, px + 7));
    }
    if (keys.current[" "]) {
      shoot();
    }

    // B. Synchronized entities update
    setEntities(prev => {
      // 1. Bullet movement
      let nextBullets = prev.bullets
        .map(b => ({ ...b, y: b.y - 12 }))
        .filter(b => b.y > -20);
      
      // 2. Bug movement logic
      bugsMoveTimer.current += 1;
      const moveInterval = Math.max(4, 30 - (wave * 6));
      let nextBugs = [...prev.bugs];
      
      if (bugsMoveTimer.current >= moveInterval) {
        bugsMoveTimer.current = 0;
        let shouldDrop = false;
        for (const b of nextBugs) {
          if ((bugsDirection.current === 1 && b.x > GAME_WIDTH - 50) || 
              (bugsDirection.current === -1 && b.x < 30)) {
            shouldDrop = true;
            break;
          }
        }

        if (shouldDrop) {
          bugsDirection.current *= -1;
          nextBugs = nextBugs.map(b => ({ ...b, y: b.y + 18 }));
        } else {
          nextBugs = nextBugs.map(b => ({ ...b, x: b.x + (18 * bugsDirection.current) }));
        }
      }

      // 3. Collision detection (Perfectly in-sync)
      const finalBugs: BugEntity[] = [];
      const destroyedBulletIds = new Set<string>();

      for (const bug of nextBugs) {
        let isHit = false;
        for (const bullet of nextBullets) {
          // Robust overlap check with 2px padding for "sticky" hits
          const padding = 2;
          if (
            bullet.x < bug.x + bug.width + padding &&
            bullet.x + bullet.width > bug.x - padding &&
            bullet.y < bug.y + bug.height + padding &&
            bullet.y + bullet.height > bug.y - padding
          ) {
            isHit = true;
            destroyedBulletIds.add(bullet.id);
            setScore(s => s + 100);
            break;
          }
        }
        if (!isHit) finalBugs.push(bug);
      }

      // Final bullet cleanup
      nextBullets = nextBullets.filter(b => !destroyedBulletIds.has(b.id));

      // 4. State transitions (Win/Loss)
      if (finalBugs.length === 0 && prev.bugs.length > 0) {
        if (wave >= 3) {
          setGameState("victory");
          onWin();
        } else {
          setWave(w => w + 1);
          setTimeout(() => initWave(wave + 1), 600);
        }
      }

      if (finalBugs.some(b => b.y > GAME_HEIGHT - 100)) {
        setGameState("gameover");
      }

      return {
        bugs: finalBugs,
        bullets: nextBullets
      };
    });

    requestRef.current = requestAnimationFrame(update);
  }, [gameState, shoot, wave, onWin, initWave]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [update]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] bg-surface flex flex-col items-center justify-center p-4 sm:p-8 font-mono overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 scanline-overlay" />
        <div className="grid-pattern absolute inset-0" />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4 uppercase">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-crimson rounded-full animate-pulse" />
            <span className="text-crimson font-bold tracking-[0.2em] text-xs">DOSSIER_INVADERS_V2.1</span>
          </div>
          <div className="flex items-center gap-8 text-[10px]">
            <div className="flex flex-col items-end">
              <span className="opacity-40 tracking-widest text-[8px]">SUB_ROUTINE</span>
              <span className="text-crimson font-bold">WAVE_{wave}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="opacity-40 tracking-widest text-[8px]">THREAT_METRIC</span>
              <span className="text-crimson font-bold opacity-80">{score.toString().padStart(5, '0')}</span>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative aspect-[4/3] w-full bg-black/40 dossier-panel overflow-hidden border border-crimson/20">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://media.giphy.com/media/oEI9uWUicKgH6/giphy.gif')] bg-cover mix-blend-screen" />
          
          {/* Bugs */}
          {entities.bugs.map(bug => (
            <motion.div
              key={bug.id}
              className="absolute text-crimson flex items-center justify-center"
              style={{ 
                left: `${(bug.x / GAME_WIDTH) * 100}%`, 
                top: `${(bug.y / GAME_HEIGHT) * 100}%`, 
                width: `${(bug.width / GAME_WIDTH) * 100}%`, 
                height: `${(bug.height / GAME_HEIGHT) * 100}%` 
              }}
            >
              <Bug className={`w-full h-full ${bug.y > GAME_HEIGHT - 200 ? "animate-pulse" : ""}`} />
            </motion.div>
          ))}

          {/* Bullets */}
          {entities.bullets.map(bullet => (
            <div
              key={bullet.id}
              className="absolute bg-crimson shadow-[0_0_8px_oklch(0.55_0.22_18)]"
              style={{ 
                left: `${(bullet.x / GAME_WIDTH) * 100}%`, 
                top: `${(bullet.y / GAME_HEIGHT) * 100}%`, 
                width: `${(bullet.width / GAME_WIDTH) * 100}%`, 
                height: `${(bullet.height / GAME_HEIGHT) * 100}%` 
              }}
            />
          ))}

          {/* Player */}
          <div
            className="absolute text-white"
            style={{ 
              left: `${(playerX / GAME_WIDTH) * 100}%`, 
              bottom: "4%", 
              width: "4%", 
              height: "5.33%"
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Shield className="text-crimson/20 absolute inset-0 animate-pulse w-full h-full" />
              <Crosshair className="text-white drop-shadow-[0_0_8px_white] w-3/4 h-3/4" />
            </div>
          </div>

          <AnimatePresence>
            {gameState !== "playing" && (
              <motion.div 
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-8 z-50"
              >
                {gameState === "gameover" ? (
                  <>
                    <div className="text-3xl font-black text-crimson mb-2 tracking-tighter">CORE_COMPROMISED</div>
                    <div className="text-[10px] opacity-60 mb-8 tracking-[0.3em]">RE-INITIALIZATION REQUIRED</div>
                    <button 
                      onClick={() => {
                        setWave(1);
                        setScore(0);
                        initWave(1);
                      }}
                      className="px-8 py-3 bg-crimson/10 border border-crimson text-crimson hover:bg-crimson hover:text-white transition-all font-bold tracking-widest text-xs"
                    >
                      RE_BOOT
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-4xl font-black text-white mb-2 tracking-tighter drop-shadow-[0_0_15px_white]">THREAT_NEUTRALIZED</div>
                    <div className="text-[10px] text-green-500 font-bold mb-8 tracking-[0.3em] uppercase">Status: Hacker Elite Verified</div>
                    <div className="flex gap-4">
                       <button 
                        onClick={() => {
                          setWave(1);
                          setScore(0);
                          initWave(1);
                        }}
                        className="px-8 py-3 border border-white/20 text-white/60 hover:text-white transition-all font-bold tracking-widest text-xs"
                      >
                        RE_PLAY
                      </button>
                      <button 
                        onClick={onClose}
                        className="px-8 py-3 bg-white text-black font-bold tracking-widest hover:bg-white/90 transition-all text-xs"
                      >
                        EXIT_SYSTEM
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
          <div className="flex items-center gap-6 opacity-40 text-[9px] tracking-widest uppercase">
            <div className="flex items-center gap-2 text-white/80 opacity-100 font-bold bg-white/5 px-2 py-1 rounded">[ ARROW_KEYS ] MOVE</div>
            <div className="flex items-center gap-2 text-white/80 opacity-100 font-bold bg-white/5 px-2 py-1 rounded">[ SPACE ] PATCH</div>
          </div>
          
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-border text-muted-foreground hover:text-crimson hover:border-crimson transition-all text-[10px] font-bold tracking-widest uppercase"
          >
            DISCONNECT
          </button>
        </div>
      </div>
    </motion.div>
  );
}
