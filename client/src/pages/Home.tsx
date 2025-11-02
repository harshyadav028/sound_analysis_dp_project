import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BookOpen, Download, Play } from "lucide-react";
import FrequencyDisplay from "@/components/FrequencyDisplay";
import WaveformChart from "@/components/WaveformChart";
import SpectrumChart from "@/components/SpectrumChart";
import FrequencyTimeChart from "@/components/FrequencyTimeChart";
import RealTimeControls from "@/components/RealTimeControls";
import TheorySection from "@/components/TheorySection";
import AnimationSection from "@/components/3DAnimationSection";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import HearingTheoriesVisualization from "@/components/HearingTheoriesVisualization";
import { Ear } from "lucide-react";
export default function Home() {
  const [currentFrequency, setCurrentFrequency] = useState<number | null>(null);
  const [currentAmplitude, setCurrentAmplitude] = useState<number>(0.5);
  // Demo mode removed; only real-time analysis is supported
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "disconnected" | "connecting" | "connected" | "error"
  >("disconnected");

  const [waveformData, setWaveformData] = useState<
    Array<{ time: number; amplitude: number }>
  >([]);
  const [spectrumData, setSpectrumData] = useState<
    Array<{ frequency: number; magnitude: number }>
  >([]);
  const [freqTimeData, setFreqTimeData] = useState<
    Array<{ time: number; frequency: number }>
  >([]);
  const analyzingRef = useRef(false);

  // Clean up on unmount if analysis is running
  useEffect(() => {
    return () => {
      handleRealTimeStop();
    };
  }, []);

  const generateSineWave = (freq: number) => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      const time = (i / 100) * 200;
      const amplitude = Math.sin((2 * Math.PI * freq * time) / 1000);
      data.push({
        time: parseFloat(time.toFixed(1)),
        amplitude: parseFloat(amplitude.toFixed(3)),
      });
    }
    return data;
  };

  const generateSpectrum = (freq: number) => {
    return [
      { frequency: freq, magnitude: 45 },
      { frequency: freq * 2, magnitude: 32 },
      { frequency: freq * 3, magnitude: 18 },
      { frequency: freq / 2, magnitude: 12 },
    ];
  };

  // Demo handlers removed

  const handleRealTimeStart = async () => {
    console.log("Starting real-time microphone analysis");
    setIsAnalyzing(true);
    setConnectionStatus("connecting");
    analyzingRef.current = true;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setConnectionStatus("connected");

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 2048; // adjust for frequency resolution
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const timeDomainData = new Uint8Array(bufferLength);

      source.connect(analyser);

      let startTime = audioContext.currentTime;

      const update = () => {
        if (!analyzingRef.current) return;

        analyser.getByteFrequencyData(dataArray);
        analyser.getByteTimeDomainData(timeDomainData);

        // Compute dominant frequency (basic FFT peak detection)
        let maxIndex = 0;
        for (let i = 1; i < bufferLength; i++) {
          if (dataArray[i] > dataArray[maxIndex]) {
            maxIndex = i;
          }
        }
        const dominantFreq =
          (maxIndex * audioContext.sampleRate) / analyser.fftSize;

        // Update waveform and spectrum
        const waveform = Array.from(timeDomainData).map((val, i) => ({
          time: i,
          amplitude: (val - 128) / 128,
        }));

        const spectrum = Array.from(dataArray).map((val, i) => ({
          frequency: (i * audioContext.sampleRate) / analyser.fftSize,
          magnitude: (val / 255) * 100,
        }));

        // Estimate amplitude using RMS of time-domain waveform
        const rms = Math.sqrt(
          waveform.reduce((sum, p) => sum + p.amplitude * p.amplitude, 0) /
          waveform.length
        );

        setCurrentFrequency(Math.round(dominantFreq));
        setCurrentAmplitude(Number(rms.toFixed(3)));
        setWaveformData(waveform);
        setSpectrumData(spectrum);

        // Frequency vs time
        setFreqTimeData((prev) =>
          [
            ...prev,
            {
              time: audioContext.currentTime - startTime,
              frequency: dominantFreq,
            },
          ].slice(-100)
        ); // keep last 100 points

        requestAnimationFrame(update);
      };

      update();

      (window as any).audioContext = audioContext;
      (window as any).mediaStream = stream;
    } catch (err) {
      console.error("Microphone access error:", err);
      setConnectionStatus("error");
      setIsAnalyzing(false);
    }
  };

  const handleRealTimeStop = () => {
    console.log("Stopping real-time analysis");
    setIsAnalyzing(false);
    setConnectionStatus("disconnected");
    setCurrentFrequency(null);
    analyzingRef.current = false;

    if ((window as any).audioContext) {
      (window as any).audioContext.close();
      (window as any).audioContext = null;
    }

    if ((window as any).mediaStream) {
      (window as any).mediaStream
        .getTracks()
        .forEach((t: MediaStreamTrack) => t.stop());
      (window as any).mediaStream = null;
    }
  };

  const handleExport = () => {
    console.log("Export functionality triggered");
    const csvContent = freqTimeData
      .map((d) => `${d.time},${d.frequency}`)
      .join("\n");
    const blob = new Blob([`Time (s),Frequency (Hz)\n${csvContent}`], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "frequency_data.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-semibold">
                Sound Analyser
              </h1>
              <p className="text-xs text-muted-foreground">
                Auditory Theory Educational Tool
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              data-testid="button-export"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="visualizer" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-3xl mx-auto mb-8">
            <TabsTrigger value="visualizer" data-testid="tab-visualizer">
              <Activity className="w-4 h-4 mr-2" />
              Visualizer
            </TabsTrigger>
            <TabsTrigger value="theory" data-testid="tab-theory">
              <BookOpen className="w-4 h-4 mr-2" />
              Theory
            </TabsTrigger>
            <TabsTrigger value="animation" data-testid="tab-animation">
              <Play className="w-4 h-4 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="theories" data-testid="tab-theories">
              <Ear className="w-4 h-4 mr-2" />
              Animations 
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visualizer" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <FrequencyDisplay
                  frequency={currentFrequency}
                  amplitude={currentAmplitude}
                />
              </div>
              <div className="space-y-4">
                <RealTimeControls
                  isAnalyzing={isAnalyzing}
                  onStart={handleRealTimeStart}
                  onStop={handleRealTimeStop}
                  connectionStatus={connectionStatus}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <WaveformChart
                data={
                  waveformData.length > 0 ? waveformData : generateSineWave(440)
                }
              />
              <SpectrumChart
                data={
                  spectrumData.length > 0 ? spectrumData : generateSpectrum(440)
                }
              />
            </div>

            <div className="grid md:grid-cols-1 gap-6">
              <FrequencyTimeChart
                data={
                  freqTimeData.length > 0
                    ? freqTimeData
                    : [
                      { time: 0, frequency: 200 },
                      { time: 1, frequency: 500 },
                      { time: 2, frequency: 1000 },
                    ]
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="theory">
            <TheorySection />
          </TabsContent>

          <TabsContent value="animation">
            <AnimationSection />
          </TabsContent>
          <TabsContent value="theories">
            <HearingTheoriesVisualization />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Cochlea LED Visualizer - Educational tool for MBBS students and
            medical faculty
          </p>
          <p className="mt-1">
            Visualizing Place, Frequency (Temporal), and Volley theories of
            auditory perception
          </p>
        </div>
      </footer>
    </div>
  );
}
