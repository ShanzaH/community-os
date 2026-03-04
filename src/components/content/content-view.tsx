"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  HelpCircle,
  Megaphone,
  MessageCircle,
  MessageSquare,
  Pin,
  ThumbsUp,
  Inbox,
} from "lucide-react";
import { contentPosts, type ContentPost, type ContentSpace } from "@/lib/data/content";

type SpaceFilter = "all" | ContentSpace;

const filters: Array<{ label: string; value: SpaceFilter }> = [
  { label: "All", value: "all" },
  { label: "#general", value: "#general" },
  { label: "#announcements", value: "#announcements" },
  { label: "#introductions", value: "#introductions" },
  { label: "#resources", value: "#resources" },
];

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

function TypeIcon({ type }: { type: ContentPost["type"] }) {
  if (type === "announcement") {
    return (
      <div className="flex size-8 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--os-status-at-risk)_22%,transparent)]">
        <Megaphone className="size-4 text-[var(--os-status-at-risk)]" />
      </div>
    );
  }

  if (type === "question") {
    return (
      <div className="flex size-8 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--os-status-active)_22%,transparent)]">
        <HelpCircle className="size-4 text-[var(--os-status-active)]" />
      </div>
    );
  }

  return (
    <div className="flex size-8 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--os-accent)_22%,transparent)]">
      <MessageSquare className="size-4 text-[var(--os-accent)]" />
    </div>
  );
}

function StatusPill({ status }: { status: ContentPost["status"] }) {
  if (status === "pinned") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-(--os-status-at-risk)/15 px-2 py-0.5 text-xs font-medium text-[var(--os-status-at-risk)]">
        <Pin className="size-3" />
        Pinned
      </span>
    );
  }

  if (status === "hidden") {
    return (
      <span className="rounded-full bg-[color-mix(in_srgb,var(--os-status-churned)_15%,transparent)] px-2 py-0.5 text-[10px] font-medium text-[var(--os-status-churned)]">
        Hidden
      </span>
    );
  }

  return (
    <span className="rounded-full bg-(--os-bg) px-2 py-0.5 text-[10px] font-medium text-[var(--os-text-muted)]">
      Published
    </span>
  );
}

export function ContentView() {
  const [activeFilter, setActiveFilter] = useState<SpaceFilter>("all");

  const filteredPosts = useMemo(() => {
    if (activeFilter === "all") {
      return contentPosts;
    }

    return contentPosts.filter((post) => post.space === activeFilter);
  }, [activeFilter]);

  return (
    <div className="h-full overflow-y-auto bg-(--os-bg) p-6">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-semibold text-[var(--os-text-primary)]">
          Content
        </h1>

        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  isActive
                    ? "border-[var(--os-accent)] bg-(--os-accent) text-white"
                    : "border-[var(--os-border-subtle)] text-[var(--os-text-muted)] hover:bg-(--os-accent-glow) hover:text-[var(--os-text-primary)]"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="flex h-[60vh] flex-col items-center justify-center gap-2 text-center text-[var(--os-text-muted)]">
          <Inbox className="size-5" />
          <p className="text-sm">No posts in this space yet</p>
        </div>
      ) : (
        <motion.ul
          key={activeFilter}
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="divide-y divide-[var(--os-border-subtle)]"
        >
          {filteredPosts.map((post) => (
            <motion.li
              key={post.id}
              variants={itemVariants}
              className="relative flex flex-col gap-3 px-4 py-3 transition hover:bg-(--os-accent-glow) md:flex-row md:items-start"
            >
              <div className="shrink-0">
                <TypeIcon type={post.type} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-medium text-[var(--os-text-primary)] md:line-clamp-1 md:truncate">
                  {post.title}
                </p>
                <p className="mt-1 truncate text-xs text-[var(--os-text-muted)]">
                  {post.excerpt}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[var(--os-text-muted)]">
                  <div
                    className="flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-[var(--os-bg)]"
                    style={{ backgroundColor: post.author.avatarColor }}
                  >
                    {post.author.initials}
                  </div>
                  <span className="whitespace-nowrap">{post.author.name}</span>
                  <span className="rounded-full border border-[var(--os-border-subtle)] px-1.5 py-0.5 text-[10px]">
                    {post.space}
                  </span>
                  <span className="ml-auto whitespace-nowrap md:ml-0">
                    {post.createdAt}
                  </span>
                </div>
              </div>

              <div className="ml-0 flex shrink-0 flex-wrap items-center justify-between gap-2 md:ml-3 md:flex-col md:items-end md:justify-start">
                <StatusPill status={post.status} />
                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--os-text-muted)] md:flex-nowrap">
                  <span className="inline-flex items-center gap-1">
                    <ThumbsUp className="size-3.5" />
                    {post.likes}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="size-3.5" />
                    {post.comments}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Eye className="size-3.5" />
                    {post.views}
                  </span>
                </div>
              </div>

            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
