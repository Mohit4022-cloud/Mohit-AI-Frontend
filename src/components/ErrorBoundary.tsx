import React, { Component, ReactNode, ErrorInfo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Bug, Copy, Check } from 'lucide-react';
import { animations } from '@/utils/animations';

interface ErrorDetails {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: Date;
  url: string;
  userAgent: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorDetails: ErrorDetails | null;
  errorCount: number;
  showDetails: boolean;
  copied: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string | number>;
  resetOnPropsChange?: boolean;
  isolate?: boolean;
  showDetails?: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null;
  private previousResetKeys: Array<string | number> = [];

  constructor(props: ErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorDetails: null,
      errorCount: 0,
      showDetails: false,
      copied: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorDetails: ErrorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    this.setState(prevState => ({
      errorInfo,
      errorDetails,
      errorCount: prevState.errorCount + 1
    }));

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by ErrorBoundary:', error);
      console.error('Error Info:', errorInfo);
    }

    // Send error to monitoring service
    this.reportError(error, errorInfo, errorDetails);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    // Reset on prop changes if enabled
    if (hasError && prevProps.children !== this.props.children && resetOnPropsChange) {
      this.resetErrorBoundary();
    }

    // Reset on resetKeys change
    if (resetKeys && prevProps.resetKeys !== resetKeys) {
      let hasResetKeyChanged = false;
      
      for (let i = 0; i < resetKeys.length; i++) {
        if (this.previousResetKeys[i] !== resetKeys[i]) {
          hasResetKeyChanged = true;
          break;
        }
      }

      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
      
      this.previousResetKeys = [...resetKeys];
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  reportError = (error: Error, errorInfo: ErrorInfo, details: ErrorDetails) => {
    // In production, send to error monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to Sentry, LogRocket, etc.
      console.error('Reporting error to monitoring service:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        ...details
      });
    }
  };

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorDetails: null,
      showDetails: false,
      copied: false
    });
  };

  toggleDetails = () => {
    this.setState(prev => ({ showDetails: !prev.showDetails }));
  };

  copyErrorDetails = async () => {
    const { error, errorDetails } = this.state;
    
    const errorText = `
Error: ${error?.message}
Time: ${errorDetails?.timestamp}
URL: ${errorDetails?.url}
User Agent: ${errorDetails?.userAgent}

Stack Trace:
${error?.stack}

Component Stack:
${errorDetails?.componentStack}
    `.trim();

    try {
      await navigator.clipboard.writeText(errorText);
      this.setState({ copied: true });
      
      setTimeout(() => {
        this.setState({ copied: false });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy error details:', err);
    }
  };

  render() {
    const { hasError, error, errorDetails, errorCount, showDetails, copied } = this.state;
    const { children, fallback, isolate, showDetails: showDetailsProp } = this.props;

    if (hasError && error) {
      // Use custom fallback if provided
      if (fallback) {
        return <>{fallback}</>;
      }

      // Default error UI
      return (
        <AnimatePresence mode="wait">
          <motion.div
            className="min-h-screen flex items-center justify-center bg-neutral-900 p-4"
            variants={animations.page}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              className="max-w-2xl w-full"
              variants={animations.scale}
              initial="initial"
              animate="animate"
            >
              {/* Error Card */}
              <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-8 text-center">
                {/* Error Icon */}
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 rounded-full mb-6"
                  animate={animations.pulse}
                >
                  <AlertTriangle size={40} className="text-red-500" />
                </motion.div>

                {/* Error Message */}
                <h1 className="text-2xl font-bold text-neutral-100 mb-2">
                  {isolate ? 'Component Error' : 'Something went wrong'}
                </h1>
                
                <p className="text-neutral-400 mb-8 max-w-md mx-auto">
                  {isolate 
                    ? 'This component encountered an error and cannot be displayed.'
                    : 'We encountered an unexpected error. Don\'t worry, your data is safe.'}
                </p>

                {/* Error Details Preview */}
                <div className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-4 mb-6 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-neutral-300">Error Details</span>
                    <button
                      onClick={this.copyErrorDetails}
                      className="text-neutral-400 hover:text-neutral-200 transition-colors"
                      title="Copy error details"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <p className="text-sm text-red-400 font-mono break-all">
                    {error.message}
                  </p>
                  {errorCount > 1 && (
                    <p className="text-xs text-neutral-500 mt-2">
                      This error has occurred {errorCount} times
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.button
                    onClick={this.resetErrorBoundary}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-neutral-100 rounded-lg font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw size={18} />
                    Try Again
                  </motion.button>

                  {!isolate && (
                    <motion.a
                      href="/"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Home size={18} />
                      Go Home
                    </motion.a>
                  )}

                  {(showDetailsProp !== false) && (
                    <motion.button
                      onClick={this.toggleDetails}
                      className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-600 hover:border-neutral-500 text-neutral-300 rounded-lg font-medium transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Bug size={18} />
                      {showDetails ? 'Hide' : 'Show'} Details
                    </motion.button>
                  )}
                </div>

                {/* Detailed Error Info */}
                <AnimatePresence>
                  {showDetails && errorDetails && (
                    <motion.div
                      className="mt-6 text-left"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 space-y-4 max-h-96 overflow-y-auto">
                        {/* Timestamp */}
                        <div>
                          <h3 className="text-xs font-medium text-neutral-500 uppercase mb-1">Timestamp</h3>
                          <p className="text-sm text-neutral-300 font-mono">
                            {errorDetails.timestamp.toISOString()}
                          </p>
                        </div>

                        {/* URL */}
                        <div>
                          <h3 className="text-xs font-medium text-neutral-500 uppercase mb-1">URL</h3>
                          <p className="text-sm text-neutral-300 font-mono break-all">
                            {errorDetails.url}
                          </p>
                        </div>

                        {/* Stack Trace */}
                        {error.stack && (
                          <div>
                            <h3 className="text-xs font-medium text-neutral-500 uppercase mb-1">Stack Trace</h3>
                            <pre className="text-xs text-neutral-400 font-mono whitespace-pre-wrap break-all">
                              {error.stack}
                            </pre>
                          </div>
                        )}

                        {/* Component Stack */}
                        {errorDetails.componentStack && (
                          <div>
                            <h3 className="text-xs font-medium text-neutral-500 uppercase mb-1">Component Stack</h3>
                            <pre className="text-xs text-neutral-400 font-mono whitespace-pre-wrap">
                              {errorDetails.componentStack}
                            </pre>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Development Mode Notice */}
              {process.env.NODE_ENV === 'development' && (
                <motion.p
                  className="text-center text-sm text-neutral-500 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Check the browser console for more details
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      );
    }

    return <>{children}</>;
  }
}

// Async Error Boundary for handling promise rejections
export const AsyncErrorBoundary: React.FC<{
  children: ReactNode;
  fallback?: ReactNode;
}> = ({ children, fallback }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      setHasError(true);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  if (hasError) {
    return <>{fallback || <div>An async error occurred</div>}</>;
  }

  return <>{children}</>;
};

// HOC for wrapping components with error boundary
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
};

export default ErrorBoundary;