import { checkout } from '../i18n/checkout-en';

interface PaddleClient {
  Environment: { set: (environment: 'sandbox') => void };
  Initialize: (options: {
    token: string;
    eventCallback: (event: { name?: string; type?: string }) => void;
  }) => void;
}

const status = document.getElementById('checkout-status');
const reload = document.getElementById('checkout-reload');
const transactionIds = new URLSearchParams(window.location.search).getAll('_ptxn');
const setStatus = (message: string, retry = false): void => {
  if (status) status.textContent = message;
  if (reload) reload.hidden = !retry;
};

reload?.addEventListener('click', () => window.location.reload());

if (transactionIds.length === 0) {
  setStatus(checkout.missing);
} else if (transactionIds.length !== 1 || !/^txn_[a-z0-9]{26}$/.test(transactionIds[0])) {
  setStatus(checkout.invalid);
} else {
  // Paddle.js opens the transaction from _ptxn automatically on initialization.
  // Do not create transactions here: the proxy attaches the authenticated user.
  const script = document.createElement('script');
  script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
  script.async = true;
  let completed = false;
  const timeout = window.setTimeout(() => setStatus(checkout.failed, true), 30000);
  script.onerror = () => {
    window.clearTimeout(timeout);
    setStatus(checkout.failed, true);
  };
  script.onload = () => {
    try {
      const paddle = (window as Window & { Paddle?: PaddleClient }).Paddle;
      if (!paddle) throw new Error('Paddle.js unavailable');
      paddle.Environment.set('sandbox');
      paddle.Initialize({
        // Public sandbox client token, never a server API key.
        token: 'test_7c36a56f71d707db8c5e4f5200b',
        eventCallback: (event) => {
          if (event.name === 'checkout.completed') {
            completed = true;
            window.clearTimeout(timeout);
            setStatus(checkout.completed);
          } else if (!completed && event.name === 'checkout.loaded') {
            window.clearTimeout(timeout);
            setStatus(checkout.ready);
          } else if (!completed && event.name === 'checkout.closed') {
            window.clearTimeout(timeout);
            setStatus(checkout.closed, true);
          } else if (!completed && (event.type === 'error' || event.name === 'checkout.error')) {
            window.clearTimeout(timeout);
            setStatus(checkout.failed, true);
          }
        },
      });
    } catch {
      window.clearTimeout(timeout);
      setStatus(checkout.failed, true);
    }
  };
  document.head.append(script);
}
