"use client";

import { useCart } from "@/hooks/useCart";
import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaHeart,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";
import { MdPayment, MdArrowBack, MdLocalShipping } from "react-icons/md";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Cart() {
  const {
    products = [],
    removeProduct,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  const router = useRouter();
  const [shippingCost, setShippingCost] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  const subtotal = getTotalPrice();
  const totalItems = getTotalItems();

  useEffect(() => {
    if (selectedShipping === "standard") {
      setShippingCost(subtotal >= 50 ? 0 : 5.99);
    } else if (selectedShipping === "express") {
      setShippingCost(12.99);
    } else {
      setShippingCost(0);
    }
  }, [selectedShipping, subtotal]);

  // Calcular total
  const total = subtotal + shippingCost;
  const tax = subtotal * 0.08;

  // Manejar cambio de cantidad
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  // Si el carrito está vacío
  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 md:py-12 px-4 sm:px-6 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-md mx-auto bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8 text-center">
            <div className="text-6xl md:text-7xl mb-4 md:mb-6">🛒</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-6 md:mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/shop"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm"
              >
                <MdArrowBack />
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-bold hover:border-cyan-400 hover:text-cyan-500 transition-all flex items-center justify-center gap-2 text-sm mt-3 sm:mt-0"
              >
                <FaHeart />
                View Favorites
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-4 md:py-8 px-3 sm:px-4 md:px-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-100 rounded-lg">
              <FaShoppingCart className="text-cyan-600 text-xl md:text-2xl" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                Shopping Cart
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Review your items and proceed to checkout
              </p>
            </div>
            {/* Botón Clear Cart para móvil */}
            <button
              onClick={clearCart}
              className="sm:hidden text-red-500 hover:text-red-600 p-2"
              aria-label="Clear cart"
            >
              <FaTrash size={20} />
            </button>
          </div>
        </div>

        {/* Botón para mostrar resumen en móvil */}
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-30">
          <button
            onClick={() => setShowMobileSummary(true)}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3.5 rounded-xl font-bold shadow-lg flex items-center justify-between px-6"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <MdPayment size={18} />
              </div>
              <div className="text-left">
                <div className="text-sm">View Order Summary</div>
                <div className="text-lg font-bold">${total.toFixed(2)}</div>
              </div>
            </div>
            <FaChevronRight />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Columna izquierda - Productos del carrito */}
          <div className="lg:col-span-2">
            {/* Resumen del carrito - Header móvil */}
            <div className="flex justify-between items-center mb-4 lg:hidden">
              <h2 className="text-lg font-bold text-gray-900">
                Items ({totalItems})
              </h2>
              <button
                onClick={clearCart}
                className="hidden sm:flex items-center gap-1.5 text-red-500 hover:text-red-600 text-sm"
              >
                <FaTrash size={14} />
                Clear All
              </button>
            </div>

            {/* Lista de productos */}
            <div className="space-y-3 md:space-y-4">
              {products.map((item) => {
                const product = item.product;
                const price = product.discountPrice || product.price;
                const itemTotal = price * item.quantity;

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-cyan-300 transition-all"
                  >
                    <div className="p-3 md:p-4">
                      <div className="flex gap-3 md:gap-4">
                        {/* Imagen */}
                        <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Información del producto */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0 pr-2">
                              <h3 className="font-bold text-sm md:text-base lg:text-lg mb-1 hover:text-cyan-600 cursor-pointer line-clamp-1">
                                {product.name}
                              </h3>
                              <div className="flex items-center gap-1.5 mb-2">
                                <span className="text-xs font-medium text-cyan-600 bg-cyan-50 px-2 py-1 rounded">
                                  {product.brand}
                                </span>
                                <span className="text-xs text-gray-500 hidden sm:inline">
                                  {product.category}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeProduct(product.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                              aria-label="Remove item"
                            >
                              <FaTrash size={16} />
                            </button>
                          </div>

                          {/* Descripción - Solo desktop */}
                          <p className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-2 hidden md:block">
                            {product.description}
                          </p>

                          {/* Controles de cantidad y precio */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            {/* Contador de cantidad */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(product.id, item.quantity - 1)
                                }
                                className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center disabled:opacity-50"
                                disabled={item.quantity <= 1}
                              >
                                <FaMinus size={10} className="md:w-3 md:h-3" />
                              </button>
                              <span className="font-bold text-base md:text-lg w-6 md:w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(product.id, item.quantity + 1)
                                }
                                className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center disabled:opacity-50"
                                disabled={item.quantity >= product.stock}
                              >
                                <FaPlus size={10} className="md:w-3 md:h-3" />
                              </button>
                              <span className="text-xs text-gray-500 ml-1">
                                Max: {product.stock}
                              </span>
                            </div>

                            {/* Precio */}
                            <div className="text-right">
                              <div className="text-lg md:text-xl font-bold text-gray-900">
                                ${itemTotal.toFixed(2)}
                              </div>
                              <div className="text-xs md:text-sm text-gray-500">
                                ${price.toFixed(2)} each
                              </div>
                              {product.discountPrice && (
                                <div className="text-xs text-red-500 font-medium mt-0.5">
                                  Save $
                                  {(
                                    (product.price - product.discountPrice) *
                                    item.quantity
                                  ).toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Opciones de envío */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mt-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaTruck className="text-cyan-500" />
                <span className="hidden sm:inline">Shipping Options</span>
                <span className="sm:hidden">Shipping</span>
              </h2>
              <div className="space-y-3">
                {[
                  {
                    id: "standard",
                    name: "Standard Shipping",
                    price: subtotal >= 50 ? "FREE" : "$5.99",
                    time: "5-7 business days",
                    freeThreshold: subtotal >= 50,
                  },
                  {
                    id: "express",
                    name: "Express Shipping",
                    price: "$12.99",
                    time: "2-3 business days",
                  },
                  {
                    id: "pickup",
                    name: "Store Pickup",
                    price: "FREE",
                    time: "Ready in 1 hour",
                  },
                ].map((option) => (
                  <label
                    key={option.id}
                    className={`
                      flex items-center justify-between p-3 md:p-4 border-2 rounded-lg cursor-pointer transition-all
                      ${
                        selectedShipping === option.id
                          ? "border-cyan-500 bg-cyan-50"
                          : "border-gray-200 hover:border-gray-300"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={selectedShipping === option.id}
                        onChange={(e) => setSelectedShipping(e.target.value)}
                        className="w-4 h-4 md:w-5 md:h-5 text-cyan-500"
                      />
                      <div>
                        <div className="font-bold text-gray-900 text-sm md:text-base">
                          {option.name}
                        </div>
                        <div className="text-xs md:text-sm text-gray-600">
                          {option.time}
                        </div>
                        {option.freeThreshold && (
                          <div className="text-xs text-green-600 font-medium mt-1 hidden sm:block">
                            🎉 You qualify for free shipping!
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="font-bold text-gray-900 text-sm md:text-base">
                      {option.price}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Garantías y promociones */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 mt-6">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-cyan-200">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <FaShieldAlt className="text-cyan-600 text-xl md:text-2xl" />
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">
                    Safe & Secure
                  </h3>
                </div>
                <ul className="space-y-1.5 text-xs md:text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>256-bit SSL encryption</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Secure payment processing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Privacy guaranteed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>30-day return policy</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-amber-200">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <FaUndo className="text-amber-600 text-xl md:text-2xl" />
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">
                    Easy Returns
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-gray-700 mb-3">
                  Not happy with your purchase? Return it within 30 days for a
                  full refund.
                </p>
                <button className="text-xs md:text-sm text-amber-700 font-medium hover:text-amber-800 flex items-center gap-1">
                  Learn more
                  <FaChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Columna derecha - Resumen de compra (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
              {/* Resumen de compra */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                {/* Detalles de precio */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0
                        ? "FREE"
                        : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>

                  {subtotal < 50 && selectedShipping === "standard" && (
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-3 rounded-lg border border-cyan-200">
                      <div className="text-sm text-cyan-700">
                        Add ${(50 - subtotal).toFixed(2)} more for{" "}
                        <strong>FREE shipping!</strong>
                      </div>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        ${total.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500 text-right">
                        Including ${tax.toFixed(2)} in taxes
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botón de checkout */}
                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3.5 rounded-xl font-bold hover:opacity-90 transition-opacity mb-4 flex items-center justify-center gap-3 shadow-lg"
                >
                  <MdPayment size={20} />
                  Proceed to Checkout
                </button>

                {/* Código promocional */}
                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    Have a promo code?
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Continuar comprando */}
                <Link
                  href="/shop"
                  className="flex items-center justify-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium text-sm"
                >
                  <MdArrowBack />
                  Continue Shopping
                </Link>
              </div>

              {/* Resumen rápido de productos */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">Items in your cart</h3>
                <div className="space-y-3">
                  {products.slice(0, 3).map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden bg-white/10">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm line-clamp-1">
                          {item.product.name}
                        </div>
                        <div className="text-xs text-gray-300">
                          {item.quantity} × $
                          {(
                            item.product.discountPrice || item.product.price
                          ).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {products.length > 3 && (
                    <div className="text-center text-sm text-gray-300 pt-2 border-t border-white/20">
                      +{products.length - 3} more items
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer informativo */}
        <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="text-center bg-white p-3 md:p-4 rounded-lg shadow-sm">
            <div className="text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
              30
            </div>
            <div className="text-xs md:text-sm text-gray-600">Days Returns</div>
          </div>
          <div className="text-center bg-white p-3 md:p-4 rounded-lg shadow-sm">
            <div className="text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
              24/7
            </div>
            <div className="text-xs md:text-sm text-gray-600">Customer Support</div>
          </div>
          <div className="text-center bg-white p-3 md:p-4 rounded-lg shadow-sm">
            <div className="text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
              100%
            </div>
            <div className="text-xs md:text-sm text-gray-600">Secure Payment</div>
          </div>
          <div className="text-center bg-white p-3 md:p-4 rounded-lg shadow-sm">
            <div className="text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
              Free
            </div>
            <div className="text-xs md:text-sm text-gray-600">Shipping over $50</div>
          </div>
        </div>
      </div>

      {/* Modal para resumen en móvil */}
      {showMobileSummary && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileSummary(false)}
          />
          
          {/* Panel del resumen */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto">
            {/* Header del modal */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              <button
                onClick={() => setShowMobileSummary(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Contenido del resumen */}
            <div className="p-4">
              {/* Detalles de precio */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0
                      ? "FREE"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                {subtotal < 50 && selectedShipping === "standard" && (
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-3 rounded-lg border border-cyan-200">
                    <div className="text-sm text-cyan-700">
                      Add ${(50 - subtotal).toFixed(2)} more for{" "}
                      <strong>FREE shipping!</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    Total
                  </span>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${total.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500 text-right">
                      Including ${tax.toFixed(2)} in taxes
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de checkout */}
              <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-bold hover:opacity-90 transition-opacity mb-4 flex items-center justify-center gap-3 shadow-lg"
              >
                <MdPayment size={24} />
                Proceed to Checkout
              </button>

              {/* Código promocional */}
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-900 mb-2">
                  Have a promo code?
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Resumen rápido de productos */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-4 mb-6">
                <h3 className="font-bold text-lg mb-4">Items in your cart</h3>
                <div className="space-y-3">
                  {products.slice(0, 3).map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm line-clamp-1">
                          {item.product.name}
                        </div>
                        <div className="text-xs text-gray-300">
                          {item.quantity} × $
                          {(
                            item.product.discountPrice || item.product.price
                          ).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {products.length > 3 && (
                    <div className="text-center text-sm text-gray-300 pt-2 border-t border-white/20">
                      +{products.length - 3} more items
                    </div>
                  )}
                </div>
              </div>

              {/* Continuar comprando */}
              <Link
                href="/shop"
                className="flex items-center justify-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium py-3"
                onClick={() => setShowMobileSummary(false)}
              >
                <MdArrowBack />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}