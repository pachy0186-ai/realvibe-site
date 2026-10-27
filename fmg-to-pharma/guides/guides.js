(() => {
  const trackFmgEvent = (event, details = {}) => {
    // Preserve existing guide behavior; the new video resource follows pilot consent.
    if (document.body.dataset.requiresAnalyticsConsent === 'true') {
      let allowed = false;
      try { allowed = window.localStorage.getItem('fmg-pilot-analytics-choice') === 'on'; } catch { /* optional */ }
      if (!allowed || navigator.globalPrivacyControl === true || navigator.doNotTrack === '1') return;
    }
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

  if (document.body.dataset.videoResource === 'true') {
    trackFmgEvent('video_resource_viewed', { page_type: 'guide_article', article_slug: articleSlug });
    window.addEventListener('fmg:video-request', (event) => {
      if (event.detail?.video_id !== 'iPMPtll-P3Q') return;
      trackFmgEvent('video_player_requested', {
        page_type: 'guide_article', article_slug: articleSlug, video_id: event.detail.video_id,
      });
    });
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
