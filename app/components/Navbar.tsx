"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <nav className="bg-blue-700 px-6 py-4 flex items-center justify-between">
      <a href="/" className="flex items-center gap-1">
        <span className="text-2xl font-bold text-white">Hanap</span>
        <span className="text-2xl font-bold text-yellow-400">PH</span>
      </a>
      <div className="flex items-center gap-4">
        <a href="/jobs" className="text-sm text-blue-100 hover:text-white">Find Jobs</a>
        <a href="#" className="text-sm text-blue-100 hover:text-white">For Employers</a>
        {user ? (
          <>
            <span className="text-sm text-blue-100">
              {user.user_metadata?.first_name ?? user.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <a href="/login" className="text-sm text-blue-100 hover:text-white">Log in</a>
            <a href="/signup" className="text-sm bg-yellow-400 text-blue-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300">Sign up</a>
          </>
        )}
        <a href="/post-job" className="text-sm bg-yellow-400 text-blue-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300">Post a Job</a>
      </div>
    </nav>
  )
}