import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (
  message: string,
  error: any,
  toastDuration: number = 4000,
): void => {
  console.error(message, error);
  toast(message, {
    duration: toastDuration,
  });
};
