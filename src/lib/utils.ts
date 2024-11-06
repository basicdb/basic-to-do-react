import { clsx, type ClassValue } from "clsx"
import { Calendar, CalendarClock, FolderCheck, Inbox, ExternalLink, BookOpenText } from "lucide-react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 12 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}

export const MENU_ITEMS = [
  { view: "all-tasks", label: "All Tasks", icon: Inbox, className: "" },
  { view: "Delayed", label: "Delayed", icon: CalendarClock, className: "text-red-400" },
  { view: "Scheduled", label: "Scheduled", icon: Calendar, className: "" },
  { view: "Completed", label: "Completed", icon: FolderCheck, className: "" }
];

export const EXTERNAL_LINKS = [
  {
    href: "https://basic.tech",
    icon: ExternalLink,
    label: "Learn about Basic"
  },
  {
    href: "https://docs.basic.tech",
    icon: BookOpenText,
    label: "Documentation"
  }
] as const;