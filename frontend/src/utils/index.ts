type DebouncedFunction<T extends any[]> = (...args: T) => void;

function debounce<T extends any[]>(
  func: (...args: T) => void,
  delay = 200,
  immediate = false,
): DebouncedFunction<T> {
  let timer: number | undefined;

  return function (...args: T) {
    clearTimeout(timer);

    if (immediate && !timer) {
      func(...args);
    }

    timer = window.setTimeout(() => {
      if (!immediate) {
        func(...args);
      }
      timer = undefined;
    }, delay);
  };
}

export { debounce };
