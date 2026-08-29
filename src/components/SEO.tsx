import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords }) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Update Document Title
    const baseTitle = "Vidyate Commerce Hub | Digital Ecosystem for Commerce Students";
    const fullTitle = title ? `${title} | Vidyate Commerce` : baseTitle;
    document.title = fullTitle;

    // 2. Helper to Update Meta Tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // 3. Update Description
    const defaultDesc = "A high-performance academic ecosystem for Commerce students featuring curated resources for B.Com, M.Com, CA, CS & Class 11-12 Boards.";
    const activeDesc = description || defaultDesc;
    updateMeta('description', activeDesc);

    // 4. Update Keywords
    const defaultKeywords = "Commerce, Accountancy, Financial Management, Direct Taxation, B.Com Notes, CA Foundation prep, CS board exam papers, India";
    updateMeta('keywords', keywords || defaultKeywords);

    // 5. Update Open Graph Tags
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', activeDesc, true);
    const currentUrl = `https://vidyate-commerce-hub.vercel.app${location.pathname}`;
    updateMeta('og:url', currentUrl, true);

    // 6. Update Twitter Tags
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', activeDesc);

    // 7. Update Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

  }, [title, description, keywords, location]);

  return null;
};

export default SEO;
