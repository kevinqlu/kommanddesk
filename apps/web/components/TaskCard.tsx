import { SuggestedTask } from "@/types/task";

type TaskCardProps = {
  task: SuggestedTask;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
};

export default function TaskCard({ task, onApprove, onReject }: TaskCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 space-y-2">
      <p className="font-semibold">{task.title}</p>
      <p className="text-sm text-gray-400">
        {task.category} · {task.priority} priority · {task.estimatedEffortMinutes} min
      </p>
      <p className="text-sm text-gray-500">
        Due: {task.suggestedDueDate ?? "No date"}
      </p>
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => onApprove(task.id)}
          className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Approve
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