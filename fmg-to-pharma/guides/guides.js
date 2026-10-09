(() => {
  const trackFmgEvent = (event, details = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...details });
    window.dispatchEvent(new CustomEvent('fmg:analytics', { detail: { event, ...details } }));
  };

  const pageType = document.body.dataset.pageType;
  const articleSlug = document.body.dataset.articleSlug;

  if (pageType === 'guide_hub') {
    trackFmgEvent('guide_hub_viewed', { page_type: 'guide_hub' });
  }

  if (pageType === 'guide_article' && articleSlug) {
    trackFmgEvent('article_viewed', { page_type: 'guide_article', article_slug: articleSlug });
  }

  document.querySelectorAll('[data-analytics]').forEach((link) => {
    link.addEventListener('click', () => {
      const details = { page_type: pageType || 'guides' };
      if (articleSlug) details.article_slug = articleSlug;
      if (link.dataset.analyticsSource) details.source = link.dataset.analyticsSource;
      trackFmgEvent(link.dataset.analytics, details);
    });
  });
})();
