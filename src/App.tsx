/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import SplitLanding, { FlavorMode } from './components/SplitLanding';
import PitchDeck from './pitch/PitchDeck';

export default function App() {
  const [mode, setMode] = useState<FlavorMode>('split');
  const [showPitch, setShowPitch] = useState(false);

  if (showPitch) {
    return <PitchDeck onClose={() => setShowPitch(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-[#05070a]">
      <SplitLanding
        mode={mode}
        onModeChange={setMode}
        onOpenPitch={() => setShowPitch(true)}
      />
    </div>
  );
}
