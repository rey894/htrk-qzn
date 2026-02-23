import { useState, useEffect } from 'react';
import { fetchFacebookPosts, FacebookPost } from '@/api/facebookScraper';

export function useFacebookPosts(maxPosts: number = 5) {
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const fetchedPosts = await fetchFacebookPosts(maxPosts);
        
        if (isMounted) {
          setPosts(fetchedPosts);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
          console.error('Error loading Facebook posts:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPosts();

    // Refresh every 4 hours (3x per day as requested)
    const interval = setInterval(loadPosts, 4 * 60 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [maxPosts]);

  return { posts, loading, error };
}
