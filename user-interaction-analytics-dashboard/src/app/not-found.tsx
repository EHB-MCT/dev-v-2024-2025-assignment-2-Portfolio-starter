'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8 text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
          404
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fadeIn">
          Oops! Page Not Found
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 animate-fadeIn delay-100">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="space-y-4 animate-fadeIn delay-200">
          <Link
            href="/"
            className="inline-block w-full sm:w-auto btn-primary text-lg px-8 py-3"
          >
            Go Back Home
          </Link>

          <div className="mt-8 text-gray-600">
            <p>Here are some helpful links:</p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Contact Support
              </Link>
              <span className="hidden sm:inline text-gray-300">|</span>
              <Link
                href="/faq"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                FAQ
              </Link>
              <span className="hidden sm:inline text-gray-300">|</span>
              <Link
                href="/sitemap"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="mt-12 animate-fadeIn delay-300">
          <div className="relative max-w-xs mx-auto">
            <input
              type="text"
              placeholder="Search our site..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 