import { supabase, UserInteraction } from '../../lib/supabaseClient';

// Debounce function to prevent duplicate events
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Main tracking function
export async function trackEvent(event: Omit<UserInteraction, 'id' | 'timestamp'>) {
  try {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Tracking Event:', {
        ...event,
        timestamp: new Date().toISOString(),
      });
    }

    const { error } = await supabase.from('user_interactions').insert({
      ...event,
      timestamp: new Date().toISOString(),
    });

    if (error) {
      console.error('Error tracking event:', error);
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}

// Track page views
export function trackPageView(page: string) {
  trackEvent({
    event_type: 'page_view',
    event_target: 'page',
    page,
  });
}

// Track button clicks
export function trackButtonClick(buttonName: string, page: string, details?: any) {
  trackEvent({
    event_type: 'click',
    event_target: buttonName,
    page,
    details,
  });
}

// Track form submissions
export function trackFormSubmission(formName: string, page: string, formData: any) {
  trackEvent('form_submission', formName, page, formData);
}

// Track scroll depth
export const trackScrollDepth = debounce((page: string, scrollPercentage: number) => {
  if (scrollPercentage >= 50 && !localStorage.getItem(`scrollTracked_${page}`)) {
    trackEvent('scroll_depth', '50_percent', page, { scrollPercentage });
    localStorage.setItem(`scrollTracked_${page}`, 'true');
  }
}, 500);

// Custom hook for scroll tracking
export function useScrollTracking(page: string) {
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (window.scrollY / scrollHeight) * 100;
      trackScrollDepth(page, scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);
}

// Track social link clicks
export function trackSocialClick(platform: string, page: string, details?: any) {
  trackEvent('social_click', platform, page, details);
}

// Track blog post views
export function trackBlogPostView(postId: string, postTitle: string) {
  trackEvent('blog_view', postId, '/blog', { title: postTitle });
}

// Track team member profile views
export function trackTeamMemberView(memberName: string) {
  trackEvent('team_member_view', memberName, '/team');
} 