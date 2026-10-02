import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../pages/Landingpage.css";
import { useAuth } from "../contexts/AuthContexts";

const Fetch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/product/getallproducts`)
      .then((response) => response.data.data.products)
      .then((products) => {
        setProducts(products);
        setLoading(false);
      })
      .catch((error) => {
        setError(error?.response?.data?.message || "Failed to fetch products");
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div
      style={{
        minHeight: "100vh",
        // backgroundColor: "#f5f5f5",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "36px",
          // color: "#222",
          marginBottom: "40px",
          fontWeight: "700",
        }}
      >Products</h1>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <div
          className="products-grid shop-products-grid"
        >
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-image">
                <img src={product.product_image} alt={product.title} />
              </div>
              <div className="product-info">
                <p>Product</p>
                <h3>{product.title}</h3>
                <div className="product-bottom">
                  <span>₦{Number(product.price).toFixed(2)}</span>
                  <button type="button" className="shop-add-button">Add to Cart</button>
                </div>
                {String(user?._id) === String(product.user?._id || product.user) && (
                  <button
                    type="button"
                    className="shop-update-link"
                    onClick={() => navigate(`/product/${product._id}/edit`)}
                  >
                    Update product
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Fetch;
