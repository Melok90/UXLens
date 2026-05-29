import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const HomePage = lazy(() => import('./pages/HomePage'));
const SystemsPage = lazy(() => import('./pages/SystemsPage'));

export type ComponentState = 'default' | 'hover' | 'focus' | 'disabled' | 'error' | 'open' | 'alert' | 'transactional' | 'acknowledgment' | 'loading';
export type ComponentVariant = 'default' | 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'icon' | 'alert' | 'transactional' | 'acknowledgment';
export type ComponentType = 'button' | 'input' | 'switch' | 'select' | 'datepicker' | 'modal' | 'radio' | 'tag';

function LoadingPlaceholder() {
  return (
    <div className="flex-1 w-full flex items-center justify-center p-12">
      <div className="w-8 h-8 rounded-full border-4 border-neutral-200 border-t-accent-blue animate-spin"></div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-10 py-12 flex flex-col gap-12">
          <Suspense fallback={<LoadingPlaceholder />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/systems" element={<SystemsPage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

