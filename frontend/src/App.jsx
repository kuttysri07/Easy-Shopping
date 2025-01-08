import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./Components/Hero";
import Products from "./Components/Products";
import ProductView from "./Components/ProductView";
import Nav from "./Components/Nav";
import Login from "./Components/Login";
import { Footer } from "./Components/Footer";
import Cart from "./Components/Cart";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav />
              <Hero />
              <Products />
              <Footer />
            </>
          }
        />
        <Route
          path="/product/:id"
          element={
            <>
              <ProductView />
            </>
          }
        />

        <Route
          path="/signin"
          element={
            <>
              <Login />
            </>
          }
        />

        <Route
          path="/signup"
          element={
            <>
              <Login />
            </>
          }
        />

        <Route
          path="/cart"
          element={
            <>
              <Cart />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
