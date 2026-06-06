"use client";



import { useState } from "react";
import { SuggestedTask } from "@/types/task";
import { extractMockTasks } from "@/lib/mockExtraction";
import TaskCard from "@/components/TaskCard";
import { saveTask, extractTasksWithAI } from "@/lib/api";

export default function InputPage() {
  const [note, setNote] = useState("");
  const [tasks, setTasks] = useState<SuggestedTask[]>([]);

  async function handleExtract() {
    if (note.trim() === "") return;
    try {
      const extracted = await extractTasksWithAI(note);
      setTasks(extracted);
    } catch (error) {
      console.error("Extraction failed:", error);
      const extracted = extractMockTasks(note);
      setTasks(extracted);
    }
  }

  async function handleApprove(id: string) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    try {
      await saveTask({
        title: task.title,
        category: task.category,
        priority: task.priority,
        estimatedEffortMinutes: task.estimatedEffortMinutes,
        suggestedDueDate: task.suggestedDueDate,
        status: "approved",
        sourceText: task.sourceText,
        mode: task.mode,
      });

      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status: "approved" } : t
        )
      );
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  }

  function handleReject(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  const suggestedTasks = tasks.filter((t) => t.status === "suggested");
  const approvedTasks = tasks.filter((t) => t.status === "approved");

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full space-y-6">
        <h1 className="text-3xl font-bold">What's on your mind?</h1>
        <p className="text-gray-400">
          Paste your messy notes, tasks, goals, or thoughts below.
        </p>
        <textarea
          className="w-full h-48 bg-gray-900 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-blue-500"
          placeholder="e.g. I need to study arrays, finish my Google AI course, go to the gym 4 times, and message my PM about the offer..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          onClick={handleExtract}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Organize my chaos
        </button>

        {suggestedTasks.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Review Suggested Tasks</h2>
            {suggestedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        )}

        {approvedTasks.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-green-400">
              Approved Tasks
            </h2>
            {approvedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-900 border border-green-700 rounded-lg p-4"
              >
                <p className="font-semibold">{task.title}</p>
                <p className="text-sm text-gray-400">{task.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}