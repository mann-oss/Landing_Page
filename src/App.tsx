/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import SplitLanding, { FlavorMode } from './components/SplitLanding';

export default function App() {
  const [mode, setMode] = useState<FlavorMode>('split');

  return (
    <div className="relative min-h-screen bg-[#05070a] overflow-x-hidden">
      <SplitLanding mode={mode} onModeChange={setMode} />
    </div>
  );
}
