import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { GreenwoodSettings } from "@shared/schema";
import { Settings, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SettingsPanelProps {
  settings: GreenwoodSettings;
  onChange: (settings: GreenwoodSettings) => void;
}

export default function SettingsPanel({ settings, onChange }: SettingsPanelProps) {
  const updateSetting = <K extends keyof GreenwoodSettings>(
    key: K,
    value: GreenwoodSettings[K]
  ) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Calibration Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Greenwood Function Constants</h3>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p className="font-medium mb-1">Greenwood Formula:</p>
                <p className="font-mono text-xs mb-2">f(x) = A × (10^(a·x) - k)</p>
                <p className="text-xs">Maps position (x) along cochlea to characteristic frequency. Human defaults: A=165.4, a=2.1, k=0.88</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="p-3 bg-muted rounded-md mb-3">
            <p className="text-xs font-mono text-muted-foreground mb-1">f(x) = A × (10^(a·x) - k)</p>
            <p className="text-xs text-muted-foreground">Position x ∈ [0,1] where 0=base, 1=apex</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="param-a">A (Scale)</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-3 h-3 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">Scaling factor that sets the frequency range. Default 165.4 Hz for human cochlea.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="param-a"
                type="number"
                step="0.1"
                value={settings.A}
                onChange={(e) => updateSetting("A", parseFloat(e.target.value) || 165.4)}
                data-testid="input-greenwood-a"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="param-a-lower">a (Slope)</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-3 h-3 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">Controls exponential growth rate. Higher values = steeper frequency gradient. Default 2.1 for humans.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="param-a-lower"
                type="number"
                step="0.1"
                value={settings.a}
                onChange={(e) => updateSetting("a", parseFloat(e.target.value) || 2.1)}
                data-testid="input-greenwood-a-lower"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="param-k">k (Offset)</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-3 h-3 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">Baseline offset adjustment. Shifts the entire frequency map. Default 0.88 for human cochlea.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="param-k"
                type="number"
                step="0.01"
                value={settings.k}
                onChange={(e) => updateSetting("k", parseFloat(e.target.value) || 0.88)}
                data-testid="input-greenwood-k"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm">LED Configuration</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Number of LEDs: {settings.numLEDs}</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-3 h-3 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">Total LED count distributed along cochlea. Higher count = finer frequency resolution.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Slider
              value={[settings.numLEDs]}
              onValueChange={([value]) => updateSetting("numLEDs", value)}
              min={8}
              max={64}
              step={1}
              data-testid="slider-num-leds"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="cochlea-length">Cochlea Length (mm)</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-3 h-3 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">Physical length of cochlea spiral. Human cochlea ≈ 35mm. Used to calculate LED positions in mm.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="cochlea-length"
              type="number"
              value={settings.cochleaLengthMM}
              onChange={(e) => updateSetting("cochleaLengthMM", parseFloat(e.target.value) || 35)}
              data-testid="input-cochlea-length"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Frequency Range</h3>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">Defines detection range. Human hearing: 20-20,000 Hz. Used for color mapping and visualization bounds.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="freq-min">Min (Hz)</Label>
              <Input
                id="freq-min"
                type="number"
                value={settings.fMin}
                onChange={(e) => updateSetting("fMin", parseFloat(e.target.value) || 20)}
                data-testid="input-freq-min"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="freq-max">Max (Hz)</Label>
              <Input
                id="freq-max"
                type="number"
                value={settings.fMax}
                onChange={(e) => updateSetting("fMax", parseFloat(e.target.value) || 20000)}
                data-testid="input-freq-max"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm">LED Behavior</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Brightness: {(settings.ledBrightness * 100).toFixed(0)}%</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-3 h-3 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">Controls LED intensity. Scales with signal amplitude for visual feedback.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Slider
              value={[settings.ledBrightness * 100]}
              onValueChange={([value]) => updateSetting("ledBrightness", value / 100)}
              min={10}
              max={100}
              step={5}
              data-testid="slider-brightness"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="blink-duration">Blink Duration (ms)</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-3 h-3 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">How long LED stays lit after frequency detection. Shorter = more responsive, Longer = easier to see.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="blink-duration"
              type="number"
              value={settings.blinkDuration}
              onChange={(e) => updateSetting("blinkDuration", parseFloat(e.target.value) || 500)}
              data-testid="input-blink-duration"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
