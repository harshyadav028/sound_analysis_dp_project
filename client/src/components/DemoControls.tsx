import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Play, Square, Waves } from "lucide-react";

interface DemoControlsProps {
  onStart: (type: "sine" | "harmonic" | "noise" | "sweep") => void;
  onStop: () => void;
  frequency: number;
  onFrequencyChange: (freq: number) => void;
  isPlaying: boolean;
  isAnalyzing?: boolean;
}

export default function DemoControls({
  onStart,
  onStop,
  frequency,
  onFrequencyChange,
  isPlaying,
  isAnalyzing = false,
}: DemoControlsProps) {
  const handleStart = (type: "sine" | "harmonic" | "noise" | "sweep") => {
    console.log(`Demo started: ${type}`);
    onStart(type);
  };

  const handleStop = () => {
    console.log("Demo stopped");
    onStop();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Waves className="w-5 h-5" />
          Demo Mode
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Frequency: {frequency} Hz</Label>
          <Slider
            value={[frequency]}
            onValueChange={([value]) => onFrequencyChange(value)}
            min={20}
            max={20000}
            step={10}
            disabled={isPlaying || isAnalyzing}
            data-testid="slider-demo-frequency"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={() => handleStart("sine")}
            disabled={isPlaying || isAnalyzing}
            data-testid="button-demo-sine"
          >
            Sine Wave
          </Button>
          <Button
            variant="outline"
            onClick={() => handleStart("harmonic")}
            disabled={isPlaying || isAnalyzing}
            data-testid="button-demo-harmonic"
          >
            Harmonic
          </Button>
          <Button
            variant="outline"
            onClick={() => handleStart("noise")}
            disabled={isPlaying || isAnalyzing}
            data-testid="button-demo-noise"
          >
            Noise
          </Button>
          <Button
            variant="outline"
            onClick={() => handleStart("sweep")}
            disabled={isPlaying || isAnalyzing}
            data-testid="button-demo-sweep"
          >
            Frequency Sweep
          </Button>
        </div>

        <div className="flex gap-2">
          {isPlaying ? (
            <Button
              variant="destructive"
              onClick={handleStop}
              className="flex-1"
              data-testid="button-demo-stop"
              disabled={isAnalyzing}
            >
              <Square className="w-4 h-4 mr-2" />
              Stop Demo
            </Button>
          ) : (
            <Button
              onClick={() => handleStart("sine")}
              className="flex-1"
              data-testid="button-demo-play"
              disabled={isAnalyzing}
            >
              <Play className="w-4 h-4 mr-2" />
              Start Demo
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
