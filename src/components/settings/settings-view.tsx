"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type SettingsSection =
  | "general"
  | "members"
  | "notifications"
  | "billing"
  | "integrations"
  | "danger";

type ToggleProps = {
  enabled: boolean;
  onChange: (value: boolean) => void;
};

const inputClass =
  "w-full rounded-md border border-[var(--os-border-subtle)] bg-[var(--os-bg)] px-3 py-2 text-sm text-[var(--os-text-primary)] outline-none focus:ring-1 focus:ring-[var(--os-accent)]";

const sections: Array<{ id: SettingsSection; label: string }> = [
  { id: "general", label: "General" },
  { id: "members", label: "Members" },
  { id: "notifications", label: "Notifications" },
  { id: "billing", label: "Billing" },
  { id: "integrations", label: "Integrations" },
  { id: "danger", label: "Danger Zone" },
];

function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full border transition ${
        enabled
          ? "border-[var(--os-accent)] bg-[var(--os-accent)]"
          : "border-[var(--os-border-subtle)] bg-[var(--os-bg)]"
      }`}
      aria-pressed={enabled}
    >
      <span
        className={`inline-block size-4 transform rounded-full bg-white transition ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export function SettingsView() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("general");
  const [defaultRole, setDefaultRole] = useState<"Member" | "Moderator">(
    "Member"
  );

  const [requireEmailVerification, setRequireEmailVerification] =
    useState(true);
  const [allowDirectory, setAllowDirectory] = useState(true);
  const [inviteOnly, setInviteOnly] = useState(false);

  const [notifNewMember, setNotifNewMember] = useState(true);
  const [notifAtRisk, setNotifAtRisk] = useState(true);
  const [notifPostFlagged, setNotifPostFlagged] = useState(true);
  const [notifWeeklyDigest, setNotifWeeklyDigest] = useState(false);
  const [notifRevenueMilestone, setNotifRevenueMilestone] = useState(true);

  return (
    <div className="h-full bg-[var(--os-bg)] p-6">
      <div className="flex h-full flex-col gap-4 lg:flex-row">
        <aside className="w-full rounded-lg border border-[var(--os-border-subtle)] bg-[var(--os-surface)] p-2 lg:w-[200px] lg:shrink-0">
          <ul className="space-y-1">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full border-l-2 px-3 py-2 text-left text-xs tracking-[0.1em] transition ${
                      isActive
                        ? "border-[var(--os-accent)] bg-[var(--os-accent-glow)] text-[var(--os-text-primary)]"
                        : "border-transparent text-[var(--os-text-muted)] hover:bg-[var(--os-accent-glow)]/60 hover:text-[var(--os-text-primary)]"
                    }`}
                  >
                    {section.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <section className="min-w-0 flex-1 rounded-lg border border-[var(--os-border-subtle)] bg-[var(--os-surface)] p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="h-full overflow-y-auto pr-1"
            >
              {activeSection === "general" && (
                <div className="space-y-4">
                  <h2 className="text-base font-semibold text-[var(--os-text-primary)]">
                    General
                  </h2>

                  <div>
                    <label className="mb-1 block text-xs text-[var(--os-text-muted)]">
                      Community name
                    </label>
                    <input className={inputClass} defaultValue="Community OS" />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-[var(--os-text-muted)]">
                      Community URL slug
                    </label>
                    <input className={inputClass} defaultValue="community-os" />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-[var(--os-text-muted)]">
                      Description
                    </label>
                    <textarea
                      className={`${inputClass} min-h-24 resize-none`}
                      defaultValue="Private space for operators, moderators, and community builders."
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-[var(--os-text-muted)]">
                      Timezone
                    </label>
                    <select className={inputClass} defaultValue="UTC+05:00">
                      <option>UTC-08:00</option>
                      <option>UTC+00:00</option>
                      <option>UTC+05:00</option>
                      <option>UTC+08:00</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    className="rounded-md bg-[var(--os-accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    Save Changes
                  </button>
                </div>
              )}

              {activeSection === "members" && (
                <div className="space-y-5">
                  <h2 className="text-base font-semibold text-[var(--os-text-primary)]">
                    Members
                  </h2>

                  <div>
                    <p className="mb-2 text-xs text-[var(--os-text-muted)]">
                      Default role for new members
                    </p>
                    <div className="flex gap-4">
                      {(["Member", "Moderator"] as const).map((role) => (
                        <label
                          key={role}
                          className="inline-flex items-center gap-2 text-sm text-[var(--os-text-primary)]"
                        >
                          <input
                            type="radio"
                            name="default-role"
                            checked={defaultRole === role}
                            onChange={() => setDefaultRole(role)}
                          />
                          {role}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--os-text-primary)]">
                        Require email verification
                      </span>
                      <Toggle
                        enabled={requireEmailVerification}
                        onChange={setRequireEmailVerification}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--os-text-primary)]">
                        Allow member directory
                      </span>
                      <Toggle
                        enabled={allowDirectory}
                        onChange={setAllowDirectory}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--os-text-primary)]">
                        Invite only mode
                      </span>
                      <Toggle enabled={inviteOnly} onChange={setInviteOnly} />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="rounded-md bg-[var(--os-accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    Save Changes
                  </button>
                </div>
              )}

              {activeSection === "notifications" && (
                <div className="space-y-3">
                  <h2 className="text-base font-semibold text-[var(--os-text-primary)]">
                    Notifications
                  </h2>

                  {[
                    {
                      label: "New member joined",
                      description: "Get notified when someone joins.",
                      enabled: notifNewMember,
                      onChange: setNotifNewMember,
                    },
                    {
                      label: "Member at risk",
                      description: "Alerts for engagement drop-offs.",
                      enabled: notifAtRisk,
                      onChange: setNotifAtRisk,
                    },
                    {
                      label: "Post flagged",
                      description: "Moderation alerts for flagged content.",
                      enabled: notifPostFlagged,
                      onChange: setNotifPostFlagged,
                    },
                    {
                      label: "Weekly digest",
                      description: "Weekly summary email of key metrics.",
                      enabled: notifWeeklyDigest,
                      onChange: setNotifWeeklyDigest,
                    },
                    {
                      label: "Revenue milestone",
                      description: "Notify when MRR hits a new milestone.",
                      enabled: notifRevenueMilestone,
                      onChange: setNotifRevenueMilestone,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start justify-between rounded-md border border-[var(--os-border-subtle)] bg-[var(--os-bg)]/50 p-3"
                    >
                      <div>
                        <p className="text-sm text-[var(--os-text-primary)]">
                          {item.label}
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--os-text-muted)]">
                          {item.description}
                        </p>
                      </div>
                      <Toggle enabled={item.enabled} onChange={item.onChange} />
                    </div>
                  ))}
                </div>
              )}

              {activeSection === "billing" && (
                <div className="space-y-4">
                  <h2 className="text-base font-semibold text-[var(--os-text-primary)]">
                    Billing
                  </h2>

                  <div className="rounded-lg border border-[var(--os-border-subtle)] bg-[var(--os-bg)]/40 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-medium text-[var(--os-text-primary)]">
                        Pro Plan — $99/mo
                      </p>
                      <span className="rounded-full bg-[var(--os-accent)]/20 px-2 py-0.5 text-[10px] font-medium text-[var(--os-accent)]">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-[var(--os-text-muted)]">
                      Next billing date: Apr 12, 2026
                    </p>
                    <p className="mt-1 text-xs text-[var(--os-text-muted)]">
                      Payment method: Visa ending in 4242
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="rounded-md bg-[var(--os-accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                    >
                      Upgrade Plan
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-[var(--os-border-subtle)] px-4 py-2 text-sm text-[var(--os-text-muted)] transition hover:bg-[var(--os-accent-glow)] hover:text-[var(--os-text-primary)]"
                    >
                      Cancel Subscription
                    </button>
                  </div>
                </div>
              )}

              {activeSection === "integrations" && (
                <div className="space-y-4">
                  <h2 className="text-base font-semibold text-[var(--os-text-primary)]">
                    Integrations
                  </h2>
                  <p className="text-sm text-[var(--os-text-muted)]">
                    Connect tools to sync community events, analytics, and
                    billing workflows.
                  </p>
                  <div className="space-y-2">
                    {["Slack", "Discord", "Stripe", "Zapier"].map((app) => (
                      <div
                        key={app}
                        className="flex items-center justify-between rounded-md border border-[var(--os-border-subtle)] bg-[var(--os-bg)]/40 px-3 py-2"
                      >
                        <span className="text-sm text-[var(--os-text-primary)]">
                          {app}
                        </span>
                        <button
                          type="button"
                          className="rounded-md border border-[var(--os-border-subtle)] px-2 py-1 text-xs text-[var(--os-text-muted)] transition hover:bg-[var(--os-accent-glow)] hover:text-[var(--os-text-primary)]"
                        >
                          Connect
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "danger" && (
                <div className="space-y-4">
                  <h2 className="text-base font-semibold text-[var(--os-text-primary)]">
                    Danger Zone
                  </h2>

                  <div className="rounded-lg border border-[var(--os-status-churned)]/60 bg-[color:color-mix(in_srgb,var(--os-status-churned)_8%,transparent)] p-4">
                    <p className="text-sm font-medium text-[var(--os-text-primary)]">
                      Delete Community
                    </p>
                    <p className="mt-1 text-xs text-[var(--os-text-muted)]">
                      Permanently remove your community and all associated data.
                      This action cannot be undone.
                    </p>
                    <button
                      type="button"
                      className="mt-3 rounded-md bg-[var(--os-status-churned)] px-3 py-2 text-sm font-medium text-white transition hover:opacity-90"
                    >
                      Delete Community
                    </button>
                  </div>

                  <div className="rounded-lg border border-[var(--os-border-subtle)] bg-[var(--os-bg)]/40 p-4">
                    <p className="text-sm font-medium text-[var(--os-text-primary)]">
                      Export All Data
                    </p>
                    <p className="mt-1 text-xs text-[var(--os-text-muted)]">
                      Download members, posts, and analytics as a complete data
                      export package.
                    </p>
                    <button
                      type="button"
                      className="mt-3 rounded-md border border-[var(--os-border-subtle)] px-3 py-2 text-sm text-[var(--os-text-muted)] transition hover:bg-[var(--os-accent-glow)] hover:text-[var(--os-text-primary)]"
                    >
                      Export Data
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
