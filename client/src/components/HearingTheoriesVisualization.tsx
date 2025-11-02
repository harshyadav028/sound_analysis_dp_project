import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

export default function HearingTheoriesVisualization() {
  const [currentTheory, setCurrentTheory] = useState('place');
  const [frequency, setFrequency] = useState(1000);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  const getFreqLabel = () => {
    if (frequency < 500) return "Low Frequency (Bass)";
    if (frequency < 2000) return "Mid Frequency";
    if (frequency < 5000) return "High-Mid Frequency";
    return "High Frequency (Treble)";
  };

  const theories = {
    place: {
      title: "Place Theory (Helmholtz, 1863)",
      description: "Different sound frequencies stimulate different locations along the basilar membrane. High frequencies activate the base (near oval window), while low frequencies activate the apex. This explains pitch perception for frequencies above 5000 Hz.",
      detail: "The basilar membrane is tonotopically organized - it acts like a series of tuned resonators. Each location responds maximally to a specific frequency."
    },
    frequency: {
      title: "Frequency Theory (Rutherford, 1886)",
      description: "Neural impulses match the frequency of the sound wave. A 500 Hz tone produces 500 neural impulses per second. This works well for low frequencies (below 1000 Hz) but fails at higher frequencies due to the neuron's refractory period.",
      detail: "Individual neurons can fire up to about 1000 times per second, limiting this theory's applicability to low-frequency sounds."
    },
    volley: {
      title: "Volley Theory (Wever & Bray, 1930)",
      description: "Groups of neurons work together, firing in volleys or teams. While no single neuron can fire fast enough for high frequencies, groups alternate firing to match the frequency. This bridges the gap between 1000-5000 Hz.",
      detail: "Multiple neurons take turns firing, like runners in a relay race. Together they can encode frequencies higher than any individual neuron could manage."
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationTime = 0;

    const drawCochlea = () => {
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(50, 250);
      ctx.lineTo(1050, 250);
      ctx.stroke();

      for (let x = 50; x < 1050; x += 20) {
        const thickness = 5 + ((x - 50) / 1000) * 15;
        ctx.fillStyle = '#666';
        ctx.fillRect(x, 250 - thickness/2, 15, thickness);
      }

      ctx.fillStyle = '#000';
      ctx.font = 'bold 16px Arial';
      ctx.fillText('Base (Oval Window)', 50, 230);
      ctx.fillText('High Freq', 50, 210);
      ctx.fillText('Apex', 970, 230);
      ctx.fillText('Low Freq', 970, 210);
    };

    const drawPlaceTheory = () => {
      drawCochlea();
      const minFreq = 100;
      const maxFreq = 8000;
      const position = 50 + (1 - (Math.log(frequency) - Math.log(minFreq)) / (Math.log(maxFreq) - Math.log(minFreq))) * 1000;
      
      const pulseSize = 30 + Math.sin(animationTime * 0.1) * 10;
      const gradient = ctx.createRadialGradient(position, 250, 0, position, 250, pulseSize);
      
      if (frequency < 2000) {
        gradient.addColorStop(0, 'rgba(149, 225, 211, 1)');
        gradient.addColorStop(1, 'rgba(149, 225, 211, 0)');
      } else if (frequency < 5000) {
        gradient.addColorStop(0, 'rgba(78, 205, 196, 1)');
        gradient.addColorStop(1, 'rgba(78, 205, 196, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(255, 107, 107, 1)');
        gradient.addColorStop(1, 'rgba(255, 107, 107, 0)');
      }
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(position, 250, pulseSize, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 200, 0, 0.8)';
      ctx.lineWidth = 3;
      for (let i = 0; i < 3; i++) {
        const waveAmplitude = 40 * (1 - i * 0.3);
        ctx.beginPath();
        for (let x = -50; x < 50; x += 2) {
          const dist = Math.abs(x);
          const y = Math.sin((x * 0.1) - (animationTime * 0.2)) * waveAmplitude * Math.exp(-dist * 0.02);
          if (x === -50) {
            ctx.moveTo(position + x, 250 + y);
          } else {
            ctx.lineTo(position + x, 250 + y);
          }
        }
        ctx.stroke();
      }

      ctx.fillStyle = '#000';
      ctx.font = 'bold 18px Arial';
      ctx.fillText(`Activation at ${frequency} Hz`, position - 80, 320);
    };

    const drawFrequencyTheory = () => {
      drawCochlea();
      const neuronY = 350;
      const neuronCount = 8;
      const spacing = 1000 / neuronCount;
      
      ctx.fillStyle = '#000';
      ctx.font = 'bold 16px Arial';
      ctx.fillText('Hair Cells & Neurons', 450, 330);
      
      for (let i = 0; i < neuronCount; i++) {
        const x = 100 + i * spacing;
        ctx.fillStyle = '#666';
        ctx.beginPath();
        ctx.arc(x, neuronY, 15, 0, Math.PI * 2);
        ctx.fill();
        
        const firingPhase = (animationTime * frequency / 100) % (2 * Math.PI);
        if (Math.sin(firingPhase) > 0.5) {
          ctx.fillStyle = '#ffe66d';
          ctx.beginPath();
          ctx.arc(x, neuronY, 15, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.strokeStyle = '#ff6b6b';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(x, neuronY);
          ctx.lineTo(x, neuronY + 60);
          ctx.stroke();
          
          ctx.fillStyle = '#ff6b6b';
          ctx.beginPath();
          ctx.arc(x, neuronY + 60, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.strokeStyle = '#4ecdc4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 50; x < 1050; x += 5) {
        const y = 450 + Math.sin((x * 0.05) - (animationTime * frequency / 100)) * 30;
        if (x === 50) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.fillText('Neural firing rate matches sound frequency', 380, 440);
    };

    const drawVolleyTheory = () => {
      drawCochlea();
      const neuronY = 350;
      const groups = 4;
      const neuronsPerGroup = 3;
      const groupSpacing = 220;
      
      ctx.fillStyle = '#000';
      ctx.font = 'bold 16px Arial';
      ctx.fillText(' Volleys', 450, 330);
      
      for (let g = 0; g < groups; g++) {
        const groupX = 150 + g * groupSpacing;
        const groupPhase = (g / groups) * (2 * Math.PI);
        const firingPhase = ((animationTime * frequency / 100) + groupPhase) % (2 * Math.PI);
        const isGroupFiring = Math.sin(firingPhase) > 0.5;
        
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.fillText(`Group ${g + 1}`, groupX - 20, neuronY - 25);
        
        for (let n = 0; n < neuronsPerGroup; n++) {
          const x = groupX + (n - 1) * 30;
          ctx.fillStyle = isGroupFiring ? '#ffe66d' : '#999';
          ctx.beginPath();
          ctx.arc(x, neuronY, 12, 0, Math.PI * 2);
          ctx.fill();
          
          if (isGroupFiring) {
            ctx.strokeStyle = '#ff6b6b';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x, neuronY);
            ctx.lineTo(x, neuronY + 50);
            ctx.stroke();
            
            ctx.fillStyle = '#ff6b6b';
            ctx.beginPath();
            ctx.arc(x, neuronY + 50, 4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.strokeStyle = '#4ecdc4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 50; x < 1050; x += 5) {
        const y = 450 + Math.sin((x * 0.05) - (animationTime * frequency / 100)) * 30;
        if (x === 50) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.fillText('Groups alternate to encode higher frequencies', 360, 440);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      switch(currentTheory) {
        case 'place':
          drawPlaceTheory();
          break;
        case 'frequency':
          drawFrequencyTheory();
          break;
        case 'volley':
          drawVolleyTheory();
          break;
      }
      
      animationTime++;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentTheory, frequency]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔊 Theories of Pitch Perception in the Cochlea
          </CardTitle>
          <CardDescription>
            Interactive visualization of how the ear encodes sound frequency
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="theory-select">Select Theory</Label>
              <Select value={currentTheory} onValueChange={setCurrentTheory}>
                <SelectTrigger id="theory-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="place">Place Theory (Helmholtz)</SelectItem>
                  <SelectItem value="frequency">Frequency Theory (Rutherford)</SelectItem>
                  <SelectItem value="volley">Volley Theory (Wever)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="freq-slider">
                Sound Frequency: <span className="font-bold text-primary">{frequency} Hz</span>
              </Label>
              <Slider
                id="freq-slider"
                min={100}
                max={8000}
                step={100}
                value={[frequency]}
                onValueChange={(value) => setFrequency(value[0])}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground text-center mt-2">
                {getFreqLabel()}
              </p>
            </div>
          </div>

          {/* Canvas */}
          <div className="bg-muted/30 rounded-lg p-4">
            <canvas
              ref={canvasRef}
              width={1100}
              height={500}
              className="w-full rounded-lg bg-background"
            />
          </div>

          {/* Theory Information */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">
                {theories[currentTheory as keyof typeof theories].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-medium">
                {theories[currentTheory as keyof typeof theories].description}
              </p>
              <p className="text-sm text-muted-foreground">
                {theories[currentTheory as keyof typeof theories].detail}
              </p>
            </CardContent>
          </Card>

          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <LegendItem color="bg-red-400" label="High Frequency Area" />
            <LegendItem color="bg-teal-400" label="Mid Frequency Area" />
            <LegendItem color="bg-teal-300" label="Low Frequency Area" />
            <LegendItem color="bg-yellow-400" label="Active Neurons" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-6 h-6 ${color} rounded border-2 border-border`} />
      <span className="text-sm">{label}</span>
    </div>
  );
}