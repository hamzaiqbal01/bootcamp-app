/* ==========================================================
   Future Dental Prep · DAT Study Planner
   Vanilla JS. No dependencies.
   ========================================================== */
(function () {
  'use strict';

  function boot() {
  var rootEl = document.getElementById('planner');
  if (!rootEl || rootEl.getAttribute('data-booted') === '1') return;
  rootEl.setAttribute('data-booted', '1');

  // ---------------- State ----------------
  var state = {
    step: 1, tried: false,
    hasDate: null, testDate: '', win: null, started: null,
    hasScores: null, scale: 'new', source: null, target: '',
    scores: {}, conf: {},
    situation: null, wkday: null, wkend: null,
    days: [true, true, true, true, true, true, false],
    resources: [], challenges: [], dayRes: {}, calTime: '18:00', calNote: false,
    firstName: '', email: '', consent: false, submitted: false, formTried: false
  };

  // ---------------- Data ----------------
  var SEC = [
    { k: 'bio', n: 'Biology', short: 'Biology', topic: 'Cell & molecular biology', drill: 'Timed biology set' },
    { k: 'gc', n: 'General Chemistry', short: 'Gen Chem', topic: 'Stoichiometry & gas laws', drill: 'Timed gen chem set' },
    { k: 'oc', n: 'Organic Chemistry', short: 'Orgo', topic: 'Nomenclature & stereochemistry', drill: 'Reaction mechanisms set' },
    { k: 'pat', n: 'Perceptual Ability', short: 'PAT', topic: 'Keyholes & TFE drills', drill: 'Full PAT section, timed' },
    { k: 'rc', n: 'Reading Comprehension', short: 'Reading', topic: '1 passage, untimed + review', drill: '2 timed passages' },
    { k: 'qr', n: 'Quantitative Reasoning', short: 'QR', topic: 'Algebra & word problems', drill: 'Timed QR set' }
  ];
  var WIN = { 'Within 4 weeks': 4, '1–2 months': 7, '2–3 months': 11, '3–4 months': 15, '4+ months': 18, 'Not sure yet': 12 };
  var WD = { '< 1 hr': 0.75, '1–2 hrs': 1.5, '2–3 hrs': 2.5, '3–4 hrs': 3.5, '4+ hrs': 4.5 };
  var WE = { '< 2 hrs': 1.5, '2–4 hrs': 3, '4–6 hrs': 5, '6+ hrs': 7 };
  var CH = { 'Biology': 'bio', 'General Chemistry': 'gc', 'Organic Chemistry': 'oc', 'PAT': 'pat', 'Reading Comprehension': 'rc', 'Quantitative Reasoning': 'qr' };
  var DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  var FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var RESOURCES = ['DAT Bootcamp', 'DAT Booster', 'Kaplan', 'Princeton Review', 'Course notes', 'YouTube', 'Private tutor', 'Nothing yet'];
  var CHALLENGES = ['Biology', 'General Chemistry', 'Organic Chemistry', 'PAT', 'Reading Comprehension', 'Quantitative Reasoning', "Don't know what to study", 'Staying consistent', 'Time management', 'Test anxiety'];

  // ---------------- Helpers ----------------
  var $ = function (id) { return document.getElementById(id); };
  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var round5 = function (n) { return Math.round(n * 2) / 2; };
  var hrsTxt = function (n) { return n + (n === 1 ? ' hr' : ' hrs'); };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var fmtDate = function (d) { return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); };
  var ICON = {
    check: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    arrowR: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    arrowL: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    alert: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5M12 16v.5"/></svg>',
    greenCheck: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    cal: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
    edit: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4"/></svg>',
    mail: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16v12H4zM4 7l8 6 8-6"/></svg>'
  };

  // ---------------- Day-wise resources ----------------
  // Resources the student picked, or every real resource if they picked none.
  function resourceOptions() {
    var picked = state.resources.filter(function (r) { return r !== 'Nothing yet'; });
    return picked.length ? picked : RESOURCES.filter(function (r) { return r !== 'Nothing yet'; });
  }
  function dayResource(i) {
    var r = state.dayRes[i];
    return r && state.days[i] && resourceOptions().indexOf(r) >= 0 ? r : '';
  }

  // ---------------- Calendar export ----------------
  var GCAL_IMPORT = 'https://calendar.google.com/calendar/r/settings/export';
  var ymd = function (d) { return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()); };
  var stamp = function (d) { return ymd(d) + 'T' + pad(d.getHours()) + pad(d.getMinutes()) + '00'; };
  var addDays = function (d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; };

  // Every study day from tomorrow until test day, following the same phase and section rotation as week 1.
  function planEvents(c) {
    var s = state, out = [];
    if (c.testDay == null || !c.phases.length) return out;
    var hm = (s.calTime || '18:00').split(':');
    var start = addDays(c.today, 1);
    var last = c.phases[c.phases.length - 1];
    var k = 0, flWeek = 0;
    for (var d = start; d < c.testDay; d = addDays(d, 1)) {
      var dow = (d.getDay() + 6) % 7;
      if (!s.days[dow]) continue;
      var wk = Math.floor(Math.round((d - start) / 864e5) / 7) + 1;
      var phase = c.phases.filter(function (p) { return wk >= p.from && wk <= p.to; })[0] || last;
      var hrs = dow < 5 ? (s.wkday ? WD[s.wkday] : 0) : (s.wkend ? WE[s.wkend] : 0);
      if (!hrs) continue;
      var p1 = c.ranked[k % 3], p2 = c.ranked[3 + (k % 3)];
      k++;
      var title, a, b;
      if (phase.name === 'Content foundation') {
        a = p1.short + ' · ' + p1.topic; b = p2.short + ' · ' + p2.topic;
        title = 'DAT: ' + p1.short + ' + ' + p2.short;
      } else if (phase.name === 'Final review') {
        a = 'Light review · ' + p1.short; b = 'Error log and test-day logistics';
        title = 'DAT: light review';
      } else if (phase.name === 'Full-length tests' && dow >= 5 && flWeek !== wk) {
        flWeek = wk;
        a = 'Full-length practice test'; b = 'Review every miss';
        title = 'DAT: full-length practice test';
      } else {
        a = p1.short + ' · ' + p1.drill; b = p2.short + ' · ' + p2.drill;
        if (dow === 5) a = 'Timed mixed set + error log';
        title = 'DAT: ' + p1.short + ' + ' + p2.short;
      }
      var from = new Date(d); from.setHours(+hm[0] || 0, +hm[1] || 0, 0, 0);
      var to = new Date(from.getTime() + Math.round(hrs * 60) * 6e4);
      var res = dayResource(dow);
      out.push({
        title: title, from: from, to: to,
        details: phase.name + ' · Week ' + wk + '\n' + a + '\n' + b + (res ? '\nResource: ' + res : '') + '\n\nBuilt with the Future Dental Prep DAT study plan generator.'
      });
    }
    return out;
  }

  function icsText(c) {
    var clean = function (v) { return String(v).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n'); };
    var fold = function (line) {
      var parts = [];
      while (line.length > 60) { parts.push(line.slice(0, 60)); line = ' ' + line.slice(60); }
      parts.push(line);
      return parts.join('\r\n');
    };
    var now = new Date();
    var dtstamp = now.getUTCFullYear() + pad(now.getUTCMonth() + 1) + pad(now.getUTCDate()) + 'T' + pad(now.getUTCHours()) + pad(now.getUTCMinutes()) + '00Z';
    var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Future Dental Prep//DAT Study Plan//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:DAT Study Plan'];
    planEvents(c).forEach(function (e, i) {
      lines.push('BEGIN:VEVENT', 'UID:fdp-dat-' + stamp(e.from) + '-' + i + '@futuredentalprep', 'DTSTAMP:' + dtstamp,
        'DTSTART:' + stamp(e.from), 'DTEND:' + stamp(e.to), 'SUMMARY:' + clean(e.title), 'DESCRIPTION:' + clean(e.details), 'END:VEVENT');
    });
    lines.push('BEGIN:VEVENT', 'UID:fdp-dat-testday-' + ymd(c.testDay) + '@futuredentalprep', 'DTSTAMP:' + dtstamp,
      'DTSTART;VALUE=DATE:' + ymd(c.testDay), 'DTEND;VALUE=DATE:' + ymd(addDays(c.testDay, 1)),
      'SUMMARY:' + clean(state.hasDate === 'yes' ? 'DAT test day' : 'Target DAT date (approx.)'), 'END:VEVENT');
    lines.push('END:VCALENDAR');
    return lines.map(fold).join('\r\n') + '\r\n';
  }

  function downloadIcs(c) {
    var blob = new Blob([icsText(c)], { type: 'text/calendar;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'dat-study-plan.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  function gcalTestDayUrl(c) {
    var q = 'action=TEMPLATE&text=' + encodeURIComponent(state.hasDate === 'yes' ? 'DAT test day' : 'Target DAT date (approx.)') +
      '&dates=' + ymd(c.testDay) + '/' + ymd(addDays(c.testDay, 1)) +
      '&details=' + encodeURIComponent('Your DAT study plan from Future Dental Prep.');
    return 'https://calendar.google.com/calendar/render?' + q;
  }

  // ---------------- Derived values ----------------
  function compute() {
    var s = state;
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var todayIso = today.getFullYear() + '-' + pad(today.getMonth() + 1) + '-' + pad(today.getDate());

    // Timeline
    var weeks = null, testLabel = '—', testDay = null;
    if (s.hasDate === 'yes' && s.testDate) {
      var td = new Date(s.testDate + 'T00:00:00');
      if (!isNaN(td)) { weeks = Math.max(1, Math.round((td - today) / (7 * 864e5))); testLabel = fmtDate(td); testDay = td; }
    } else if (s.hasDate === 'no' && s.win) {
      weeks = WIN[s.win];
      testDay = new Date(today.getTime() + weeks * 7 * 864e5);
      testLabel = 'around ' + fmtDate(testDay);
    }
    var weeksLabel = weeks == null ? '—' : weeks + (weeks === 1 ? ' week' : ' weeks');

    // Hours
    var wdCount = s.days.slice(0, 5).filter(Boolean).length;
    var weCount = s.days.slice(5).filter(Boolean).length;
    var dayCount = wdCount + weCount;
    var hours = null;
    if (s.wkday || s.wkend) {
      hours = Math.round((s.wkday ? WD[s.wkday] * wdCount : 0) + (s.wkend ? WE[s.wkend] * weCount : 0));
    }
    var hoursLabel = hours == null ? '—' : '~' + hours + ' hrs/week';

    // Scale & target
    var isNew = s.scale === 'new';
    var mn = isNew ? 200 : 1, mx = isNew ? 600 : 30;
    var tgt = parseFloat(s.target);
    var targetLabel = isNaN(tgt) ? '—' : tgt + ' AA';
    var tPct = isNaN(tgt) ? null : (tgt - mn) / (mx - mn);

    // Section weights
    var anySignal = false;
    var secs = SEC.map(function (x) {
      var w = 1;
      if (s.hasScores === 'yes') {
        var v = parseFloat(s.scores[x.k]);
        if (!isNaN(v)) {
          var p = (v - mn) / (mx - mn);
          var ref = tPct != null ? tPct : 0.55;
          w += Math.max(0, ref - p) * 10 + 0.15;
          anySignal = true;
        }
      }
      if (s.hasScores === 'no') {
        var c = s.conf[x.k] || 'OK';
        if (c === 'Weak') { w += 1.5; anySignal = true; }
        if (c === 'Strong') { w -= 0.4; anySignal = true; }
      }
      if (s.challenges.some(function (c2) { return CH[c2] === x.k; })) { w += 1; anySignal = true; }
      return Object.assign({}, x, { w: w });
    });
    var ranked = secs.slice().sort(function (a, b) { return b.w - a.w; });

    // Phases
    var phases = [];
    if (weeks != null) {
      var W = weeks, P;
      if (W <= 2) {
        P = [{ name: 'Sprint review', w: W, desc: 'Timed mixed sets, one full-length, and review of every miss.', color: '#2F49D1' }];
      } else {
        var review = 1;
        var fl = W >= 10 ? Math.max(2, Math.round(W * 0.2)) : 1;
        var prac, found;
        if (W <= 5) { found = 0; prac = Math.max(1, W - review - fl); }
        else { prac = Math.round(W * 0.3); found = W - review - fl - prac; }
        P = [
          { name: 'Content foundation', w: found, desc: 'Learn and relearn content section by section, with untimed questions.', color: '#8FAAF0' },
          { name: 'Timed practice', w: prac, desc: 'Timed section sets and an error log. Weak topics come back every week.', color: '#4B6BE0' },
          { name: 'Full-length tests', w: fl, desc: 'One full-length a week, then a full review of every miss.', color: '#2F49D1' },
          { name: 'Final review', w: review, desc: 'Light review, sleep, and test-day logistics. No new content.', color: '#1E2A8A' }
        ];
      }
      var start = 1;
      P.forEach(function (p) {
        if (p.w <= 0) return;
        var end = start + p.w - 1;
        phases.push({ name: p.name, weeks: p.w, desc: p.desc, color: p.color, from: start, to: end, range: start === end ? 'Week ' + start : 'Weeks ' + start + '–' + end });
        start = end + 1;
      });
    }
    var hasFoundation = phases.length > 0 && phases[0].name === 'Content foundation';

    // Hours allocation
    var alloc = [];
    if (hours != null && hours > 0) {
      var practice = hours >= 6 ? round5(hours * 0.12) : 0;
      var rest = hours - practice;
      var sumW = secs.reduce(function (t, x) { return t + x.w; }, 0);
      var rows = ranked.map(function (x, i) {
        var tag = anySignal ? (i === 0 ? 'Top priority' : i === 1 ? 'Priority' : '') : '';
        return { n: x.n, h: Math.max(0.5, round5(rest * x.w / sumW)), tag: tag, color: i < 2 && anySignal ? '#2F49D1' : '#8FAAF0' };
      });
      if (practice > 0) rows.push({ n: 'Practice review & error log', h: practice, tag: '', color: '#1E2A8A' });
      var maxH = rows.reduce(function (m, r) { return Math.max(m, r.h); }, 0.5);
      alloc = rows.map(function (r) { return Object.assign({}, r, { pct: Math.round(r.h / maxH * 100) }); });
    }

    // Week 1
    var idx = 0;
    var week1 = DAYS.map(function (d, i) {
      if (!s.days[i]) return { day: d, rest: true, a: 'Rest day', b: 'Recover. It counts as prep.', h: '' };
      var h = i < 5 ? (s.wkday ? WD[s.wkday] : 0) : (s.wkend ? WE[s.wkend] : 0);
      var p1 = ranked[idx % 3], p2 = ranked[3 + (idx % 3)];
      idx++;
      var a = p1.short + ' · ' + (hasFoundation ? p1.topic : p1.drill);
      var b = p2.short + ' · ' + (hasFoundation ? p2.topic : p2.drill);
      if (i === 5 && !hasFoundation) a = 'Timed mixed set + error log';
      return { day: d, rest: false, a: a, b: b, h: h ? hrsTxt(round5(h)) : '', r: dayResource(i) };
    });

    // Validation
    var missing = '';
    if (s.step === 1) {
      if (!s.hasDate) missing = 'Tell us whether you have a test date.';
      else if (s.hasDate === 'yes' && !s.testDate) missing = 'Pick your test date.';
      else if (s.hasDate === 'no' && !s.win) missing = 'Pick roughly when you plan to test.';
      else if (!s.started) missing = 'Tell us whether you have started studying.';
    } else if (s.step === 2) {
      if (!s.hasScores) missing = 'Tell us whether you have taken a practice test.';
    } else if (s.step === 3) {
      if (!s.situation) missing = 'Pick what best describes you right now.';
      else if (!s.wkday) missing = 'Pick your weekday study hours.';
      else if (!s.wkend) missing = 'Pick your weekend study hours.';
      else if (dayCount === 0) missing = 'Pick at least one study day.';
    }

    var intensity = '—';
    if (weeks != null && hours != null) {
      intensity = weeks <= 4 ? 'Sprint' : hours >= 20 ? 'Intensive' : hours >= 12 ? 'Steady' : 'Light';
    }

    return {
      today: today, testDay: testDay,
      todayIso: todayIso, weeks: weeks, weeksLabel: weeksLabel, testLabel: testLabel,
      hours: hours, hoursLabel: hoursLabel, dayCount: dayCount,
      isNew: isNew, mn: mn, mx: mx, targetLabel: targetLabel,
      anySignal: anySignal, ranked: ranked, phases: phases, hasFoundation: hasFoundation,
      alloc: alloc, week1: week1, missing: missing, intensity: intensity
    };
  }

  // ---------------- Template helpers ----------------
  function radioCards(key, list, cols) {
    return '<div class="' + (cols === 3 ? 'g3' : 'g2') + '">' + list.map(function (o) {
      var v = typeof o === 'string' ? o : o.v;
      var l = typeof o === 'string' ? o : o.l;
      var sub = typeof o === 'string' ? '' : (o.sub || '');
      var on = state[key] === v;
      return '<button type="button" role="radio" aria-checked="' + on + '" class="opt' + (on ? ' on' : '') + '" data-act="set" data-key="' + key + '" data-val="' + esc(v) + '">' +
        '<span class="dot"></span><span>' + esc(l) + (sub ? '<span class="optsub">' + esc(sub) + '</span>' : '') + '</span></button>';
    }).join('') + '</div>';
  }
  function pills(key, list) {
    return '<div class="seg">' + list.map(function (v) {
      var on = state[key] === v;
      return '<button type="button" role="radio" aria-checked="' + on + '" class="pill' + (on ? ' on' : '') + '" data-act="set" data-key="' + key + '" data-val="' + esc(v) + '">' + esc(v) + '</button>';
    }).join('') + '</div>';
  }
  function chipsSingle(key, list) {
    return '<div class="wrap">' + list.map(function (v) {
      var on = state[key] === v;
      return '<button type="button" aria-pressed="' + on + '" class="chip' + (on ? ' on' : '') + '" data-act="set" data-key="' + key + '" data-val="' + esc(v) + '">' + esc(v) + '</button>';
    }).join('') + '</div>';
  }
  function chipsMulti(key, list, max) {
    return '<div class="wrap">' + list.map(function (v) {
      var on = state[key].indexOf(v) >= 0;
      return '<button type="button" aria-pressed="' + on + '" class="chip' + (on ? ' on' : '') + '" data-act="multi" data-key="' + key + '" data-val="' + esc(v) + '"' + (max ? ' data-max="' + max + '"' : '') + '>' + esc(v) + '</button>';
    }).join('') + '</div>';
  }

  // ---------------- Renderers ----------------
  function renderStepper() {
    var meta = [{ n: 1, l: 'Your DAT' }, { n: 2, l: 'Your scores' }, { n: 3, l: 'Your schedule' }, { n: 4, l: 'Your plan' }];
    var tl = state.step === 1 ? 'About 2 min' : state.step === 2 ? 'About 1 min left' : state.step === 3 ? 'Almost there' : '';
    $('stepper').innerHTML = meta.map(function (m) {
      var done = m.n < state.step, cur = m.n === state.step;
      return '<button type="button" class="stp ' + (cur ? 'cur' : done ? 'done' : 'todo') + '"' +
        (cur ? ' aria-current="step"' : '') + (done ? ' data-act="goto" data-step="' + m.n + '"' : ' tabindex="-1"') + '>' +
        '<span class="n">' + (done ? ICON.check : m.n) + '</span><span class="lbl">' + m.l + '</span></button>';
    }).join('') + '<span class="time-left">' + tl + '</span>';
    $('progressFill').style.width = Math.round((state.step - 1) / 3 * 100) + '%';
  }

  function renderStep(c) {
    var s = state, h = '';
    if (s.step === 1) {
      h += '<div class="step-head"><h2 class="hd">When are you taking the DAT?</h2><p>Your timeline sets how long each phase of the plan runs.</p></div>';
      h += '<div class="q" role="radiogroup" aria-label="Have you scheduled your DAT?"><p class="ql">Have you scheduled your DAT?</p>' +
        radioCards('hasDate', [{ v: 'yes', l: 'Yes, I have a date', sub: "We'll count down to it" }, { v: 'no', l: 'Not yet', sub: "We'll plan around a rough window" }]) + '</div>';
      if (s.hasDate === 'yes') {
        h += '<div class="q"><label class="ql" for="testdate">Test date</label><div class="date-row">' +
          '<input id="testdate" class="field" type="date" min="' + c.todayIso + '" value="' + esc(s.testDate) + '" data-input="testDate">' +
          (c.weeks != null ? '<span class="badge-soft">' + c.weeksLabel + ' away</span>' : '') + '</div></div>';
      }
      if (s.hasDate === 'no') {
        h += '<div class="q" role="radiogroup" aria-label="Roughly when do you plan to test?"><p class="ql">Roughly when do you plan to test?</p>' +
          radioCards('win', Object.keys(WIN), 3) + '</div>';
      }
      h += '<div class="q" role="radiogroup" aria-label="Have you started studying?"><p class="ql">Have you started studying?</p>' +
        radioCards('started', ['No, starting fresh', 'Yes, under a month', 'Yes, over a month'], 3) + '</div>';
    }

    if (s.step === 2) {
      h += '<div class="step-head-row"><div class="step-head"><h2 class="hd">Where are you right now?</h2><p>Scores are optional. A rough sense of each section works too.</p></div>' +
        '<div class="toggle" role="group" aria-label="Score scale">' +
        [{ v: 'new', l: '200–600' }, { v: 'old', l: '1–30' }].map(function (o) {
          var on = s.scale === o.v;
          return '<button type="button" class="tog' + (on ? ' on' : '') + '" aria-pressed="' + on + '" data-act="set" data-key="scale" data-val="' + o.v + '">' + o.l + '</button>';
        }).join('') + '</div></div>';
      h += '<div class="q" role="radiogroup" aria-label="Have you taken a diagnostic or practice test?"><p class="ql">Have you taken a diagnostic or practice test?</p>' +
        radioCards('hasScores', [{ v: 'yes', l: 'Yes, I have scores', sub: 'Most accurate plan' }, { v: 'no', l: 'Not yet', sub: 'Rate each section instead' }]) + '</div>';

      var ph = c.isNew ? 'e.g. 420' : 'e.g. 19';
      if (s.hasScores === 'yes') {
        h += '<div class="q"><p class="ql">Which test was it?</p>' + chipsSingle('source', ['DAT Bootcamp', 'DAT Booster', 'Official ADA practice', 'Other']) + '</div>';
        h += '<div class="q"><p class="ql">Your section scores</p><p class="qh">Leave any blank you don\'t remember. Scale ' + (c.isNew ? '200–600' : '1–30') + '.</p><div class="g3">' +
          [{ k: 'aa', n: 'Academic Average' }].concat(SEC).map(function (x) {
            return '<div class="field-stack"><label class="field-label" for="sc_' + x.k + '">' + x.n + '</label>' +
              '<input id="sc_' + x.k + '" class="field" type="number" inputmode="numeric" min="' + c.mn + '" max="' + c.mx + '" placeholder="' + ph + '" value="' + esc(s.scores[x.k] || '') + '" data-input="score" data-k="' + x.k + '"></div>';
          }).join('') + '</div></div>';
      }
      if (s.hasScores === 'no') {
        h += '<div class="q"><p class="ql">How does each section feel?</p><p class="qh">Your gut sense is enough. We\'ll weight study time toward the weak ones.</p><div class="conf-list">' +
          SEC.map(function (x) {
            var cur = s.conf[x.k] || 'OK';
            return '<div class="conf-row"><span class="name">' + x.n + '</span><div class="conf-group" role="radiogroup" aria-label="' + x.n + ' confidence">' +
              ['Weak', 'OK', 'Strong'].map(function (lv) {
                var on = cur === lv;
                return '<button type="button" role="radio" aria-checked="' + on + '" class="conf' + (on ? ' on' : '') + '" data-act="conf" data-k="' + x.k + '" data-val="' + lv + '">' + lv + '</button>';
              }).join('') + '</div></div>';
          }).join('') + '</div></div>';
      }
      h += '<div class="q"><label class="ql" for="target">What Academic Average are you aiming for?</label>' +
        '<p class="qh">Not sure? Use the average for the schools on your list. You can change it later.</p>' +
        '<div class="stepper-input"><button type="button" class="btn btn-ghost btn-square" aria-label="Lower target" data-act="bump" data-dir="-1">−</button>' +
        '<input id="target" class="field" type="number" inputmode="numeric" min="' + c.mn + '" max="' + c.mx + '" placeholder="' + ph + '" value="' + esc(s.target) + '" data-input="target">' +
        '<button type="button" class="btn btn-ghost btn-square" aria-label="Raise target" data-act="bump" data-dir="1">+</button></div></div>';
    }

    if (s.step === 3) {
      h += '<div class="step-head"><h2 class="hd">Fit the plan around your week</h2><p>Pick the hours you can actually keep, not your best-case week.</p></div>';
      h += '<div class="q" role="radiogroup" aria-label="What best describes you right now?"><p class="ql">What best describes you right now?</p>' +
        radioCards('situation', ['Full-time student', 'Part-time student', 'Working full-time', 'Working part-time', 'Gap year', 'Other'], 3) + '</div>';
      h += '<div class="q" role="radiogroup" aria-label="Hours on a study weekday"><p class="ql">Hours on a study weekday</p>' + pills('wkday', Object.keys(WD)) + '</div>';
      h += '<div class="q" role="radiogroup" aria-label="Hours on a study weekend day"><p class="ql">Hours on a study weekend day</p>' + pills('wkend', Object.keys(WE)) + '</div>';
      h += '<div class="q"><p class="ql">Which days will you study?</p><p class="qh">Days you leave off become rest days.</p><div class="wrap">' +
        DAYS.map(function (d, i) {
          var on = s.days[i];
          return '<button type="button" class="daybtn' + (on ? ' on' : '') + '" aria-pressed="' + on + '" aria-label="' + FULL[i] + '" data-act="day" data-i="' + i + '">' + d + '</button>';
        }).join('') + '</div></div>';
      h += '<div class="q"><p class="ql">What are you using to prepare? <span class="opt-note">(optional)</span></p>' + chipsMulti('resources', RESOURCES) + '</div>';
      if (c.dayCount > 0) {
        var opts = resourceOptions();
        h += '<div class="q"><p class="ql">Which resource on which day? <span class="opt-note">(optional)</span></p>' +
          '<p class="qh">Pick what you\'ll open each study day. It shows in your plan and your calendar.</p><div class="dayres">' +
          DAYS.map(function (d, i) {
            if (!s.days[i]) return '';
            var cur = dayResource(i);
            return '<label class="dayres-row"><span class="dayres-d">' + FULL[i] + '</span>' +
              '<select class="field dayres-sel" data-input="dayRes" data-i="' + i + '" aria-label="Resource for ' + FULL[i] + '">' +
              '<option value="">Mixed / not set</option>' +
              opts.map(function (r) { return '<option value="' + esc(r) + '"' + (cur === r ? ' selected' : '') + '>' + esc(r) + '</option>'; }).join('') +
              '</select></label>';
          }).join('') + '</div></div>';
      }
      h += '<div class="q"><p class="ql">What\'s hardest right now? <span class="opt-note">(pick up to 3, optional)</span></p>' + chipsMulti('challenges', CHALLENGES, 3) + '</div>';
    }
    $('stepBody').innerHTML = h;
  }

  function renderActions(c) {
    var ok = !c.missing;
    var h = '';
    if (state.step > 1) h += '<button type="button" class="btn btn-ghost" data-act="back">' + ICON.arrowL + 'Back</button>';
    h += '<button type="button" class="btn btn-dark' + (ok ? '' : ' is-waiting') + '" aria-disabled="' + !ok + '" data-act="next">' +
      (state.step === 3 ? 'Build my plan' : 'Continue') + ICON.arrowR + '</button>';
    if (state.step === 3) {
      h += '<button type="button" class="btn btn-ghost' + (ok ? '' : ' is-waiting') + '" aria-disabled="' + !ok + '" data-act="nextcal">' +
        ICON.cal + 'Build + add to calendar</button>';
    }
    if (!ok) {
      h += state.tried
        ? '<span class="error" role="alert">' + ICON.alert + esc(c.missing) + '</span>'
        : '<span class="hint">' + esc(c.missing) + '</span>';
    }
    $('actions').innerHTML = h;
  }

  function renderPreview(c) {
    var showSignal = c.anySignal && state.step >= 2;
    var h = '<div class="preview-head"><span class="t hd">Your plan so far</span><span class="live"><i></i>Updates live</span></div>';
    h += '<div class="kv">' +
      '<div><span>Test day</span><span>' + esc(c.testLabel) + '</span></div>' +
      '<div><span>Time until DAT</span><span>' + c.weeksLabel + '</span></div>' +
      '<div><span>Weekly study time</span><span>' + c.hoursLabel + '</span></div>' +
      '<div><span>Target</span><span>' + esc(c.targetLabel) + '</span></div></div>';
    h += '<div class="pv-block"><span class="pv-label">Phases</span>';
    if (c.weeks != null) {
      h += '<div class="pv-track">' + c.phases.map(function (p) { return '<div style="flex-grow:' + p.weeks + ';background:' + p.color + '"></div>'; }).join('') + '</div>';
      h += '<div class="pv-legend">' + c.phases.map(function (p) { return '<div><i style="background:' + p.color + '"></i><span>' + p.name + '</span><em>' + p.range + '</em></div>'; }).join('') + '</div>';
    } else {
      h += '<div class="pv-track-empty"></div><span class="pv-empty">Appears once you pick a timeline.</span>';
    }
    h += '</div><div class="pv-block"><span class="pv-label">Focus first</span>';
    h += showSignal
      ? '<div class="wrap" style="gap:6px">' + c.ranked.slice(0, 2).map(function (x) { return '<span class="pv-chip">' + x.n + '</span>'; }).join('') + '</div>'
      : '<span class="pv-empty">Appears after step 2.</span>';
    h += '</div><p class="pv-foot">Plan logic built with our DAT tutors, who scored in the top percentiles.</p>';
    $('preview').innerHTML = h;
  }

  function renderResult(c) {
    var s = state;
    var tight = c.weeks != null && c.hours != null && (c.weeks <= 4 || (c.weeks <= 6 && c.hours < 15));
    var summary = (c.anySignal
      ? 'We put the most time on ' + c.ranked[0].n + ' and ' + c.ranked[1].n + ', '
      : 'Time is spread evenly across sections until you add scores, ')
      + (c.hasFoundation ? 'start with content while you have runway, ' : 'go straight to timed practice, ')
      + 'and finish with full-length tests.';
    var startedSub = s.started === 'No, starting fresh' ? 'Starting from scratch' : s.started ? 'Already underway' : 'Based on your hours and date';
    var tiles = [
      { k: 'Test day', v: c.testLabel.replace('around ', '~'), s: c.weeksLabel + ' from today' },
      { k: 'Weekly load', v: c.hours != null ? '~' + c.hours + ' hrs' : '—', s: c.dayCount + ' study days a week' },
      { k: 'Intensity', v: c.intensity, s: startedSub },
      { k: 'Target', v: c.targetLabel, s: c.isNew ? 'On the 200–600 scale' : 'On the 1–30 scale' }
    ];

    var h = '';
    h += '<div class="result-head"><div>' +
      '<span class="ready">' + ICON.check + 'Your plan is ready</span>' +
      '<h1 class="hd">' + (c.weeks != null ? 'Your ' + c.weeks + '-week DAT plan' : 'Your DAT plan') + '</h1>' +
      '<p>' + esc(summary) + '</p></div>' +
      '<div class="result-acts"><a href="#calPanel" class="link-btn">' + ICON.cal + 'Add to calendar</a>' +
      '<button type="button" class="link-btn" data-act="edit">' + ICON.edit + 'Edit answers</button></div></div>';

    h += '<div class="tiles">' + tiles.map(function (t) {
      return '<div class="tile"><span class="k">' + t.k + '</span><span class="v hd">' + esc(t.v) + '</span><span class="s">' + esc(t.s) + '</span></div>';
    }).join('') + '</div>';

    if (tight) {
      h += '<div class="note-warn" role="note"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B45309" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5M12 16v.5"/></svg>' +
        '<span><strong>Tight timeline.</strong> We shortened the content phase so you still get timed and full-length practice. More weekly hours or a later date would give you more room.</span></div>';
    }

    h += '<section class="panel"><div class="panel-head"><h2 class="hd">Your ' + (c.weeks != null ? c.weeks + '-week ' : '') + 'roadmap</h2><span>Today → ' + esc(c.testLabel) + '</span></div>' +
      '<div class="road-track">' + c.phases.map(function (p) { return '<div style="flex-grow:' + p.weeks + ';background:' + p.color + '"></div>'; }).join('') + '</div>' +
      '<div class="phase-cards">' + c.phases.map(function (p) {
        return '<div class="phase-card"><span class="r"><i style="background:' + p.color + '"></i>' + p.range + '</span><span class="n hd">' + p.name + '</span><span class="d">' + p.desc + '</span></div>';
      }).join('') + '</div></section>';

    h += '<div class="res2">';
    h += '<section class="panel"><div class="panel-head"><h2 class="hd">Where your hours go</h2><span>' + c.hoursLabel + '</span></div><div class="alloc">' +
      c.alloc.map(function (a) {
        return '<div class="alloc-row"><div class="alloc-top"><span class="n">' + a.n + '</span>' + (a.tag ? '<span class="tag">' + a.tag + '</span>' : '') +
          '<span class="h">' + hrsTxt(a.h) + '</span></div><div class="alloc-track"><div style="width:' + a.pct + '%;background:' + a.color + '"></div></div></div>';
      }).join('') + '</div></section>';
    h += '<section class="panel"><div class="panel-head"><h2 class="hd">Week 1, day by day</h2><span>' + (c.phases[0] ? c.phases[0].name : '') + '</span></div><div class="days">' +
      c.week1.map(function (d) {
        return '<div class="day-row' + (d.rest ? ' rest' : '') + '"><span class="d">' + d.day + '</span><div><span class="a">' + esc(d.a) + '</span><span class="b">' + esc(d.b) + '</span>' +
          (d.r ? '<span class="res-tag">' + esc(d.r) + '</span>' : '') + '</div><span class="h">' + d.h + '</span></div>';
      }).join('') + '</div></section>';
    h += '</div>';

    if (c.testDay) {
      var sessions = planEvents(c).length;
      h += '<section class="panel cal-panel" id="calPanel"><div class="panel-head"><h2 class="hd">Put the whole plan on your calendar</h2>' +
        '<span>' + sessions + ' study sessions + test day</span></div>' +
        '<p class="cal-copy">Every study day from tomorrow until ' + esc(c.testLabel) + ', with that day\'s sections, hours, and resource. Works with Google Calendar, Apple Calendar, and Outlook.</p>' +
        '<div class="cal-row"><div class="field-stack cal-time"><label class="field-label" for="calTime">Study start time</label>' +
        '<input id="calTime" class="field" type="time" value="' + esc(s.calTime) + '" data-input="calTime"></div>' +
        '<div class="cal-btns"><button type="button" class="btn btn-blue" data-act="gcal">' + ICON.cal + 'Add to Google Calendar</button>' +
        '<button type="button" class="btn btn-ghost" data-act="ics">Download .ics file</button></div></div>';
      if (s.calNote) {
        h += '<div class="cal-note" role="status"><strong>Almost done.</strong> We downloaded <b>dat-study-plan.ics</b> and opened Google Calendar in a new tab. ' +
          'Under <b>Import</b>, choose that file, pick a calendar, and click <b>Import</b>. All ' + sessions + ' sessions appear at once.</div>';
      }
      h += '<a class="link-btn cal-quick" href="' + gcalTestDayUrl(c) + '" target="_blank" rel="noopener">Or add just the test day to Google Calendar' + ICON.arrowR + '</a></section>';
    }

    h += '<section class="unlock">';
    if (!s.submitted) {
      var validEmail = /.+@.+\..+/.test(s.email);
      var showErr = s.formTried && !(s.firstName.trim() && validEmail);
      h += '<div class="unlock-grid"><div class="unlock-copy">' +
        '<h2 class="hd">Get all ' + c.weeksLabel + ' in your inbox</h2>' +
        '<p>Free, no payment. You\'ll get the full week-by-week plan to keep beside your prep material.</p>' +
        '<div class="checks"><span>' + ICON.greenCheck + 'Every week\'s tasks, by section</span><span>' + ICON.greenCheck + 'When to take each full-length</span><span>' + ICON.greenCheck + 'Rebuild it any time your date or hours change</span></div></div>' +
        '<form class="unlock-form" id="unlockForm" novalidate>' +
        '<div class="g2"><div class="field-stack"><label class="field-label" for="fname">First name</label><input id="fname" class="field" type="text" autocomplete="given-name" value="' + esc(s.firstName) + '" data-input="firstName"></div>' +
        '<div class="field-stack"><label class="field-label" for="email">Email</label><input id="email" class="field" type="email" autocomplete="email" placeholder="you@school.edu" value="' + esc(s.email) + '" data-input="email"></div></div>' +
        '<label class="consent"><input type="checkbox" data-input="consent"' + (s.consent ? ' checked' : '') + '>Also send me occasional DAT prep tips from Future Dental Prep. Unsubscribe any time.</label>' +
        '<button type="submit" class="btn btn-blue btn-block">Send my full plan</button>' +
        (showErr ? '<span class="form-err" role="alert">Add your first name and a valid email.</span>' : '') +
        '</form></div>';
    } else {
      h += '<div class="sent"><div class="sent-msg"><span class="sent-ic">' + ICON.mail + '</span><div>' +
        '<div class="t hd">Check your inbox, ' + esc(s.firstName) + '</div>' +
        '<div class="s">Your full plan is on its way to ' + esc(s.email) + '.</div></div></div>' +
        '<a href="/schedule" class="btn btn-white">Want a tutor to review it? Book a free call</a></div>';
    }
    h += '</section>';

    h += '<div class="tutor-cta"><div><div class="t hd">Stuck on ' + c.ranked[0].n + '?</div>' +
      '<div class="s">A 15-minute call with a DAT tutor can tighten this plan around your exact gaps.</div></div>' +
      '<a href="/schedule" class="btn btn-ghost">Book a free 15-min call</a></div>';

    $('result').innerHTML = h;
  }

  function renderAll() {
    var c = compute();
    var isResult = state.step === 4;
    $('intro').hidden = isResult;
    $('wizard').hidden = isResult;
    $('result').hidden = !isResult;
    renderStepper();
    if (isResult) renderResult(c);
    else { renderStep(c); renderActions(c); renderPreview(c); }
  }
  // Light refresh while typing (keeps input focus)
  function renderLive() {
    var c = compute();
    if (state.step < 4) { renderActions(c); renderPreview(c); }
  }

  function scrollToTop() {
    var top = $('planner').getBoundingClientRect().top + window.pageYOffset - 16;
    if (window.pageYOffset > top) window.scrollTo({ top: top, behavior: 'smooth' });
  }

  // ---------------- Events ----------------
  var root = $('planner');

  root.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var act = el.getAttribute('data-act');
    var key = el.getAttribute('data-key');
    var val = el.getAttribute('data-val');

    switch (act) {
      case 'set':
        state[key] = val; state.tried = false; break;
      case 'multi': {
        var arr = state[key].slice();
        var max = parseInt(el.getAttribute('data-max'), 10);
        var i = arr.indexOf(val);
        if (i >= 0) arr.splice(i, 1);
        else { if (max && arr.length >= max) arr.shift(); arr.push(val); }
        state[key] = arr; break;
      }
      case 'conf':
        state.conf[el.getAttribute('data-k')] = val; break;
      case 'day': {
        var d = parseInt(el.getAttribute('data-i'), 10);
        state.days[d] = !state.days[d]; state.tried = false; break;
      }
      case 'bump': {
        var c = compute();
        var step = c.isNew ? 10 : 1;
        var cur = parseFloat(state.target);
        cur = isNaN(cur) ? (c.isNew ? 400 : 20) : cur + parseInt(el.getAttribute('data-dir'), 10) * step;
        state.target = String(Math.min(c.mx, Math.max(c.mn, cur)));
        break;
      }
      case 'next': {
        if (compute().missing) { state.tried = true; renderAll(); return; }
        state.step += 1; state.tried = false; renderAll(); scrollToTop(); return;
      }
      case 'nextcal': {
        if (compute().missing) { state.tried = true; renderAll(); return; }
        state.step = 4; state.tried = false; renderAll();
        var panel = $('calPanel');
        if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      case 'gcal': {
        var cg = compute();
        downloadIcs(cg);
        window.open(GCAL_IMPORT, '_blank', 'noopener');
        state.calNote = true; renderAll();
        var again2 = $('calPanel'); if (again2) again2.scrollIntoView({ block: 'nearest' });
        return;
      }
      case 'ics':
        downloadIcs(compute()); return;
      case 'back':
        state.step = Math.max(1, state.step - 1); state.tried = false; renderAll(); scrollToTop(); return;
      case 'goto':
        state.step = parseInt(el.getAttribute('data-step'), 10); state.tried = false; renderAll(); scrollToTop(); return;
      case 'edit':
        state.step = 1; state.submitted = false; state.calNote = false; renderAll(); scrollToTop(); return;
      default: return;
    }
    // Keep focus on the control the user just pressed
    var focusSel = el.id ? '#' + el.id : null;
    var sig = [act, key, val, el.getAttribute('data-k'), el.getAttribute('data-i'), el.getAttribute('data-dir')].join('|');
    renderAll();
    var again = Array.prototype.find.call(root.querySelectorAll('[data-act]'), function (n) {
      return [n.getAttribute('data-act'), n.getAttribute('data-key'), n.getAttribute('data-val'), n.getAttribute('data-k'), n.getAttribute('data-i'), n.getAttribute('data-dir')].join('|') === sig;
    }) || (focusSel && root.querySelector(focusSel));
    if (again && e.detail === 0) again.focus(); // keyboard activation only
  });

  root.addEventListener('input', function (e) {
    var el = e.target, key = el.getAttribute('data-input');
    if (!key) return;
    if (key === 'score') state.scores[el.getAttribute('data-k')] = el.value;
    else if (key === 'dayRes') state.dayRes[el.getAttribute('data-i')] = el.value;
    else if (key === 'consent') state.consent = el.checked;
    else if (key === 'testDate') return; // handled on change
    else state[key] = el.value;
    renderLive();
  });

  root.addEventListener('change', function (e) {
    var el = e.target;
    if (el.getAttribute('data-input') === 'testDate') {
      state.testDate = el.value; state.tried = false; renderAll();
      var again = $('testdate'); if (again) again.focus();
    }
    if (el.getAttribute('data-input') === 'consent') state.consent = el.checked;
  });

  root.addEventListener('submit', function (e) {
    if (e.target.id !== 'unlockForm') return;
    e.preventDefault();
    var validEmail = /.+@.+\..+/.test(state.email);
    if (!(state.firstName.trim() && validEmail)) { state.formTried = true; renderAll(); return; }

    // TODO: send the lead + plan to your backend / email provider here, e.g.
    // fetch('/api/dat-plan', { method: 'POST', headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ firstName: state.firstName, email: state.email, consent: state.consent, answers: state }) });

    state.submitted = true; state.formTried = false; renderAll();
  });

  renderAll();
  }

  window.__fdpPlannerBoot = boot;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
