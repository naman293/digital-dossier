// Simple Web Audio API Synthesizer for UI feedback

class AudioEngine {
  private ctx: AudioContext | null = null;
  private initialized = false;

  private typingBuffer: AudioBuffer | null = null;
  private currentTypingSource: AudioBufferSourceNode | null = null;
  private currentTypingGain: GainNode | null = null;

  private init() {
    if (this.initialized) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.initialized = true;
      this.loadTypingAudio();
    } catch (e) {
      console.warn("Web Audio API not supported");
    }
  }

  private async loadTypingAudio() {
    if (!this.ctx) return;
    try {
      const response = await fetch("/audio/keyboard.mp3");
      const arrayBuffer = await response.arrayBuffer();
      this.typingBuffer = await this.ctx.decodeAudioData(arrayBuffer);
    } catch (err) {
      console.error("Failed to load mechanical keyboard audio", err);
    }
  }

  public playTypingKeystroke() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    if (!this.typingBuffer) return;

    // Removed strict cutoff logic so rapid keystrokes can organically overlap
    // without completely muting the ongoing tail of the previous key, producing a natural rolling typing effect.

    const source = this.ctx.createBufferSource();
    source.buffer = this.typingBuffer;

    // Pitch shift slightly on every press so the same exact crisp hit sounds like different physical keys
    const pitchVariation = 1.0 + (Math.random() * 0.2 - 0.1); 
    source.playbackRate.setValueAtTime(pitchVariation, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    
    // Hardcode to exactly 0.5 seconds into the file, which usually contains a solid, loud 'clack'
    // This stops it from randomly landing on pure background fuzz.
    const offset = 0.5;

    // Use a precise 80ms envelope targeting just the impact transient
    const duration = 0.08; 

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(1, this.ctx.currentTime + 0.005);
    gain.gain.setValueAtTime(1, this.ctx.currentTime + duration - 0.02);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + duration);

    source.connect(gain);
    gain.connect(this.ctx.destination);

    source.start(0, offset, duration);
  }

  // Mechanical click for buttons uses the same keyboard mp3
  public playClick() {
    this.playTypingKeystroke();
  }

  // Hover hum removed per user request
  public playHover() {
    // Disabled synthesis
  }

  // Browsers require a user interaction to un-suspend the audio context
  public unlock() {
    this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }
}

export const soundEngine = new AudioEngine();
