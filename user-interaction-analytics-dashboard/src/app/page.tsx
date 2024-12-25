"use client";
import Link from 'next/link';
import { useEffect } from 'react';
import { trackPageView, trackButtonClick, useScrollTracking } from '@/app/utils/tracker';

export default function Home() {
  // Track page view on mount
  useEffect(() => {
    trackPageView('/');
  }, []);

  // Track scroll depth
  useScrollTracking('/');

  // Track button clicks
  const handleGetStartedClick = () => {
    trackButtonClick('get_started', '/', { location: 'hero' });
  };

  const handleLearnMoreClick = () => {
    trackButtonClick('learn_more', '/', { location: 'hero' });
  };

  const handleFreeTrialClick = () => {
    trackButtonClick('free_trial', '/', { location: 'cta' });
  };

  return (
    <main className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            Welcome to the{' '}
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Engagement Demo
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Discover how we can help you track and analyze user interactions to create exceptional digital experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard" 
              className="btn-primary text-lg"
              onClick={handleGetStartedClick}
            >
              Get Started Now
            </Link>
            <Link 
              href="/about" 
              className="btn-secondary text-lg"
              onClick={handleLearnMoreClick}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Monitor user interactions as they happen
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Real-time tracking and analytics to help you understand how users interact with your platform.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Gain insights from comprehensive data analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced analytics tools to help you make data-driven decisions and improve user experience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Set up in minutes with our simple SDK
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Easy integration with any platform using our lightweight and efficient SDK.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="card">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                    <span className="text-gray-500 dark:text-gray-400">JD</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">John Doe</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">CEO, TechStart Inc.</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  &ldquo;The insights we&apos;ve gained from this analytics platform have been invaluable. Our user engagement has increased by 150% since implementation.&rdquo;
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="card">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                    <span className="text-gray-500 dark:text-gray-400">AS</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Alice Smith</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Product Manager, DataFlow</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  &ldquo;The real-time analytics and user behavior tracking have revolutionized how we approach product development. Absolutely essential for any digital product.&rdquo;
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="card">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                    <span className="text-gray-500 dark:text-gray-400">RJ</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Robert Johnson</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">CTO, WebScale Solutions</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  &ldquo;The ease of integration and comprehensive documentation made implementation a breeze. The insights we&apos;ve gained have been game-changing.&rdquo;
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to get started?
          </h2>
          <button 
            className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            onClick={handleFreeTrialClick}
          >
            Start Your Free Trial
          </button>
        </div>
      </section>
    </main>
  );
}