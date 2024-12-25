'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// This would typically come from an API or database
const blogPosts = {
  1: {
    title: 'Understanding User Behavior Through Analytics',
    content: `
      User behavior analytics is a powerful tool that can help businesses understand how users interact with their websites and applications. By analyzing user behavior patterns, businesses can make data-driven decisions to improve user experience and increase conversions.

      ## Why User Behavior Analytics Matters

      Understanding how users interact with your website is crucial for:
      - Improving user experience
      - Increasing conversion rates
      - Reducing bounce rates
      - Optimizing content strategy

      ## Key Metrics to Track

      When analyzing user behavior, focus on these key metrics:
      1. Time on page
      2. Click-through rates
      3. Scroll depth
      4. User flow
      5. Exit pages

      ## Best Practices for Implementation

      To get the most out of user behavior analytics:
      - Set clear goals and KPIs
      - Use multiple tracking methods
      - Regularly analyze and act on data
      - Test and iterate based on findings

      ## Conclusion

      User behavior analytics is an essential tool for any business looking to improve their digital presence. By understanding how users interact with your website, you can make informed decisions that lead to better user experience and increased conversions.
    `,
    author: 'Sarah Johnson',
    date: '2024-01-15',
    category: 'Analytics',
    readTime: '5 min read'
  },
  2: {
    title: 'The Power of A/B Testing in UX Design',
    content: `
      A/B testing is a crucial methodology in UX design that helps teams make data-driven decisions. By comparing two versions of a design, teams can determine which option performs better and why.

      ## Understanding A/B Testing

      A/B testing involves:
      - Creating two versions of a design
      - Randomly showing each version to different users
      - Collecting and analyzing data
      - Making decisions based on results

      ## Benefits of A/B Testing

      Regular A/B testing can help:
      1. Increase conversion rates
      2. Improve user engagement
      3. Reduce bounce rates
      4. Optimize user experience

      ## Common Elements to Test

      Consider testing these elements:
      - Call-to-action buttons
      - Headlines and copy
      - Images and media
      - Layout and navigation
      - Color schemes

      ## Best Practices

      To ensure successful A/B testing:
      - Test one element at a time
      - Run tests for sufficient duration
      - Use statistical significance
      - Document and share results
    `,
    author: 'Michael Chen',
    date: '2024-01-10',
    category: 'UX Design',
    readTime: '7 min read'
  },
  3: {
    title: 'Maximizing Conversion Rates with Heat Maps',
    content: `
      Heat maps are powerful visualization tools that show where users click, move, and scroll on your website. This information is invaluable for optimizing conversion rates and user experience.

      ## Types of Heat Maps

      Common types include:
      1. Click heat maps
      2. Move heat maps
      3. Scroll heat maps
      4. Attention heat maps

      ## Benefits of Heat Map Analysis

      Heat maps help you:
      - Identify popular content
      - Find usability issues
      - Optimize page layout
      - Improve conversion funnels

      ## Implementation Strategies

      To get the most from heat maps:
      - Track multiple page types
      - Analyze mobile and desktop separately
      - Compare different time periods
      - Look for patterns across pages

      ## Acting on Heat Map Data

      Use heat map data to:
      - Optimize button placement
      - Improve content hierarchy
      - Enhance navigation design
      - Place important elements in hot zones
    `,
    author: 'Emily Rodriguez',
    date: '2024-01-05',
    category: 'Conversion',
    readTime: '6 min read'
  },
  4: {
    title: 'The Future of Web Analytics',
    content: `
      The field of web analytics is rapidly evolving with new technologies and methodologies. Understanding these trends is crucial for staying ahead in the digital analytics landscape.

      ## Emerging Trends

      Key trends include:
      1. AI-powered analytics
      2. Privacy-first tracking
      3. Real-time analytics
      4. Predictive analytics
      5. Cross-device tracking

      ## Impact of Privacy Regulations

      Privacy regulations are shaping:
      - Data collection methods
      - User consent management
      - Data storage practices
      - Analytics implementation

      ## Future Technologies

      Watch for developments in:
      - Machine learning analytics
      - Edge computing
      - Blockchain analytics
      - IoT integration

      ## Preparing for the Future

      To stay ahead:
      - Invest in privacy-compliant tools
      - Adopt AI-ready platforms
      - Focus on first-party data
      - Build scalable analytics infrastructure
    `,
    author: 'David Kim',
    date: '2024-01-01',
    category: 'Trends',
    readTime: '8 min read'
  }
};

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const postId = Number(params.id);
  const post = blogPosts[postId as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const paragraphs = post.content.split('\n\n').filter(p => p.trim());

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        {/* Back to Blog */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2"
          >
            ← Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span>{post.readTime}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between text-gray-600">
            <span>By {post.author}</span>
            <span>
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {paragraphs.map((paragraph, index) => {
            // Check if it's a heading
            if (paragraph.startsWith('##')) {
              return (
                <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                  {paragraph.replace('##', '').trim()}
                </h2>
              );
            }
            // Check if it's a list
            if (paragraph.includes('-') || paragraph.match(/^\d\./)) {
              const items = paragraph
                .split('\n')
                .filter(item => item.trim())
                .map(item => item.replace(/^-|\d\./, '').trim());
              
              return (
                <ul key={index} className="list-disc pl-6 space-y-2 my-4">
                  {items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              );
            }
            // Regular paragraph
            return (
              <p key={index} className="mb-4 text-gray-700">
                {paragraph.trim()}
              </p>
            );
          })}
        </div>

        {/* Share and Navigation */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Share Buttons */}
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Share:</span>
              <button className="text-gray-400 hover:text-blue-600 transition-colors">
                Twitter
              </button>
              <button className="text-gray-400 hover:text-blue-600 transition-colors">
                LinkedIn
              </button>
              <button className="text-gray-400 hover:text-blue-600 transition-colors">
                Facebook
              </button>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              {postId > 1 && (
                <Link
                  href={`/blog/${postId - 1}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  ← Previous Post
                </Link>
              )}
              {postId < Object.keys(blogPosts).length && (
                <Link
                  href={`/blog/${postId + 1}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Next Post →
                </Link>
              )}
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
} 