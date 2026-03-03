export type PulseEventType = "join" | "post" | "upgrade" | "comment" | "streak";

export type PulseEvent = {
  id: string;
  type: PulseEventType;
  memberName: string;
  memberInitials: string;
  memberColor: string;
  action: string;
  timestamp: string;
  isNew: boolean;
};

export const liveActivityEvents: PulseEvent[] = [
  {
    id: "e1",
    type: "join",
    memberName: "Aria Patel",
    memberInitials: "AP",
    memberColor: "#6366f1",
    action: "joined the community",
    timestamp: "just now",
    isNew: true,
  },
  {
    id: "e2",
    type: "upgrade",
    memberName: "Liam Chen",
    memberInitials: "LC",
    memberColor: "#8b5cf6",
    action: "upgraded to Pro",
    timestamp: "1m ago",
    isNew: true,
  },
  {
    id: "e3",
    type: "post",
    memberName: "Noor Hassan",
    memberInitials: "NH",
    memberColor: "#14b8a6",
    action: "posted in #general",
    timestamp: "3m ago",
    isNew: false,
  },
  {
    id: "e4",
    type: "comment",
    memberName: "Maya Lopez",
    memberInitials: "ML",
    memberColor: "#f43f5e",
    action: "commented on a post",
    timestamp: "6m ago",
    isNew: false,
  },
  {
    id: "e5",
    type: "streak",
    memberName: "Yusuf Malik",
    memberInitials: "YM",
    memberColor: "#f59e0b",
    action: "hit a 7-day streak",
    timestamp: "9m ago",
    isNew: false,
  },
  {
    id: "e6",
    type: "join",
    memberName: "Sana Sheikh",
    memberInitials: "SS",
    memberColor: "#10b981",
    action: "joined the community",
    timestamp: "12m ago",
    isNew: false,
  },
];

export const mrrStats = {
  current: 1240,
  change: 180,
  sparkline: [800, 850, 890, 920, 980, 1040, 1100, 1140, 1190, 1240],
};

export const communityStats = {
  totalMembers: 248,
  activeToday: 37,
  newThisWeek: 12,
  churnRisk: 8,
};
