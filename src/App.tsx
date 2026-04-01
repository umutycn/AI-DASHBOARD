import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout';
import { ErrorBoundary } from './components/ui';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

// ===== Root App Component =====
// Sets up routing and the main layout shell.

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            {/* Dashboard — home page */}
            <Route path="/" element={<Dashboard />} />

            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
