import React, { createContext, useState, useEffect } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '$';

    // Auth state: initialize from localStorage if available
    const [user, setUser] = useState(() => {
        try {
            const raw = localStorage.getItem('user');
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    });
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);

    useEffect(() => {
        if (user) localStorage.setItem('user', JSON.stringify(user));
        else localStorage.removeItem('user');
    }, [user]);

    useEffect(() => {
        if (token) localStorage.setItem('token', token);
        else localStorage.removeItem('token');
    }, [token]);

    const loginUser = (userObj, jwtToken) => {
        setUser(userObj);
        setToken(jwtToken);
    };

    const logoutUser = () => {
        setUser(null);
        setToken(null);
    };

    const value = {
        doctors,
        currencySymbol,
        auth: { user, token, loginUser, logoutUser }
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;