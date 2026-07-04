"use client"

import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"
import Navbar from "../components/Navbar"

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    category: "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          first_name: form.firstName,
          last_name: form.lastName,
          location: form.location,
          category: form.category,
        }
      }
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Account created! Please check your email to verify your account.")
      router.push("/jobs")
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-md mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-500">Find your next job in the Philippines</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} required type="text" placeholder="Juan" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} required type="text" placeholder="dela Cruz" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="juan@email.com" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input name="password" value={form.password} onChange={handleChange} required type="password" placeholder="At least 8 characters" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input name="location" value={form.location} onChange={handleChange} required type="text" placeholder="e.g. Quezon City, Metro Manila" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">What kind of work are you looking for?</label>
              <select name="category" value={form.category} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select a category</option>
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

            <button type="submit" disabled={loading} className="w-full bg-blue-700 text-white font-semibold py-4 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50">
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-blue-700 hover:underline font-medium">Log in</a>
            </p>

          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By signing up you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  )
}