import SpectrumChart from "../SpectrumChart";

const mockData = [
  { frequency: 50, magnitude: 12 },
  { frequency: 100, magnitude: 8 },
  { frequency: 200, magnitude: 6 },
  { frequency: 440, magnitude: 45 },
  { frequency: 880, magnitude: 32 },
  { frequency: 1320, magnitude: 18 },
  { frequency: 2000, magnitude: 10 },
  { frequency: 5000, magnitude: 5 },
  { frequency: 10000, magnitude: 3 },
];

export default function SpectrumChartExample() {
  return <SpectrumChart data={mockData} logScale={true} />;
}
