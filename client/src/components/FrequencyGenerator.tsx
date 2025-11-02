import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Music, Volume2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface FrequencyGeneratorProps {
  onFrequencyChange?: (frequency: number) => void;
}

export default function FrequencyGenerator({ onFrequencyChange }: FrequencyGeneratorProps) {
  const [frequency, setFrequency] = useState(440);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopTone();
    };
  }, []);

  const startTone = () => {
    if (isPlaying) return;

    try {
      // Create audio context if it doesn't exist
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;

      // Create oscillator
      const oscillator = audioContext.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

      // Create gain node for volume control
      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Store references
      oscillatorRef.current = oscillator;
      gainNodeRef.current = gainNode;

      oscillator.start();
      setIsPlaying(true);

      // Callback
      if (onFrequencyChange) {
        onFrequencyChange(frequency);
      }
    } catch (error) {
      console.error("Error playing tone:", error);
    }
  };

  const stopTone = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
    setIsPlaying(false);
  };

  const handleFrequencyChange = (value: number[]) => {
    const newFreq = value[0];
    setFrequency(newFreq);

    // Update frequency if playing
    if (oscillatorRef.current && audioContextRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(
        newFreq,
        audioContextRef.current.currentTime
      );
    }

    // Callback
    if (onFrequencyChange) {
      onFrequencyChange(newFreq);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="w-5 h-5" />
          Frequency Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Frequency</span>
            <span className="font-semibold">{frequency} Hz</span>
          </div>
          <Slider
            value={[frequency]}
            onValueChange={handleFrequencyChange}
            min={20}
            max={20000}
            step={1}
            className="w-full"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>20 Hz</span>
            <span>20 kHz</span>
          </div>
        </div>

        <div className="flex gap-2">
          {!isPlaying ? (
            <Button
              onClick={startTone}
              className="flex-1"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Generate Tone
            </Button>
          ) : (
            <Button
              onClick={stopTone}
              variant="destructive"
              className="flex-1"
            >
              Stop
            </Button>
          )}
        </div>

        <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
          <p className="font-medium">Note:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Adjust frequency with the slider</li>
            <li>Click to generate a sine wave tone</li>
            <li>Perfect for testing hearing ranges</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

