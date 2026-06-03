"use client";

import { useState } from "react";
import { SuggestedTask } from "@/types/task";
import { extractMockTasks } from "@/lib/mockExtraction";

export default function InputPage() {
  const [note, setNote] = useState("");
  const [tasks, setTasks] = useState<SuggestedTask[]>([]);

  function handleExtract() {
    if (note.trim() === "") return;
    const extracted = extractMockTasks(note);
    setTasks(extracted);
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
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

        {tasks.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Suggested Tasks</h2>
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-900 border border-gray-700 rounded-lg p-4 space-y-1"
              >
                <p className="font-semibold">{task.title}</p>
                <p className="text-sm text-gray-400">
                  {task.category} · {task.priority} priority · {task.estimatedEffortMinutes} min
                </p>
                <p className="text-sm text-gray-500">Due: {task.suggestedDueDate ?? "No date"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}