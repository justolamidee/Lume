import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import "./Landingpage.css";

const Landingpage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/product/getallproducts`)
      .then((response) => setProducts(response.data.data.products))
      .catch(() => setError("Unable to load products right now."))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <>
      <Hero />

      <section className="products-section">
        <div className="section-heading">
          <p>OUR COLLECTION</p>
          <h2>Featured Products</h2>
          <span>Discover pieces made for your everyday style.</span>
        </div>

        {loading && <p className="products-status">Loading products...</p>}
        {error && <p className="products-status">{error}</p>}
        {!loading && !error && (
          <div className="products-grid">
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
                    <button>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && !error && products.length === 0 && (
          <p className="products-status">No products have been added yet.</p>
        )}
        <div className="view-products-wrap">
          <Link to="/product" className="view-products-button">View all products</Link>
        </div>
      </section>

      <section className="promo-section">
        <div className="promo-content">
          <p>STYLE THAT SPEAKS</p>

          <h2>
            Elevate Your
            <br />
            Everyday Style
          </h2>

          <span>
            Discover timeless pieces carefully selected
            for your wardrobe.
          </span>

          <button>Explore Collection</button>
        </div>
      </section>

    </>
  );
};

export default Landingpage





