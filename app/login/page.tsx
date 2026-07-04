export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-blue-700 px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-1">
          <span className="text-2xl font-bold text-white">Hanap</span>
          <span className="text-2xl font-bold text-yellow-400">PH</span>
        </a>
        <div className="flex items-center gap-4">
          <a href="/jobs" className="text-sm text-blue-100 hover:text-white">Find Jobs</a>
          <a href="/signup" className="text-sm bg-yellow-400 text-blue-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300">Sign up</a>
        </div>
      </nav>

      <div className="max-w-md mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-500">Log in to your HanapPH account</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-8">
          <form className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input type="email" placeholder="juan@email.com" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input type="password" placeholder="Your password" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <a href="#" className="text-xs text-blue-700 hover:underline mt-1 block">Forgot password?</a>
            </div>

            <button type="submit" className="w-full bg-blue-700 text-white font-semibold py-4 rounded-lg hover:bg-blue-800 transition-colors">
              Log in
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