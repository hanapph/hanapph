export default function SignupPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-blue-700 px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-1">
          <span className="text-2xl font-bold text-white">Hanap</span>
          <span className="text-2xl font-bold text-yellow-400">PH</span>
        </a>
        <div className="flex items-center gap-4">
          <a href="/jobs" className="text-sm text-blue-100 hover:text-white">Find Jobs</a>
          <a href="/login" className="text-sm text-blue-100 hover:text-white">Log in</a>
        </div>
      </nav>

      <div className="max-w-md mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-500">Find your next job in the Philippines</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-8">
          <form className="space-y-5">

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                <input type="text" placeholder="Juan" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                <input type="text" placeholder="dela Cruz" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input type="email" placeholder="juan@email.com" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input type="password" placeholder="At least 8 characters" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input type="text" placeholder="e.g. Quezon City, Metro Manila" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">What kind of work are you looking for?</label>
              <select className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
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

            <button type="submit" className="w-full bg-blue-700 text-white font-semibold py-4 rounded-lg hover:bg-blue-800 transition-colors">
              Create Account
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