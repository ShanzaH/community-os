"use client";

import { usePanel } from "@/components/panel-context";
import { members } from "@/lib/data/members";
import { StatusBadge } from "@/components/members/status-badge";

export function MembersTable() {
  const { isOpen, selectedMember, openPanelWithMember } = usePanel();

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden p-6 pr-4 md:overflow-x-auto md:pr-6">
      <table className="w-full min-w-0 border-separate border-spacing-0 text-sm lg:min-w-[920px]">
        <thead>
          <tr className="text-left">
            <th className="border-b border-[var(--os-border-subtle)] px-4 py-3 text-xs font-medium tracking-[0.12em] uppercase text-[var(--os-text-muted)]">
              Member
            </th>
            <th className="hidden border-b border-[var(--os-border-subtle)] px-4 py-3 text-xs font-medium tracking-[0.12em] uppercase text-[var(--os-text-muted)] lg:table-cell">
              Role
            </th>
            <th className="hidden border-b border-[var(--os-border-subtle)] px-4 py-3 text-xs font-medium tracking-[0.12em] uppercase text-[var(--os-text-muted)] md:table-cell">
              Status
            </th>
            <th className="hidden border-b border-[var(--os-border-subtle)] px-4 py-3 text-xs font-medium tracking-[0.12em] uppercase text-[var(--os-text-muted)] md:table-cell">
              Engagement
            </th>
            <th className="hidden border-b border-[var(--os-border-subtle)] px-4 py-3 text-xs font-medium tracking-[0.12em] uppercase text-[var(--os-text-muted)] lg:table-cell">
              MRR
            </th>
            <th className="hidden border-b border-[var(--os-border-subtle)] px-4 py-3 text-xs font-medium tracking-[0.12em] uppercase text-[var(--os-text-muted)] xl:table-cell">
              Joined
            </th>
            <th className="hidden border-b border-[var(--os-border-subtle)] px-4 py-3 text-xs font-medium tracking-[0.12em] uppercase text-[var(--os-text-muted)] xl:table-cell">
              Last Seen
            </th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => {
            const isSelected = isOpen && selectedMember?.id === member.id;

            return (
              <tr
                key={member.id}
                onClick={() => {
                  openPanelWithMember(member);
                }}
                className="cursor-pointer transition-colors hover:bg-[var(--os-accent-glow)]"
              >
                <td
                  className={`border-b border-[var(--os-border-subtle)] px-4 py-3 ${
                    isSelected
                      ? "border-l-2 border-l-[var(--os-accent)]"
                      : "border-l-2 border-l-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex size-9 items-center justify-center rounded-full text-xs font-semibold text-[var(--os-bg)]"
                      style={{ backgroundColor: member.avatarColor }}
                    >
                      {member.avatarInitials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[var(--os-text-primary)]">
                        {member.name}
                      </p>
                      <p className="truncate text-xs text-[var(--os-text-muted)]">
                        {member.email}
                      </p>
                      <div className="mt-1 block md:hidden">
                        <StatusBadge status={member.status} />
                      </div>
                    </div>
                  </div>
                </td>

                <td className="hidden border-b border-[var(--os-border-subtle)] px-4 py-3 text-[var(--os-text-primary)] lg:table-cell">
                  {member.role}
                </td>
                <td className="hidden border-b border-[var(--os-border-subtle)] px-4 py-3 md:table-cell">
                  <StatusBadge status={member.status} />
                </td>
                <td className="hidden border-b border-[var(--os-border-subtle)] px-4 py-3 md:table-cell">
                  <div className="flex items-center gap-3">
                    <div className="h-1 w-28 overflow-hidden rounded-full bg-[var(--os-border-subtle)]">
                      <div
                        className="h-full rounded-full bg-[var(--os-accent)]"
                        style={{ width: `${member.engagementScore}%` }}
                      />
                    </div>
                    <span className="text-xs text-[var(--os-text-muted)]">
                      {member.engagementScore}
                    </span>
                  </div>
                </td>
                <td className="hidden border-b border-[var(--os-border-subtle)] px-4 py-3 text-[var(--os-text-primary)] lg:table-cell">
                  {member.mrr > 0 ? `$${member.mrr}` : "—"}
                </td>
                <td className="hidden border-b border-[var(--os-border-subtle)] px-4 py-3 text-[var(--os-text-muted)] xl:table-cell">
                  {member.joinDate}
                </td>
                <td className="hidden border-b border-[var(--os-border-subtle)] px-4 py-3 text-[var(--os-text-muted)] xl:table-cell">
                  {member.lastSeen}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
