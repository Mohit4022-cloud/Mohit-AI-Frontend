"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  AlertTriangle,
  Bell,
  Loader2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { animations } from '@/utils/animations';

export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface NotificationAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  actions?: NotificationAction[];
  onClose?: () => void;
  persistent?: boolean;
  progress?: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

const notificationIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  loading: Loader2
};

const notificationColors = {
  success: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    icon: 'text-green-500',
    progress: 'bg-green-500'
  },
  error: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    icon: 'text-red-500',
    progress: 'bg-red-500'
  },
  warning: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    icon: 'text-yellow-500',
    progress: 'bg-yellow-500'
  },
  info: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    icon: 'text-blue-500',
    progress: 'bg-blue-500'
  },
  loading: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    icon: 'text-pink-500',
    progress: 'bg-pink-500'
  }
};

const NotificationItem: React.FC<{
  notification: Notification;
  onRemove: (id: string) => void;
}> = ({ notification, onRemove }) => {
  const [progress, setProgress] = useState(100);
  const Icon = notificationIcons[notification.type];
  const colors = notificationColors[notification.type];
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!notification.persistent && notification.duration !== 0) {
      const duration = notification.duration || 5000;
      const interval = 50;
      const decrement = (100 / duration) * interval;

      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - decrement;
          if (newProgress <= 0) {
            onRemove(notification.id);
            return 0;
          }
          return newProgress;
        });
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [notification, onRemove]);

  const handleClose = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    notification.onClose?.();
    onRemove(notification.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`
        relative w-96 max-w-full
        bg-neutral-900/95 backdrop-blur-xl
        border ${colors.border}
        rounded-xl shadow-2xl
        overflow-hidden
      `}
    >
      {/* Glass overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`
            flex-shrink-0 w-10 h-10 
            ${colors.bg} ${colors.icon}
            rounded-lg flex items-center justify-center
          `}>
            <Icon 
              size={20} 
              className={notification.type === 'loading' ? 'animate-spin' : ''}
            />
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-neutral-100 mb-1">
              {notification.title}
            </h4>
            {notification.message && (
              <p className="text-sm text-neutral-400 leading-relaxed">
                {notification.message}
              </p>
            )}

            {/* Actions */}
            {notification.actions && notification.actions.length > 0 && (
              <div className="flex items-center gap-2 mt-3">
                {notification.actions.map((action, index) => (
                  <motion.button
                    key={index}
                    className={`
                      px-3 py-1.5 text-xs font-medium rounded-lg
                      transition-colors flex items-center gap-1
                      ${action.variant === 'primary' 
                        ? `${colors.bg} ${colors.icon} hover:opacity-80`
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                      }
                    `}
                    onClick={action.onClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {action.label}
                    <ChevronRight size={12} />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Close button */}
          <motion.button
            className="
              flex-shrink-0 p-1 rounded-lg
              text-neutral-500 hover:text-neutral-300
              hover:bg-neutral-800 transition-colors
            "
            onClick={handleClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={16} />
          </motion.button>
        </div>
      </div>

      {/* Progress bar */}
      {notification.progress !== false && !notification.persistent && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-800">
          <motion.div
            className={`h-full ${colors.progress}`}
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      )}

      {/* Glow effect */}
      <div 
        className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${
            notification.type === 'success' ? '#10b98130' :
            notification.type === 'error' ? '#ef444430' :
            notification.type === 'warning' ? '#f5973030' :
            notification.type === 'info' ? '#3b82f630' :
            '#ec489930'
          } 0%, transparent 70%)`,
          filter: 'blur(20px)',
          zIndex: -1
        }}
      />
    </motion.div>
  );
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random()}`;
    const newNotification: Notification = { ...notification, id };
    setNotifications((prev) => [...prev, newNotification]);
    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification, clearAll }}
    >
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Notification Stack */}
      <div className="fixed top-6 right-6 z-50 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {notifications.slice(0, isExpanded ? undefined : 3).map((notification, index) => (
            <motion.div
              key={notification.id}
              className="pointer-events-auto mb-3"
              style={{ zIndex: notifications.length - index }}
            >
              <NotificationItem
                notification={notification}
                onRemove={removeNotification}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Show more indicator */}
        {notifications.length > 3 && !isExpanded && (
          <motion.button
            className="
              pointer-events-auto
              px-4 py-2 bg-neutral-900/95 backdrop-blur-xl
              border border-neutral-800 rounded-lg
              text-sm text-neutral-400 hover:text-neutral-200
              transition-colors flex items-center gap-2
            "
            onClick={() => setIsExpanded(true)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Bell size={16} />
            {notifications.length - 3} more notification{notifications.length - 3 > 1 ? 's' : ''}
          </motion.button>
        )}
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
            />
            <motion.div
              className="fixed top-20 right-6 max-h-[80vh] overflow-y-auto z-50 pr-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRemove={removeNotification}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Utility functions for quick notifications
export const notify = {
  success: (title: string, options?: Partial<Notification>) => {
    const { addNotification } = useNotifications();
    return addNotification({ ...options, type: 'success', title });
  },
  error: (title: string, options?: Partial<Notification>) => {
    const { addNotification } = useNotifications();
    return addNotification({ ...options, type: 'error', title });
  },
  warning: (title: string, options?: Partial<Notification>) => {
    const { addNotification } = useNotifications();
    return addNotification({ ...options, type: 'warning', title });
  },
  info: (title: string, options?: Partial<Notification>) => {
    const { addNotification } = useNotifications();
    return addNotification({ ...options, type: 'info', title });
  },
  loading: (title: string, options?: Partial<Notification>) => {
    const { addNotification } = useNotifications();
    return addNotification({ ...options, type: 'loading', title, persistent: true });
  }
};

export default NotificationProvider;