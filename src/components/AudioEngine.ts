/**
 * AudioEngine.ts
 * Procedural Web Audio synthesizer for JARVIS Lab ambiance and UI sounds.
 * Fully compliant with browser security (waits for user interaction).
 */

class SciFiAudioEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private isHumming = false;

  private init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      this.ctx = new AudioContextClass();
    }
  }

  public startAmbientHum() {
    this.init();
    if (!this.ctx || this.isHumming) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    try {
      const ctx = this.ctx;
      
      // Main hum volume
      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0, ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 3.0); // low background hum

      // Highcut filter to keep it deep and non-fatiguing
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(80, ctx.currentTime);
      filter.Q.setValueAtTime(1.0, ctx.currentTime);

      // Low frequency hums
      this.osc1 = ctx.createOscillator();
      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note

      this.osc2 = ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(65.4, ctx.currentTime); // C2 note

      // Slow amplitude modulator (LFO) for that pulsing engine feel
      this.lfo = ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.15, ctx.currentTime); // 0.15 Hz slow wave
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(0.02, ctx.currentTime);

      this.lfo.connect(lfoGain);
      lfoGain.connect(this.ambientGain.gain);

      // Connections
      this.osc1.connect(filter);
      this.osc2.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(ctx.destination);

      // Start nodes
      this.osc1.start(0);
      this.osc2.start(0);
      this.lfo.start(0);
      this.isHumming = true;
    } catch (e) {
      console.warn('AudioEngine failed to start ambient hum:', e);
    }
  }

  public stopAmbientHum() {
    if (!this.isHumming) return;
    try {
      const now = this.ctx?.currentTime || 0;
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.linearRampToValueAtTime(0, now + 0.5);
        setTimeout(() => {
          this.osc1?.stop();
          this.osc2?.stop();
          this.lfo?.stop();
          this.osc1 = null;
          this.osc2 = null;
          this.lfo = null;
          this.ambientGain = null;
        }, 600);
      }
      this.isHumming = false;
    } catch (e) {
      console.warn('AudioEngine failed to stop hum:', e);
    }
  }

  public playClick() {
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      
      const ctx = this.ctx;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  public playBeep(pitch: number = 1200, duration: number = 0.1) {
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      
      const ctx = this.ctx;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, now);
      
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {}
  }

  public playBoot() {
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      
      const ctx = this.ctx;
      const now = ctx.currentTime;

      // JARVIS power-up sweep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(100, now);
      filter.frequency.exponentialRampToValueAtTime(2000, now + 1.2);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(40, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 1.2);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.5);

      // Play secondary chime
      setTimeout(() => {
        this.playBeep(880, 0.15);
        setTimeout(() => this.playBeep(1320, 0.25), 100);
      }, 900);
    } catch (e) {}
  }

  public playTransition() {
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      
      const ctx = this.ctx;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.3);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }
}

export const audioEngine = new SciFiAudioEngine();
