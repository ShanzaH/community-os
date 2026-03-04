"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { usePanel } from "@/components/panel-context";
import { StatusBadge } from "@/components/members/status-badge";
import { ScrollArea } from "@/components/ui/scroll-area";

type TimelineItem = {
  action: string;
  timestamp: string;
  color: string;
};

const timelineContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const timelineItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

function buildTimeline(name: string): TimelineItem[] {
  return [
    {
      action: `${name} posted in #general`,
      timestamp: "12m ago",
      color: "var(--os-accent)",
    },
    {
      action: `${name} joined live event`,
      timestamp: "1h ago",
      color: "var(--os-status-active)",
    },
    {
      action: `${name} upgraded to Pro`,
      timestamp: "Yesterday",
      color: "var(--os-status-at-risk)",
    },
    {
      action: `${name} commented on a post`,
      timestamp: "2d ago",
      color: "var(--os-accent)",
    },
    {
      action: `${name} reacted to announcement`,
      timestamp: "3d ago",
      color: "var(--os-status-active)",
    },
  ];
}

export function MemberDetailPanel() {
  const { selectedMember, closePanel } = usePanel();

  if (!selectedMember) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-[var(--os-text-muted)]">
        No member selected
      </div>
    );
  }

  const timeline = buildTimeline(selectedMember.name);
  const isOnlineNow = selectedMember.lastSeen === "Online now";

  return (
    <div className="flex h-full min-w-0 flex-col overflow-x-hidden bg-(--os-surface)">
      <div className="mx-auto mt-3 mb-1 h-1 w-10 rounded-full bg-(--os-border-subtle) md:hidden" />

      <header className="sticky top-0 z-20 border-b border-[var(--os-border-subtle)] bg-(--os-surface) p-4">
        <button
          type="button"
          onClick={closePanel}
          className="absolute top-3 right-3 rounded-md p-2 text-[var(--os-text-muted)] transition hover:bg-(--os-accent-glow) hover:text-[var(--os-text-primary)]"
          aria-label="Close detail panel"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-start gap-3 pr-10">
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-[var(--os-bg)]"
            style={{ backgroundColor: selectedMember.avatarColor }}
          >
            {selectedMember.avatarInitials}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-semibold text-[var(--os-text-primary)]">
                {selectedMember.name}
              </h2>
              <StatusBadge status={selectedMember.status} />
            </div>
            <p className="mt-1 truncate text-xs text-[var(--os-text-muted)]">
              {selectedMember.email}
            </p>
            {isOnlineNow && (
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-[var(--os-status-active)]">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--os-status-active) opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-(--os-status-active)" />
                </span>
                Online now
              </div>
            )}
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <section className="grid grid-cols-2 overflow-hidden rounded-lg border border-[var(--os-border-subtle)] bg-(--os-surface)">
            <div className="border-r border-b border-[var(--os-border-subtle)] p-3">
              <p className="text-[10px] tracking-[0.08em] uppercase text-[var(--os-text-muted)]">
                MRR
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--os-text-primary)]">
                {selectedMember.mrr > 0 ? `$${selectedMember.mrr}/mo` : "Free"}
              </p>
            </div>
            <div className="border-b border-[var(--os-border-subtle)] p-3">
              <p className="text-[10px] tracking-[0.08em] uppercase text-[var(--os-text-muted)]">
                Posts
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--os-text-primary)]">
                {selectedMember.posts}
              </p>
            </div>
            <div className="border-r border-[var(--os-border-subtle)] p-3">
              <p className="text-[10px] tracking-[0.08em] uppercase text-[var(--os-text-muted)]">
                Engagement
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--os-text-primary)]">
                {selectedMember.engagementScore}
              </p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-(--os-border-subtle)">
                <div
                  className="h-full rounded-full bg-(--os-accent)"
                  style={{ width: `${selectedMember.engagementScore}%` }}
                />
              </div>
            </div>
            <div className="p-3">
              <p className="text-[10px] tracking-[0.08em] uppercase text-[var(--os-text-muted)]">
                Joined
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--os-text-primary)]">
                {selectedMember.joinDate}
              </p>
            </div>
          </section>

          <section className="mt-5">
            <p className="text-xs tracking-[0.12em] uppercase text-[var(--os-text-muted)]">
              Recent Activity
            </p>
            <motion.ul
              variants={timelineContainer}
              initial="hidden"
              animate="show"
              className="mt-3 space-y-2"
            >
              {timeline.map((item) => (
                <motion.li
                  key={`${item.action}-${item.timestamp}`}
                  variants={timelineItem}
                  className="flex min-w-0 items-center justify-between gap-3 rounded-md border border-[var(--os-border-subtle)] bg-(--os-bg)/40 px-3 py-2"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="truncate text-xs text-[var(--os-text-primary)]">
                      {item.action}
                    </span>
                  </div>
                  <span className="shrink-0 text-[10px] text-[var(--os-text-muted)]">
                    {item.timestamp}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </section>
        </div>
      </ScrollArea>

      <footer className="sticky bottom-0 z-20 border-t border-[var(--os-border-subtle)] bg-(--os-surface) px-4 py-3">
        <div className="space-y-2">
          <button
            type="button"
            className="w-full rounded-md border border-[var(--os-border-subtle)] px-3 py-2 text-xs font-medium text-[var(--os-text-primary)] transition hover:bg-(--os-accent-glow)"
          >
            Send Message
          </button>
          <button
            type="button"
            className="w-full rounded-md border border-[var(--os-border-subtle)] px-3 py-2 text-xs font-medium text-[var(--os-text-primary)] transition hover:bg-(--os-accent-glow)"
          >
            View Profile
          </button>
          <button
            type="button"
            className="w-full rounded-md border border-[var(--os-status-churned)]/60 px-3 py-2 text-xs font-medium text-[var(--os-status-churned)] transition hover:bg-[color:color-mix(in_srgb,var(--os-status-churned)_10%,transparent)]"
          >
            Flag Member
          </button>
        </div>
      </footer>
    </div>
  );
}
