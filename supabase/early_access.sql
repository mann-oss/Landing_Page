-- Early access waitlist for Billy Green landing page.
-- Run in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/wpzopkigbbldcfpxuvcm/sql/new

create extension if not exists "pgcrypto";

create table if not exists public.early_access (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text default 'billy-green-landing',
  created_at timestamptz not null default now(),
  constraint early_access_email_unique unique (email)
);

alter table public.early_access enable row level security;

-- Drop old policies if re-running
drop policy if exists "Anyone can join early access" on public.early_access;
drop policy if exists "anon insert early access" on public.early_access;
drop policy if exists "public insert early access" on public.early_access;

-- Allow inserts from publishable / anon client keys
create policy "public insert early access"
  on public.early_access
  for insert
  to public
  with check (true);

grant usage on schema public to anon, authenticated, service_role;
grant insert on table public.early_access to anon, authenticated, service_role;
grant select on table public.early_access to service_role;
