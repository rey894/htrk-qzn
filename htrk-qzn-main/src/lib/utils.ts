import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to format phone number for tel: link (remove all non-digits)
export function formatPhoneForTel(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}