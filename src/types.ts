/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ChatMessage {
  id: string;
  sender: 'user' | 'billy';
  text: string;
  timestamp: string;
}

export interface SmartAlert {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'info' | 'success';
  time: string;
  active: boolean;
}

export interface DayMission {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
}

export interface ExternalInputVars {
  marketTrend: number; // slider -50% to +50%
  politicalEvent: string; // 'stable' | 'tense' | 'election'
  inflationValue: number; // 2% to 15%
  globalIndices: 'bull' | 'bear' | 'flat';
}
