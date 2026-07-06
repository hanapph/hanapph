import Navbar from "../components/Navbar"
import { supabase } from "../lib/supabase"

export default async function OverseasPage() {
  const { data: jobs } = await supabase
    .from("overseas_jobs")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-blue-700 px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-white mb-3">Overseas Jobs for Filipinos</h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">Find verified job opportunities abroad. All listings are checked for legitimacy.</p>
      </section>

      {/* Countries */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Browse by country</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-10">
          {[
            { country: "USA", flag: "🇺🇸" },
            { country: "Canada", flag: "🇨🇦" },
            { country: "UAE", flag: "🇦🇪" },
            { country: "Saudi Arabia", flag: "🇸🇦" },
            { country: "Singapore", flag: "🇸🇬" },
            { country: "Japan", flag: "🇯🇵" },
            { country: "Australia", flag: "🇦🇺" },
            { country: "UK", flag: "🇬🇧" },
            { country: "Qatar", flag: "🇶🇦" },
            { country: "Hong Kong", flag: "🇭🇰" },
            { country: "South Korea", flag: "🇰🇷" },
            { country: "Germany", flag: "🇩🇪" },
          ].map((c) => (
            <div key={c.country} className="bg-white border border-gray-100 rounded-xl p-3 text-center hover:border-blue-300 cursor-pointer transition-all">
              <span className="text-2xl block mb-1">{c.flag}</span>
              <span className="text-xs text-gray-700 font-medium">{c.country}</span>
            </div>
          ))}
        </div>

        {/* Job listings */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">Latest overseas jobs</h2>
          <span className="text-sm text-gray-500">{jobs?.length ?? 0} jobs available</span>
        </div>

        {jobs && jobs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white border border-gray-100 rounded-xl p-5 hover:border-blue-300 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-semibold text-gray-900">{job.title}</h2>
                      {job.verified && (
                        <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded-full">✓ Verified</span>
                      )}
                    </div>
                    <p className="text-sm text-blue-700 font-medium">{job.company}</p>
                    <div className="flex gap-3 mt-2">
                      <span className="text-xs text-gray-500">🌍 {job.country}</span>
                      <span className="text-xs text-gray-500">🕐 {job.type}</span>
                      <span className="text-xs text-gray-500">📂 {job.category}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">{job.salary}</span>
                    <div className="mt-2">
                      <a href={`/overseas/${job.id}`} className="text-xs bg-blue-700 text-white px-3 py-1.5 rounded-lg hover:bg-blue-800">
                        View Job
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
            <p className="text-gray-400 text-sm">No overseas jobs yet. Check back soon.</p>
          </div>
        )}
      </section>

      {/* Lawyer CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Need help with your visa?</h3>
            <p className="text-sm text-gray-600">Connect with verified immigration lawyers who specialize in helping Filipinos work abroad.</p>
          </div>
          <a href="/lawyers" className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-800 whitespace-nowrap ml-6">
            Find a Lawyer
          </a>
        </div>
      </section>
    </main>
  )
}