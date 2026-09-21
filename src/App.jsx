import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import { Footer, ScrollReset } from './components/bits';
import Home from './pages/Home';
import Work from './pages/Work';
import Project from './pages/Project';
import Studio from './pages/Studio';
import Notes from './pages/Notes';
import Contact from './pages/Contact';
import Enquiry from './pages/Enquiry';
import NotFound from './pages/NotFound';

/* Full-bleed slideshow routes carry a light header and no footer.
   Everything else shares the editorial white shell. */
function Immersive({ children }) {
  return (
    <>
      <Header light />
      {children}
    </>
  );
}

function Editorial({ children }) {
  return (
    <div className="shell">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

const wrap = (el) => <Editorial>{el}</Editorial>;

export default function App() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollReset pathname={pathname} />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Immersive><Work /></Immersive>} />
        <Route path="/work/:slug" element={wrap(<Project />)} />
        <Route path="/studio" element={wrap(<Studio />)} />
        <Route path="/notes" element={wrap(<Notes />)} />
        <Route path="/contact" element={wrap(<Contact />)} />
        <Route path="/contact/:slug" element={wrap(<Enquiry />)} />
        <Route path="*" element={wrap(<NotFound />)} />
      </Routes>
    </>
  );
}
