import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Process } from './pages/Process'
import { Timeline } from './pages/Timeline'
import { Resources } from './pages/Resources'
import { ErrorBoundary } from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 flex flex-col font-sans">
          {/* Main Navigation */}
          <header>
            <Navbar />
          </header>
          
          <main className="flex-grow" id="main-content" role="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/process" element={<Process />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/resources" element={<Resources />} />
            </Routes>
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
