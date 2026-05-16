// Vercel Web Analytics initialization
// This script initializes Vercel Web Analytics for the portfolio site
// Documentation: https://vercel.com/docs/analytics/quickstart

(function() {
  // Initialize the queue if not already present
  if (window.va) return;
  
  window.va = function a() {
    (window.vaq = window.vaq || []).push(arguments);
  };

  // Load the Vercel Analytics script
  const script = document.createElement('script');
  script.src = '/_vercel/insights/script.js';
  script.defer = true;
  script.dataset.sdkn = '@vercel/analytics';
  script.dataset.sdkv = '1.6.1';
  
  script.onerror = function() {
    console.log(
      '[Vercel Web Analytics] Failed to load script. Please ensure Web Analytics is enabled in your Vercel project settings.'
    );
  };
  
  document.head.appendChild(script);
})();
