/* No third-party player, iframe or script is requested before this click. */
(() => {
  'use strict';
  document.querySelectorAll('[data-youtube-id]').forEach(link => {
    const id = link.dataset.youtubeId;
    if (!/^[A-Za-z0-9_-]{11}$/.test(id || '')) return;
    link.addEventListener('click', event => {
      // Modified clicks retain ordinary link behavior, including no-JS fallback.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button > 0) return;
      const shell = link.closest('[data-video-shell]');
      if (!shell || shell.querySelector('iframe')) return;
      event.preventDefault();
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=0&rel=0&playsinline=1`;
      iframe.title = link.dataset.videoTitle || 'FMG to Pharma educational video';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allow = 'encrypted-media; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      iframe.tabIndex = 0;
      shell.replaceChildren(iframe);
      iframe.focus();
      const status = document.getElementById('video-status');
      if (status) status.textContent = 'YouTube player requested. Press play in the player, or use the direct YouTube link if playback is unavailable.';
      // This is a request to load the player, not evidence of playback or completion.
      window.dispatchEvent(new CustomEvent('fmg:video-request', { detail: { video_id: id } }));
    });
  });
})();
