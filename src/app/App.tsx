import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../features/home/Home';
import Loader from '../features/loader/Loader';

function App() {
  // Check if we are on the repo-name path (GitHub Pages default or explicit use)
  const isRepoPath = window.location.pathname.startsWith('/afonso-benedito');
  // If so, use that as base. Otherwise (root on custom domain), use '/'
  const basename = isRepoPath ? '/afonso-benedito/' : '/';

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loader" element={<Loader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
