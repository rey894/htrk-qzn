/**
 * Facebook Scraper Server
 * This is a Node.js backend server that handles Facebook scraping
 * 
 * Installation:
 * npm install express cors cheerio puppeteer
 * 
 * Note: Facebook scraping is complex and may violate ToS.
 * Consider using Facebook Graph API instead.
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const FACEBOOK_PAGE_URL = 'https://www.facebook.com/MunicipalityOfQuezonBukidnon';

/**
 * Alternative: Use nitter or other Facebook alternative frontends
 * These provide RSS feeds that are easier to scrape
 */
const ALTERNATIVE_SOURCES = [
  'https://nitter.net/MunicipalityOfQuezonBukidnon/rss',
  // Add other alternative sources if available
];

/**
 * Scrape Facebook posts using Cheerio (simple HTML parsing)
 * Note: This may not work due to Facebook's JavaScript rendering
 */
async function scrapeFacebookPosts() {
  try {
    // Try direct fetch first
    const response = await axios.get(FACEBOOK_PAGE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const posts = [];

    // Facebook's HTML structure changes frequently
    // This is a basic example - may need adjustment
    $('[data-pagelet="ProfileTimeline"] article, [role="article"]').each((index, element) => {
      if (posts.length >= 5) return false;

      const $el = $(element);
      const message = $el.find('[data-testid="post_message"]').text() || 
                     $el.find('.userContent').text() || '';
      const time = $el.find('abbr[data-utime]').attr('data-utime') || 
                  $el.find('time').attr('datetime') || '';
      const image = $el.find('img').first().attr('src') || '';
      const link = $el.find('a[href*="/posts/"], a[href*="/permalink/"]').attr('href') || '';

      if (message.trim()) {
        posts.push({
          id: link.split('/').pop() || `post-${index}`,
          message: message.trim(),
          created_time: time ? new Date(parseInt(time) * 1000).toISOString() : new Date().toISOString(),
          permalink_url: link.startsWith('http') ? link : `https://www.facebook.com${link}`,
          full_picture: image || undefined,
          type: 'post'
        });
      }
    });

    return posts;
  } catch (error) {
    console.error('Error scraping Facebook:', error.message);
    return [];
  }
}

/**
 * Use Facebook's public page data if available
 */
async function fetchPublicPageData() {
  try {
    // Facebook provides some public data via their mobile site
    const mobileUrl = 'https://m.facebook.com/MunicipalityOfQuezonBukidnon';
    
    const response = await axios.get(mobileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
      }
    });

    const $ = cheerio.load(response.data);
    const posts = [];

    // Parse mobile Facebook structure
    $('[data-ft], .story_body_container').each((index, element) => {
      if (posts.length >= 5) return false;

      const $el = $(element);
      const text = $el.find('.story_body_container, .userContent').text().trim();
      
      if (text) {
        posts.push({
          id: `post-${Date.now()}-${index}`,
          message: text,
          created_time: new Date().toISOString(),
          permalink_url: `https://www.facebook.com/MunicipalityOfQuezonBukidnon`,
          type: 'post'
        });
      }
    });

    return posts;
  } catch (error) {
    console.error('Error fetching public page data:', error.message);
    return [];
  }
}

/**
 * Fallback: Return sample posts
 */
function getFallbackPosts() {
  return [
    {
      id: 'fallback-1',
      message: 'Welcome to the Municipality of Quezon, Bukidnon official Facebook page. Follow us for the latest updates, announcements, and news about our municipality.',
      created_time: new Date().toISOString(),
      permalink_url: 'https://www.facebook.com/MunicipalityOfQuezonBukidnon',
      type: 'post'
    },
    {
      id: 'fallback-2',
      message: 'Stay informed about the 4K Development Agenda: Kalinaw, Kahigayunan, Kahimsog, and Kalipay initiatives in Quezon, Bukidnon.',
      created_time: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      permalink_url: 'https://www.facebook.com/MunicipalityOfQuezonBukidnon',
      type: 'post'
    }
  ];
}

// API endpoint
app.get('/api/facebook-posts', async (req, res) => {
  try {
    console.log('Fetching Facebook posts...');
    
    // Try scraping methods in order
    let posts = await fetchPublicPageData();
    
    if (posts.length === 0) {
      posts = await scrapeFacebookPosts();
    }
    
    if (posts.length === 0) {
      posts = getFallbackPosts();
      console.log('Using fallback posts');
    }

    // Cache for 4 hours (fetch 3x per day as requested)
    res.set('Cache-Control', 'public, max-age=14400'); // 4 hours
    
    res.json({
      success: true,
      posts: posts.slice(0, 5),
      source: posts.length > 0 && posts[0].id.startsWith('fallback') ? 'fallback' : 'scraped',
      fetched_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in /api/facebook-posts:', error);
    res.status(500).json({
      success: false,
      posts: getFallbackPosts(),
      error: error.message,
      fetched_at: new Date().toISOString()
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'facebook-scraper' });
});

app.listen(PORT, () => {
  console.log(`Facebook scraper server running on port ${PORT}`);
  console.log(`API endpoint: https://quezonbukidnon.com/api/facebook-posts`);
});

module.exports = app;
