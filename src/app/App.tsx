import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('../features/home/Home'));
const Loader = lazy(() => import('../features/loader/Loader'));

function App() {
  // Check if we are on the repo-name path (GitHub Pages default or explicit use)
  const isRepoPath = window.location.pathname.startsWith('/afonso-benedito');
  // If so, use that as base. Otherwise (root on custom domain), use '/'
  const basename = isRepoPath ? '/afonso-benedito/' : '/';

  return (
    <BrowserRouter basename={basename}>
      <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loader" element={<Loader />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
