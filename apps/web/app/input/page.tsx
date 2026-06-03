export default function InputPage() {
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
        />
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
          Organize my chaos
        </button>
      </div>
    </main>
  )
}