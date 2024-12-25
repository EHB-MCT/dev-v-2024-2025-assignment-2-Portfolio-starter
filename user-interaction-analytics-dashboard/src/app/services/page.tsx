'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const services = [
  {
    title: 'User Behavior Analytics',
    description: 'Gain deep insights into how users interact with your website. Track clicks, scrolls, and navigation patterns to optimize user experience.',
    features: ['Heatmap Generation', 'Session Recording', 'User Flow Analysis'],
    icon: '📊'
  },
  {
    title: 'Conversion Optimization',
    description: 'Improve your conversion rates with data-driven insights. Identify bottlenecks and optimize your funnel for better results.',
    features: ['A/B Testing', 'Funnel Analysis', 'Goal Tracking'],
    icon: '📈'
  },
  {
    title: 'Performance Monitoring',
    description: 'Monitor your website\'s performance metrics in real-time. Ensure optimal user experience across all devices and browsers.',
    features: ['Real-time Monitoring', 'Error Tracking', 'Performance Metrics'],
    icon: '⚡'
  },
  {
    title: 'Custom Analytics Solutions',
    description: 'Tailored analytics solutions designed to meet your specific business needs. Get exactly the data you need to make informed decisions.',
    features: ['Custom Metrics', 'API Integration', 'Custom Reports'],
    icon: '🎯'
  }
];

export default function Services() {
  const router = useRouter();

  const handleContactClick = () => {
    router.push('/contact');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive analytics solutions to help you understand and improve your user experience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <div className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-gray-700">
                    <span className="mr-2">•</span>
                    {feature}
                  </div>
                ))}
              </div>
              <button
                onClick={() => router.push(`/contact?service=${encodeURIComponent(service.title)}`)}
                className="btn-secondary w-full"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today for a personalized quote and see how we can help improve your user experience.
          </p>
          <button
            onClick={handleContactClick}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us for a Quote
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Need more information?{' '}
            <Link href="/about" className="text-blue-600 hover:text-blue-800">
              Learn more about our company
            </Link>
            {' '}or{' '}
            <Link href="/blog" className="text-blue-600 hover:text-blue-800">
              read our latest insights
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 