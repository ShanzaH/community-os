"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import {
  communityStats,
  liveActivityEvents,
  mrrStats,
  type PulseEvent,
} from "@/lib/data/pulse";

const statContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const statItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const upcomingEvents: PulseEvent[] = [
  {
    id: "nx1",
    type: "post",
    memberName: "Aisha Khan",
    memberInitials: "AK",
    memberColor: "#6366f1",
    action: "posted in #introductions",
    timestamp: "just now",
    isNew: true,
  },
  {
    id: "nx2",
    type: "join",
    memberName: "Noah Rivera",
    memberInitials: "NR",
    memberColor: "#10b981",
    action: "joined the community",
    timestamp: "just now",
    isNew: true,
  },
  {
    id: "nx3",
    type: "upgrade",
    memberName: "Layla Ahmed",
    memberInitials: "LA",
    memberColor: "#f59e0b",
    action: "upgraded to Pro",
    timestamp: "just now",
    isNew: true,
  },
  {
    id: "nx4",
    type: "comment",
    memberName: "Daniel Kim",
    memberInitials: "DK",
    memberColor: "#8b5cf6",
    action: "commented on a post",
    timestamp: "just now",
    isNew: true,
  },
];

function Sparkline() {
  const data = mrrStats.sparkline.map((value, index) => ({
    name: index,
    value,
  }));

  return (
    <div className="h-20 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="pulseSparklineFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#pulseSparklineFill)"
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PulseView() {
  const [events, setEvents] = useState<PulseEvent[]>(liveActivityEvents);
  const eventCursor = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((prev) => {
        const next = upcomingEvents[eventCursor.current % upcomingEvents.length];
        const uniqueId = `${next.id}-${Date.now()}`;
        eventCursor.current += 1;
        return [{ ...next, id: uniqueId }, ...prev].slice(0, 10);
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const activeSubscribers = useMemo(
    () => Math.max(1, Math.round(mrrStats.current / 49)),
    []
  );
  const avgPerMember = useMemo(
    () => Math.round(mrrStats.current / communityStats.totalMembers),
    []
  );

  return (
    <div className="h-full overflow-y-auto bg-[var(--os-bg)] p-6">
      <motion.section
        variants={statContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        <motion.div
          variants={statItem}
          className="rounded-lg border border-[var(--os-border-subtle)] bg-[var(--os-surface)] p-4"
        >
          <p className="text-[10px] tracking-[0.12em] uppercase text-[var(--os-text-muted)]">
            Total Members
          </p>
          <p className="mt-2 text-2xl font-semibold text-[var(--os-text-primary)]">
            {communityStats.totalMembers}
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--os-status-active)]">
            <ArrowUpRight className="size-3.5" />
            +4.2%
          </p>
        </motion.div>

        <motion.div
          variants={statItem}
          className="rounded-lg border border-[var(--os-border-subtle)] bg-[var(--os-surface)] p-4"
        >
          <p className="text-[10px] tracking-[0.12em] uppercase text-[var(--os-text-muted)]">
            Active Today
          </p>
          <p className="mt-2 text-2xl font-semibold text-[var(--os-text-primary)]">
            {communityStats.activeToday}
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--os-status-active)]">
            <ArrowUpRight className="size-3.5" />
            +2.1%
          </p>
        </motion.div>

        <motion.div
          variants={statItem}
          className="rounded-lg border border-[var(--os-border-subtle)] bg-[var(--os-surface)] p-4"
        >
          <p className="text-[10px] tracking-[0.12em] uppercase text-[var(--os-text-muted)]">
            New This Week
          </p>
          <p className="mt-2 text-2xl font-semibold text-[var(--os-text-primary)]">
            {communityStats.newThisWeek}
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--os-status-active)]">
            <ArrowUpRight className="size-3.5" />
            +1.6%
          </p>
        </motion.div>

        <motion.div
          variants={statItem}
          className="rounded-lg border border-[var(--os-border-subtle)] bg-[var(--os-surface)] p-4"
        >
          <p className="text-[10px] tracking-[0.12em] uppercase text-[var(--os-text-muted)]">
            Churn Risk
          </p>
          <p className="mt-2 text-2xl font-semibold text-[var(--os-text-primary)]">
            {communityStats.churnRisk}
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--os-status-churned)]">
            <ArrowDownRight className="size-3.5" />
            -0.8%
          </p>
        </motion.div>
      </motion.section>

      <section className="mt-6 flex flex-col gap-4 lg:flex-row">
        <div className="flex-1 rounded-lg border border-[var(--os-border-subtle)] bg-[var(--os-surface)] p-4">
          <div className="mb-4 flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--os-status-active)] opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-[var(--os-status-active)]" />
            </span>
            <h2 className="text-sm font-semibold text-[var(--os-text-primary)]">
              Live Activity
            </h2>
          </div>

          <motion.ul layout className="space-y-2">
            <AnimatePresence initial={false}>
              {events.map((event) => (
                <motion.li
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center justify-between gap-3 rounded-md border border-[var(--os-border-subtle)] px-3 py-2 ${
                    event.isNew
                      ? "border-l-2 border-l-[var(--os-accent)] bg-[var(--os-accent-glow)]"
                      : "bg-[var(--os-bg)]/40"
                  }`}
                >
                  <div className="min-w-0 flex items-center gap-3">
                    <div
                      className="flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-[var(--os-bg)]"
                      style={{ backgroundColor: event.memberColor }}
                    >
                      {event.memberInitials}
                    </div>
                    <p className="truncate text-sm text-[var(--os-text-primary)]">
                      <span className="font-medium">{event.memberName}</span>{" "}
                      <span className="text-[var(--os-text-muted)]">
                        {event.action}
                      </span>
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-[var(--os-text-muted)]">
                    {event.timestamp}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>

        <div className="w-full rounded-lg border border-[var(--os-border-subtle)] bg-[var(--os-surface)] p-4 lg:w-72">
          <h2 className="text-sm font-semibold text-[var(--os-text-primary)]">
            Monthly Revenue
          </h2>
          <p className="mt-3 text-3xl font-semibold text-[var(--os-text-primary)]">
            ${mrrStats.current.toLocaleString()}
          </p>
          <p className="mt-1 text-sm text-[var(--os-status-active)]">
            +${mrrStats.change} this month
          </p>

          <div className="mt-4 rounded-md bg-[var(--os-bg)]/50 p-2">
            <Sparkline />
          </div>

          <div className="mt-4 space-y-2 border-t border-[var(--os-border-subtle)] pt-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--os-text-muted)]">
                Active Subscribers
              </span>
              <span className="font-medium text-[var(--os-text-primary)]">
                {activeSubscribers}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--os-text-muted)]">Avg per member</span>
              <span className="font-medium text-[var(--os-text-primary)]">
                ${avgPerMember}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
