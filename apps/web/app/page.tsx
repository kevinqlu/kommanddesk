export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Does your head have 20 things to accomplish and not enough space to hold all that?
        </h1>
        <p className="text-lg text-gray-400">
          Paste messy notes, get structured tasks.
        </p>
        <a
          href="/input"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Throw all your chaos here
        </a>
        <a
          href="/dashboard"
          className="inline-block border border-gray-600 hover:border-gray-400 text-gray-400 hover:text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          View Dashboard
        </a>
      </div>
    </main>
  )
}