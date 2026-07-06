"use client"

import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function PostJobPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    category: "BPO / Call Center",
    salary_min: "",
    salary_max: "",
    description: "",
    requirements: "",
  })

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login")
      } else {
        setUser(data.user)
        setChecking(false)
      }
    })
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from("jobs").insert({
      ...form,
      salary_min: Number(form.salary_min),
      salary_max: Number(form.salary_max),
      email: user.email,
    })

    if (error) {
      alert("Something went wrong. Please try again.")
      console.error(error)
    } else {
      router.push("/login?next=/post-job")
    }

    setLoading(false)
  }

  if (checking) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-blue-700 px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-1">
          <span className="text-2xl font-bold text-white">Hanap</span>
          <span className="text-2xl font-bold text-yellow-400">PH</span>
        </a>
        <div className="flex items-center gap-4">
          <a href="/jobs" className="text-sm text-blue-100 hover:text-white">Find Jobs</a>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Job</h1>
          <p className="text-gray-500">Posting as <span className="font-medium text-gray-700">{user?.email}</span></p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
              <input name="title" value={form.title} onChange={handleChange} required type="text" placeholder="e.g. Cashier, Admin Assistant, Cook" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
              <input name="company" value={form.company} onChange={handleChange} required type="text" placeholder="Your business name" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input name="location" value={form.location} onChange={handleChange} required type="text" placeholder="e.g. Makati, Metro Manila" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
                <select name="type" value={form.type} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Remote</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>BPO / Call Center</option>
                <option>Retail & Sales</option>
                <option>Food & Beverage</option>
                <option>Admin & Office</option>
                <option>Construction</option>
                <option>Healthcare</option>
                <option>IT & Tech</option>
                <option>Driving & Logistics</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Salary (₱)</label>
                <input name="salary_min" value={form.salary_min} onChange={handleChange} required type="number" placeholder="e.g. 15000" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Maximum Salary (₱)</label>
                <input name="salary_max" value={form.salary_max} onChange={handleChange} required type="number" placeholder="e.g. 20000" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={4} placeholder="Describe the role, what the employee will do day to day..." className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Requirements</label>
              <textarea name="requirements" value={form.requirements} onChange={handleChange} required rows={4} placeholder="List qualifications, experience, and skills needed..." className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-700 text-white font-semibold py-4 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50">
              {loading ? "Posting..." : "Post Job — It's Free"}
            </button>

          </form>
        </div>
      </div>
    </main>
  )
}