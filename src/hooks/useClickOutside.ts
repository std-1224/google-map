import { useEffect, useRef } from 'react';

const useClickOutside = (callback: () => void) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    if (typeof window !== 'undefined')
      document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export default useClickOutside;
