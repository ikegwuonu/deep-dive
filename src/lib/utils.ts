import clsx, { ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export const showerror = (msg: string) => toast.error(msg);
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
