import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "../components/AppButton";
import { useAuth } from "../contexts/AuthContexts";

const Createproduct = () => {
  const navigate = useNavigate();
  const { token, createProduct } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files && files[0] ? files[0] : null,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
      return;
    }

    setSubmitting(true);
    try {
      await createProduct(formData);
      setFormData({ title: "", price: "", description: "", image: null });
      e.target.reset();
      navigate("/product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Create Product</h1>
        <p style={styles.subText}>Add product details below to publish a new item.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label htmlFor="title" style={styles.label}>
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Wireless Headphones"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label htmlFor="price" style={styles.label}>
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="500"
            min="500"
            max="50000"
            value={formData.price}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label htmlFor="description" style={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Write a short description of your product"
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
            rows={5}
            required
          />

          <label htmlFor="image" style={styles.label}>
            Product Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            style={styles.fileInput}
            required
          />

          <div style={styles.buttonWrap}>
            <AppButton
              type="submit"
              text={submitting ? "Creating..." : "Create Product"}
              bgColor="#c0372b"
              textColor="#ffffff"
              useBorder="8px"
              disabled={submitting}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 16px",
    background:
      "radial-gradient(circle at 20% 20%, #fff6e9 0%, #f7efe5 35%, #ece8ff 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: "620px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "28px",
    boxShadow: "0 16px 40px rgba(20, 20, 43, 0.12)",
    border: "1px solid #f0ebe4",
  },
  heading: {
    margin: 0,
    fontSize: "32px",
    color: "#1f1d36",
  },
  subText: {
    marginTop: "10px",
    marginBottom: "20px",
    color: "#5a5d71",
    fontSize: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    marginTop: "6px",
    color: "#2f3147",
    fontWeight: 600,
    fontSize: "14px",
  },
  input: {
    border: "1px solid #d8dce8",
    borderRadius: "10px",
    padding: "12px",
    fontSize: "15px",
    outline: "none",
  },
  textarea: {
    border: "1px solid #d8dce8",
    borderRadius: "10px",
    padding: "12px",
    fontSize: "15px",
    resize: "vertical",
    outline: "none",
  },
  fileInput: {
    marginBottom: "8px",
  },
  buttonWrap: {
    marginTop: "14px",
  },
};

export default Createproduct;