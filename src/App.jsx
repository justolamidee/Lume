import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Landingpage from "./pages/Landingpage";
import Product from "./pages/Product";
import Createproduct from "./pages/Createproduct";
import Profile from "./pages/Profile";
import UpdateProduct from "./pages/UpdateProduct";
import Fetch from "./Hooks/Fetch";
import "./App.css";

import List from "./Hooks/List";
import Greeting from "./components/Greeting";
import { AuthProvider } from "./contexts/AuthContexts";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Router>

       <AuthProvider>

         <div className={darkMode ? "app dark" : "app"}>

        <Nav
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />


        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/product" element={<Product />} />
          <Route path="/product/:id/edit" element={<UpdateProduct />} />

          <Route path="/createproduct" element={<Createproduct />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
        </div>

        <Footer/>


       </AuthProvider>

         {/* <List/> */}

          {/* <Greeting username="Taye" userAge={true}/> */}
      </Router>
    </>
  );
};

export default App;



