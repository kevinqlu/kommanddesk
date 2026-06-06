"use client";

import { useState } from "react";
import { SuggestedTask } from "@/types/task";
import { extractTasksWithAI } from "@/lib/api";
import { extractMockTasks } from "@/lib/mockExtraction";
import TaskCard from "@/components/TaskCard";

const SAMPLE_NOTES = [
  "Call your mom, eat your protein, finish 1 LeetCode question, apply to jobs",
  "I need to study for my Google AI cert, go to the gym, and clean up my resume",
  "Plan volleyball practice, finish my portfolio project, and prep for interviews",
];

export default function DemoPage() {
  const [note, setNote] = useState("");
  const [tasks, setTasks] = useState<SuggestedTask[]>([]);
  const [approvedTasks, setApprovedTasks] = useState<SuggestedTask[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleExtract() {
    if (note.trim() === "") return;
    setLoading(true);
    try {
      const extracted = await extractTasksWithAI(note);
      setTasks(extracted);
    } catch {
      const extracted = extractMockTasks(note);
      setTasks(extracted);
    } finally {
      setLoading(false);
    }
  }

  function handleApprove(id: string) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    setApprovedTasks((prev) => [...prev, { ...task, status: "approved" }]);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

    function handleEdit(id: string, updates: Partial<SuggestedTask>) {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
        );
    }

  function handleReject(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-yellow-900 border border-yellow-600 rounded-lg px-4 py-2 text-yellow-300 text-sm font-semibold">
          🎮 Demo Mode — tasks are not saved. Try it out safely.
        </div>

        <h1 className="text-3xl font-bold">Try KommandDesk</h1>
        <p className="text-gray-400">
          Paste a messy note or pick a sample below.
        </p>

        <div className="flex flex-wrap gap-2">
          {SAMPLE_NOTES.map((sample, i) => (
            <button
              key={i}
              onClick={() => setNote(sample)}
              className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-full transition-colors"
            >
              Sample {i + 1}
            </button>
          ))}
        </div>

        <textarea
          className="w-full h-40 bg-gray-900 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-blue-500"
          placeholder="Paste your messy note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button
          onClick={handleExtract}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          {loading ? "Extracting..." : "Extract Tasks"}
        </button>

        {tasks.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Review Suggested Tasks</h2>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onApprove={handleApprove}
                onReject={handleReject}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}

        {approvedTasks.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-green-400">
              Approved Tasks (Demo Only)
            </h2>
            {approvedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-900 border border-green-700 rounded-lg p-4"
              >
                <p className="font-semibold">{task.title}</p>
                <p className="text-sm text-gray-400">{task.category} · {task.priority} priority</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}