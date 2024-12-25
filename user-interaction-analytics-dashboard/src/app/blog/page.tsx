'use client';

import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding User Behavior Analytics',
    excerpt: 'Learn how to leverage user behavior analytics to improve your website\'s conversion rate and user experience.',
    author: 'Sarah Johnson',
    date: 'March 15, 2024',
    category: 'Analytics',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'The Future of Web Analytics',
    excerpt: 'Explore upcoming trends in web analytics and how they will shape the future of digital experiences.',
    author: 'Michael Chen',
    date: 'March 12, 2024',
    category: 'Industry Trends',
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'Optimizing User Engagement',
    excerpt: 'Discover proven strategies to increase user engagement and retention through data-driven insights.',
    author: 'Emily Rodriguez',
    date: 'March 10, 2024',
    category: 'Best Practices',
    readTime: '6 min read'
  },
  {
    id: 4,
    title: 'A/B Testing Best Practices',
    excerpt: 'Master the art of A/B testing with our comprehensive guide to testing methodologies and analysis.',
    author: 'David Kim',
    date: 'March 8, 2024',
    category: 'Testing',
    readTime: '8 min read'
  },
  {
    id: 5,
    title: 'Data Privacy in Analytics',
    excerpt: 'Learn how to maintain user privacy while collecting valuable analytics data for your business.',
    author: 'Lisa Wang',
    date: 'March 5, 2024',
    category: 'Privacy',
    readTime: '4 min read'
  }
];

const categories = [
  'All',
  'Analytics',
  'Industry Trends',
  'Best Practices',
  'Testing',
  'Privacy'
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Header Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Latest Insights
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay up to date with the latest trends and best practices in user analytics and engagement tracking.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="card group hover:shadow-xl transition-all duration-300">
                {/* Image Placeholder */}
                <div className="aspect-w-16 aspect-h-9 rounded-t-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Blog Image Placeholder
                  </div>
                </div>

                <div className="p-6">
                  {/* Category and Read Time */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title and Excerpt */}
                  <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    <Link href={`/blog/${post.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Author and Date */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {post.author}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.date}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="card bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white">
            <div className="text-center p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Get the latest insights and updates delivered directly to your inbox.
              </p>
              <form className="max-w-md mx-auto flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 