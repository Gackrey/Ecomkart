import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { AuthApiLogin, AuthApiSignUp } from '../api/AuthHandler'
export const AuthContext = createContext();
export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [isUserLogin, setLogin] = useState(false);
    useEffect(() => {
        const loginStatus = JSON.parse(localStorage?.getItem("AuthDetails"));
        loginStatus?.isUserLoggedIn && setLogin(true);
    }, []);

    async function loginUserWithCredentials(email, password) {
        try {
            const response = await AuthApiLogin(email, password);
            if (response.data.success) {
                setLogin(true);
                localStorage.setItem(
                    "AuthDetails",
                    JSON.stringify({ isUserLoggedIn: true, userID: response.data.id, userIcon: response.data.icon })
                );
                return { success: response.data.success }
            }
        } catch (error) {
            console.log("Sahi username password nahi pata kya?", error);
            return { success: false }
        }
    }

    async function signinUser(firstname, lastname, email, password, wishList, cartItems) {
        try {
            const response = await AuthApiSignUp(firstname, lastname, email, password, wishList, cartItems)
            if (response.data.success) {
                setLogin(true);
                localStorage.setItem(
                    "AuthDetails",
                    JSON.stringify({ isUserLoggedIn: true, userID: response.data.id, userIcon: response.data.icon })
                );
                navigate("/");
            }
        } catch (error) {
            console.log("Sahi username password nahi pata kya?", error);
        }
    }
    function LogOut() {
        setLogin(false);
        localStorage.removeItem("AuthDetails");
    }
    return (
        <AuthContext.Provider
            value={{
                isUserLogin,
                loginUserWithCredentials,
                signinUser,
                LogOut
            }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    return useContext(AuthContext)
}