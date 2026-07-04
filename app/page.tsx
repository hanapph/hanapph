import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Navbar */}
      <Navbar />
      {/* Hero */}
      <section className="bg-blue-700 px-6 pb-20 pt-16 text-center">
        <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
          Humanap ng trabaho.<br />
          <span className="text-yellow-400">Dito na.</span>
        </h1>
        <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
          Thousands of jobs from small businesses across the Philippines — free to apply, easy to find.
        </p>
        <div className="flex gap-3 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Job title or keyword..."
            className="flex-1 px-4 py-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Location..."
            className="w-48 px-4 py-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button className="bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-lg hover:bg-yellow-300 whitespace-nowrap">
            Maghanap
          </button>
        </div>
      </section>

      {/* Wave divider */}
      <div className="bg-blue-700">
        <svg viewBox="0 0 1440 60" className="w-full block" preserveAspectRatio="none" style={{height: '60px'}}>
          <path fill="white" d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" />
        </svg>
      </div>

      {/* Stats bar */}
      <section className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-3 gap-6 text-center">
        <div>
          <p className="text-3xl font-bold text-blue-700">500+</p>
          <p className="text-sm text-gray-500 mt-1">Active job listings</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-blue-700">200+</p>
          <p className="text-sm text-gray-500 mt-1">Companies hiring</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-blue-700">Free</p>
          <p className="text-sm text-gray-500 mt-1">Always free for job seekers</p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Browse by category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "BPO / Call Center", emoji: "🎧" },
            { label: "Retail & Sales", emoji: "🛍️" },
            { label: "Food & Beverage", emoji: "🍽️" },
            { label: "Admin & Office", emoji: "🗂️" },
            { label: "Construction", emoji: "🏗️" },
            { label: "Healthcare", emoji: "🏥" },
            { label: "IT & Tech", emoji: "💻" },
            { label: "Driving & Logistics", emoji: "🚚" },
          ].map((cat) => (
            <div
              key={cat.label}
              className="border border-gray-100 rounded-xl px-4 py-4 text-sm text-gray-700 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50 cursor-pointer transition-all"
            >
              <span className="text-2xl block mb-2">{cat.emoji}</span>
              {cat.label}
            </div>
          ))}
        </div>
      </section>

      {/* Employer CTA */}
      <section className="bg-red-600 px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">May business ka? Mag-post ng trabaho.</h2>
        <p className="text-red-100 mb-8 max-w-lg mx-auto">Free job posting for small businesses. Reach thousands of Filipino job seekers today.</p>
        <a href="#" className="bg-white text-red-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 inline-block">
          Post a Job — It's Free
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 px-6 py-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-xl font-bold text-white">Hanap</span>
          <span className="text-xl font-bold text-yellow-400">PH</span>
        </div>
        <p className="text-blue-300 text-sm">© 2026 HanapPH. Para sa mga Pilipino.</p>
      </footer>

    </main>
  )
}