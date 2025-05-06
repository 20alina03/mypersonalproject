
// Re-export the JavaScript implementation with TypeScript types
import { useToast as useToastImpl, toast as toastImpl } from "./use-toast.js";
import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast";

// Add TypeScript types for our exports
type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
}

type UseToastReturn = {
  toasts: ToasterToast[];
  toast: (props: Omit<ToasterToast, "id">) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
  };
  dismiss: (toastId?: string) => void;
}

// Export the functions with appropriate types
export const useToast: () => UseToastReturn = useToastImpl;
export const toast: (props: Omit<ToasterToast, "id">) => {
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
} = toastImpl;
