import { useState } from "react";
import { SuggestedTask, TaskCategory, TaskPriority } from "@/types/task";

type TaskCardProps = {
  task: SuggestedTask;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onEdit: (id: string, updates: Partial<SuggestedTask>) => void;
};

export default function TaskCard({ task, onApprove, onReject, onEdit }: TaskCardProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [category, setCategory] = useState(task.category);
  const [priority, setPriority] = useState(task.priority);
  const [minutes, setMinutes] = useState(task.estimatedEffortMinutes);

  function handleSave() {
    onEdit(task.id, { title, category, priority, estimatedEffortMinutes: minutes });
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="bg-gray-900 border border-blue-700 rounded-lg p-4 space-y-3">
        <input
          className="w-full bg-gray-800 text-white rounded px-3 py-2 text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="w-full bg-gray-800 text-white rounded px-3 py-2 text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value as TaskCategory)}
        >
          {["LeetCode","Google AI Cert","Gym","Volleyball","Career","AI Projects","Personal Admin","Other"].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          className="w-full bg-gray-800 text-white rounded px-3 py-2 text-sm"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="number"
          className="w-full bg-gray-800 text-white rounded px-3 py-2 text-sm"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          placeholder="Estimated minutes"
        />
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 space-y-2">
      <p className="font-semibold">{task.title}</p>
      <p className="text-sm text-gray-400">
        {task.category} · {task.priority} priority · {task.estimatedEffortMinutes} min
      </p>
      <p className="text-sm text-gray-500">Due: {task.suggestedDueDate ?? "No date"}</p>
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => onApprove(task.id)}
          className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Approve
        </button>
        <button
          onClick={() => setEditing(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onReject(task.id)}
          className="bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Reject
        </button>
      </div>
    </div>
  );
}