-- Leads table for the /admin panel.
-- Run once in Supabase → SQL Editor → New query → paste → Run.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null default '',
  email text not null default '',
  phone text not null default '',
  subject text not null default '',
  message text not null default '',
  source text not null default 'contact'
    check (source in ('contact', 'tutor-apply', 'sheet', 'manual')),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'follow-up', 'converted', 'not-interested', 'spam')),
  notes text not null default '',
  -- Hash of email + subject + message; stops the same lead being imported twice
  dedupe_key text unique
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

create or replace function public.leads_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.leads_set_updated_at();

-- RLS on with no policies: the public anon key can read/write nothing.
-- The website talks to this table only from the server with the secret key.
alter table public.leads enable row level security;
