if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(error => {
      console.error('Dog Guide offline support could not be enabled.', error);
    });
  });
}

let deferredInstallPrompt;
const installButton = document.getElementById('install-app-button');
if (installButton) {
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredInstallPrompt = event;
    installButton.hidden = false;
  });
  installButton.addEventListener('click', async () => {
    if (!deferredInstallPrompt) {
      document.querySelector('.install-help')?.setAttribute('open', '');
      return;
    }
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installButton.hidden = true;
  });
  window.addEventListener('appinstalled', () => { installButton.hidden = true; });
}
