/**
 * Facebook Post Scraper
 * Note: Facebook scraping may violate their Terms of Service.
 * This is a basic implementation that should be replaced with official Facebook Graph API when possible.
 * 
 * Due to Facebook's login requirements and anti-scraping measures,
 * this uses a public RSS feed alternative or requires manual API setup.
 */

export interface FacebookPost {
  id: string;
  message: string;
  created_time: string;
  permalink_url: string;
  full_picture?: string;
  type?: string;
}

/**
 * Alternative approach: Use Facebook's public RSS feed if available
 * Most Facebook pages have a public RSS feed at: /posts/rss
 */
export async function fetchFacebookPostsRSS(pageUrl: string = 'https://www.facebook.com/MunicipalityOfQuezonBukidnon'): Promise<FacebookPost[]> {
  try {
    // Facebook doesn't provide public RSS feeds directly
    // We'll use a CORS proxy or backend endpoint
    const rssUrl = `${pageUrl}/posts/rss`;
    
    // Use a CORS proxy service (for development only)
    // In production, this should be done via a backend API
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    if (data.contents) {
      // Parse RSS XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
      const items = xmlDoc.querySelectorAll('item');
      
      return Array.from(items).slice(0, 5).map((item, index) => {
        const title = item.querySelector('title')?.textContent || '';
        const description = item.querySelector('description')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        
        return {
          id: link.split('/').pop() || `post-${index}`,
          message: `${title}\n\n${description}`,
          created_time: pubDate,
          permalink_url: link,
          type: 'post'
        };
      });
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching Facebook RSS:', error);
    return [];
  }
}

/**
 * Fetch posts using a backend scraping service
 * This should call your backend API that handles the actual scraping
 */
export async function fetchFacebookPostsFromAPI(): Promise<FacebookPost[]> {
  try {
    // This will call your backend API endpoint
    // For now, we'll use a mock implementation
    const response = await fetch('/api/facebook-posts');
    
    if (!response.ok) {
      throw new Error('Failed to fetch Facebook posts');
    }
    
    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching Facebook posts from API:', error);
    // Return fallback data
    return getFallbackPosts();
  }
}

/**
 * Fallback posts when scraping fails
 */
function getFallbackPosts(): FacebookPost[] {
  return [
    {
      id: 'fallback-1',
      message: 'Welcome to the Municipality of Quezon, Bukidnon official Facebook page. Stay tuned for the latest updates and announcements!',
      created_time: new Date().toISOString(),
      permalink_url: 'https://www.facebook.com/MunicipalityOfQuezonBukidnon',
      type: 'post'
    }
  ];
}

/**
 * Main function to fetch Facebook posts
 * Tries multiple methods and falls back gracefully
 */
export async function fetchFacebookPosts(maxPosts: number = 5): Promise<FacebookPost[]> {
  try {
    // Try API first
    const apiPosts = await fetchFacebookPostsFromAPI();
    if (apiPosts.length > 0) {
      return apiPosts.slice(0, maxPosts);
    }
    
    // Try RSS as fallback
    const rssPosts = await fetchFacebookPostsRSS();
    if (rssPosts.length > 0) {
      return rssPosts.slice(0, maxPosts);
    }
    
    // Return fallback
    return getFallbackPosts();
  } catch (error) {
    console.error('Error in fetchFacebookPosts:', error);
    return getFallbackPosts();
  }
}
