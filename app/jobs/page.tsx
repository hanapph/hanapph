"use client"

import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { supabase } from "../lib/supabase"
import { useSearchParams } from "next/navigation"

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [keyword, setKeyword] = useState("")
  const [location, setLocation] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  async function fetchJobs(kw: string, loc: string, types: string[], cats: string[]) {
    setLoading(true)
    let query = supabase.from("jobs").select("*").order("created_at", { ascending: false })

    if (kw) query = query.ilike("title", `%${kw}%`)
    if (loc) query = query.ilike("location", `%${loc}%`)
    if (types.length > 0) query = query.in("type", types)
    if (cats.length > 0) query = query.in("category", cats)

    const { data } = await query
    setJobs(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    const k = searchParams.get("keyword") ?? ""
    const l = searchParams.get("location") ?? ""
    setKeyword(k)
    setLocation(l)
    fetchJobs(k, l, selectedTypes, selectedCategories)
  }, [searchParams])

  useEffect(() => {
    fetchJobs(keyword, location, selectedTypes, selectedCategories)
  }, [selectedTypes, selectedCategories])

  function toggleType(type: string) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    fetchJobs(keyword, location, selectedTypes, selectedCategories)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Job title or keyword..."
            className="flex-1 border border-gray-200 bg-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location..."
            className="w-48 border border-gray-200 bg-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800">
            Search
          </button>
        </form>

        <div className="flex gap-8">
          <aside className="w-52 shrink-0">
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Filter by</h3>
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Job Type</p>
                {["Full-time", "Part-time", "Contract", "Remote"].map((type) => (
                  <label key={type} className="flex items-center gap-2 text-sm text-gray-700 mb-2 cursor-pointer">
                    <input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => toggleType(type)} className="rounded" />
                    {type}
                  </label>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Category</p>
                {["BPO / Call Center", "Retail & Sales", "Food & Beverage", "Admin & Office", "IT & Tech", "Healthcare"].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 text-sm text-gray-700 mb-2 cursor-pointer">
                    <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} className="rounded" />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-4">
              {loading ? "Searching..." : `${jobs.length} jobs found`}
            </p>
            <div className="flex flex-col gap-4">
              {jobs.map((job) => (
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
              {!loading && jobs.length === 0 && (
                <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
                  <p className="text-gray-400 text-sm">No jobs found. Try a different keyword or filter.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}