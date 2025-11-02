import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Target, Lightbulb, BookOpen } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SoundEducationPanel() {
  const cochlearRegions = [
    {
      region: "Cochlear Base",
      frequency: "8,000 - 20,000 Hz",
      description: "Thick and stiff portion near the oval window",
      structures: "High-frequency hair cells, short basilar membrane fibers",
      clinical: "Damage causes high-frequency hearing loss (common in aging, noise exposure)",
      theory: "Place Theory",
      color: "rgb(253, 231, 37)", // Yellow (viridis high-freq)
    },
    {
      region: "Middle Region",
      frequency: "500 - 8,000 Hz",
      description: "Transitional area with medium characteristics",
      structures: "Mid-range hair cells, speech frequencies (250-8000 Hz critical for speech)",
      clinical: "Impacts speech comprehension, especially consonant discrimination",
      theory: "Place + Volley Theory",
      color: "rgb(53, 183, 121)", // Green-cyan (viridis mid-freq)
    },
    {
      region: "Cochlear Apex",
      frequency: "20 - 500 Hz",
      description: "Thin and flexible tip of the spiral",
      structures: "Low-frequency hair cells, long basilar membrane fibers",
      clinical: "Damage rare; typically preserved until late-stage hearing loss",
      theory: "Frequency/Temporal Theory",
      color: "rgb(68, 1, 84)", // Purple (viridis low-freq)
    },
  ];

  const clinicalScenarios = [
    {
      condition: "Presbycusis (Age-related Hearing Loss)",
      frequencies: "High frequencies first (4-8 kHz), progressing downward",
      mechanism: "Apical progression of hair cell loss starting at cochlear base",
      presentation: "Difficulty hearing consonants, background noise, tinnitus",
    },
    {
      condition: "Noise-Induced Hearing Loss",
      frequencies: "3-6 kHz (notch pattern)",
      mechanism: "Mechanical trauma to outer hair cells at specific tonotopic locations",
      presentation: "Difficulty in noisy environments, sounds muffled",
    },
    {
      condition: "Ototoxic Drug Effects",
      frequencies: "High frequencies (variable, depends on drug)",
      mechanism: "Cochlear hair cell apoptosis, particularly affecting high-freq regions",
      presentation: "Bilateral progressive hearing loss, may include tinnitus",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Tonotopic Organization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Tonotopic Organization of the Cochlea
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The cochlea is organized tonotopically - different frequencies are encoded at specific anatomical locations
            along the basilar membrane. This spatial coding is crucial for understanding hearing loss patterns.
          </p>

          <div className="space-y-3">
            {cochlearRegions.map((region, idx) => (
              <div key={idx} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: region.color }}
                  />
                  <h4 className="font-semibold text-sm">{region.region}</h4>
                  <span className="text-xs text-muted-foreground">({region.frequency})</span>
                </div>
                <p className="text-xs text-muted-foreground">{region.description}</p>
                <div className="grid md:grid-cols-2 gap-2 mt-2">
                  <div className="bg-muted/50 p-2 rounded text-xs">
                    <p className="font-medium mb-1">Structures:</p>
                    <p className="text-muted-foreground">{region.structures}</p>
                  </div>
                  <div className="bg-muted/50 p-2 rounded text-xs">
                    <p className="font-medium mb-1">Clinical Significance:</p>
                    <p className="text-muted-foreground">{region.clinical}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <BookOpen className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium text-primary">{region.theory}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clinical Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Clinical Hearing Loss Patterns
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Understanding tonotopic organization helps predict hearing loss patterns and select appropriate interventions.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {clinicalScenarios.map((scenario, idx) => (
              <div key={idx} className="border-l-4 border-primary/30 pl-4 space-y-2">
                <h4 className="font-semibold text-sm">{scenario.condition}</h4>
                <div className="text-xs space-y-1">
                  <div>
                    <span className="font-medium">Affected Frequencies: </span>
                    <span className="text-muted-foreground">{scenario.frequencies}</span>
                  </div>
                  <div>
                    <span className="font-medium">Mechanism: </span>
                    <span className="text-muted-foreground">{scenario.mechanism}</span>
                  </div>
                  <div>
                    <span className="font-medium">Clinical Presentation: </span>
                    <span className="text-muted-foreground">{scenario.presentation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Objectives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Learning Objectives for MBBS Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Anatomical Understanding</h4>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside ml-2">
                <li>Map frequencies to cochlear locations</li>
                <li>Understand basilar membrane mechanics</li>
                <li>Identify hair cell distribution patterns</li>
                <li>Relate structure to tonotopic organization</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Clinical Application</h4>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside ml-2">
                <li>Interpret audiometric patterns</li>
                <li>Predict hearing loss progression</li>
                <li>Understand rehabilitation strategies</li>
                <li>Counsel patients effectively</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Physiological Mechanisms</h4>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside ml-2">
                <li>Explain three theories of pitch coding</li>
                <li>Understand neural coding principles</li>
                <li>Describe hair cell transduction</li>
                <li>Relate mechanics to perception</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Practical Skills</h4>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside ml-2">
                <li>Use sound generator for demonstrations</li>
                <li>Analyze spectrum data</li>
                <li>Identify frequency characteristics</li>
                <li>Connect theory to clinical cases</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

