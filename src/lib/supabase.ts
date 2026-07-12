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

  const { data, error } = await supabase
    .from('early_access')
    .insert({
      email: email.trim().toLowerCase(),
      source: 'billy-green-landing',
    })
    .select()
    .single();

  if (error) throw error;
  return data as EarlyAccessRow;
}
