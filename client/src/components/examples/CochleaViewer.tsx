import CochleaViewer from "../CochleaViewer";
import { defaultGreenwoodSettings } from "@shared/schema";
import { useState, useEffect } from "react";

export default function CochleaViewerExample() {
  const [frequency, setFrequency] = useState<number | null>(null);

  useEffect(() => {
    const frequencies = [200, 500, 1000, 2000, 4000, 8000];
    let index = 0;

    const interval = setInterval(() => {
      setFrequency(frequencies[index % frequencies.length]);
      index++;
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <CochleaViewer
      settings={defaultGreenwoodSettings}
      currentFrequency={frequency}
      currentAmplitude={0.8}
    />
  );
}
