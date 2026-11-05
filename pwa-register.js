// Register the PWA shell when served securely (HTTPS or localhost).
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(error => console.warn('qlixsound offline support could not be enabled:', error));
  });
}
