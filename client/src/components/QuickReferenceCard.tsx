import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, BookOpen, Target } from "lucide-react";

export default function QuickReferenceCard() {
  const humanHearing = [
    { range: "20 - 500 Hz", label: "Low frequencies", location: "Apex", theory: "Frequency Theory" },
    { range: "500 - 4,000 Hz", label: "Speech frequencies", location: "Mid-base", theory: "Volley Theory" },
    { range: "4,000 - 8,000 Hz", label: "Consonant clarity", location: "Base", theory: "Place Theory" },
    { range: "8,000 - 20,000 Hz", label: "High frequencies", location: "Base", theory: "Place Theory" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Quick Reference: Human Hearing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {humanHearing.map((item, idx) => (
            <div key={idx} className="border-b last:border-b-0 pb-3 last:pb-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Target className="w-3 h-3 text-primary" />
                  <span className="font-semibold text-sm">{item.range}</span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">{item.theory}</span>
              </div>
              <p className="text-xs text-muted-foreground">{item.label} · Cochlear {item.location}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-primary mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium mb-1">Tip for MBBS Students:</p>
              <p>
                Hearing loss patterns follow tonotopic organization. High-frequency loss (presbycusis) affects
                consonant perception and speech clarity, even when low-frequency hearing remains intact.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

