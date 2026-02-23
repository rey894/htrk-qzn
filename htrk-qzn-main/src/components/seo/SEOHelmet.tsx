import { Helmet } from "react-helmet-async";

interface SEOHelmetProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

export const SEOHelmet = ({
  title,
  description,
  keywords,
  ogType = "website",
  ogImage = "/assets/quezon-at-a-glance.png",
  canonicalUrl,
  noindex = false
}: SEOHelmetProps) => {
  const siteName = "Municipality of Quezon, Bukidnon";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const baseUrl = window.location.origin;
  const currentUrl = canonicalUrl || window.location.href;
  const resolvedOgImage = ogImage || "/assets/quezon-at-a-glance.png";
  const fullOgImage = resolvedOgImage.startsWith('http') ? resolvedOgImage : `${baseUrl}${resolvedOgImage.startsWith('/') ? resolvedOgImage : '/' + resolvedOgImage}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_PH" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="Municipality of Quezon, Bukidnon" />
      <meta name="geo.region" content="PH-BUK" />
      <meta name="geo.placename" content="Quezon, Bukidnon" />
      <meta name="geo.position" content="7.7353;125.1013" />
      <meta name="ICBM" content="7.7353, 125.1013" />
    </Helmet>
  );
};