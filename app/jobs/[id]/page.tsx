import { supabase } from "../../lib/supabase"
import Navbar from "@/app/components/Navbar"

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: job, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !job) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Job not found</h1>
          <a href="/jobs" className="text-blue-700 hover:underline text-sm">Back to jobs</a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <a href="/jobs" className="text-sm text-blue-700 hover:underline mb-6 block">← Back to jobs</a>

        <div className="flex gap-6">
          <div className="flex-1">
            <div className="bg-white border border-gray-100 rounded-xl p-8 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h1>
                  <p className="text-blue-700 font-semibold">{job.company}</p>
                  <div className="flex gap-4 mt-3">
                    <span className="text-sm text-gray-500">📍 {job.location}</span>
                    <span className="text-sm text-gray-500">🕐 {job.type}</span>
                    <span className="text-sm text-gray-500">📂 {job.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">₱{job.salary_min?.toLocaleString()} - ₱{job.salary_max?.toLocaleString()}</p>
                  <p className="text-xs text-gray-400 mt-1">per month</p>
                </div>
              </div>

              <hr className="border-gray-100 mb-6" />

              <div className="mb-6">
                <h2 className="font-semibold text-gray-900 mb-3">About the role</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{job.description}</p>
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 mb-3">Requirements</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{job.requirements}</p>
              </div>
            </div>
          </div>

          <div className="w-72 shrink-0">
            <div className="bg-white border border-gray-100 rounded-xl p-6 sticky top-6">
              <p className="text-lg font-bold text-gray-900 mb-1">₱{job.salary_min?.toLocaleString()} - ₱{job.salary_max?.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mb-6">per month</p>
              <a href={`mailto:${job.email}`} className="block w-full bg-blue-700 text-white text-center font-semibold py-3 rounded-lg hover:bg-blue-800 mb-3">
                Apply Now
              </a>
              <a href="#" className="block w-full border border-gray-200 text-gray-700 text-center text-sm py-3 rounded-lg hover:bg-gray-50">
                Save Job
              </a>
              <hr className="border-gray-100 my-5" />
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400">Company</p>
                  <p className="text-sm font-medium text-gray-900">{job.company}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="text-sm font-medium text-gray-900">{job.location}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Job type</p>
                  <p className="text-sm font-medium text-gray-900">{job.type}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}