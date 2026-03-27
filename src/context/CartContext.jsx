import { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const CartContext = createContext();
const CartProvider = ({ children }) => {

  const [cartCount, setCartCount] = useState(0);

  // ✅ LOAD COUNT FROM BACKEND
  const fetchCartCount = async () => {
    try {
      const res = await API.get("cart/?user=testuser");

      const count = res.data.items.reduce((sum, item) => {
        return sum + item.quantity;
      }, 0);

      setCartCount(count);

    } catch (error) {
      console.error("Error loading cart count", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;