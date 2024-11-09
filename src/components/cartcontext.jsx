// CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItemCount, setCartItemCount] = useState(0);

    const updateCartItemCount = (newCount) => {
        setCartItemCount(newCount);
    };

    return (
        <CartContext.Provider value={{ cartItemCount, updateCartItemCount }}>
            {children}
        </CartContext.Provider>
    );
};
