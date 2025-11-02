import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Volume2, Pause, Info, Stethoscope, Heart, Lungs, Activity } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SoundPreset {
  name: string;
  frequencies: number[];
  durations: number[];
  gains: number[];
  category: "medical" | "physiological" | "environment";
  frequencyRange: string;
  description: string;
  clinicalRelevance?: string;
}

const soundPresets: Record<string, SoundPreset> = {
  // Physiological Sounds
  human: {
    name: "Human Voice (Vowel)",
    frequencies: [150, 250, 350, 450, 550],
    durations: [0.2, 0.2, 0.2, 0.2, 0.3],
    gains: [0.3, 0.4, 0.3, 0.3, 0.2],
    category: "physiological",
    frequencyRange: "150-550 Hz (Fundamental frequency + harmonics)",
    description: "Represents the fundamental frequency and first 4 harmonics of human speech. The human voice typically ranges from 85-300 Hz for men and 165-525 Hz for women.",
    clinicalRelevance: "Essential for understanding speech perception and cochlear mechanics. Damage to high-frequency hearing affects consonant clarity."
  },
  heartbeat: {
    name: "Heartbeat (Lub-Dub)",
    frequencies: [60, 80, 65, 90, 70],
    durations: [0.15, 0.1, 0.2, 0.1, 0.15],
    gains: [0.3, 0.35, 0.3, 0.3, 0.25],
    category: "physiological",
    frequencyRange: "20-120 Hz (Infrasound range)",
    description: "Simulated heartbeat sound with S1 (lub) and S2 (dub) components. Heart sounds are typically in the infrasound range below 20 Hz but have audible harmonics.",
    clinicalRelevance: "Understanding infrasound perception is important for cardiac auscultation training and stethoscope use."
  },

  // Medical Equipment
  mri: {
    name: "MRI Scanner",
    frequencies: [1000, 1200, 1100, 1300, 1000, 1500, 900, 1700],
    durations: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
    gains: [0.2, 0.3, 0.25, 0.3, 0.25, 0.3, 0.2, 0.15],
    category: "medical",
    frequencyRange: "900-1700 Hz (Variable pulses)",
    description: "Represents the characteristic pulsing sound of an MRI scanner. The gradient coils create variable frequency patterns during imaging sequences.",
    clinicalRelevance: "Understanding MRI acoustics helps prepare patients and demonstrates how medical devices produce characteristic sound signatures."
  },
  ecg: {
    name: "ECG Monitor Beep",
    frequencies: [800, 800, 800],
    durations: [0.05, 0.05, 0.15],
    gains: [0.3, 0.3, 0.2],
    category: "medical",
    frequencyRange: "800 Hz (Regular pulse)",
    description: "Classic three-beep pattern of cardiac monitor alarms. Each beep corresponds to a detected heartbeat in many ECG monitors.",
    clinicalRelevance: "Familiarizes students with medical monitoring equipment sounds and their clinical significance."
  },
  
  // Auditory Physiology Examples
  tinnitus: {
    name: "Tinnitus (High-Frequency)",
    frequencies: [4000, 4000, 4000, 4000, 4000],
    durations: [0.3, 0.3, 0.3, 0.3, 0.2],
    gains: [0.25, 0.3, 0.28, 0.3, 0.25],
    category: "physiological",
    frequencyRange: "4000 Hz (Continuous tone)",
    description: "Simulates the perception of high-frequency tinnitus. Often associated with noise-induced hearing loss or cochlear damage.",
    clinicalRelevance: "Demonstrates place theory - damage to high-frequency cochlear regions (base) causes perception of high-frequency phantom sounds."
  },
  place: {
    name: "Cochlear Base (High-Freq Test)",
    frequencies: [8000, 8000, 8000],
    durations: [0.2, 0.2, 0.2],
    gains: [0.35, 0.35, 0.3],
    category: "physiological",
    frequencyRange: "8000 Hz (Place theory demo)",
    description: "High-frequency tone stimulating the cochlear base (near oval window). Demonstrates tonotopic organization.",
    clinicalRelevance: "Students learn that high frequencies cause maximum displacement at the cochlear base, supporting Place Theory."
  },
  temporal: {
    name: "Cochlear Apex (Low-Freq Test)",
    frequencies: [200, 200, 200],
    durations: [0.4, 0.4, 0.4],
    gains: [0.4, 0.4, 0.4],
    category: "physiological",
    frequencyRange: "200 Hz (Frequency/Temporal theory demo)",
    description: "Low-frequency tone stimulating the cochlear apex. Neurons fire in phase-locked patterns matching the stimulus.",
    clinicalRelevance: "Demonstrates Frequency/Temporal Theory where neural firing rate directly encodes low frequencies below 1000 Hz."
  },
  
  // Comparative Examples
  whisper: {
    name: "Whispered Voice",
    frequencies: [800, 1000, 1200, 1400],
    durations: [0.08, 0.1, 0.08, 0.1],
    gains: [0.2, 0.25, 0.22, 0.2],
    category: "physiological",
    frequencyRange: "800-1400 Hz (Consonants emphasized)",
    description: "Whispered speech lacks fundamental frequency, emphasizing higher frequency components (consonants). Also demonstrates the importance of high-frequency hearing.",
    clinicalRelevance: "Shows how high-frequency hearing loss significantly impacts speech intelligibility, especially consonants."
  },
};

export default function SoundTypeSelector() {
  const [selectedSound, setSelectedSound] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const selectedPreset = selectedSound ? soundPresets[selectedSound] : null;

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopSound();
    };
  }, []);

  const stopSound = () => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // Ignore errors from already stopped oscillators
      }
    });
    oscillatorsRef.current = [];
    setIsPlaying(false);
  };

  const playSound = async () => {
    if (!selectedSound || isPlaying) return;

    const preset = soundPresets[selectedSound];
    if (!preset) return;

    try {
      // Resume audio context if suspended
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;
      await audioContext.resume();

      // Create master gain node
      const masterGain = audioContext.createGain();
      masterGain.gain.setValueAtTime(0.5, audioContext.currentTime);
      masterGain.connect(audioContext.destination);

      setIsPlaying(true);

      const oscillators: OscillatorNode[] = [];
      let currentTime = audioContext.currentTime;

      // Create oscillators for each frequency in the preset
      preset.frequencies.forEach((freq, index) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, currentTime);

        // Apply individual gain
        const presetGain = preset.gains[index] || 0.3;
        gain.gain.setValueAtTime(presetGain, currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + preset.durations[index]);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(currentTime);
        osc.stop(currentTime + preset.durations[index]);

        oscillators.push(osc);
        currentTime += preset.durations[index];
      });

      oscillatorsRef.current = oscillators;

      // Stop playing when the last oscillator finishes
      const totalDuration = preset.durations.reduce((sum, d) => sum + d, 0);
      setTimeout(() => {
        setIsPlaying(false);
      }, totalDuration * 1000);
    } catch (error) {
      console.error("Error playing sound:", error);
      setIsPlaying(false);
    }
  };

  const handlePlayClick = () => {
    if (isPlaying) {
      stopSound();
    } else {
      playSound();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          Sound Presets
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Select value={selectedSound} onValueChange={setSelectedSound}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a sound for educational analysis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="human">Human Voice (Vowel)</SelectItem>
              <SelectItem value="heartbeat">Heartbeat (Lub-Dub)</SelectItem>
              <SelectItem value="whisper">Whispered Voice</SelectItem>
              <SelectItem value="tinnitus">Tinnitus (High-Freq)</SelectItem>
              <SelectItem value="place">Cochlear Base Test (8 kHz)</SelectItem>
              <SelectItem value="temporal">Cochlear Apex Test (200 Hz)</SelectItem>
              <SelectItem value="mri">MRI Scanner</SelectItem>
              <SelectItem value="ecg">ECG Monitor Beep</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handlePlayClick}
          className="w-full"
          disabled={!selectedSound}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Stop Sound
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 mr-2" />
              Play Sound
            </>
          )}
        </Button>

        {selectedPreset && (
          <>
            <Button
              variant="outline"
              onClick={() => setShowInfo(!showInfo)}
              className="w-full"
              size="sm"
            >
              <Info className="w-4 h-4 mr-2" />
              {showInfo ? "Hide" : "Show"} Educational Information
            </Button>

            {showInfo && (
              <Alert className="border-primary/20 bg-primary/5">
                <Info className="h-4 w-4" />
                <AlertDescription className="space-y-3">
                  <div>
                    <p className="font-semibold text-sm mb-1">{selectedPreset.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedPreset.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Activity className="w-3 h-3" />
                    <span className="font-medium">Frequency Range:</span>
                    <span>{selectedPreset.frequencyRange}</span>
                  </div>
                  {selectedPreset.clinicalRelevance && (
                    <div className="pt-2 border-t border-border/50">
                      <div className="flex items-start gap-2">
                        <Stethoscope className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-xs mb-1">Clinical Relevance:</p>
                          <p className="text-xs text-muted-foreground">
                            {selectedPreset.clinicalRelevance}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </>
        )}

        <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
          <p className="font-medium">Educational Categories:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Physiological sounds (voice, heartbeat)</li>
            <li>Auditory theory demonstrations</li>
            <li>Medical equipment simulations</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

