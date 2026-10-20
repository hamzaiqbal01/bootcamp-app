-- DAT study plan leads for /dat-study-plan-generator.
-- Run once in Supabase → SQL Editor → New query → paste → Run.

create or replace function public.leads_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

alter table public.leads drop constraint if exists leads_source_check;
alter table public.leads
  add constraint leads_source_check
  check (source in ('contact', 'tutor-apply', 'sheet', 'manual', 'dat-study-plan', 'blog-guide'));

create table if not exists public.dat_study_plan_leads (
  id uuid primary key default gen_random_uuid(),
  access_token uuid not null unique default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  first_name text not null,
  email text not null,
  phone text not null default '',
  country text not null default '',
  scheduled_dat boolean not null,
  dat_date date,
  planned_dat_window text,
  started_studying boolean,
  diagnostic_taken boolean not null,
  score_format text,
  overall_score numeric,
  biology_score numeric,
  general_chemistry_score numeric,
  organic_chemistry_score numeric,
  perceptual_ability_score numeric,
  reading_comprehension_score numeric,
  quantitative_reasoning_score numeric,
  biology_confidence text,
  general_chemistry_confidence text,
  organic_chemistry_confidence text,
  perceptual_ability_confidence text,
  reading_comprehension_confidence text,
  quantitative_reasoning_confidence text,
  target_score numeric,
  current_status text not null,
  weekday_availability text not null,
  weekend_availability text not null,
  preferred_study_days jsonb not null default '[]'::jsonb,
  preferred_rest_day text,
  current_resources jsonb not null default '[]'::jsonb,
  biggest_challenges jsonb not null default '[]'::jsonb,
  days_until_exam integer,
  weeks_until_exam numeric,
  recommended_hours_per_week numeric,
  preparation_intensity text not null,
  primary_priority text not null,
  secondary_priority text not null,
  generated_plan jsonb not null,
  lead_score integer not null,
  lead_band text not null,
  utm_source text not null default '',
  utm_medium text not null default '',
  utm_campaign text not null default '',
  utm_content text not null default '',
  utm_term text not null default '',
  landing_page text not null default '',
  referrer text not null default '',
  marketing_consent boolean not null default false,
  tutor_match_requested boolean not null default false,
  admin_lead_id uuid
);

create index if not exists dat_study_plan_leads_email_idx on public.dat_study_plan_leads (email);
create index if not exists dat_study_plan_leads_created_at_idx on public.dat_study_plan_leads (created_at desc);
create index if not exists dat_study_plan_leads_admin_lead_idx on public.dat_study_plan_leads (admin_lead_id);

drop trigger if exists dat_study_plan_leads_set_updated_at on public.dat_study_plan_leads;
create trigger dat_study_plan_leads_set_updated_at
  before update on public.dat_study_plan_leads
  for each row execute function public.leads_set_updated_at();

alter table public.dat_study_plan_leads enable row level security;
