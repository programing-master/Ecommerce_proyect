"use client";

import ProductCard from "@/components/ProductCard";
import { products } from "@/constants/products";
import React, { useState, useMemo, useEffect } from "react";
import { 
  FaSearch, 
  FaFilter, 
  FaTimes, 
  FaStar, 
  FaTag, 
  FaFire, 
  FaSortAmountDown, 
  FaSortAmountUp,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { 
  MdCategory, 
  MdPriceCheck, 
  MdLocalShipping,
  MdClearAll 
} from "react-icons/md";

// Tipos para los filtros
type SortOption = "price-asc" | "price-desc" | "rating-desc" | "newest" | "name-asc";
type PriceRange = { min: number; max: number };
type CategoryFilter = string;

export default function StorePage() {
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 2000 });
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Extraer todas las categorías únicas
  const allCategories = useMemo(() => {
    const categories = new Set(products.map(p => p.category));
    return Array.from(categories);
  }, []);

  // Extraer todas las marcas únicas
  const allBrands = useMemo(() => {
    const brands = new Set(products.map(p => p.brand));
    return Array.from(brands);
  }, []);

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filtro por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Filtro por categorías
    if (selectedCategories.size > 0) {
      result = result.filter(product =>
        selectedCategories.has(product.category)
      );
    }

    // Filtro por rango de precio
    result = result.filter(product => {
      const price = product.discountPrice || product.price;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Filtro por rating mínimo
    if (minRating > 0) {
      result = result.filter(product => product.rating >= minRating);
    }

    // Filtro por stock
    if (inStockOnly) {
      result = result.filter(product => product.stock > 0);
    }

    // Filtro por oferta
    if (onSaleOnly) {
      result = result.filter(product => product.discountPrice !== null);
    }

    // Filtro por featured
    if (featuredOnly) {
      result = result.filter(product => product.isFeatured);
    }

    // Ordenar
    result.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return (a.discountPrice || a.price) - (b.discountPrice || b.price);
        case "price-desc":
          return (b.discountPrice || b.price) - (a.discountPrice || a.price);
        case "rating-desc":
          return b.rating - a.rating;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "newest":
          return b.id - a.id; 
        default:
          return 0;
      }
    });

    return result;
  }, [searchTerm, selectedCategories, priceRange, minRating, sortBy, inStockOnly, onSaleOnly, featuredOnly]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategories(new Set());
    setPriceRange({ min: 0, max: 2000 });
    setMinRating(0);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setFeaturedOnly(false);
    setSortBy("newest");
  };

  const toggleCategory = (category: string) => {
    const newCategories = new Set(selectedCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setSelectedCategories(newCategories);
  };

  const stats = useMemo(() => {
    const totalProducts = products.length;
    const filteredCount = filteredProducts.length;
    const averagePrice = products.reduce((sum, p) => sum + (p.discountPrice || p.price), 0) / totalProducts;
    const totalInStock = products.filter(p => p.stock > 0).length;
    const onSaleCount = products.filter(p => p.discountPrice !== null).length;

    return {
      totalProducts,
      filteredCount,
      averagePrice: averagePrice.toFixed(2),
      totalInStock,
      onSaleCount,
    };
  }, [filteredProducts]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
     
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-lg text-center text-white/90 mb-8 max-w-2xl mx-auto">
            Find exactly what you need from our curated collection
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, brands, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent pl-14"
              />
              <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                >
                  <FaTimes size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`
            lg:w-1/4 
            ${showFilters ? 'block' : 'hidden lg:block'}
            bg-white rounded-2xl shadow-lg p-6 border border-gray-200
            h-fit lg:sticky lg:top-8
          `}>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <FaFilter className="text-cyan-500" />
                <h2 className="text-xl font-bold">Filters</h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-sm text-cyan-600 hover:text-cyan-700"
                >
                  <MdClearAll />
                  Clear All
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MdCategory className="text-cyan-500" />
                Categories
              </h3>
              <div className="space-y-2">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 rounded-xl
                      transition-all duration-200
                      ${selectedCategories.has(category)
                        ? 'bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 text-cyan-700'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }
                    `}
                  >
                    <span>{category}</span>
                    <span className="text-sm text-gray-500">
                      ({products.filter(p => p.category === category).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MdPriceCheck className="text-cyan-500" />
                Price Range: ${priceRange.min} - ${priceRange.max}
              </h3>
              <input
                type="range"
                min="0"
                max="2000"
                step="10"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>$0</span>
                <span>${priceRange.max}</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <FaStar className="text-amber-500" />
                Minimum Rating: {minRating}+
              </h3>
              <div className="flex gap-2">
                {[0, 3, 4, 4.5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`
                      flex-1 py-2 rounded-lg text-center font-medium
                      transition-colors
                      ${minRating === rating
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    {rating === 0 ? 'Any' : `${rating}+`}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-5 h-5 rounded text-cyan-500"
                />
                <span className="font-medium">In Stock Only</span>
                <span className="ml-auto text-sm text-gray-500">
                  ({stats.totalInStock})
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onSaleOnly}
                  onChange={(e) => setOnSaleOnly(e.target.checked)}
                  className="w-5 h-5 rounded text-cyan-500"
                />
                <span className="font-medium">On Sale</span>
                <span className="ml-auto text-sm text-gray-500">
                  ({stats.onSaleCount})
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featuredOnly}
                  onChange={(e) => setFeaturedOnly(e.target.checked)}
                  className="w-5 h-5 rounded text-cyan-500"
                />
                <span className="font-medium">Featured</span>
                <FaFire className="ml-auto text-orange-500" />
              </label>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {filteredProducts.length}
                    </div>
                    <div className="text-sm text-gray-500">Products found</div>
                  </div>
                  <div className="hidden md:block h-8 w-px bg-gray-300"></div>
                  <div className="hidden md:block">
                    <div className="text-lg font-semibold text-gray-900">
                      ${stats.averagePrice}
                    </div>
                    <div className="text-sm text-gray-500">Avg. price</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Botón filtros móviles */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl"
                  >
                    <FaFilter />
                    Filters
                    {showFilters ? <FaChevronUp /> : <FaChevronDown />}
                  </button>

                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="appearance-none px-4 py-2 pr-10 bg-gray-100 hover:bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="newest">Newest First</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating-desc">Highest Rated</option>
                      <option value="name-asc">Name: A to Z</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <FaSortAmountDown />
                    </div>
                  </div>
                </div>
              </div>

              {/* Filtros activos */}
              <div className="flex flex-wrap gap-2 mt-4">
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm">
                    Search: "{searchTerm}"
                    <button onClick={() => setSearchTerm("")}>
                      <FaTimes size={12} />
                    </button>
                  </span>
                )}
                
                {Array.from(selectedCategories).map(category => (
                  <span key={category} className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {category}
                    <button onClick={() => toggleCategory(category)}>
                      <FaTimes size={12} />
                    </button>
                  </span>
                ))}
                
                {minRating > 0 && (
                  <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">
                    Rating: {minRating}+
                    <button onClick={() => setMinRating(0)}>
                      <FaTimes size={12} />
                    </button>
                  </span>
                )}
                
                {inStockOnly && (
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    In Stock Only
                    <button onClick={() => setInStockOnly(false)}>
                      <FaTimes size={12} />
                    </button>
                  </span>
                )}
                
                {onSaleOnly && (
                  <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                    On Sale
                    <button onClick={() => setOnSaleOnly(false)}>
                      <FaTimes size={12} />
                    </button>
                  </span>
                )}
              </div>
            </div>

            {/* Grid de productos */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-200">
                <div className="text-6xl mb-4">😕</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Try adjusting your filters or search term to find what you're looking for.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Paginación (opcional) */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 flex justify-center">
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg">
                    1
                  </button>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
                    2
                  </button>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
                    3
                  </button>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer de estadísticas */}
      <div className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{stats.totalProducts}</div>
              <div className="text-gray-400">Total Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{stats.totalInStock}</div>
              <div className="text-gray-400">In Stock</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{stats.onSaleCount}</div>
              <div className="text-gray-400">On Sale</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {allBrands.length}
              </div>
              <div className="text-gray-400">Brands</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}