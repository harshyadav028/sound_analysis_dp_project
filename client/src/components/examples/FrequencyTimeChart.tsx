import FrequencyTimeChart from "../FrequencyTimeChart";

const mockData = [
  { time: 0, frequency: 200 },
  { time: 1, frequency: 500 },
  { time: 2, frequency: 1000 },
  { time: 3, frequency: 2000 },
  { time: 4, frequency: 4000 },
  { time: 5, frequency: 8000 },
  { time: 6, frequency: 4000 },
  { time: 7, frequency: 1000 },
];

export default function FrequencyTimeChartExample() {
  return <FrequencyTimeChart data={mockData} />;
}
