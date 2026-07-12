/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!)
  : null;

export type EarlyAccessRow = {
  id?: string;
  email: string;
  source?: string;
  created_at?: string;
};

export async function submitEarlyAccessEmail(email: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  const payload = {
    email: email.trim().toLowerCase(),
    source: 'billy-green-landing',
  };

  // Insert only — avoid needing SELECT RLS for the round-trip
  const { error } = await supabase.from('early_access').insert(payload);

  if (error) {
    // Unique violation
    if (error.code === '23505') {
      throw new Error('This email is already on the early access list.');
    }
    // RLS / grants misconfigured
    if (error.code === '42501') {
      throw new Error(
        'Database blocked the signup (RLS). Re-run supabase/early_access.sql in the Supabase SQL Editor.',
      );
    }
    throw new Error(error.message);
  }

  return payload as EarlyAccessRow;
}
