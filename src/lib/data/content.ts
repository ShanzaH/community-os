export type ContentSpace =
  | "#general"
  | "#announcements"
  | "#introductions"
  | "#resources";

export type ContentType = "post" | "announcement" | "question";
export type ContentStatus = "published" | "pinned" | "hidden";

export type ContentPost = {
  id: string;
  title: string;
  author: {
    name: string;
    initials: string;
    avatarColor: string;
  };
  space: ContentSpace;
  type: ContentType;
  status: ContentStatus;
  likes: number;
  comments: number;
  views: number;
  createdAt: string;
  isPinned: boolean;
  excerpt: string;
};

export const contentPosts: ContentPost[] = [
  {
    id: "c1",
    title: "Welcome guide for new members",
    author: { name: "Aisha Khan", initials: "AK", avatarColor: "#6366f1" },
    space: "#introductions",
    type: "post",
    status: "published",
    likes: 28,
    comments: 9,
    views: 214,
    createdAt: "2 hours ago",
    isPinned: false,
    excerpt:
      "Quick starter checklist for your first week in Community OS and where to ask for help.",
  },
  {
    id: "c2",
    title: "Q2 roadmap and feature priorities",
    author: { name: "Daniel Kim", initials: "DK", avatarColor: "#8b5cf6" },
    space: "#announcements",
    type: "announcement",
    status: "pinned",
    likes: 64,
    comments: 18,
    views: 532,
    createdAt: "Yesterday",
    isPinned: true,
    excerpt:
      "A breakdown of upcoming releases, timelines, and which feedback items made the cut.",
  },
  {
    id: "c3",
    title: "How do you keep engagement high after onboarding?",
    author: { name: "Mina Patel", initials: "MP", avatarColor: "#14b8a6" },
    space: "#general",
    type: "question",
    status: "published",
    likes: 13,
    comments: 22,
    views: 187,
    createdAt: "5 hours ago",
    isPinned: false,
    excerpt:
      "Looking for tactics that worked beyond welcome flows and first-week nudges.",
  },
  {
    id: "c4",
    title: "Template pack: monthly community reporting",
    author: { name: "Layla Ahmed", initials: "LA", avatarColor: "#f59e0b" },
    space: "#resources",
    type: "post",
    status: "published",
    likes: 41,
    comments: 7,
    views: 301,
    createdAt: "Mar 1",
    isPinned: false,
    excerpt:
      "Downloadable spreadsheet and dashboard templates for member growth and retention.",
  },
  {
    id: "c5",
    title: "Town hall recap and action items",
    author: { name: "Hamza Iqbal", initials: "HI", avatarColor: "#f43f5e" },
    space: "#announcements",
    type: "announcement",
    status: "published",
    likes: 36,
    comments: 11,
    views: 276,
    createdAt: "3 days ago",
    isPinned: false,
    excerpt:
      "Key decisions from the latest town hall and owners for each next step.",
  },
  {
    id: "c6",
    title: "Community guidelines (read before posting)",
    author: { name: "Sana Sheikh", initials: "SS", avatarColor: "#10b981" },
    space: "#general",
    type: "announcement",
    status: "pinned",
    likes: 82,
    comments: 5,
    views: 689,
    createdAt: "Feb 24",
    isPinned: true,
    excerpt:
      "Ground rules for respectful discussions, moderation policy, and escalation paths.",
  },
  {
    id: "c7",
    title: "Need feedback on our weekly digest format",
    author: { name: "Noah Rivera", initials: "NR", avatarColor: "#f43f5e" },
    space: "#resources",
    type: "question",
    status: "hidden",
    likes: 4,
    comments: 2,
    views: 44,
    createdAt: "6 days ago",
    isPinned: false,
    excerpt:
      "We are testing a shorter digest layout and need suggestions before relaunch.",
  },
  {
    id: "c8",
    title: "Introduce yourself: where are you building from?",
    author: { name: "Omar Siddiqui", initials: "OS", avatarColor: "#8b5cf6" },
    space: "#introductions",
    type: "post",
    status: "published",
    likes: 55,
    comments: 39,
    views: 418,
    createdAt: "1 week ago",
    isPinned: false,
    excerpt:
      "Drop your city, role, and what you are working on this quarter.",
  },
];
