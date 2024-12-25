'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Placeholder for tracking form submissions
    console.log('Form submitted:', formData);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto space-y-12">
        <nav className="mb-8">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </nav>

        <section className="text-center mb-16 animate-fadeIn">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Our Demo</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our engagement tracking solution helps businesses understand user behavior
            and improve their digital experiences through comprehensive analytics and insights.
            Built with modern technologies, our platform provides real-time data and actionable insights.
          </p>
        </section>

        <section className="bg-white p-8 rounded-xl shadow-lg animate-slideUp">
          <h2 className="text-3xl font-semibold mb-8">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="input-field min-h-[150px]"
                required
                disabled={isSubmitting}
              />
            </div>

            <button 
              type="submit" 
              className={`btn-primary w-full relative ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <div className="text-green-600 text-center mt-4">
                Message sent successfully!
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="text-red-600 text-center mt-4">
                Failed to send message. Please try again.
              </div>
            )}
          </form>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-semibold mb-8">Key Features</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto p-6 bg-white rounded-xl shadow-lg">
            {[
              {
                title: 'Real-time User Tracking',
                description: 'Monitor user interactions and behavior as they happen on your website.',
                icon: '📊'
              },
              {
                title: 'Comprehensive Analytics Dashboard',
                description: 'Get a bird\'s eye view of your user engagement metrics in one place.',
                icon: '📈'
              },
              {
                title: 'Custom Event Tracking',
                description: 'Define and track custom events that matter most to your business.',
                icon: '🎯'
              },
              {
                title: 'User Session Recordings',
                description: 'Watch real user sessions to understand their journey and pain points.',
                icon: '🎥'
              },
              {
                title: 'Heatmap Visualization',
                description: 'See where users click, scroll, and spend time on your pages.',
                icon: '🌡️'
              },
              {
                title: 'Conversion Funnel Analysis',
                description: 'Track and optimize your conversion paths for better results.',
                icon: '🔄'
              },
              {
                title: 'A/B Testing Capabilities',
                description: 'Test different versions of your content to maximize engagement.',
                icon: '🔬'
              },
              {
                title: 'Performance Metrics',
                description: 'Monitor and improve your website\'s performance metrics.',
                icon: '⚡'
              },
              {
                title: 'Custom Reporting',
                description: 'Generate detailed reports tailored to your specific needs.',
                icon: '📑'
              },
              {
                title: 'Data Export Options',
                description: 'Export your data in various formats for further analysis.',
                icon: '📤'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
} 