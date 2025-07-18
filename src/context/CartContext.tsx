import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { saveCartToFirestore, getCartFromFirestore } from '../utils/firebaseUtils';
import { AuthContext } from './AuthContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useContext(AuthContext);

  // Cargar carrito: Firestore o localStorage
  useEffect(() => {
    if (user) {
      getCartFromFirestore(user.uid).then(firestoreCart => {
        if (firestoreCart) {
          setCartItems(firestoreCart);
        }
      });
    } else {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, [user]);

  // Guardar carrito
  useEffect(() => {
    if (user) {
      saveCartToFirestore(user.uid, cartItems);
    } else {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(p => p.id === item.id);
      if (existing) {
        return prev.map(p => 
          p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
