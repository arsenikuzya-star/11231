import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundOverlay from './components/BackgroundOverlay';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ServicesPage from './pages/ServicesPage';
import BrandsPage from './pages/BrandsPage';
import ContactsPage from './pages/ContactsPage';
import PrivacyPage from './pages/PrivacyPage';

export default function App() {
  return (
    <HashRouter>
      <div className="relative min-h-screen flex flex-col">
        <BackgroundOverlay />
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
}
