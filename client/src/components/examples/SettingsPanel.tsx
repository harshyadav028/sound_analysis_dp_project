import SettingsPanel from "../SettingsPanel";
import { defaultGreenwoodSettings } from "@shared/schema";
import { useState } from "react";

export default function SettingsPanelExample() {
  const [settings, setSettings] = useState(defaultGreenwoodSettings);

  return <SettingsPanel settings={settings} onChange={setSettings} />;
}
