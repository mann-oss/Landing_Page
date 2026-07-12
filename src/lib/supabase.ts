/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(
  url?.startsWith('http') && anonKey && anonKey.length > 10,
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!)
  : null;

export type EarlyAccessRow = {
  id?: string;
  email: string;
  source?: string;
  created_at?: string;
};

/** Safe codes the UI can map — never leak infra details to users */
export type EarlyAccessErrorCode =
  | 'duplicate'
  | 'unavailable'
  | 'invalid';

export class EarlyAccessError extends Error {
  code: EarlyAccessErrorCode;

  constructor(code: EarlyAccessErrorCode) {
    super(code);
    this.code = code;
    this.name = 'EarlyAccessError';
  }
}

export async function submitEarlyAccessEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  if (!normalized.includes('@')) {
    throw new EarlyAccessError('invalid');
  }

  if (!supabase) {
    console.error('[early-access] Supabase client is not configured');
    throw new EarlyAccessError('unavailable');
  }

  const payload = {
    email: normalized,
    source: 'billy-green-landing',
  };

  const { error } = await supabase.from('early_access').insert(payload);

  if (error) {
    console.error('[early-access] insert failed', error.code, error.message);
    if (error.code === '23505') {
      throw new EarlyAccessError('duplicate');
    }
    throw new EarlyAccessError('unavailable');
  }

  return payload as EarlyAccessRow;
}

export function earlyAccessUserMessage(code: EarlyAccessErrorCode): string {
  switch (code) {
    case 'duplicate':
      return 'This email is already on the list.';
    case 'invalid':
      return 'Please enter a valid email address.';
    case 'unavailable':
    default:
      return 'Something went wrong. Please try again in a moment.';
  }
}
