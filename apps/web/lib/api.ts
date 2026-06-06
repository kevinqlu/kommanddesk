const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { SuggestedTask } from "@/types/task";

export type SavedTask = {
  id: number;
  title: string;
  category: string;
  priority: string;
  estimatedEffortMinutes: number;
  suggestedDueDate: string | null;
  status: string;
  sourceText: string;
  mode: string;
};

export async function saveTask(task: {
  title: string;
  category: string;
  priority: string;
  estimatedEffortMinutes: number;
  suggestedDueDate: string | null;
  status: string;
  sourceText: string;
  mode: string;
}): Promise<SavedTask> {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error("Failed to save task");
  return response.json();
}

export async function fetchTasks(): Promise<SavedTask[]> {
  const response = await fetch(`${API_URL}/api/tasks`);
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
}

export async function extractTasksWithAI(note: string): Promise<SuggestedTask[]> {
  const response = await fetch(`${API_URL}/api/tasks/extract`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note }),
  });
  if (!response.ok) throw new Error("AI extraction failed");
  const data = await response.json();
  return data.map((task: any, index: number) => ({
    ...task,
    id: String(index + 1),
    status: "suggested" as const,
    mode: "private" as const,
  }));
}