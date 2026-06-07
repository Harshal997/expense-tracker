import { useEffect, useRef, useState } from "react";

export function useDebounce(search: string, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [debouncedValue, setDebouncedValue] = useState(search);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(search);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [search, delay]);

  return debouncedValue;
}
