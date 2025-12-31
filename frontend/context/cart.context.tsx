"use client";
import { Product } from "@/types/types";
import { createContext, useState, useContext } from "react";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  products: CartItem[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isInCart: (productId: number) => boolean;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<CartItem[]>([]);

  const addProduct = (product: Product) => {
    setProducts(prevProducts => {
      const existingItem = prevProducts.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevProducts.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevProducts, { product, quantity: 1 }];
      }
    });
  };

  const removeProduct = (productId: number) => {
    setProducts(prevProducts => 
      prevProducts.filter(item => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeProduct(productId);
      return;
    }
    
    setProducts(prevProducts =>
      prevProducts.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setProducts([]);
  };

  const getTotalPrice = () => {
    return products.reduce((total, item) => {
      const price = item.product.discountPrice || item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return products.reduce((total, item) => total + item.quantity, 0);
  };

  const isInCart = (productId: number) => {
    return products.some(item => item.product.id === productId);
  };

  return (
    <CartContext.Provider value={{
      products,
      addProduct,
      removeProduct,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
};