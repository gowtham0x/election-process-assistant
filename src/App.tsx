import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ErrorBoundary } from './components/ErrorBoundary';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Process = lazy(() => import('./pages/Process').then(m => ({ default: m.Process })));
const Timeline = lazy(() => import('./pages/Timeline').then(m => ({ default: m.Timeline })));
const Resources = lazy(() => import('./pages/Resources').then(m => ({ default: m.Resources })));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 flex flex-col font-sans">
          {/* Main Navigation */}
          <header>
            <Navbar />
          </header>
          
          <main id="main-content" className="flex-grow bg-white dark:bg-neutral-900 transition-colors pt-16">
            <Suspense fallback={<div className="flex items-center justify-center h-64 text-neutral-500">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/process" element={<Process />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/resources" element={<Resources />} />
              </Routes>
            </Suspense>
          </main>
          
          {/* Simple Footer with Accessibility roles */}
          <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 py-8 mt-auto" role="contentinfo">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
              <p>ElectionGuide &copy; {new Date().getFullYear()}. Educational resource only.</p>
              <p className="mt-2 text-xs">This is a demonstration app and not affiliated with any government entity.</p>
            </div>
          </footer>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App
