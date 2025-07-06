import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import CartButton from './components/CartButton/CartButton';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <ProductPage />
        <CartButton />
        <WhatsAppButton />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;