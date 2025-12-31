"use client";
import { Product } from "@/types/types";
import { FaStar, FaShoppingCart, FaHeart, FaTag } from "react-icons/fa";
import { MdLocalShipping, MdCheckCircle } from "react-icons/md";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
  onToggleFavorite?: (productId: number) => void;
}

export default function ProductCard({
  product,
  onToggleFavorite,
}: ProductCardProps) {
  const { addProduct, cartItems = [] } = useCart(); // Valor por defecto
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  
  const discountPercentage = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  useEffect(() => {
    if (cartItems && Array.isArray(cartItems)) {
      const inCart = cartItems.some(item => 
        item && item.product && item.product.id === product.id
      );
      setIsInCart(inCart);
    } else {
      setIsInCart(false);
    }
  }, [cartItems, product.id]);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(product.id);
  };

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    
    setIsAddingToCart(true);
    
    if (addProduct) {
      addProduct(product, 1);
    }
    
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-cyan-100 max-w-sm">
      {/* Badges superpuestos */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {discountPercentage > 0 && (
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
            <FaTag size={12} />
            <span>-{discountPercentage}%</span>
          </div>
        )}
        {product.isNew && (
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
            NEW
          </div>
        )}
        {product.isFeatured && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
            FEATURED
          </div>
        )}
        {isInCart && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
            IN CART
          </div>
        )}
      </div>

      {/* Botón de favoritos */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-red-50 hover:scale-110 transition-all duration-300"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <FaHeart
          size={18}
          className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"}
        />
      </button>

      {/* Imagen del producto */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Stock bajo warning */}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute bottom-4 left-0 right-0 mx-4 bg-amber-500/90 backdrop-blur-sm text-white text-sm font-medium py-1.5 px-3 rounded-lg text-center">
            ⚠️ Only {product.stock} left!
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm py-3 px-6 rounded-xl text-gray-800 font-bold">
              OUT OF STOCK
            </div>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6">
        {/* Categoría y brand */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-semibold text-cyan-600 uppercase tracking-wide">
            {product.category}
          </span>
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {product.brand}
          </span>
        </div>

        {/* Nombre del producto */}
        <h3 className="font-bold text-xl mb-2 line-clamp-1 group-hover:text-cyan-600 transition-colors cursor-pointer">
          {product.name}
        </h3>

        {/* Rating y reviews */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={14}
                  className={
                    i < Math.floor(product.rating)
                      ? "fill-amber-400"
                      : "fill-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-800 ml-1">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviews.toLocaleString()} reviews)
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center gap-3 mb-5">
          {product.discountPrice ? (
            <>
              <span className="text-2xl font-bold text-gray-900">
                ${product.discountPrice.toFixed(2)}
              </span>
              <span className="text-lg text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-1 rounded">
                Save ${(product.price - product.discountPrice).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="mb-6">
          <div className="text-sm font-semibold text-gray-700 mb-2">
            Key Features:
          </div>
          <div className="flex flex-wrap gap-2">
            {product.features.slice(0, 3).map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg"
              >
                <MdCheckCircle className="text-green-500" size={12} />
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAddingToCart || isInCart}
            className={`
              flex-1 ${isInCart 
                ? 'bg-gradient-to-r from-emerald-500 to-green-500' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-500'
              } 
              text-white font-bold py-3.5 rounded-xl
              hover:${isInCart ? 'from-emerald-600 to-green-600' : 'from-cyan-600 to-blue-600'} 
              transition-all duration-300
              flex items-center justify-center gap-3
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-md hover:shadow-lg
              ${isAddingToCart ? 'animate-pulse' : ''}
            `}
          >
            {isAddingToCart ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Adding...
              </>
            ) : isInCart ? (
              <>
                <FaShoppingCart />
                Already in Cart
              </>
            ) : product.stock > 0 ? (
              <>
                <FaShoppingCart />
                Add to Cart
              </>
            ) : (
              'Out of Stock'
            )}
          </button>

          <button className="p-3.5 border-2 border-gray-200 rounded-xl hover:border-cyan-400 hover:bg-cyan-50 transition-colors">
            <MdLocalShipping
              size={20}
              className="text-gray-600 hover:text-cyan-500"
            />
          </button>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {product.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}