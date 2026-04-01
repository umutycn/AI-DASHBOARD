import { createContext, useContext, useState, useCallback, type ElementType, type ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

// ===== Toast Types =====

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, duration?: number) => string;
  removeToast: (id: string) => void;
}

// ===== Context =====

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Toast Provider - wrap around entire app to enable toast notifications
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, type: ToastType = 'info', duration: number = 4000): string => {
      const id = Date.now().toString();
      const newToast: Toast = { id, type, message, duration };

      setToasts((prev) => [...prev, newToast]);

      // Auto-remove after duration
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

/**
 * Hook to use toast notifications
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// ===== Toast Container =====

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-3 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
}

// ===== Toast Item =====

interface ToastItemProps {
  toast: Toast;
  onRemove: () => void;
}

const toastConfig: Record<
  ToastType,
  { bg: string; icon: ElementType; text: string }
> = {
  success: {
    bg: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
    icon: CheckCircle,
    text: 'text-emerald-800 dark:text-emerald-400',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20',
    icon: AlertCircle,
    text: 'text-red-800 dark:text-red-400',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20',
    icon: AlertCircle,
    text: 'text-amber-800 dark:text-amber-400',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20',
    icon: Info,
    text: 'text-blue-800 dark:text-blue-400',
  },
};

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const config = toastConfig[toast.type];
  const Icon = config.icon;

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-lg border ${config.bg} ${config.text} shadow-lg pointer-events-auto animate-slide-up`}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        <Icon className="w-5 h-5" />
      </div>

      {/* Message */}
      <div className="flex-1 text-sm font-medium">{toast.message}</div>

      {/* Close button */}
      <button
        onClick={onRemove}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
