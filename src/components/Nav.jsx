import React from "react";

import { useNavigate, Link } from "react-router-dom";

const Nav = () => {

    const navigate = useNavigate();

    const handleSignUp = ()=>{
        navigate("/signup")
    };

    const handleLogin = ()=>{
        navigate("/login")
    }
  return (
    <header style={style.header}>
      <nav style={{display: "flex", justifyContent: 'space-around', alignItems:'center', padding: '15px'}}>
        <div style={{display:"flex", gap:"4em", alignItems: 'center'}}>
          
          <Link to={"/"} style={{textDecoration:'none', color:"blue"}}>
              <h1>AugEcommerce</h1>
          </Link>
          

          <ul style={{display:'flex', gap:"2em"}}>
            <li style={{listStyle:"none"}}>
                <Link to={"/about"} style={{textDecoration:'none', color:'#222'}}>About</Link>
            </li>
            <li style={{listStyle:"none"}}>
                  <Link to={"/product"} style={{textDecoration:'none', color:'#222'}}>Product</Link>
            </li>
            <li style={{listStyle:"none"}}>
                  <Link to={"/create-product"} style={{textDecoration:'none', color:'#222'}}>Create product</Link>
            </li>
            <li style={{listStyle:"none"}}>Blog</li>
          </ul>
        </div>

        <div>
            <div></div>
            <button onClick={handleSignUp}>singup</button>
            <button onClick={handleLogin}>login</button>
        </div>
      </nav>
    </header>
  );
};


const style = {
    header: {
        backgroundColor: '#E8E8E8',
        boxShadow: '0px 2px 3px 3px grey'
    }
}

export default Nav;
