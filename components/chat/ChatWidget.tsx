"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { coaches } from "@/lib/data/coaches";

type Message = {
  id: string;
  from: "you" | "team";
  text?: string;
  /** Object URL for a voice note sent this session; not persisted. */
  audioUrl?: string;
  audioLabel?: string;
  at: number;
};

const STORAGE_KEY = "fdp-chat";
const EMOJIS = ["👋", "🙂", "🙏", "👍", "🦷", "📚", "🎯", "❤️"];
const avatars = coaches.filter((coach) => coach.photo).slice(0, 3);

const WELCOME: Message = {
  id: "welcome",
  from: "team",
  text: "Hi! Ask us anything about DAT prep, your personal statement or interviews. Leave your email and a coach will reply, usually within 24 hours. You can also send a voice note 🎙️",
  at: 0,
};

function uid() {
  return Math.random().toString(36).slice(2);
}

function formatClock(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

// A short, soft two-note chime made with Web Audio, so no sound file is needed.
function playChime() {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    [659.25, 987.77].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.08, now + i * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 0.45);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.5);
    });
    window.setTimeout(() => ctx.close(), 1000);
  } catch {}
}

function Avatars({ size = 36 }: { size?: number }) {
  return (
    <div className="flex">
      {avatars.map((coach, i) => (
        <img
          key={coach.id}
          src={coach.photo ?? ""}
          alt=""
          className="rounded-full object-cover ring-2 ring-[var(--c-ring)]"
          style={{ width: size, height: size, marginLeft: i === 0 ? 0 : -size * 0.3, objectPosition: coach.photoPosition }}
        />
      ))}
    </div>
  );
}

function Icon({ name, size = 18 }: { name: "chat" | "agent" | "close" | "back" | "send" | "mic" | "smile" | "home" | "inbox" | "stop" | "trash" | "arrow"; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const;
  const stroke = { stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  switch (name) {
    case "chat":
      return (
        <svg {...common}>
          <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 3.5V17A2.5 2.5 0 0 1 4 14.5z" {...stroke} />
          <path d="M8.5 9.5h7M8.5 12.5h4.5" {...stroke} />
        </svg>
      );
    case "agent":
      return (
        <svg {...common}>
          <circle cx="12" cy="9" r="3.6" {...stroke} />
          <path d="M5.5 20c.8-3.4 3.4-5.4 6.5-5.4s5.7 2 6.5 5.4" {...stroke} />
          <path d="M6.6 10.4V9a5.4 5.4 0 0 1 10.8 0v1.4" {...stroke} />
          <path d="M17.4 10.6v1.2a2.4 2.4 0 0 1-2.4 2.4h-1.4" {...stroke} />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6 6 18" {...stroke} />
        </svg>
      );
    case "back":
      return (
        <svg {...common}>
          <path d="M15 5l-7 7 7 7" {...stroke} />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M9 5l7 7-7 7" {...stroke} />
        </svg>
      );
    case "send":
      return (
        <svg {...common}>
          <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" {...stroke} />
        </svg>
      );
    case "mic":
      return (
        <svg {...common}>
          <rect x="9" y="3.5" width="6" height="11" rx="3" {...stroke} />
          <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5v3" {...stroke} />
        </svg>
      );
    case "smile":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" {...stroke} />
          <path d="M8.5 14c.9 1.2 2.1 1.8 3.5 1.8s2.6-.6 3.5-1.8M9.5 9.8h.01M14.5 9.8h.01" {...stroke} />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z" {...stroke} />
        </svg>
      );
    case "inbox":
      return (
        <svg {...common}>
          <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 3.5V17A2.5 2.5 0 0 1 4 14.5z" {...stroke} />
        </svg>
      );
    case "stop":
      return (
        <svg {...common}>
          <rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" />
        </svg>
      );
    case "trash":
      return (
        <svg {...common}>
          <path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12" {...stroke} />
        </svg>
      );
  }
}

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<"home" | "chat" | "messages">("home");
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [email, setEmail] = useState("");
  const [draft, setDraft] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [typing, setTyping] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // Voice note state
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [levels, setLevels] = useState<number[]>(() => Array(28).fill(0.15));
  const [voice, setVoice] = useState<{ blob: Blob; url: string; seconds: number } | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const cancelledRef = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Restore the conversation and email from earlier visits (voice notes are not kept).
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as {
        email?: string;
        messages?: Message[];
      } | null;
      if (saved?.email) setEmail(saved.email);
      if (saved?.messages?.length) setMessages(saved.messages);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      // Drop object URLs; they die with the page. The "Voice note" label stays.
      const keep = messages.map(({ audioUrl: _url, ...rest }) => rest);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, messages: keep }));
    } catch {}
  }, [email, messages]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, screen, voice]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => stopStream(), []);

  if (pathname?.startsWith("/admin")) return null;

  const hasConversation = messages.some((m) => m.from === "you");
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  function openChat(next: "home" | "chat" | "messages" = "home") {
    setOpen(true);
    setScreen(next);
  }

  function stopStream() {
    if (timerRef.current) window.clearInterval(timerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioCtxRef.current?.close().catch(() => {});
    streamRef.current = null;
    audioCtxRef.current = null;
  }

  async function startRecording() {
    setError("");
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("Voice notes aren't supported in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      chunksRef.current = [];
      cancelledRef.current = false;
      recorder.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
      const startedAt = Date.now();
      recorder.onstop = () => {
        const seconds = Math.round((Date.now() - startedAt) / 1000);
        stopStream();
        setRecording(false);
        if (cancelledRef.current || chunksRef.current.length === 0) return;
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        setVoice({ blob, url: URL.createObjectURL(blob), seconds: Math.max(1, seconds) });
      };
      recorder.start();
      setRecording(true);
      setElapsed(0);
      timerRef.current = window.setInterval(() => {
        const secs = (Date.now() - startedAt) / 1000;
        setElapsed(secs);
        if (secs >= 120) recorder.stop(); // two-minute cap
      }, 200);

      // Live waveform from the microphone level.
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      ctx.createMediaStreamSource(stream).connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length / 255;
        setLevels((prev) => [...prev.slice(1), Math.min(1, 0.12 + avg * 1.8)]);
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      stopStream();
      setError("Microphone access was blocked. Allow it in your browser to send a voice note.");
    }
  }

  function stopRecording(cancel = false) {
    cancelledRef.current = cancel;
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  }

  function discardVoice() {
    if (voice) URL.revokeObjectURL(voice.url);
    setVoice(null);
  }

  async function send() {
    const text = draft.trim();
    if ((!text && !voice) || sending) return;
    if (!emailValid) {
      setError("Add your email so we can reply to you.");
      return;
    }
    setError("");
    setSending(true);

    const body = new FormData();
    body.set("email", email.trim());
    body.set("message", text);
    if (voice) {
      body.set("audio", voice.blob, "voice-note");
      body.set("duration", formatClock(voice.seconds));
    }

    const mine: Message = {
      id: uid(),
      from: "you",
      text: text || undefined,
      audioUrl: voice?.url,
      audioLabel: voice ? `Voice note · ${formatClock(voice.seconds)}` : undefined,
      at: Date.now(),
    };

    try {
      const res = await fetch("/api/chat", { method: "POST", body });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Could not send your message.");
      }
      setMessages((prev) => [...prev, mine]);
      setDraft("");
      setVoice(null);
      setShowEmoji(false);
      const firstMessage = !hasConversation;
      setTyping(true);
      window.setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            from: "team",
            text: firstMessage
              ? `Got it, thank you! A Future Dental Prep coach will reply to ${email.trim()}, usually within 24 hours (48 on weekends).`
              : "Thanks, we've added this to your conversation.",
            at: Date.now(),
          },
        ]);
        playChime();
      }, 1100);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send your message.");
    } finally {
      setSending(false);
    }
  }

  const lastTeam = [...messages].reverse().find((m) => m.from === "team");

  return (
    // The wrapper ignores clicks so the closed panel never blocks the page beneath it.
    <div className="fdp-chat pointer-events-none fixed right-5 bottom-4 z-[70] flex flex-col items-end gap-3 sm:right-10 sm:bottom-6">
      {/* Panel */}
      <div
        role="dialog"
        aria-label="Chat with Future Dental Prep"
        inert={!open}
        className={`flex h-[min(640px,calc(100dvh-110px))] w-[min(390px,calc(100vw-32px))] origin-bottom-right flex-col overflow-hidden rounded-[26px] border border-[var(--c-line2)] fdp-chat-panel text-[var(--c-ink)] shadow-[0_30px_80px_-20px_rgba(11,27,58,0.5),0_0_0_1px_rgba(11,27,58,0.04)] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
      >
        {screen === "home" ? (
          <div className="relative flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {/* Branded header so the panel stands apart from a white page. */}
            <div className="relative shrink-0 overflow-hidden bg-[linear-gradient(135deg,#0B1B3A_0%,#16306A_55%,#1F5BD8_120%)] px-6 pt-6 pb-16 text-white">
              <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-[#4F8BFF]/35 blur-3xl" aria-hidden />
              <div className="relative flex items-center justify-between">
                <span className="text-[14px] font-extrabold tracking-[-0.01em]">
                  Future <span className="text-[#9DB9F5]">Dental Prep</span>
                </span>
                <div className="flex items-center gap-3">
                  <Avatars />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close chat"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-white/15 hover:text-white"
                  >
                    <Icon name="close" />
                  </button>
                </div>
              </div>
              {/* A <p>, not a heading: the widget is on every page and shouldn't add an H2 to each page's outline. */}
              <p className="relative mt-9 text-[28px] leading-[1.15] font-extrabold tracking-[-0.02em]">
                Hi there 👋
                <br />
                <span className="text-white/75">How can we help?</span>
              </p>
            </div>
            <div className="relative -mt-9 flex flex-col gap-3 px-5 pb-6">
              <button
                type="button"
                onClick={() => setScreen("chat")}
                className="group flex items-center justify-between rounded-2xl border border-[var(--c-line)] bg-[var(--c-card)] px-5 py-4 text-left shadow-[0_14px_30px_-22px_rgba(11,27,58,0.6)] transition hover:border-[var(--c-line2)] hover:bg-[var(--c-tint2)]"
              >
                <span>
                  <b className="block text-[15px]">{hasConversation ? "Continue the conversation" : "Send us a message"}</b>
                  <span className="mt-0.5 block text-[13px] text-[var(--c-sub)]">Type or send a voice note · replies within 24h</span>
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1F5BD8] text-white transition group-hover:translate-x-0.5">
                  <Icon name="send" size={16} />
                </span>
              </button>
              <Link
                href="/schedule"
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between rounded-2xl border border-[var(--c-line)] bg-[var(--c-card)] px-5 py-4 shadow-[0_14px_30px_-24px_rgba(11,27,58,0.5)] transition hover:border-[var(--c-line2)] hover:bg-[var(--c-tint2)]"
              >
                <span>
                  <b className="block text-[15px]">Book a free 15-minute call</b>
                  <span className="mt-0.5 block text-[13px] text-[var(--c-sub)]">Talk through your plan with our team</span>
                </span>
                <span className="text-[var(--c-mute)] transition group-hover:translate-x-0.5 group-hover:text-[var(--c-ink)]">
                  <Icon name="arrow" />
                </span>
              </Link>
              <Link
                href="/dat-study-plan-generator"
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between rounded-2xl border border-[var(--c-line)] bg-[var(--c-card)] px-5 py-4 shadow-[0_14px_30px_-24px_rgba(11,27,58,0.5)] transition hover:border-[var(--c-line2)] hover:bg-[var(--c-tint2)]"
              >
                <span>
                  <b className="block text-[15px]">Build a free DAT study plan</b>
                  <span className="mt-0.5 block text-[13px] text-[var(--c-sub)]">Ready in about 2 minutes</span>
                </span>
                <span className="text-[var(--c-mute)] transition group-hover:translate-x-0.5 group-hover:text-[var(--c-ink)]">
                  <Icon name="arrow" />
                </span>
              </Link>
            </div>
          </div>
        ) : null}

        {screen === "messages" ? (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-[var(--c-line)] px-5 py-4">
              <b className="text-[16px]">Messages</b>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--c-sub)] transition hover:bg-[var(--c-tint2)] hover:text-[var(--c-ink)]"
              >
                <Icon name="close" />
              </button>
            </div>
            <div className="flex-1 overflow-x-hidden overflow-y-auto p-3">
              {hasConversation ? (
                <button
                  type="button"
                  onClick={() => setScreen("chat")}
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-[var(--c-tint2)]"
                >
                  <Avatars size={30} />
                  <span className="min-w-0 flex-1">
                    <b className="block text-[14px]">Future Dental Prep</b>
                    <span className="block truncate text-[13px] text-[var(--c-sub)]">{lastTeam?.text}</span>
                  </span>
                  <Icon name="arrow" size={16} />
                </button>
              ) : (
                <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--c-tint2)] text-[var(--c-sub)]">
                    <Icon name="inbox" size={22} />
                  </span>
                  <b className="mt-4 text-[15px]">No messages yet</b>
                  <p className="mt-1 text-[13px] text-[var(--c-sub)]">Messages from our team will show up here.</p>
                  <button
                    type="button"
                    onClick={() => setScreen("chat")}
                    className="mt-5 rounded-full bg-[#1F5BD8] text-white px-5 py-2.5 text-[14px] font-bold transition hover:bg-[#3A72E8]"
                  >
                    Send us a message
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : null}

        {screen === "chat" ? (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex items-center gap-3 bg-[linear-gradient(135deg,#0B1B3A_0%,#16306A_60%,#1F5BD8_130%)] px-4 py-3 text-white">
              <button
                type="button"
                onClick={() => setScreen("home")}
                aria-label="Back"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-white/15 hover:text-white"
              >
                <Icon name="back" />
              </button>
              <Avatars size={30} />
              <span className="min-w-0 flex-1">
                <b className="block text-[14px]">Future Dental Prep</b>
                <span className="flex items-center gap-1.5 text-[12px] text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3DDC97]" aria-hidden />
                  The team usually replies within a day
                </span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-white/15 hover:text-white"
              >
                <Icon name="close" />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-x-hidden overflow-y-auto px-4 py-5" aria-live="polite">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[82%] rounded-[18px] px-4 py-2.5 text-[14px] leading-relaxed ${
                      m.from === "you"
                        ? "rounded-br-md bg-[#1F5BD8] text-white"
                        : "rounded-bl-md border border-[var(--c-line)] bg-[var(--c-tint)] text-[var(--c-ink2)]"
                    }`}
                  >
                    {m.audioUrl ? (
                      <audio src={m.audioUrl} controls className="fdp-chat-audio mb-1 h-9 w-[220px] max-w-full" />
                    ) : m.audioLabel ? (
                      <span className="flex items-center gap-1.5 text-[var(--c-ink2)]">
                        <Icon name="mic" size={15} />
                        {m.audioLabel}
                      </span>
                    ) : null}
                    {m.text ? <p className="whitespace-pre-wrap">{m.text}</p> : null}
                  </div>
                </div>
              ))}
              {typing ? (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-[18px] rounded-bl-md border border-[var(--c-line)] bg-[var(--c-tint)] px-4 py-3.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--c-mute)]"
                        style={{ animationDelay: `${i * 120}ms` }}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="p-3">
              {error ? <p className="mb-2 px-1 text-[12.5px] text-[var(--c-error)]">{error}</p> : null}
              <div className="rounded-[20px] border border-[var(--c-line2)] bg-[var(--c-tint)] focus-within:border-[var(--c-line3)]">
                {!hasConversation || !emailValid ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email, so we can reply"
                    aria-label="Your email"
                    className="w-full border-b border-[var(--c-line)] bg-transparent px-4 py-3 text-[14px] text-[var(--c-ink)] outline-none placeholder:text-[var(--c-mute)]"
                  />
                ) : null}

                {recording ? (
                  <div className="flex items-center gap-3 px-3 py-3">
                    <button
                      type="button"
                      onClick={() => stopRecording(true)}
                      aria-label="Cancel recording"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--c-sub)] transition hover:bg-[var(--c-tint2)] hover:text-[var(--c-ink)]"
                    >
                      <Icon name="trash" size={17} />
                    </button>
                    <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#FF5A5F]" aria-hidden />
                    <span className="w-10 shrink-0 text-[13px] tabular-nums text-[var(--c-ink2)]">{formatClock(elapsed)}</span>
                    <div className="flex h-8 flex-1 items-center gap-[3px]" aria-hidden>
                      {levels.map((level, i) => (
                        <span key={i} className="w-[3px] flex-1 rounded-full bg-[#82A8FF]" style={{ height: `${level * 100}%` }} />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => stopRecording(false)}
                      aria-label="Stop recording"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF5A5F] text-white transition hover:bg-[#FF6F73]"
                    >
                      <Icon name="stop" size={16} />
                    </button>
                  </div>
                ) : voice ? (
                  <div className="flex items-center gap-2 px-3 py-3">
                    <button
                      type="button"
                      onClick={discardVoice}
                      aria-label="Delete voice note"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--c-sub)] transition hover:bg-[var(--c-tint2)] hover:text-[var(--c-ink)]"
                    >
                      <Icon name="trash" size={17} />
                    </button>
                    <audio src={voice.url} controls className="fdp-chat-audio h-9 min-w-0 flex-1" />
                    <button
                      type="button"
                      onClick={send}
                      disabled={sending}
                      aria-label="Send voice note"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1F5BD8] text-white transition hover:bg-[#3A72E8] disabled:opacity-50"
                    >
                      <Icon name="send" size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          void send();
                        }
                      }}
                      rows={2}
                      placeholder="Message…"
                      aria-label="Message"
                      className="block w-full resize-none bg-transparent px-4 pt-3 text-[14px] text-[var(--c-ink)] outline-none placeholder:text-[var(--c-mute)]"
                    />
                    <div className="relative flex items-center gap-1 px-2 pb-2">
                      <button
                        type="button"
                        onClick={() => setShowEmoji((v) => !v)}
                        aria-label="Add emoji"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--c-sub)] transition hover:bg-[var(--c-tint2)] hover:text-[var(--c-ink)]"
                      >
                        <Icon name="smile" />
                      </button>
                      <button
                        type="button"
                        onClick={startRecording}
                        aria-label="Record a voice note"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--c-sub)] transition hover:bg-[var(--c-tint2)] hover:text-[var(--c-ink)]"
                      >
                        <Icon name="mic" />
                      </button>
                      {showEmoji ? (
                        <div className="absolute bottom-12 left-2 flex gap-1 rounded-2xl border border-[var(--c-line)] bg-[var(--c-pop)] p-2 shadow-xl">
                          {EMOJIS.map((emoji) => (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => {
                                setDraft((d) => d + emoji);
                                setShowEmoji(false);
                              }}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-[18px] transition hover:bg-[var(--c-tint2)]"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      ) : null}
                      <button
                        type="button"
                        onClick={send}
                        disabled={sending || !draft.trim()}
                        aria-label="Send message"
                        className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#1F5BD8] text-white transition hover:bg-[#3A72E8] disabled:bg-[var(--c-tint2)] disabled:text-[var(--c-mute)]"
                      >
                        <Icon name="send" size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {screen !== "chat" ? (
          <nav className="grid grid-cols-2 border-t border-[var(--c-line)]" aria-label="Chat sections">
            {(["home", "messages"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setScreen(tab)}
                className={`flex flex-col items-center gap-1 py-3 text-[12.5px] font-bold transition ${
                  screen === tab ? "text-[var(--c-ink)]" : "text-[var(--c-mute)] hover:text-[var(--c-ink2)]"
                }`}
              >
                <Icon name={tab === "home" ? "home" : "inbox"} size={20} />
                {tab === "home" ? "Home" : "Messages"}
              </button>
            ))}
          </nav>
        ) : null}
      </div>

      {/* Launcher */}
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openChat(hasConversation ? "chat" : "home"))}
        aria-label={open ? "Close chat" : "Chat with us"}
        aria-expanded={open}
        className="pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#1F5BD8_0%,#3A72E8_100%)] text-white shadow-[0_16px_34px_-10px_rgba(31,91,216,0.7)] transition duration-300 hover:scale-105"
      >
        {!open ? <span className="absolute inset-0 animate-ping rounded-full bg-[#1F5BD8]/30 motion-reduce:hidden" aria-hidden /> : null}
        <span className={`absolute transition duration-300 ${open ? "scale-50 rotate-90 opacity-0" : "scale-100 opacity-100"}`}>
          <Icon name="agent" size={26} />
        </span>
        <span className={`absolute transition duration-300 ${open ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0"}`}>
          <Icon name="close" size={22} />
        </span>
      </button>
    </div>
  );
}
