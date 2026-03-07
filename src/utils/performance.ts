// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: Array<any>) => void>(
  callback: T,
  delay: number = 100
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
