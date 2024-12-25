'use client';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'Former Google Analytics lead with 15+ years of experience in data analytics and user behavior tracking.',
    image: '/team/sarah.jpg',
    links: {
      linkedin: 'https://linkedin.com/in/sarah-johnson',
      twitter: 'https://twitter.com/sarahjohnson',
    }
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    bio: 'Full-stack developer specializing in real-time analytics systems and scalable architectures.',
    image: '/team/michael.jpg',
    links: {
      linkedin: 'https://linkedin.com/in/michael-chen',
      github: 'https://github.com/michaelchen',
    }
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Product',
    bio: 'Product strategist focused on creating intuitive analytics tools that drive business growth.',
    image: '/team/emily.jpg',
    links: {
      linkedin: 'https://linkedin.com/in/emily-rodriguez',
      twitter: 'https://twitter.com/emilyrodriguez',
    }
  },
  {
    name: 'David Kim',
    role: 'Lead Designer',
    bio: 'UX/UI designer passionate about creating beautiful and functional data visualization interfaces.',
    image: '/team/david.jpg',
    links: {
      linkedin: 'https://linkedin.com/in/david-kim',
      dribbble: 'https://dribbble.com/davidkim',
    }
  },
  {
    name: 'Lisa Wang',
    role: 'Data Science Lead',
    bio: 'PhD in Machine Learning, specializing in predictive analytics and user behavior modeling.',
    image: '/team/lisa.jpg',
    links: {
      linkedin: 'https://linkedin.com/in/lisa-wang',
      github: 'https://github.com/lisawang',
    }
  },
  {
    name: 'James Wilson',
    role: 'Customer Success Manager',
    bio: 'Dedicated to helping clients maximize the value of their analytics implementation.',
    image: '/team/james.jpg',
    links: {
      linkedin: 'https://linkedin.com/in/james-wilson',
      twitter: 'https://twitter.com/jameswilson',
    }
  }
];

export default function Team() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Header Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're a diverse group of experts passionate about helping businesses understand and improve their user experience.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="card group hover:shadow-xl transition-all duration-300"
              >
                {/* Image Container */}
                <div className="aspect-w-3 aspect-h-2 rounded-t-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Profile Image Placeholder
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{member.bio}</p>

                  {/* Social Links */}
                  <div className="flex space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {Object.entries(member.links).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        aria-label={`${member.name}'s ${platform}`}
                      >
                        {platform === 'linkedin' && (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        )}
                        {platform === 'twitter' && (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                          </svg>
                        )}
                        {platform === 'github' && (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        )}
                        {platform === 'dribbble' && (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z"/>
                          </svg>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Team CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="card bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white">
            <div className="text-center p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
              <p className="text-xl mb-8 opacity-90">
                We're always looking for talented individuals to join our mission.
              </p>
              <a
                href="/careers"
                className="inline-block bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                View Open Positions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 