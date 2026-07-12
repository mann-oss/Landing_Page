-- FIX: allow landing-page inserts (run this in SQL Editor)
-- https://supabase.com/dashboard/project/wpzopkigbbldcfpxuvcm/sql/new

create extension if not exists "pgcrypto";

create table if not exists public.early_access (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text default 'billy-green-landing',
  created_at timestamptz not null default now(),
  constraint early_access_email_unique unique (email)
);

-- Grants (required for publishable / anon key)
grant usage on schema public to anon, authenticated, service_role;
grant insert, select on table public.early_access to anon, authenticated, service_role;

alter table public.early_access enable row level security;

drop policy if exists "Anyone can join early access" on public.early_access;
drop policy if exists "anon insert early access" on public.early_access;
drop policy if exists "public insert early access" on public.early_access;
drop policy if exists "allow_anon_insert" on public.early_access;
drop policy if exists "allow_anon_select" on public.early_access;

-- Permissive insert for browser clients (no role filter)
create policy "allow_anon_insert"
  on public.early_access
  for insert
  with check (true);

-- Needed because the app reads the row back after insert
create policy "allow_anon_select"
  on public.early_access
  for select
  using (true);
