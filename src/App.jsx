import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
<<<<<<< HEAD
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Forgotpass from "./pages/Forgotpass";
import Landingpage from "./pages/Landingpage";
import Createproduct from "./pages/Createproduct";
=======
import Nav from "./components/Nav";
import Landingpage from "./pages/Landingpage";
>>>>>>> 646749fc80d6fa389d305036dbeaa8078f49c9e1

const App = () => {
  return (
    <>
      <Router>
      
        <Routes>
          <Route path="/" element={<Landingpage/>}/>
          <Route path="/about" element={<About />} />

<<<<<<< HEAD
          <Route path="/about" element={<About/>}/>

          <Route path="/login" element={<Login/>}/>

          <Route path="/signup" element={<Signup/>}/>

          <Route path="/product" element={<Product/>}/>

          <Route path="/profile" element={<Profile/>}/>

          <Route path="/forgotpass" element={<Forgotpass/>}/>

          <Route path="/" element={<Landingpage/>}/>

          <Route path="/createproduct" element={<Createproduct/>}/>






=======
          <Route path="/login" element={<Login />} />
>>>>>>> 646749fc80d6fa389d305036dbeaa8078f49c9e1

          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
