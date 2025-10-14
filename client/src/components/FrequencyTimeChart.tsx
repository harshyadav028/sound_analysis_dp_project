import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FrequencyTimeChartProps {
  data: Array<{ time: number; frequency: number }>;
}

export default function FrequencyTimeChart({ data }: FrequencyTimeChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Frequency vs Time (Tracking Chart)
        </CardTitle>
        <div className="mt-2 p-3 bg-primary/10 rounded-md space-y-2">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">What this shows:</span>{" "}
            How the main frequency changes over time (frequency history)
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">How to use it:</span>
          </p>
          <ul className="text-xs text-muted-foreground list-disc list-inside ml-2 space-y-1">
            <li><strong>Rising line:</strong> Frequency is increasing (pitch up)</li>
            <li><strong>Falling line:</strong> Frequency is decreasing (pitch down)</li>
            <li><strong>Flat line:</strong> Steady frequency (constant pitch)</li>
            <li><strong>Use cases:</strong> Track vocal pitch, tuning, sweeps</li>
          </ul>
          <p className="text-xs font-mono text-muted-foreground pt-2 border-t border-primary/20">
            f(t) = detected frequency at time t | Real-time tracking
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
                value: "Time (s)",
                position: "insideBottom",
                offset: -10,
                style: { fill: "#666", fontSize: 12 },
              }}
              tick={{ fontSize: 10, fill: "#666" }}
              interval="preserveEnd"
            />
            <YAxis
              label={{
                value: "Frequency (Hz)",
                angle: -90,
                position: "insideLeft",
                style: { fill: "#666", fontSize: 12 },
              }}
              tick={{ fontSize: 10, fill: "#666" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.85)",
                border: "1px solid #333",
                borderRadius: "6px",
                color: "#fff",
              }}
              formatter={(value: number) => [`${value.toFixed(2)} Hz`, "Frequency"]}
              labelFormatter={(label) => `Time: ${label}s`}
            />
            <Line
              type="stepAfter"
              dataKey="frequency"
              stroke="hsl(var(--chart-4))"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
