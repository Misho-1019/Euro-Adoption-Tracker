import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center">
          <h2 className="mt-2 sm:mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Euro Adoption Tracker
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Access the regulatory administration portal
          </p>
        </div>
        
        <form className="mt-6 sm:mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4 sm:space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition duration-150 ease-in-out"
                placeholder="admin@eurotracker.eu"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition duration-150 ease-in-out"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Sign in to Dashboard
            </button>
          </div>

          {/* Navigation Link */}
          <div className="text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
              Register
            </a>
          </div>

          {/* Helper Text */}
          <div className="flex justify-center">
            <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-50 rounded-full border border-slate-100">
              <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400"></span>
                Authorized Personnel Only
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
