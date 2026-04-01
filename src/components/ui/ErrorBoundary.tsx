import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

// ===== Error Boundary =====
// Catches React component errors and displays a fallback UI

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 *
 * Wraps the app or sections to catch runtime errors in child components.
 * Prevents complete app crashes by showing a fallback UI.
 *
 * Usage:
 * <ErrorBoundary>
 *   <Dashboard />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Update state when an error is thrown in child component
   */
  static getDerivedStateFromError(_error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  /**
   * Capture error details and log to console/error tracking service
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);

    // Update state with error details
    this.setState({
      error,
      errorInfo,
    });

    // TODO: Send error to external logging service (Sentry, LogRocket, etc.)
    // logErrorToService(error, errorInfo);
  }

  /**
   * Reset error state to try rendering again
   */
  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
          <div className="w-full max-w-md">
            {/* Error icon */}
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-red-100 dark:bg-red-500/20">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
            </div>

            {/* Error message */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We encountered an unexpected error. Please try refreshing the page or
                contact support if the problem persists.
              </p>
            </div>

            {/* Error details (development only) */}
            {import.meta.env.DEV && this.state.error && (
              <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-auto max-h-48">
                <p className="text-xs font-mono text-red-600 dark:text-red-400 mb-2">
                  {this.state.error.message}
                </p>
                <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap break-words">
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>

              <button
                onClick={() => (window.location.href = '/')}
                className="flex-1 px-4 py-2.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                Go Home
              </button>
            </div>

            {/* Support info */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Need help?{' '}
                <a
                  href="mailto:support@example.com"
                  className="text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
