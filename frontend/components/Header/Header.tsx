"use client";
import { headerLinks } from "@/constants/header";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { FaShoppingCart, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { products } = useCart();
  return (
    <header className="w-full p-4 bg-white shadow-sm">
      <nav className="w-full flex justify-between items-center md:justify-around">
        {/* Logo y menú hamburguesa (mobile) */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={25} /> : <CiMenuBurger size={25} />}
          </button>

          <Link href="/" className="flex items-center gap-2">
            <Image
              width={40}
              height={20}
              src={"/shop-icon_34368.png"}
              alt="site logo"
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <span className="font-bold text-lg md:text-xl">
              Online <strong className="text-cyan-400">Shop</strong>
            </span>
          </Link>
        </div>

        {/* Iconos del lado derecho */}
        <div className="flex items-center gap-4 mx-4 md:gap-8">
          {/* Carrito */}
          <Link
            href="/cart"
            className="relative transition hover:text-cyan-400 cursor-pointer"
          >
            <FaShoppingCart size={25} />
            <span className="absolute -top-2 -right-2 bg-cyan-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {products.length === 0 ? 0 : products.length}
            </span>
          </Link>
        </div>

        {/* Menú desplegable móvil */}
        <div
          className={`
          fixed top-0 left-0 w-full h-screen bg-white z-50 
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:hidden
        `}
        >
          {/* Header del menú móvil */}
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                width={40}
                height={20}
                src={"/shop-icon_34368.png"}
                alt="site logo"
                className="w-8 h-8"
              />
              <span className="font-bold text-lg">
                Online <strong className="text-cyan-400">Shop</strong>
              </span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes size={25} />
            </button>
          </div>

          {/* Links del menú móvil */}
          <ul className="p-4 space-y-2">
            {headerLinks.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className="block font-bold text-lg p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.link}
                </Link>
              </li>
            ))}
          </ul>

          {/* Botón para cerrar menú */}
          <div className="p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-full bg-cyan-400 text-white font-bold py-3 rounded-lg hover:bg-cyan-500 transition-colors"
            >
              Cerrar Menú
            </button>
          </div>
        </div>

        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {headerLinks.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className="font-bold text-base lg:text-lg transition ease-in-out duration-75 p-2 hover:text-cyan-400 cursor-pointer relative group"
              >
                {item.link}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
