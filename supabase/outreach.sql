-- Outreach tracker for /admin/outreach (pre-dental clubs, advising offices, blogs… we ask for a link).
-- Run once in Supabase → SQL Editor → New query → paste → Run.

create table if not exists public.outreach_targets (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null default '',            -- e.g. "Pre-Dental Society"
  organization text not null default '',    -- e.g. "UC Santa Cruz"
  state text not null default '',
  kind text not null default 'club'
    check (kind in ('club', 'advising-office', 'blog', 'directory', 'podcast', 'instagram', 'other')),
  status text not null default 'to-contact'
    check (status in ('to-contact', 'contacted', 'followed-up', 'replied', 'in-progress', 'link-live', 'declined', 'no-response')),
  contact_name text not null default '',
  email text not null default '',
  instagram text not null default '',
  website text not null default '',
  discount_code text not null default '',
  link_url text not null default '',        -- where our link lives once it is up
  last_contacted_on date,
  next_follow_up_on date,
  notes text not null default '',
  -- lower(organization | name); stops the same target being imported twice
  dedupe_key text unique
);

create index if not exists outreach_status_idx on public.outreach_targets (status);
create index if not exists outreach_follow_up_idx on public.outreach_targets (next_follow_up_on);

create or replace function public.outreach_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists outreach_set_updated_at on public.outreach_targets;
create trigger outreach_set_updated_at
  before update on public.outreach_targets
  for each row execute function public.outreach_set_updated_at();

-- RLS on with no policies: only the server (secret key) can read or write.
alter table public.outreach_targets enable row level security;
