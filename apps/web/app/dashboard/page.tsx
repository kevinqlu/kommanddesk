"use client";

import { useEffect, useState } from "react";
import { fetchTasks, SavedTask } from "@/lib/api";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<SavedTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks()
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load tasks. Is the backend running?");
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <p className="text-gray-400">Loading your tasks...</p>
    </main>
  );

  if (error) return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <p className="text-red-400">{error}</p>
    </main>
  );

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <a
            href="/input"
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            + Add Tasks
          </a>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-400">No approved tasks yet. Go add some.</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-900 border border-gray-700 rounded-lg p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{task.title}</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    task.priority === "high"
                      ? "bg-red-900 text-red-300"
                      : task.priority === "medium"
                      ? "bg-yellow-900 text-yellow-300"
                      : "bg-gray-700 text-gray-300"
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  {task.category} · {task.estimatedEffortMinutes} min
                </p>
                {task.suggestedDueDate && (
                  <p className="text-sm text-gray-500">Due: {task.suggestedDueDate}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}