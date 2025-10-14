import WaveformChart from "../WaveformChart";

const generateSineWave = (freq: number, samples: number) => {
  const data = [];
  for (let i = 0; i < samples; i++) {
    const time = (i / samples) * 200;
    const amplitude = Math.sin(2 * Math.PI * freq * time / 1000);
    data.push({ time: parseFloat(time.toFixed(1)), amplitude: parseFloat(amplitude.toFixed(3)) });
  }
  return data;
};

export default function WaveformChartExample() {
  return <WaveformChart data={generateSineWave(440, 100)} />;
}
