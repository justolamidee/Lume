import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, getProduct, updateProduct } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    getProduct(id)
      .then((currentProduct) => {
        setProduct(currentProduct);
        setFormData({
          title: currentProduct.title,
          price: currentProduct.price,
          description: currentProduct.description,
        });
      })
      .catch(() => navigate("/product"))
      .finally(() => setLoading(false));
  }, [id, navigate, token]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await updateProduct(id, formData);
      navigate("/product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <main style={styles.message}>Loading product...</main>;
  if (!product) return null;

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <button type="button" style={styles.backButton} onClick={() => navigate("/product")}>
          Back to market
        </button>
        <p style={styles.eyebrow}>Product management</p>
        <h1 style={styles.heading}>Update product</h1>
        <p style={styles.subText}>Edit your product details and save your changes.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label} htmlFor="title">Title</label>
          <input id="title" name="title" value={formData.title} onChange={handleChange} style={styles.input} required />

          <label style={styles.label} htmlFor="price">Price</label>
          <input id="price" name="price" type="number" min="500" max="50000" value={formData.price} onChange={handleChange} style={styles.input} required />

          <label style={styles.label} htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} style={styles.textarea} rows={6} required />

          <div style={styles.actions}>
            <button type="submit" style={styles.saveButton} disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </button>
            <button type="button" style={styles.cancelButton} onClick={() => navigate("/product")}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

const styles = {
  page: {
    minHeight: "70vh",
    padding: "48px 16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at 20% 20%, #fff6e9 0%, #f7efe5 35%, #ece8ff 100%)",
  },
  card: {
    width: "100%",
    maxWidth: "620px",
    padding: "28px",
    border: "1px solid #f0ebe4",
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    boxShadow: "0 16px 40px rgba(20, 20, 43, 0.12)",
  },
  backButton: {
    border: "none",
    background: "transparent",
    color: "#c0372b",
    cursor: "pointer",
    fontWeight: 700,
    padding: 0,
  },
  eyebrow: {
    margin: "24px 0 6px",
    color: "#c0372b",
    fontSize: "13px",
    fontWeight: 700,
    textTransform: "uppercase",
  },
  heading: { margin: 0, color: "#1f1d36", fontSize: "32px" },
  subText: { margin: "10px 0 20px", color: "#5a5d71", fontSize: "15px" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  label: { marginTop: "6px", color: "#2f3147", fontWeight: 600, fontSize: "14px" },
  input: { border: "1px solid #d8dce8", borderRadius: "10px", padding: "12px", fontSize: "15px" },
  textarea: { border: "1px solid #d8dce8", borderRadius: "10px", padding: "12px", fontSize: "15px", resize: "vertical" },
  actions: { display: "flex", gap: "10px", marginTop: "14px" },
  saveButton: { border: "none", borderRadius: "8px", padding: "12px 18px", background: "#c0372b", color: "white", fontWeight: 700, cursor: "pointer" },
  cancelButton: { border: "1px solid #c0372b", borderRadius: "8px", padding: "12px 18px", background: "white", color: "#c0372b", fontWeight: 700, cursor: "pointer" },
  message: { minHeight: "70vh", display: "grid", placeItems: "center" },
};

export default UpdateProduct;
