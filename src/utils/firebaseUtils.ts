import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCmi5k9V6J8lHKMtGcC8l64jI4de0EH8os",
  authDomain: "pdp-velez.firebaseapp.com",
  databaseURL: "https://pdp-velez-default-rtdb.firebaseio.com",
  projectId: "pdp-velez",
  storageBucket: "pdp-velez.firebasestorage.app",
  messagingSenderId: "1093809949734",
  appId: "1:1093809949734:web:792a557ab91bf1d31d2ae7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    throw err;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error('Error al cerrar sesión:', err);
    throw err;
  }
};

export const saveCartToFirestore = async (userId: string, cart: any) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    await setDoc(cartRef, { cart });
  } catch (err) {
    console.error('Error al guardar carrito:', err);
    throw err;
  }
};

export const getCartFromFirestore = async (userId: string) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    const docSnap = await getDoc(cartRef);
    if (docSnap.exists()) {
      return docSnap.data().cart;
    } else {
      return [];
    }
  } catch (err) {
    console.error('Error al obtener carrito:', err);
    throw err;
  }
};
