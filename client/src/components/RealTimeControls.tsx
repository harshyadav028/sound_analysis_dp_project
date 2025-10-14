import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radio, Square, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RealTimeControlsProps {
  isAnalyzing: boolean;
  onStart: () => void;
  onStop: () => void;
  connectionStatus: "disconnected" | "connecting" | "connected" | "error";
}

export default function RealTimeControls({
  isAnalyzing,
  onStart,
  onStop,
  connectionStatus,
}: RealTimeControlsProps) {
  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "text-green-600 dark:text-green-400";
      case "connecting":
        return "text-yellow-600 dark:text-yellow-400";
      case "error":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case "connected":
        return "Connected to hardware";
      case "connecting":
        return "Connecting...";
      case "error":
        return "Connection failed";
      default:
        return "Not connected";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radio className="w-5 h-5" />
          Real-Time Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Connect your frequency detection hardware via WebSocket to analyze live audio signals in real-time
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <div className={`text-sm font-medium ${getStatusColor()}`}>
            Status: {getStatusText()}
          </div>

          {isAnalyzing ? (
            <Button
              variant="destructive"
              onClick={onStop}
              className="w-full"
              data-testid="button-stop-analysis"
            >
              <Square className="w-4 h-4 mr-2" />
              Stop Analysis
            </Button>
          ) : (
            <Button
              onClick={onStart}
              className="w-full"
              data-testid="button-start-analysis"
            >
              <Radio className="w-4 h-4 mr-2" />
              Start Real-Time Analysis
            </Button>
          )}
        </div>

        <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
          <p className="font-medium">What happens when you start:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Connects to hardware device</li>
            <li>Displays live frequency data</li>
            <li>Updates all graphs in real-time</li>
            <li>Records data for export</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
