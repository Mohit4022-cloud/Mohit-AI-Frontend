import { useCallback } from 'react';
import { useNotifications, NotificationAction } from '@/components/UI/NotificationSystem';

interface NotificationOptions {
  message?: string;
  duration?: number;
  actions?: NotificationAction[];
  persistent?: boolean;
  progress?: boolean;
}

export const useNotification = () => {
  const { addNotification, removeNotification, clearAll } = useNotifications();

  const success = useCallback((title: string, options?: NotificationOptions) => {
    return addNotification({
      type: 'success',
      title,
      ...options
    });
  }, [addNotification]);

  const error = useCallback((title: string, options?: NotificationOptions) => {
    return addNotification({
      type: 'error',
      title,
      ...options
    });
  }, [addNotification]);

  const warning = useCallback((title: string, options?: NotificationOptions) => {
    return addNotification({
      type: 'warning',
      title,
      ...options
    });
  }, [addNotification]);

  const info = useCallback((title: string, options?: NotificationOptions) => {
    return addNotification({
      type: 'info',
      title,
      ...options
    });
  }, [addNotification]);

  const loading = useCallback((title: string, options?: NotificationOptions) => {
    return addNotification({
      type: 'loading',
      title,
      persistent: true,
      ...options
    });
  }, [addNotification]);

  const promise = useCallback(async <T,>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error) => string);
    }
  ): Promise<T> => {
    const loadingId = loading(options.loading);

    try {
      const result = await promise;
      removeNotification(loadingId);
      success(
        typeof options.success === 'function' 
          ? options.success(result) 
          : options.success
      );
      return result;
    } catch (err) {
      removeNotification(loadingId);
      error(
        typeof options.error === 'function' 
          ? options.error(err as Error) 
          : options.error
      );
      throw err;
    }
  }, [loading, success, error, removeNotification]);

  return {
    success,
    error,
    warning,
    info,
    loading,
    promise,
    remove: removeNotification,
    clearAll
  };
};