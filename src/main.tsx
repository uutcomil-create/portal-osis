// Ensure window.fetch has both a getter and a setter so extension interceptors don't throw
if (typeof window !== 'undefined') {
  try {
    let _fetch = window.fetch;
    Object.defineProperty(window, 'fetch', {
      get: () => _fetch,
      set: (val) => {
        _fetch = val;
      },
      configurable: true,
      enumerable: true
    });
  } catch (e) {
    // ignore
  }
}

import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
