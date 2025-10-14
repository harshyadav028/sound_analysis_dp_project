import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Ear, Users } from "lucide-react";

export default function TheorySection() {
  return (
    <div className="space-y-6">
      <div className="aspect-video w-full max-w-4xl mx-auto">
        <iframe
          className="w-full h-full rounded-lg border border-border"
          src="https://www.youtube.com/embed/oRL0YXffU2I"
          title="Auditory Theory Animation"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          data-testid="iframe-theory-video"
        />
      </div>

      <Tabs defaultValue="place" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="place" data-testid="tab-place-theory">
            <Ear className="w-4 h-4 mr-2" />
            Place Theory
          </TabsTrigger>
          <TabsTrigger value="frequency" data-testid="tab-frequency-theory">
            <Brain className="w-4 h-4 mr-2" />
            Frequency Theory
          </TabsTrigger>
          <TabsTrigger value="volley" data-testid="tab-volley-theory">
            <Users className="w-4 h-4 mr-2" />
            Volley Theory
          </TabsTrigger>
        </TabsList>

        <TabsContent value="place" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Place Theory (Tonotopic Organization)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Place theory, proposed by Hermann von Helmholtz, states that different frequencies stimulate different
                locations along the basilar membrane of the cochlea. High frequencies cause maximum displacement at the
                base (near the oval window), while low frequencies cause maximum displacement at the apex.
              </p>
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Key Points:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>High frequencies (8,000-20,000 Hz): Detected at the cochlear base</li>
                  <li>Mid frequencies (500-8,000 Hz): Detected in the middle region</li>
                  <li>Low frequencies (20-500 Hz): Detected at the cochlear apex</li>
                  <li>Best explained by the Greenwood function mapping frequency to position</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frequency" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequency (Temporal) Theory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Frequency theory, proposed by Ernest Rutherford, suggests that the auditory system encodes frequency
                based on the rate at which auditory nerve fibers fire. Neurons fire in synchrony with the peaks of the
                sound wave, creating a temporal code for frequency.
              </p>
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Key Points:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Most accurate for low frequencies (&lt;1,000 Hz)</li>
                  <li>Neurons fire in phase-locked patterns matching the stimulus frequency</li>
                  <li>Limited by the refractory period of neurons (~1 ms)</li>
                  <li>Maximum firing rate: approximately 1,000 Hz</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="volley" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Volley Theory (Temporal Code Enhancement)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Volley theory, proposed by Wever and Bray, extends frequency theory by suggesting that groups of neurons
                work together to encode frequencies above 1,000 Hz. While individual neurons cannot fire fast enough,
                groups can take turns firing, creating a collective volley that matches higher frequencies.
              </p>
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Key Points:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Effective for mid-range frequencies (1,000-5,000 Hz)</li>
                  <li>Multiple neurons fire in rotation to encode higher frequencies</li>
                  <li>Combines temporal coding with neural cooperation</li>
                  <li>Bridges the gap between pure frequency and place coding</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Theory Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Frequency Range</th>
                  <th className="text-left p-3 font-medium">Dominant Theory</th>
                  <th className="text-left p-3 font-medium">Mechanism</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-muted/50">
                  <td className="p-3">20-500 Hz (Low)</td>
                  <td className="p-3">Frequency Theory</td>
                  <td className="p-3">Phase-locked neural firing</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">500-5,000 Hz (Mid)</td>
                  <td className="p-3">Volley Theory</td>
                  <td className="p-3">Cooperative neural volleys</td>
                </tr>
                <tr className="border-b bg-muted/50">
                  <td className="p-3">5,000-20,000 Hz (High)</td>
                  <td className="p-3">Place Theory</td>
                  <td className="p-3">Tonotopic location coding</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
