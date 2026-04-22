import { useEffect, useState } from 'react';

/**
 * Debounce a value by `delay` ms.
 * Used to prevent API calls on every keystroke.
 */
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
