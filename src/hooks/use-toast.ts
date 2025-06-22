import { toast as sonnerToast } from 'sonner';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  duration?: number;
}

export function useToast() {
  return {
    toast: (props: Omit<Toast, 'id'>) => {
      if (props.title) {
        sonnerToast(props.title, {
          description: props.description,
          duration: props.duration,
        });
      }
    },
  };
}

export { sonnerToast as toast };