'use client';

import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding User Behavior Through Analytics',
    excerpt: 'Learn how to leverage user behavior analytics to improve your website\'s user experience and increase conversions.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    category: 'Analytics',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'The Power of A/B Testing in UX Design',
    excerpt: 'Discover how A/B testing can help you make data-driven decisions and optimize your user interface for better engagement.',
    author: 'Michael Chen',
    date: '2024-01-10',
    category: 'UX Design',
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'Maximizing Conversion Rates with Heat Maps',
    excerpt: 'Explore how heat map analysis can reveal user interaction patterns and help you optimize your conversion funnel.',
    author: 'Emily Rodriguez',
    date: '2024-01-05',
    category: 'Conversion',
    readTime: '6 min read'
  },
  {
    id: 4,
    title: 'The Future of Web Analytics',
    excerpt: 'Get insights into upcoming trends and technologies that will shape the future of web analytics and user tracking.',
    author: 'David Kim',
    date: '2024-01-01',
    category: 'Trends',
    readTime: '8 min read'
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights and updates from our team of analytics experts.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Post Image Placeholder */}
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-500">Featured Image</span>
              </div>

              <div className="p-6">
                {/* Category and Read Time */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold mb-3">
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>

                {/* Author and Date */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">By {post.author}</span>
                  <span className="text-gray-500">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                {/* Read More Link */}
                <div className="mt-4 pt-4 border-t">
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-blue-600 text-white rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for the latest insights and analytics tips.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 