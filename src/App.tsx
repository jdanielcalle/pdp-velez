import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import CartButton from './components/CartButton/CartButton';
import ProductPage from './pages/ProductPage';
import ProductGallery from './components/ProductGallery/ProductGallery';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <ProductPage />
          <ProductGallery />
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <CartButton />
          <WhatsAppButton />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;