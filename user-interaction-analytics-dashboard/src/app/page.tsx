"use client";
import Link from 'next/link';

export default function Home() {
  const handleSignUp = () => {
    // Placeholder for tracking sign up clicks
    console.log('Sign up clicked');
    // Add your tracking logic here
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl w-full text-center space-y-8 animate-fadeIn">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 animate-slideDown">
            Welcome to the{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Engagement Demo
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover how we can help you track and analyze user interactions 
            to create exceptional digital experiences.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={handleSignUp}
            className="btn-primary transform hover:scale-105 transition-all duration-200 text-lg px-8 py-3"
          >
            Get Started Now
          </button>
          
          <Link 
            href="/about" 
            className="btn-secondary transform hover:scale-105 transition-all duration-200 text-lg px-8 py-3"
          >
            Learn More
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Real-time Tracking',
              description: 'Monitor user interactions as they happen'
            },
            {
              title: 'Deep Analytics',
              description: 'Gain insights from comprehensive data analysis'
            },
            {
              title: 'Easy Integration',
              description: 'Set up in minutes with our simple SDK'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}