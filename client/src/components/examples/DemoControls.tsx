import DemoControls from "../DemoControls";
import { useState } from "react";

export default function DemoControlsExample() {
  const [frequency, setFrequency] = useState(440);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <DemoControls
      frequency={frequency}
      onFrequencyChange={setFrequency}
      isPlaying={isPlaying}
      onStart={(type) => setIsPlaying(true)}
      onStop={() => setIsPlaying(false)}
    />
  );
}
