import {createContext, useContext, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { AuthProvider } from "./contexts/AuthContext";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = ()=>{
    return useContext(AuthContext);
};

export const AuthProvider = ({children})=>{

    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL

    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch {
            return null;
        }
    });

    const signUp = async(data)=>{
        setLoading(true);
        try {
            await axios.post(`${apiUrl}/auth/signup`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            toast.success("Signup successful. Check your email to verify your account.");
            navigate("/login");
        } catch (error) {
            const message = error?.response?.data?.message || "Signup failed. Please try again.";
            toast.error(message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const login = async(data)=>{
        setLoading(true);

        try {
            const res = await axios.post(`${apiUrl}/auth/login`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const { token: loginToken, user: loggedInUser } = res.data.data;
            setToken(loginToken);
            setUser(loggedInUser);
            localStorage.setItem("token", loginToken);
            localStorage.setItem("user", JSON.stringify(loggedInUser));
            toast.success("Login successful");
            navigate("/");
        } catch (error) {
            const isUnverified = error?.response?.status === 403;
            const message = isUnverified
                ? "Please verify your email before logging in. Check your inbox for the verification link."
                : error?.response?.data?.message || "Login failed. Please try again.";
            toast.error(message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const verifyEmail = async(email, verificationToken)=>{
        try {
            return await axios.get(`${apiUrl}/auth/verify/${encodeURIComponent(email)}/${verificationToken}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            const message = error?.response?.data?.message || "Email verification failed. Please try again.";
            toast.error(message);
            throw error;
        }
    }

    const updateProfile = async (profileData) => {
        try {
            const res = await axios.patch(`${apiUrl}/users/profile`, profileData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const updatedUser = res.data.data.user;
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            toast.success("Profile updated successfully");
            return updatedUser;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Could not update your profile");
            throw error;
        }
    };

    const getProfile = async () => {
        const res = await axios.get(`${apiUrl}/users/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const currentUser = res.data.data.user;
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
        return currentUser;
    };

    const updateProfilePicture = async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append("profile_image", imageFile);

            const res = await axios.patch(`${apiUrl}/users/update-profile-picture`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedUser = res.data.data.user;
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            toast.success("Profile picture updated successfully");
            return updatedUser;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Could not update your profile picture");
            throw error;
        }
    };

    const createProduct = async (productData) => {
        try {
            const formData = new FormData();
            formData.append("title", productData.title);
            formData.append("price", productData.price);
            formData.append("description", productData.description);
            formData.append("product_image", productData.image);

            const res = await axios.post(`${apiUrl}/product/createproduct`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Product created successfully");
            return res.data.data.product;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Could not create product");
            throw error;
        }
    };

    const getProducts = async () => {
        const res = await axios.get(`${apiUrl}/product/getallproducts`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.data.products;
    };

    const getProduct = async (productId) => {
        const res = await axios.get(`${apiUrl}/product/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.data.product;
    };

    const updateProduct = async (productId, productData) => {
        try {
            const res = await axios.patch(`${apiUrl}/product/${productId}`, productData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Product updated successfully");
            return res.data.data.product;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Could not update product");
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        toast.success("You have been logged out");
    };



    const values = {
        loading,
        token,
        user,
        signUp,
        login,
        verifyEmail,
        updateProfile,
        getProfile,
        updateProfilePicture,
        createProduct,
        getProducts,
        getProduct,
        updateProduct,
        logout,
    };


    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    
    



}