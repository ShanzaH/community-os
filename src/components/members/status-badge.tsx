import type { MemberStatus } from "@/lib/data/members";

type StatusBadgeProps = {
  status: MemberStatus;
};

const statusConfig = {
  active: {
    label: "Active",
    color: "var(--os-status-active)",
  },
  "at-risk": {
    label: "At Risk",
    color: "var(--os-status-at-risk)",
  },
  churned: {
    label: "Churned",
    color: "var(--os-status-churned)",
  },
} as const;

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{
        color: config.color,
        backgroundColor: `color-mix(in srgb, ${config.color} 10%, transparent)`,
      }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{ backgroundColor: config.color }}
      />
      {config.label}
    </span>
  );
}
