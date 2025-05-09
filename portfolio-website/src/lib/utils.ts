import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges class names using clsx and tailwind-merge
 * This utility helps avoid class conflicts in Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string into a more readable format
 */
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(dateString).toLocaleDateString("en-US", options);
}

/**
 * Delay execution by the given milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Capitalize the first letter of a string
 */
export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Truncate a string to the given length and add ellipsis
 */
export function truncateString(str: string, num: number): string {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

/**
 * Check if the user prefers dark mode
 */
export function prefersDarkMode(): boolean {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

/**
 * Generate an array of numbers from start to end
 */
export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * Check if an element is in the viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
