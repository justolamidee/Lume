import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./pages/About"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Forgotpass from "./pages/Forgotpass";
import Landingpage from "./pages/Landingpage";
import Createproduct from "./pages/Createproduct";

const App = ()=>{
  return(

    <>
    
    
      <Router>

        <Routes>

          <Route path="/about" element={<About/>}/>

          <Route path="/login" element={<Login/>}/>

          <Route path="/signup" element={<Signup/>}/>

          <Route path="/product" element={<Product/>}/>

          <Route path="/profile" element={<Profile/>}/>

          <Route path="/forgotpass" element={<Forgotpass/>}/>

          <Route path="/" element={<Landingpage/>}/>

          <Route path="/createproduct" element={<Createproduct/>}/>







        </Routes>





      </Router>
    
    
    </>



  )
}

export default App;
