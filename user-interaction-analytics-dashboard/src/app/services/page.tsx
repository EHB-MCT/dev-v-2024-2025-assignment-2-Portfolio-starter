'use client';

import Link from 'next/link';

const services = [
  {
    icon: '📊',
    title: 'User Behavior Analytics',
    description: 'Gain deep insights into how users interact with your website. Track clicks, scrolls, and navigation patterns to optimize user experience.',
    features: [
      'Heatmap Generation',
      'Session Recording',
      'User Flow Analysis'
    ]
  },
  {
    icon: '📈',
    title: 'Conversion Optimization',
    description: 'Improve your conversion rates with data-driven insights. Identify bottlenecks and optimize your funnel for better results.',
    features: [
      'A/B Testing',
      'Funnel Analysis',
      'Goal Tracking'
    ]
  },
  {
    icon: '🔍',
    title: 'Performance Monitoring',
    description: 'Monitor your website performance in real-time. Identify and fix issues before they impact your users.',
    features: [
      'Real-time Monitoring',
      'Error Tracking',
      'Performance Metrics'
    ]
  },
  {
    icon: '🎯',
    title: 'Custom Event Tracking',
    description: 'Track specific interactions that matter to your business. Set up custom events and monitor their performance.',
    features: [
      'Custom Events',
      'Event Attribution',
      'Conversion Tracking'
    ]
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Header Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive analytics solutions to help you understand and improve your user experience.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card group hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <span className="text-4xl">{service.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-700 dark:text-gray-300">
                          <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="mt-6 btn-secondary w-full">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to improve your user experience?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
              Get Started
            </button>
            <Link href="/contact" className="bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 