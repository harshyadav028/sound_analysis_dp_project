import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface WaveformChartProps {
  data: Array<{ time: number; amplitude: number }>;
}

export default function WaveformChart({ data }: WaveformChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Waveform (Time Domain)</CardTitle>
        <div className="mt-2 p-3 bg-primary/10 rounded-md space-y-2">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">What this shows:</span> The raw sound wave pattern over time
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">How to use it:</span>
          </p>
          <ul className="text-xs text-muted-foreground list-disc list-inside ml-2 space-y-1">
            <li><strong>Y-axis (Amplitude):</strong> Higher peaks = louder sound</li>
            <li><strong>X-axis (Time):</strong> Shows sound variation over time</li>
            <li><strong>Wave shape:</strong> Smooth = pure tones, jagged = complex</li>
          </ul>
          <p className="text-xs font-mono text-muted-foreground pt-2 border-t border-primary/20">
            Formula: y(t) = A · sin(2πft + φ)
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 10, right: 10, bottom: 25, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="time"
              label={{
                value: "Time (ms)",
                position: "insideBottom",
                offset: -10,
                style: { fill: "#666", fontSize: 12 },
              }}
              tick={{ fontSize: 10, fill: "#666" }}
            />
            <YAxis
              label={{
                value: "Amplitude",
                angle: -90,
                position: "insideLeft",
                style: { fill: "#666", fontSize: 12 },
              }}
              tick={{ fontSize: 10, fill: "#666" }}
              domain={[-1, 1]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.85)",
                border: "1px solid #333",
                borderRadius: "6px",
                color: "#fff",
              }}
              formatter={(value: number) => [value.toFixed(2), "Amplitude"]}
              labelFormatter={(label) => `Time: ${label} ms`}
            />
            <Line
              type="monotone"
              dataKey="amplitude"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
