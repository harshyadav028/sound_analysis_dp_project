import { useEffect, useRef, useState } from "react";
import { GreenwoodSettings } from "@shared/schema";
import { frequencyToLEDIndex, ledIndexToBestFrequency, frequencyToPosition, getViridisColor } from "@/lib/greenwood";
import { Card } from "@/components/ui/card";

interface CochleaViewerProps {
  settings: GreenwoodSettings;
  currentFrequency: number | null;
  currentAmplitude?: number;
}

export default function CochleaViewer({ settings, currentFrequency, currentAmplitude = 0.5 }: CochleaViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredLED, setHoveredLED] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [activeLED, setActiveLED] = useState<number | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (currentFrequency !== null) {
      const ledIndex = frequencyToLEDIndex(currentFrequency, settings);
      setActiveLED(ledIndex);
      
      const timeout = setTimeout(() => {
        setActiveLED(null);
      }, settings.blinkDuration);
      
      return () => clearTimeout(timeout);
    }
  }, [currentFrequency, settings]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    const drawCochlea = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "hsl(220 15% 80%)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      const turns = 2.5;
      const startRadius = 120;
      const endRadius = 20;
      
      for (let i = 0; i <= 100; i++) {
        const t = i / 100;
        const angle = t * turns * 2 * Math.PI;
        const radius = startRadius - (startRadius - endRadius) * t;
        const x = centerX + radius * Math.cos(angle - Math.PI / 2);
        const y = centerY + radius * Math.sin(angle - Math.PI / 2);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      for (let i = 0; i < settings.numLEDs; i++) {
        const t = i / (settings.numLEDs - 1);
        const angle = t * turns * 2 * Math.PI;
        const radius = startRadius - (startRadius - endRadius) * t;
        const x = centerX + radius * Math.cos(angle - Math.PI / 2);
        const y = centerY + radius * Math.sin(angle - Math.PI / 2);

        const isActive = activeLED === i;
        const isHovered = hoveredLED === i;
        const frequency = ledIndexToBestFrequency(i, settings);
        const color = getViridisColor(frequency, settings);

        ctx.beginPath();
        ctx.arc(x, y, isActive ? 10 : (isHovered ? 8 : 6), 0, 2 * Math.PI);
        
        if (isActive) {
          ctx.fillStyle = color;
          ctx.globalAlpha = settings.ledBrightness * currentAmplitude;
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.stroke();
        } else if (isHovered) {
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.5;
          ctx.fill();
          ctx.globalAlpha = 1;
        } else {
          ctx.strokeStyle = "hsl(220 15% 60%)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    const animate = () => {
      drawCochlea();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [settings, activeLED, hoveredLED, currentAmplitude]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const turns = 2.5;
    const startRadius = 120;
    const endRadius = 20;

    let foundLED = null;

    for (let i = 0; i < settings.numLEDs; i++) {
      const t = i / (settings.numLEDs - 1);
      const angle = t * turns * 2 * Math.PI;
      const radius = startRadius - (startRadius - endRadius) * t;
      const ledX = centerX + radius * Math.cos(angle - Math.PI / 2);
      const ledY = centerY + radius * Math.sin(angle - Math.PI / 2);

      const distance = Math.sqrt((x - ledX) ** 2 + (y - ledY) ** 2);
      if (distance < 10) {
        foundLED = i;
        setTooltipPos({ x: e.clientX, y: e.clientY });
        break;
      }
    }

    setHoveredLED(foundLED);
  };

  const handleMouseLeave = () => {
    setHoveredLED(null);
    setTooltipPos(null);
  };

  return (
    <div className="relative">
      <Card className="bg-card p-6">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="w-full h-auto cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          data-testid="canvas-cochlea"
        />
      </Card>

      {hoveredLED !== null && tooltipPos && (
        <div
          className="fixed z-50 bg-popover border border-popover-border text-popover-foreground px-3 py-2 rounded-md shadow-lg text-sm"
          style={{
            left: tooltipPos.x + 10,
            top: tooltipPos.y + 10,
          }}
        >
          <div className="font-medium">LED #{hoveredLED}</div>
          <div className="text-muted-foreground mt-1">
            Position: {frequencyToPosition(ledIndexToBestFrequency(hoveredLED, settings), settings).toFixed(1)} mm (
            {((hoveredLED / (settings.numLEDs - 1)) * 100).toFixed(0)}%)
          </div>
          <div className="text-muted-foreground">
            Best Frequency: {ledIndexToBestFrequency(hoveredLED, settings).toFixed(0)} Hz
          </div>
        </div>
      )}
    </div>
  );
}
