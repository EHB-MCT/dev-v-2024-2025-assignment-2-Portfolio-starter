'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'How do I get started with your analytics platform?',
    answer: `Getting started is easy! Simply sign up for an account, add our tracking code to your website, and you'll start receiving data immediately. Our onboarding team will guide you through the process and help you set up your first dashboard.`
  },
  {
    question: 'What kind of data do you track?',
    answer: `We track a wide range of user interactions including:
    • Page views and session duration
    • Click events and navigation patterns
    • Form submissions and conversion events
    • User journey flows
    • Custom events that you define
    
    All data collection is GDPR compliant and can be customized to meet your privacy requirements.`
  },
  {
    question: 'How does your pricing work?',
    answer: `We offer flexible pricing plans based on your needs:
    • Free tier: Up to 10,000 monthly events
    • Pro: Up to 100,000 monthly events
    • Enterprise: Unlimited events
    
    All plans include basic features, while Pro and Enterprise plans include advanced analytics and custom integrations.`
  },
  {
    question: 'Can I export my analytics data?',
    answer: `Yes! You can export your data in multiple formats:
    • CSV for spreadsheet analysis
    • JSON for custom integrations
    • PDF reports for presentations
    • API access for automated exports
    
    Enterprise plans also include custom export options and direct database access.`
  },
  {
    question: 'Do you offer custom solutions?',
    answer: `Absolutely! Our Enterprise plan includes:
    • Custom feature development
    • Dedicated support team
    • Custom integrations
    • On-premise deployment options
    • Custom SLA agreements
    
    Contact our sales team to discuss your specific requirements.`
  },
  {
    question: 'What kind of support do you offer?',
    answer: `We provide comprehensive support across all plans:
    • 24/7 email support
    • Live chat during business hours
    • Extensive documentation
    • Video tutorials
    • Regular webinars
    
    Enterprise plans also include dedicated support managers and priority response times.`
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about our analytics platform.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="card overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-6 h-6 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-200 ease-in-out ${
                    openIndex === index
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-4 text-gray-600 dark:text-gray-300 whitespace-pre-line">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="card text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Still have questions?
            </h2>
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
              Our team is here to help you get the most out of our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-primary"
              >
                Contact Support
              </a>
              <a
                href="/docs"
                className="btn-secondary"
              >
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 