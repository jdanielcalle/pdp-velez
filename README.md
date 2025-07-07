# PDP Vélez

🚀 Proyecto Frontend para la Página de Detalle de Producto (PDP) y vitrina de productos de Vélez, desarrollado con **React + TypeScript + Sass**, y autenticación mediante **Firebase (Google Sign-In)**.

---

## 📌 **Tecnologías principales**

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [Firebase Authentication](https://firebase.google.com/docs/auth) + [Firestore](https://firebase.google.com/docs/firestore)
- [@react-google-maps/api](https://react-google-maps-api-docs.netlify.app/)
- [Framer Motion](https://www.framer.com/motion/) (animaciones)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) + Jest (tests unitarios)

---

## 🛠 **Estructura del proyecto**

```bash
src/
├── assets/ # Íconos, imágenes, fuentes
├── components/ # Componentes reutilizables (Navbar, CartIcon, etc.)
├── context/ # Contextos globales (Auth, Cart)
├── hooks/ # Custom hooks
├── pages/ # Vistas principales (HomePage, ProductPage)
├── styles/ # Sass global, variables, mixins
├── utils/ # Helpers (formatters, utils de firebase)
├── firebase.ts # Configuración e inicialización de Firebase
├── App.tsx # Componente raíz
└── index.tsx # Punto de entrada de la app
```

---

## ⚙ **Funcionalidades principales**

- 🔑 Autenticación Google (solo Sign-In con Google)
- 🛒 Carrito persistente en `localStorage` + Firestore (para usuarios logueados)
- 🔍 Búsqueda de productos en vitrina (barra de búsqueda integrada en el navbar)
- 📌 Vitrina de productos (consumo de API pública)
- 📄 Página de Detalle de Producto (PDP)
- 🗺 Modal con mapa (Google Maps) para buscar tiendas Vélez cercanas
- 💬 Botón flotante de WhatsApp
- 📱 Responsive Design
- 🧪 Tests unitarios de componentes y lógica de contexto

## ⚙ **Funcionalidades a implementar**

- 📱 Dark Mode adaptativo
- 🧪 Tests unitarios de componentes y lógica de contexto

---

## 🚀 **Comandos de desarrollo**

```bash
# Instalar dependencias
npm install

# Correr en modo desarrollo
npm start

# Correr los tests
npm test

# Build de producción
npm run build
```

---

## 🌎 Despliegue

El proyecto está desplegado en Vercel:  
👉 https://pdp-velez-dkxj.vercel.app

---

## 🧪 Pruebas

Las pruebas se organizan junto a los componentes, contextos y hooks, por ejemplo:

```bash
src/components/Navbar/__tests__/Navbar.test.tsx
src/context/__tests__/CartContext.test.tsx
```

Se usan React Testing Library + Jest.

---

## ✉ Contacto

Desarrollado por: Jair Daniel Calle Sinitave  
👤 LinkedIn: [@jdanielcalle](linkedin.com/in/jair-daniel-calle-sinitave/)
