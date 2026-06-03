import { SuggestedTask } from "@/types/task";

export function extractMockTasks(note: string): SuggestedTask[] {
  return [
    {
      id: "1",
      title: "Study array problems on LeetCode",
      category: "LeetCode",
      priority: "high",
      estimatedEffortMinutes: 60,
      suggestedDueDate: "2025-06-07",
      status: "suggested",
      sourceText: note,
      mode: "private",
    },
    {
      id: "2",
      title: "Complete Google AI course module",
      category: "Google AI Cert",
      priority: "medium",
      estimatedEffortMinutes: 45,
      suggestedDueDate: "2025-06-08",
      status: "suggested",
      sourceText: note,
      mode: "private",
    },
    {
      id: "3",
      title: "Go to the gym",
      category: "Gym",
      priority: "medium",
      estimatedEffortMinutes: 60,
      suggestedDueDate: "2025-06-06",
      status: "suggested",
      sourceText: note,
      mode: "private",
    },
    {
      id: "4",
      title: "Message PM about the offer",
      category: "Career",
      priority: "high",
      estimatedEffortMinutes: 15,
      suggestedDueDate: "2025-06-05",
      status: "suggested",
      sourceText: note,
      mode: "private",
    },
  ];
}