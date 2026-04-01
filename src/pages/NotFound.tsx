import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

// ===== 404 Not Found Page =====

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
      {/* Large icon */}
      <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 mb-8">
        <AlertTriangle className="w-12 h-12 text-amber-500" />
      </div>

      {/* Error code */}
      <h1 className="text-7xl sm:text-8xl font-extrabold gradient-text">
        404
      </h1>

      {/* Message */}
      <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-gray-200">
        Page Not Found
      </h2>
      <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md">
        The page you're looking for doesn't exist or has been moved. Let's get you
        back on track.
      </p>

      {/* Back to dashboard button */}
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/25"
      >
        <Home className="w-5 h-5" />
        Back to Dashboard
      </Link>
    </div>
  );
}
