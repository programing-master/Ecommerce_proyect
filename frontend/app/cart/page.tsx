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
} from "react-icons/fa";
import { MdPayment, MdArrowBack } from "react-icons/md";
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

  // Calcular subtotal
  const subtotal = getTotalPrice();
  
  // Calcular total items
  const totalItems = getTotalItems();

  // Calcular shipping
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
  const tax = subtotal * 0.08; // 8% de impuestos

  // Manejar cambio de cantidad
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  // Si el carrito está vacío
  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <MdArrowBack />
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-bold hover:border-cyan-400 hover:text-cyan-500 transition-all flex items-center justify-center gap-2"
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-cyan-100 rounded-xl">
              <FaShoppingCart className="text-cyan-600 text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Shopping Cart
              </h1>
              <p className="text-gray-600">
                Review your items and proceed to checkout
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Productos del carrito */}
          <div className="lg:col-span-2">
            {/* Resumen del carrito */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Your Items ({totalItems} items)
                </h2>
                <button
                  onClick={clearCart}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium"
                >
                  <FaTrash />
                  Clear Cart
                </button>
              </div>

              {/* Lista de productos */}
              <div className="space-y-4">
                {products.map((item) => {
                  const product = item.product;
                  const price = product.discountPrice || product.price;
                  const itemTotal = price * item.quantity;

                  return (
                    <div
                      key={product.id}
                      className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-xl hover:border-cyan-300 hover:shadow-md transition-all group"
                    >
                      {/* Imagen */}
                      <div className="sm:w-32 h-32 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Información del producto */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-bold text-lg mb-1 hover:text-cyan-600 cursor-pointer">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-medium text-cyan-600 bg-cyan-50 px-2 py-1 rounded">
                                {product.brand}
                              </span>
                              <span className="text-xs text-gray-500">
                                {product.category}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeProduct(product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <FaTrash />
                          </button>
                        </div>

                        {/* Descripción */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Controles de cantidad y precio */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          {/* Contador de cantidad */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                handleQuantityChange(product.id, item.quantity - 1)
                              }
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >
                              <FaMinus size={12} />
                            </button>
                            <span className="font-bold text-lg w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(product.id, item.quantity + 1)
                              }
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center disabled:opacity-50"
                              disabled={item.quantity >= product.stock}
                            >
                              <FaPlus size={12} />
                            </button>
                            <span className="text-sm text-gray-500">
                              Max: {product.stock}
                            </span>
                          </div>

                          {/* Precio */}
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">
                              ${itemTotal.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">
                              ${price.toFixed(2)} each
                            </div>
                            {product.discountPrice && (
                              <div className="text-xs text-red-500 font-medium mt-1">
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
                  );
                })}
              </div>
            </div>

            {/* Opciones de envío */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                <FaTruck className="inline mr-2 text-cyan-500" />
                Shipping Options
              </h2>
              <div className="space-y-4">
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
                      flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all
                      ${
                        selectedShipping === option.id
                          ? "border-cyan-500 bg-cyan-50"
                          : "border-gray-200 hover:border-gray-300"
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={selectedShipping === option.id}
                        onChange={(e) => setSelectedShipping(e.target.value)}
                        className="w-5 h-5 text-cyan-500"
                      />
                      <div>
                        <div className="font-bold text-gray-900">
                          {option.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {option.time}
                        </div>
                        {option.freeThreshold && (
                          <div className="text-xs text-green-600 font-medium mt-1">
                            🎉 You qualify for free shipping!
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="font-bold text-gray-900">
                      {option.price}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Garantías y promociones */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200">
                <div className="flex items-center gap-3 mb-4">
                  <FaShieldAlt className="text-cyan-600 text-2xl" />
                  <h3 className="font-bold text-gray-900">Safe & Secure</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✅ 256-bit SSL encryption</li>
                  <li>✅ Secure payment processing</li>
                  <li>✅ Privacy guaranteed</li>
                  <li>✅ 30-day return policy</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                <div className="flex items-center gap-3 mb-4">
                  <FaUndo className="text-amber-600 text-2xl" />
                  <h3 className="font-bold text-gray-900">Easy Returns</h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Not happy with your purchase? Return it within 30 days for a
                  full refund.
                </p>
                <button className="text-sm text-amber-700 font-medium hover:text-amber-800">
                  Learn more about returns →
                </button>
              </div>
            </div>
          </div>

          {/* Columna derecha - Resumen de compra */}
          <div className="lg:col-span-1">
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
                      <div className="text-3xl font-bold text-gray-900">
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
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity mb-4 flex items-center justify-center gap-3 shadow-lg"
                >
                  <MdPayment size={24} />
                  Proceed to Checkout
                </button>

                {/* Métodos de pago */}
                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-3 text-center">
                    Secure payment with
                  </div>
                  <div className="flex justify-center gap-4">
                    {["💳", "🔵", "📱", "🅿️"].map((icon, idx) => (
                      <div key={idx} className="text-2xl">
                        {icon}
                      </div>
                    ))}
                  </div>
                </div>

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

                {/* Continuar comprando */}
                <Link
                  href="/store"
                  className="flex items-center justify-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium"
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
            </div>
          </div>
        </div>

        {/* Footer informativo */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">30</div>
            <div className="text-gray-600">Days Returns</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600">Customer Support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">100%</div>
            <div className="text-gray-600">Secure Payment</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">Free</div>
            <div className="text-gray-600">Shipping over $50</div>
          </div>
        </div>
      </div>
    </div>
  );
}