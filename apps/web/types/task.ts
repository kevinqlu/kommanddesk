export type TaskCategory =
  | "LeetCode"
  | "Google AI Cert"
  | "Gym"
  | "Volleyball"
  | "Career"
  | "AI Projects"
  | "Personal Admin"
  | "Other";

export type TaskPriority = "low" | "medium" | "high";

export type TaskStatus = "suggested" | "approved" | "rejected" | "completed";

export type TaskMode = "private" | "demo";

export type SuggestedTask = {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  estimatedEffortMinutes: number;
  suggestedDueDate: string | null;
  status: TaskStatus;
  sourceText: string;
  mode: TaskMode;
};