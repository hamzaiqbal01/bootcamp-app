-- Lets the blog guide form store leads as source = blog-guide.
-- Run once in Supabase → SQL Editor → New query → paste → Run.

alter table public.leads drop constraint if exists leads_source_check;
alter table public.leads
  add constraint leads_source_check
  check (source in ('contact', 'tutor-apply', 'sheet', 'manual', 'dat-study-plan', 'blog-guide'));
