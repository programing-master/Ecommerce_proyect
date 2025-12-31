"use client"

import {  CartContext } from "@/context/cart.context";
import { useContext } from "react";

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("Where is the context?");
  return context;
};
