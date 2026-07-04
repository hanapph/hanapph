import { supabase } from "../lib/supabase"

export default async function JobsPage() {
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-blue-700 px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-1">
          <span className="text-2xl font-bold text-white">Hanap</span>
          <span className="text-2xl font-bold text-yellow-400">PH</span>
        </a>
        <div className="flex items-center gap-4">
          <a href="/jobs" className="text-sm text-white font-semibold">Find Jobs</a>
          <a href="#" className="text-sm text-blue-100 hover:text-white">For Employers</a>
          <a href="#" className="text-sm text-blue-100 hover:text-white">Log in</a>
          <a href="/post-job" className="text-sm bg-yellow-400 text-blue-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300">Post a Job</a>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex gap-3 mb-8">
          <input type="text" placeholder="Job title or keyword..." className="flex-1 border border-gray-200 bg-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" placeholder="Location..." className="w-48 border border-gray-200 bg-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button className="bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800">Search</button>
        </div>

        <div className="flex gap-8">
          <aside className="w-52 shrink-0">
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Filter by</h3>
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Job Type</p>
                {["Full-time", "Part-time", "Contract", "Remote"].map((type) => (
                  <label key={type} className="flex items-center gap-2 text-sm text-gray-700 mb-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    {type}
                  </label>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Category</p>
                {["BPO / Call Center", "Retail & Sales", "Food & Beverage", "Admin & Office", "IT & Tech", "Healthcare"].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 text-sm text-gray-700 mb-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-4">{jobs?.length ?? 0} jobs found</p>
            <div className="flex flex-col gap-4">
              {jobs?.map((job) => (
                <a key={job.id} href={`/jobs/${job.id}`} className="bg-white border border-gray-100 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all block">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-semibold text-gray-900 text-base">{job.title}</h2>
                      <p className="text-sm text-blue-700 font-medium mt-0.5">{job.company}</p>
                      <div className="flex gap-3 mt-2">
                        <span className="text-xs text-gray-500">📍 {job.location}</span>
                        <span className="text-xs text-gray-500">🕐 {job.type}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-900">₱{job.salary_min?.toLocaleString()} - ₱{job.salary_max?.toLocaleString()}</span>
                      <p className="text-xs text-gray-400 mt-1">{job.category}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}