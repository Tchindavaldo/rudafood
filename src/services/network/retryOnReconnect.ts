export function retryOnReconnect(callback: () => Promise<any>) {
  return new Promise((resolve, reject) => {
    let onlineListener: (() => void) | null = null;

    function tryRequest() {
      callback()
        .then(result => {
          if (onlineListener) {
            window.removeEventListener('online', onlineListener);
          }
          resolve(result);
        })
        .catch(err => {
          if (!navigator.onLine) {
            console.warn('Connexion perdue. En attente de reconnexion...');
            if (!onlineListener) {
              onlineListener = () => {
                console.log('Reconnexion détectée. Relance de la requête...');
                tryRequest();
              };
              window.addEventListener('online', onlineListener);
            }
          } else {
            if (onlineListener) {
              window.removeEventListener('online', onlineListener);
            }
            reject(err);
          }
        });
    }

    tryRequest();
  });
}
