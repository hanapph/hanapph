"use client"

import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"
import Navbar from "../components/Navbar"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (error) {
      alert(error.message)
    } else {
      const next = new URLSearchParams(window.location.search).get("next") ?? "/jobs"
router.push(next)
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-500">Log in to your HanapPH account</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="juan@email.com" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input name="password" value={form.password} onChange={handleChange} required type="password" placeholder="Your password" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <a href="#" className="text-xs text-blue-700 hover:underline mt-1 block">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-700 text-white font-semibold py-4 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50">
              {loading ? "Logging in..." : "Log in"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-700 hover:underline font-medium">Sign up</a>
            </p>

          </form>
        </div>
      </div>
    </main>
  )
}