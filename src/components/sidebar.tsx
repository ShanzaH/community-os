"use client";

import { Activity, Newspaper, Settings, Users } from "lucide-react";

export type ActiveView = "members" | "pulse" | "content" | "settings";

const navItems = [
  { label: "Members", icon: Users, view: "members" as const },
  { label: "Content", icon: Newspaper, view: "content" as const },
  { label: "Pulse", icon: Activity, view: "pulse" as const },
  { label: "Settings", icon: Settings, view: "settings" as const },
];

type SidebarProps = {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  onOpenCommand: () => void;
};

export function Sidebar({
  activeView,
  setActiveView,
  onOpenCommand,
}: SidebarProps) {
  return (
    <>
      <aside className="fixed top-0 left-0 hidden h-full w-60 flex-col border-r border-(--os-border-subtle) bg-(--os-surface) lg:flex">
        <div className="flex h-16 items-center gap-3 border-b border-(--os-border-subtle) px-5">
          <span className="size-3 rounded-[2px] bg-(--os-accent)" />
          <span className="text-sm font-semibold tracking-wide text-(--os-text-primary)">
            Community OS
          </span>
        </div>

        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.view === activeView;

              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => {
                      if (item.view) {
                        setActiveView(item.view);
                      }
                    }}
                    className={`flex w-full items-center gap-3 border-l-2 px-3 py-2 text-sm transition ${
                      isActive
                        ? "border-(--os-accent) bg-(--os-accent-glow) text-(--os-text-primary)"
                        : "border-transparent text-(--os-text-muted) hover:bg-(--os-accent-glow)/60 hover:text-(--os-text-primary)"
                    }`}
                  >
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-(--os-border-subtle) p-4">
          <button
            type="button"
            onClick={onOpenCommand}
            className="mb-3 w-full rounded-md border border-(--os-border-subtle) bg-(--os-bg) px-2 py-1 text-center text-xs text-(--os-text-muted) transition hover:bg-(--os-accent-glow) hover:text-(--os-text-primary)"
          >
            ⌘K
          </button>
          <div className="flex items-center gap-3 rounded-md bg-background/50 p-2">
            <div className="flex size-9 items-center justify-center rounded-full bg-(--os-accent)/25 text-xs font-semibold text-(--os-text-primary)">
              SS
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-(--os-text-primary)">
                Sana Sheikh
              </p>
              <p className="truncate text-xs text-(--os-text-muted)">
                Community Lead
              </p>
            </div>
          </div>
        </div>
      </aside>

      <aside className="fixed top-0 left-0 hidden h-full w-16 flex-col border-r border-(--os-border-subtle) bg-(--os-surface) md:flex lg:hidden">
        <div className="flex h-16 items-center justify-center border-b border-(--os-border-subtle)">
          <span className="size-3 rounded-[2px] bg-(--os-accent)" />
        </div>

        <nav className="flex-1 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.view === activeView;

              return (
                <li key={item.label} className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (item.view) {
                        setActiveView(item.view);
                      }
                    }}
                    className={`flex size-10 items-center justify-center rounded-md transition ${
                      isActive
                        ? "bg-(--os-accent) text-white"
                        : "text-(--os-text-muted) hover:bg-(--os-accent-glow) hover:text-(--os-text-primary)"
                    }`}
                    aria-label={item.label}
                  >
                    <Icon className="size-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-(--os-border-subtle) p-3">
          <div className="flex justify-center">
            <div className="flex size-9 items-center justify-center rounded-full bg-(--os-accent)/25 text-xs font-semibold text-(--os-text-primary)">
              SS
            </div>
          </div>
        </div>
      </aside>

      <nav className="fixed right-0 bottom-0 left-0 z-40 h-[60px] border-t border-[var(--os-border-subtle)] bg-[var(--os-surface)] md:hidden">
        <ul className="mx-auto flex h-full max-w-md items-center justify-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.view === activeView;

            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => {
                    if (item.view) {
                      setActiveView(item.view);
                    }
                  }}
                  className={`relative flex size-9 items-center justify-center transition ${
                    isActive ? "text-(--os-accent)" : "text-(--os-text-muted)"
                  }`}
                  aria-label={item.label}
                >
                  <Icon className="size-5" />
                  {isActive && (
                    <span className="absolute -bottom-1 size-1.5 rounded-full bg-(--os-accent)" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
