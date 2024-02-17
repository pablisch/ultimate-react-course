import { useEffect } from 'react';

export function useKeypress(key, action) {
  useEffect(() => {
    const callback = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      } 
    }

    document.addEventListener('keydown', callback)

    return () => {
      document.removeEventListener('keydown', callback);
    }
  }, [key, action])
}