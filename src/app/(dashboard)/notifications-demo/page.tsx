"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useNotification } from '@/hooks/useNotification';
import QuantumButton from '@/components/UI/QuantumButton';
import QuantumCard from '@/components/UI/QuantumCard';
import { 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  Loader2,
  Send,
  Download,
  Upload,
  Trash2
} from 'lucide-react';
import { animations } from '@/utils/animations';

export default function NotificationsDemoPage() {
  const notification = useNotification();

  const handleSuccessNotification = () => {
    notification.success('Success!', {
      message: 'Your changes have been saved successfully.',
      duration: 5000
    });
  };

  const handleErrorNotification = () => {
    notification.error('Error occurred', {
      message: 'Failed to connect to the server. Please try again.',
      actions: [
        {
          label: 'Retry',
          onClick: () => console.log('Retrying...'),
          variant: 'primary'
        },
        {
          label: 'Cancel',
          onClick: () => console.log('Cancelled'),
          variant: 'secondary'
        }
      ]
    });
  };

  const handleWarningNotification = () => {
    notification.warning('Warning', {
      message: 'Your session will expire in 5 minutes.',
      duration: 10000
    });
  };

  const handleInfoNotification = () => {
    notification.info('New update available', {
      message: 'Version 2.0 is now available with new features.',
      actions: [
        {
          label: 'Update now',
          onClick: () => console.log('Updating...'),
          variant: 'primary'
        }
      ]
    });
  };

  const handleLoadingNotification = () => {
    const id = notification.loading('Processing...', {
      message: 'Please wait while we process your request.'
    });

    setTimeout(() => {
      notification.remove(id);
      notification.success('Processing complete!');
    }, 3000);
  };

  const handlePromiseNotification = async () => {
    const mockApiCall = () => new Promise<string>((resolve) => {
      setTimeout(() => resolve('Data loaded successfully'), 2000);
    });

    try {
      await notification.promise(mockApiCall(), {
        loading: 'Loading data...',
        success: (data) => data,
        error: 'Failed to load data'
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleMultipleNotifications = () => {
    notification.info('First notification');
    setTimeout(() => notification.success('Second notification'), 500);
    setTimeout(() => notification.warning('Third notification'), 1000);
    setTimeout(() => notification.error('Fourth notification'), 1500);
  };

  const handlePersistentNotification = () => {
    notification.info('Persistent notification', {
      message: 'This notification will stay until you close it.',
      persistent: true,
      actions: [
        {
          label: 'Got it',
          onClick: () => console.log('Acknowledged'),
          variant: 'primary'
        }
      ]
    });
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto space-y-6"
      variants={animations.page}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div variants={animations.stagger.item}>
        <h1 className="text-3xl font-bold text-neutral-100 mb-2">
          Notification System Demo
        </h1>
        <p className="text-neutral-400">
          Quantum-glass styled notifications with various types and interactions
        </p>
      </motion.div>

      {/* Basic Notifications */}
      <motion.div variants={animations.stagger.item}>
        <QuantumCard variant="glass" padding="lg">
          <h2 className="text-xl font-semibold text-neutral-100 mb-4">
            Basic Notifications
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <QuantumButton
              variant="success"
              icon={CheckCircle}
              onClick={handleSuccessNotification}
            >
              Success
            </QuantumButton>
            <QuantumButton
              variant="danger"
              icon={AlertCircle}
              onClick={handleErrorNotification}
            >
              Error
            </QuantumButton>
            <QuantumButton
              variant="secondary"
              icon={AlertTriangle}
              onClick={handleWarningNotification}
            >
              Warning
            </QuantumButton>
            <QuantumButton
              variant="primary"
              icon={Info}
              onClick={handleInfoNotification}
            >
              Info
            </QuantumButton>
          </div>
        </QuantumCard>
      </motion.div>

      {/* Advanced Features */}
      <motion.div variants={animations.stagger.item}>
        <QuantumCard variant="gradient" padding="lg">
          <h2 className="text-xl font-semibold text-neutral-100 mb-4">
            Advanced Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <QuantumButton
              variant="primary"
              icon={Loader2}
              onClick={handleLoadingNotification}
            >
              Loading State
            </QuantumButton>
            <QuantumButton
              variant="secondary"
              icon={Upload}
              onClick={handlePromiseNotification}
            >
              Promise Handler
            </QuantumButton>
            <QuantumButton
              variant="ghost"
              icon={Send}
              onClick={handleMultipleNotifications}
            >
              Multiple Notifications
            </QuantumButton>
          </div>
        </QuantumCard>
      </motion.div>

      {/* Special Cases */}
      <motion.div variants={animations.stagger.item}>
        <QuantumCard variant="neon" padding="lg">
          <h2 className="text-xl font-semibold text-neutral-100 mb-4">
            Special Cases
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-neutral-300 mb-2">
                Persistent Notification
              </h3>
              <QuantumButton
                variant="primary"
                icon={Info}
                onClick={handlePersistentNotification}
              >
                Show Persistent
              </QuantumButton>
            </div>

            <div>
              <h3 className="text-sm font-medium text-neutral-300 mb-2">
                Clear All Notifications
              </h3>
              <QuantumButton
                variant="danger"
                icon={Trash2}
                onClick={() => notification.clearAll()}
              >
                Clear All
              </QuantumButton>
            </div>
          </div>
        </QuantumCard>
      </motion.div>

      {/* Usage Examples */}
      <motion.div variants={animations.stagger.item}>
        <QuantumCard variant="default" padding="lg">
          <h2 className="text-xl font-semibold text-neutral-100 mb-4">
            Usage Examples
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-neutral-800 rounded-lg">
              <h3 className="text-sm font-medium text-neutral-300 mb-2">
                Basic Usage
              </h3>
              <pre className="text-sm text-neutral-400 overflow-x-auto">
{`import { useNotification } from '@/hooks/useNotification';

const notification = useNotification();

// Simple notification
notification.success('Saved!');

// With message
notification.error('Failed', {
  message: 'Unable to save changes'
});

// With actions
notification.info('Update available', {
  actions: [{
    label: 'Update',
    onClick: () => updateApp()
  }]
});`}
              </pre>
            </div>

            <div className="p-4 bg-neutral-800 rounded-lg">
              <h3 className="text-sm font-medium text-neutral-300 mb-2">
                Promise Handler
              </h3>
              <pre className="text-sm text-neutral-400 overflow-x-auto">
{`// Automatically shows loading, then success/error
await notification.promise(
  fetch('/api/data'),
  {
    loading: 'Loading data...',
    success: 'Data loaded!',
    error: 'Failed to load'
  }
);`}
              </pre>
            </div>
          </div>
        </QuantumCard>
      </motion.div>
    </motion.div>
  );
}