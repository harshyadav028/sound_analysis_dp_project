import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface FFTSpectrumProps {
  data: Array<{ frequency: number; magnitude: number }>;
}

export default function FFTSpectrum({ data }: FFTSpectrumProps) {
  // Generate FFT spectrum bins
  const processSpectrum = () => {
    const bins = 64;
    const maxFreq = 3200;
    const binSize = maxFreq / bins;

    const spectrum = Array.from({ length: bins }, (_, i) => ({
      freq: Math.round(i * binSize),
      magnitude: 0,
      index: i,
    }));

    data.forEach(point => {
      const binIndex = Math.floor(point.frequency / binSize);
      if (binIndex >= 0 && binIndex < bins) {
        spectrum[binIndex].magnitude += point.magnitude;
      }
    });

    const maxMag = Math.max(...spectrum.map(b => b.magnitude), 1);
    return spectrum.map(b => ({
      ...b,
      magnitude: (b.magnitude / maxMag) * 100,
    }));
  };

  const spectrumData = processSpectrum();

  // Uniform red color for all bars
  const barColor = "#ef4444"; // Tailwind's red-500

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Frequency Spectrum (FFT)</span>
          <span className="text-xs font-normal px-2 py-1 bg-blue-500 text-white rounded">
            Real-Time | Logarithmic
          </span>
        </CardTitle>
        <div className="mt-2 p-3 bg-primary/10 rounded-md">
          <p className="text-sm text-muted-foreground mb-1">
            <strong>What it shows:</strong> Frequency energy distribution across time — each bar represents sound power at that frequency.
          </p>
          <ul className="text-xs text-muted-foreground list-disc list-inside ml-2 space-y-1">
            <li><strong>Low frequencies (0–300 Hz):</strong> Heartbeats, deep rumbles</li>
            <li><strong>Midrange (300–1000 Hz):</strong> Breathing, voice harmonics</li>
            <li><strong>High (1000–3200 Hz):</strong> Wheezes, fine crackles</li>
            <li><strong>Interpretation:</strong> Taller bars = stronger presence in that range</li>
          </ul>
          <p className="text-xs font-mono text-muted-foreground pt-2 border-t border-primary/20">
            FFT Analysis | Amplitude vs Frequency (dB scaled)
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={spectrumData}
            margin={{ top: 10, right: 10, bottom: 25, left: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="freq"
              label={{
                value: "Frequency (Hz)",
                position: "insideBottom",
                offset: -10,
                style: { fill: '#666', fontSize: 12 },
              }}
              tick={{ fontSize: 10, fill: '#666' }}
              interval={7}
            />
            <YAxis
              label={{
                value: "Magnitude (%)",
                angle: -90,
                position: "insideLeft",
                style: { fill: '#666', fontSize: 12 },
              }}
              tick={{ fontSize: 10, fill: '#666' }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.85)",
                border: "1px solid #333",
                borderRadius: "6px",
                color: "#fff",
              }}
              formatter={(value: number) => [`${value.toFixed(1)}%`, "Amplitude"]}
              labelFormatter={(label) => `Frequency: ${label} Hz`}
            />
            <Bar dataKey="magnitude" radius={[2, 2, 0, 0]} maxBarSize={12}>
              {spectrumData.map((_, i) => (
                <Cell key={`cell-${i}`} fill={barColor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
