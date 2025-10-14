import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FrequencyDisplayProps {
  frequency: number | null;
  amplitude?: number;
}

export default function FrequencyDisplay({ frequency, amplitude }: FrequencyDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Current Frequency</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-mono font-semibold text-foreground" data-testid="text-frequency-value">
            {frequency !== null ? frequency.toFixed(1) : "—"}
          </span>
          <span className="text-xl text-muted-foreground">Hz</span>
        </div>
        {amplitude !== undefined && (
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-sm text-muted-foreground">Amplitude:</span>
            <span className="text-lg font-mono font-medium" data-testid="text-amplitude-value">
              {(amplitude * 100).toFixed(0)}%
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
