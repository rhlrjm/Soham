// Web Audio API generator for sacred ambient sounds, meditation bells, and continuous soundscapes

let audioCtx: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a single resonant Tibetan Singing Bowl chime
 */
export function playSingingBowl(frequency = 432, duration = 4.5): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const fundamental = ctx.createOscillator();
    const overtone1 = ctx.createOscillator();
    const overtone2 = ctx.createOscillator();

    const gainFundamental = ctx.createGain();
    const gainOvertone1 = ctx.createGain();
    const gainOvertone2 = ctx.createGain();
    const masterGain = ctx.createGain();

    fundamental.type = 'sine';
    fundamental.frequency.setValueAtTime(frequency, now);

    overtone1.type = 'sine';
    overtone1.frequency.setValueAtTime(frequency * 2.76, now);

    overtone2.type = 'sine';
    overtone2.frequency.setValueAtTime(frequency * 5.4, now);

    // Envelopes for smooth singing bowl ring
    gainFundamental.gain.setValueAtTime(0, now);
    gainFundamental.gain.linearRampToValueAtTime(0.3, now + 0.05);
    gainFundamental.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    gainOvertone1.gain.setValueAtTime(0, now);
    gainOvertone1.gain.linearRampToValueAtTime(0.12, now + 0.03);
    gainOvertone1.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

    gainOvertone2.gain.setValueAtTime(0, now);
    gainOvertone2.gain.linearRampToValueAtTime(0.05, now + 0.02);
    gainOvertone2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.4);

    masterGain.gain.setValueAtTime(0.8, now);

    fundamental.connect(gainFundamental);
    overtone1.connect(gainOvertone1);
    overtone2.connect(gainOvertone2);

    gainFundamental.connect(masterGain);
    gainOvertone1.connect(masterGain);
    gainOvertone2.connect(masterGain);

    masterGain.connect(ctx.destination);

    fundamental.start(now);
    overtone1.start(now);
    overtone2.start(now);

    fundamental.stop(now + duration);
    overtone1.stop(now + duration);
    overtone2.stop(now + duration);
  } catch (err) {
    console.error('Audio play error:', err);
  }
}

/**
 * Play a subtle wooden/crystal bead click for Japa Mala counter
 */
export function playBeadClick(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch (err) {
    console.error('Audio play error:', err);
  }
}

export type AmbientSoundType = 'temple_bells' | 'flute' | 'nature' | 'om_drone' | 'rain';

export interface AmbientSoundOption {
  id: AmbientSoundType;
  label: string;
  marathiLabel: string;
  description: string;
  icon: string;
}

export const AMBIENT_SOUND_OPTIONS: AmbientSoundOption[] = [
  {
    id: 'temple_bells',
    label: 'Temple Bells',
    marathiLabel: 'मंदिर घंटानाद व तिबेटीयन बाऊल',
    description: 'पवित्र मंदिरातील शांत घंटा आणि ब्रास बाऊलचा दीर्घ अनुनाद',
    icon: '🔔'
  },
  {
    id: 'flute',
    label: 'Bamboo Flute',
    marathiLabel: 'बासरीचा सुरेल ध्यान सूर',
    description: 'राग भूपालीवर आधारित ध्यानस्थ बासरीचा मधुर आणि शांत सूर',
    icon: '🪈'
  },
  {
    id: 'nature',
    label: 'Nature & Stream',
    marathiLabel: 'वाहती नदी व वन निसर्ग',
    description: 'पर्वतातील पाण्याचा संथ प्रवाह आणि दूरवरच्या पक्ष्यांचे मंजुळ बोल',
    icon: '🌊'
  },
  {
    id: 'om_drone',
    label: 'Cosmic Om Drone',
    marathiLabel: '१३६.१ Hz वैश्विक ॐ नाद',
    description: 'अंतरंगात शांतता निर्माण करणारा पृथ्वीच्या वारंवारतेचा तानपुरा',
    icon: '🕉️'
  },
  {
    id: 'rain',
    label: 'Gentle Rain & Chimes',
    marathiLabel: 'शांत पाऊस व पवन घंटा',
    description: 'हळुवार बरसणाऱ्या पावसाची रिमझिम आणि वाऱ्यासोबत वाजणाऱ्या घंटा',
    icon: '🌧️'
  }
];

/**
 * Ambient Sound Manager with pure Web Audio synthesis
 */
class AmbientSoundManager {
  private activeType: AmbientSoundType | null = null;
  private masterGain: GainNode | null = null;
  private intervalIds: number[] = [];
  private activeOscs: (OscillatorNode | AudioBufferSourceNode)[] = [];
  private volume = 0.6;

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && audioCtx) {
      this.masterGain.gain.linearRampToValueAtTime(this.volume, audioCtx.currentTime + 0.1);
    }
  }

  public getVolume() {
    return this.volume;
  }

  public getActiveType(): AmbientSoundType | null {
    return this.activeType;
  }

  public isPlaying(): boolean {
    return this.activeType !== null;
  }

  public play(type: AmbientSoundType) {
    if (this.activeType === type) return;
    this.stop();

    try {
      const ctx = getAudioContext();
      this.activeType = type;

      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(this.volume, ctx.currentTime + 1.5);
      this.masterGain.connect(ctx.destination);

      switch (type) {
        case 'temple_bells':
          this.startTempleBells(ctx, this.masterGain);
          break;
        case 'flute':
          this.startBambooFlute(ctx, this.masterGain);
          break;
        case 'nature':
          this.startNatureStream(ctx, this.masterGain);
          break;
        case 'om_drone':
          this.startOmDrone(ctx, this.masterGain);
          break;
        case 'rain':
          this.startRainChimes(ctx, this.masterGain);
          break;
      }
    } catch (err) {
      console.error('Ambient start error:', err);
    }
  }

  public stop() {
    if (!this.activeType) return;
    try {
      this.intervalIds.forEach((id) => window.clearInterval(id));
      this.intervalIds = [];

      if (this.masterGain && audioCtx) {
        const now = audioCtx.currentTime;
        this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.0);
        setTimeout(() => {
          this.activeOscs.forEach((node) => {
            try {
              node.stop();
              node.disconnect();
            } catch {}
          });
          this.activeOscs = [];
          if (this.masterGain) {
            this.masterGain.disconnect();
            this.masterGain = null;
          }
        }, 1100);
      } else {
        this.activeOscs.forEach((node) => {
          try {
            node.stop();
            node.disconnect();
          } catch {}
        });
        this.activeOscs = [];
      }
    } catch (err) {
      console.error('Ambient stop error:', err);
    }
    this.activeType = null;
  }

  // --- 1. Temple Bells Synthesis ---
  private startTempleBells(ctx: AudioContext, output: GainNode) {
    const playBellStrike = () => {
      if (!this.activeType || this.activeType !== 'temple_bells') return;
      const now = ctx.currentTime;
      const baseFreqs = [329.63, 440, 528, 659.25, 432]; // Meditative pitch set
      const baseFreq = baseFreqs[Math.floor(Math.random() * baseFreqs.length)];
      const duration = 6.0;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const osc3 = ctx.createOscillator();

      const g1 = ctx.createGain();
      const g2 = ctx.createGain();
      const g3 = ctx.createGain();
      const bellGain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(baseFreq, now);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(baseFreq * 2.76, now); // Bell harmonic

      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(baseFreq * 5.4, now); // Bell overtone

      g1.gain.setValueAtTime(0, now);
      g1.gain.linearRampToValueAtTime(0.25, now + 0.03);
      g1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      g2.gain.setValueAtTime(0, now);
      g2.gain.linearRampToValueAtTime(0.12, now + 0.02);
      g2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

      g3.gain.setValueAtTime(0, now);
      g3.gain.linearRampToValueAtTime(0.06, now + 0.015);
      g3.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.4);

      bellGain.gain.setValueAtTime(0.7, now);

      osc1.connect(g1);
      osc2.connect(g2);
      osc3.connect(g3);

      g1.connect(bellGain);
      g2.connect(bellGain);
      g3.connect(bellGain);

      bellGain.connect(output);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      osc1.stop(now + duration);
      osc2.stop(now + duration);
      osc3.stop(now + duration);
    };

    playBellStrike();
    const interval = window.setInterval(() => {
      playBellStrike();
    }, 4500);
    this.intervalIds.push(interval);
  }

  // --- 2. Bamboo Flute Synthesis (Raga Bhupali / Meditative Melodic Flow) ---
  private startBambooFlute(ctx: AudioContext, output: GainNode) {
    // Continuous soft background drone
    const droneOsc = ctx.createOscillator();
    const droneGain = ctx.createGain();
    droneOsc.type = 'triangle';
    droneOsc.frequency.setValueAtTime(146.83, ctx.currentTime); // D3 fundamental
    droneGain.gain.setValueAtTime(0.08, ctx.currentTime);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);

    droneOsc.connect(filter);
    filter.connect(droneGain);
    droneGain.connect(output);
    droneOsc.start();
    this.activeOscs.push(droneOsc);

    // Flute Raga notes: D4, E4, F#4, A4, B4, D5 (Bhupali Scale)
    const ragaNotes = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33, 440.0, 369.99];
    let noteIndex = 0;

    const playFluteNote = () => {
      if (!this.activeType || this.activeType !== 'flute') return;
      const now = ctx.currentTime;
      const noteFreq = ragaNotes[noteIndex % ragaNotes.length];
      noteIndex++;
      const noteDuration = 3.8;

      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const lfo = ctx.createOscillator(); // Vibrato
      const lfoGain = ctx.createGain();
      const noteGain = ctx.createGain();
      const noteFilter = ctx.createBiquadFilter();

      // Vibrato setup (4.8 Hz gentle vibrato)
      lfo.frequency.setValueAtTime(4.8, now);
      lfoGain.gain.setValueAtTime(3.5, now);
      lfo.connect(osc.frequency);
      lfo.connect(osc2.frequency);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteFreq, now);
      // Gentle portamento glide
      osc.frequency.exponentialRampToValueAtTime(noteFreq * (1 + (Math.random() * 0.01 - 0.005)), now + 1.0);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(noteFreq * 2, now); // Second harmonic for breath warmth

      noteFilter.type = 'bandpass';
      noteFilter.frequency.setValueAtTime(noteFreq * 1.5, now);
      noteFilter.Q.setValueAtTime(1.5, now);

      // Breath Envelope (soft attack, sustained, smooth release)
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.18, now + 0.8);
      noteGain.gain.setValueAtTime(0.16, now + noteDuration - 0.8);
      noteGain.gain.linearRampToValueAtTime(0.0001, now + noteDuration);

      osc.connect(noteFilter);
      osc2.connect(noteFilter);
      noteFilter.connect(noteGain);
      noteGain.connect(output);

      lfo.start(now);
      osc.start(now);
      osc2.start(now);

      lfo.stop(now + noteDuration);
      osc.stop(now + noteDuration);
      osc2.stop(now + noteDuration);
    };

    playFluteNote();
    const interval = window.setInterval(() => {
      playFluteNote();
    }, 3600);
    this.intervalIds.push(interval);
  }

  // --- 3. Nature & Mountain Stream Synthesis ---
  private startNatureStream(ctx: AudioContext, output: GainNode) {
    // Generate pink noise buffer for flowing water
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const outputData = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      outputData[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoiseSource = ctx.createBufferSource();
    whiteNoiseSource.buffer = noiseBuffer;
    whiteNoiseSource.loop = true;

    // Dual modulated filters to mimic flowing river ripples
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, ctx.currentTime);
    filter.Q.setValueAtTime(0.8, ctx.currentTime);

    // LFO for wave modulation
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.25, ctx.currentTime);
    lfoGain.gain.setValueAtTime(180, ctx.currentTime);
    lfo.connect(filter.frequency);

    const streamGain = ctx.createGain();
    streamGain.gain.setValueAtTime(0.35, ctx.currentTime);

    whiteNoiseSource.connect(filter);
    filter.connect(streamGain);
    streamGain.connect(output);

    lfo.start();
    whiteNoiseSource.start();

    this.activeOscs.push(whiteNoiseSource);
    this.activeOscs.push(lfo);

    // Subtle distant bird chirps
    const playBirdChirp = () => {
      if (!this.activeType || this.activeType !== 'nature') return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const base = 2600 + Math.random() * 800;
      osc.frequency.setValueAtTime(base, now);
      osc.frequency.exponentialRampToValueAtTime(base + 600, now + 0.06);
      osc.frequency.exponentialRampToValueAtTime(base - 200, now + 0.15);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.connect(gain);
      gain.connect(output);

      osc.start(now);
      osc.stop(now + 0.25);
    };

    const birdInterval = window.setInterval(() => {
      if (Math.random() > 0.4) {
        playBirdChirp();
        setTimeout(() => {
          if (Math.random() > 0.5) playBirdChirp();
        }, 220);
      }
    }, 4800);
    this.intervalIds.push(birdInterval);
  }

  // --- 4. Cosmic Om Drone (136.1 Hz + Harmonics) ---
  private startOmDrone(ctx: AudioContext, output: GainNode) {
    const now = ctx.currentTime;
    const freq = 136.1; // Cosmic Om tone

    const f0 = ctx.createOscillator();
    f0.type = 'sawtooth';
    f0.frequency.setValueAtTime(freq, now);

    const f1 = ctx.createOscillator();
    f1.type = 'sine';
    f1.frequency.setValueAtTime(freq * 1.5, now); // 5th

    const f2 = ctx.createOscillator();
    f2.type = 'sine';
    f2.frequency.setValueAtTime(freq * 2, now); // Octave

    const fSub = ctx.createOscillator();
    fSub.type = 'sine';
    fSub.frequency.setValueAtTime(freq * 0.5, now); // Sub-bass warmth

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(360, now);

    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.22, now);

    f0.connect(filter);
    f1.connect(filter);
    f2.connect(filter);
    fSub.connect(droneGain);
    filter.connect(droneGain);
    droneGain.connect(output);

    f0.start(now);
    f1.start(now);
    f2.start(now);
    fSub.start(now);

    this.activeOscs.push(f0, f1, f2, fSub);
  }

  // --- 5. Gentle Rain & Wind Chimes ---
  private startRainChimes(ctx: AudioContext, output: GainNode) {
    // Rain noise
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.05;
    }

    const rainSource = ctx.createBufferSource();
    rainSource.buffer = noiseBuffer;
    rainSource.loop = true;

    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.setValueAtTime(950, ctx.currentTime);

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.3, ctx.currentTime);

    rainSource.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(output);

    rainSource.start();
    this.activeOscs.push(rainSource);

    // Random crystalline chimes
    const chimeFreqs = [1046.5, 1174.66, 1318.51, 1567.98, 1760.0, 2093.0];
    const playChime = () => {
      if (!this.activeType || this.activeType !== 'rain') return;
      const now = ctx.currentTime;
      const freq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

      osc.connect(gain);
      gain.connect(output);

      osc.start(now);
      osc.stop(now + 3.2);
    };

    const chimeInterval = window.setInterval(() => {
      if (Math.random() > 0.35) {
        playChime();
      }
    }, 2800);
    this.intervalIds.push(chimeInterval);
  }
}

export const ambientSoundManager = new AmbientSoundManager();

// Backwards compatibility for omDronePlayer
export const omDronePlayer = {
  start: (freq = 136.1) => {
    ambientSoundManager.play('om_drone');
  },
  stop: () => {
    if (ambientSoundManager.getActiveType() === 'om_drone') {
      ambientSoundManager.stop();
    }
  },
  isPlaying: () => ambientSoundManager.getActiveType() === 'om_drone'
};

