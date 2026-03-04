"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, Newspaper, Settings, Users } from "lucide-react";
import { Command } from "cmdk";
import { usePanel } from "@/components/panel-context";
import type { ActiveView } from "@/components/sidebar";
import { members } from "@/lib/data/members";

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setActiveView: (view: ActiveView) => void;
};

export function CommandPalette({
  open,
  onOpenChange,
  setActiveView,
}: CommandPaletteProps) {
  const { openPanelWithMember } = usePanel();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(!open);
      }

      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-24 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-140 overflow-hidden rounded-xl border border-[var(--os-border-subtle)] bg-(--os-surface) shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Command className="w-full bg-transparent text-[var(--os-text-primary)]">
              <Command.Input
                placeholder="Search members, actions..."
                className="w-full border-b border-[var(--os-border-subtle)] bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[var(--os-text-muted)]"
              />

              <Command.List className="max-h-[460px] overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-sm text-[var(--os-text-muted)]">
                  No results found
                </Command.Empty>

                <Command.Group
                  heading="Members"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-[0.16em] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-[var(--os-text-muted)]"
                >
                  {members.map((member) => (
                    <Command.Item
                      key={member.id}
                      value={`${member.name} ${member.email} ${member.role}`}
                      onSelect={() => {
                        openPanelWithMember(member);
                        setActiveView("members");
                        onOpenChange(false);
                      }}
                      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--os-text-muted)] data-[selected=true]:bg-(--os-accent-glow) data-[selected=true]:text-[var(--os-text-primary)]"
                    >
                      <div
                        className="flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-[var(--os-bg)]"
                        style={{ backgroundColor: member.avatarColor }}
                      >
                        {member.avatarInitials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[var(--os-text-primary)]">
                          {member.name}
                        </p>
                        <p className="truncate text-xs text-[var(--os-text-muted)]">
                          {member.email}
                        </p>
                      </div>
                      <span className="rounded-full border border-[var(--os-border-subtle)] px-2 py-0.5 text-[10px] text-[var(--os-text-muted)]">
                        {member.role}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Separator className="my-2 h-px bg-(--os-border-subtle)" />

                <Command.Group
                  heading="Navigation"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-[0.16em] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-[var(--os-text-muted)]"
                >
                  <Command.Item
                    value="Members"
                    onSelect={() => {
                      setActiveView("members");
                      onOpenChange(false);
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--os-text-muted)] data-[selected=true]:bg-(--os-accent-glow) data-[selected=true]:text-[var(--os-text-primary)]"
                  >
                    <Users className="size-4" />
                    Members
                  </Command.Item>
                  <Command.Item
                    value="Pulse"
                    onSelect={() => {
                      setActiveView("pulse");
                      onOpenChange(false);
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--os-text-muted)] data-[selected=true]:bg-(--os-accent-glow) data-[selected=true]:text-[var(--os-text-primary)]"
                  >
                    <Activity className="size-4" />
                    Pulse
                  </Command.Item>
                  <Command.Item
                    value="Content"
                    onSelect={() => {
                      setActiveView("content");
                      onOpenChange(false);
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--os-text-muted)] data-[selected=true]:bg-(--os-accent-glow) data-[selected=true]:text-[var(--os-text-primary)]"
                  >
                    <Newspaper className="size-4" />
                    Content
                  </Command.Item>
                  <Command.Item
                    value="Settings"
                    onSelect={() => {
                      setActiveView("settings");
                      onOpenChange(false);
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--os-text-muted)] data-[selected=true]:bg-(--os-accent-glow) data-[selected=true]:text-[var(--os-text-primary)]"
                  >
                    <Settings className="size-4" />
                    Settings
                  </Command.Item>
                </Command.Group>

                <Command.Separator className="my-2 h-px bg-(--os-border-subtle)" />

                <Command.Group
                  heading="Actions"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-[0.16em] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-[var(--os-text-muted)]"
                >
                  {["Invite Member", "Export CSV", "View Analytics"].map(
                    (action) => (
                      <Command.Item
                        key={action}
                        value={action}
                        onSelect={() => onOpenChange(false)}
                        className="cursor-pointer rounded-md px-3 py-2 text-sm text-[var(--os-text-muted)] data-[selected=true]:bg-(--os-accent-glow) data-[selected=true]:text-[var(--os-text-primary)]"
                      >
                        {action}
                      </Command.Item>
                    )
                  )}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
