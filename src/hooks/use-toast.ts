import { toast as sonnerToast } from "sonner";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  duration?: number;
  variant?: "default" | "destructive";
}

export function useToast() {
  return {
    toast: (props: Omit<Toast, "id"> & { variant?: "default" | "destructive" }) => {
      if (props.variant === "destructive") {
        sonnerToast.error(props.title || props.description || "Error", {
          description: props.title ? props.description : undefined,
          duration: props.duration,
        });
      } else if (props.title || props.description) {
        sonnerToast(props.title || props.description || "", {
          description: props.title ? props.description : undefined,
          duration: props.duration,
        });
      }
    },
  };
}

export { sonnerToast as toast };
