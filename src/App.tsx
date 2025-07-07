import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import CartButton from './components/CartButton/CartButton';
import ProductPage from './pages/ProductPage';
import ProductGallery from './components/ProductGallery/ProductGallery';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <ProductPage />
        <h2 style={{ padding: '1rem' }}>Productos relacionados</h2>
        <ProductGallery />
        <CartButton />
        <WhatsAppButton />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;