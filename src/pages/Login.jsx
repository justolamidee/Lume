import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";

const validationSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { login, loading } = useAuth();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values);
    } catch {
      // AuthContext displays the API error message.
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={styles.page}>
      <div style={styles.card}>
        <p style={styles.eyebrow}>Welcome back</p>
        <h1 style={styles.heading}>Log in to your account</h1>
        <p style={styles.subText}>
          Verify your email address before logging in.
        </p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form style={styles.form} noValidate>
              <label htmlFor="email" style={styles.label}>Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                style={styles.input}
              />
              <ErrorMessage name="email" component="p" style={styles.errorText} />

              <label htmlFor="password" style={styles.label}>Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                style={styles.input}
              />
              <ErrorMessage name="password" component="p" style={styles.errorText} />

              <button
                type="submit"
                style={styles.submitButton}
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? "Logging in..." : "Log in"}
              </button>
            </Form>
          )}
        </Formik>

        <p style={styles.footerText}>
          Do not have an account? <Link to="/signup" style={styles.link}>Sign up</Link>
        </p>
      </div>
    </section>
  );
};

const styles = {
  page: {
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 16px",
  },
  card: {
    width: "100%",
    maxWidth: "460px",
    padding: "32px",
    borderRadius: "18px",
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    border: "1px solid #eadfd4",
    boxShadow: "0 20px 46px rgba(35, 23, 8, 0.15)",
  },
  eyebrow: {
    margin: 0,
    color: "crimson",
    fontSize: "13px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  heading: {
    margin: "8px 0 0",
    color: "#1f1a17",
    fontSize: "30px",
  },
  subText: {
    margin: "10px 0 22px",
    color: "#5b5046",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    marginTop: "8px",
    color: "#2c2420",
    fontSize: "14px",
    fontWeight: 600,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #d8cbc0",
    borderRadius: "10px",
    padding: "12px 13px",
    fontSize: "15px",
    backgroundColor: "#fffdf9",
  },
  errorText: {
    minHeight: "18px",
    margin: "2px 0 0",
    color: "#c1361c",
    fontSize: "13px",
  },
  submitButton: {
    marginTop: "12px",
    border: "none",
    borderRadius: "12px",
    padding: "13px 16px",
    background: "crimson",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
  },
  footerText: {
    margin: "22px 0 0",
    color: "#5b5046",
    fontSize: "14px",
    textAlign: "center",
  },
  link: {
    color: "crimson",
    fontWeight: 700,
  },
};

export default Login;