import React from "react";
import { FaArrowRight, FaShoppingBag, FaStar } from "react-icons/fa";
import { MdLocalShipping, MdSecurity } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] pt-10 md:min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 z-0" />

      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-full shadow-lg">
              <FaStar className="animate-pulse" />
              <span className="font-semibold">
                ⭐ 4.9/5 Rating from 2k+ Customers
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-900">Encuentra lo que </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                  Amas
                </span>
              </h1>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
                Ama lo que <span className="text-cyan-400">encuentras</span>
              </h2>
            </div>

            <p className="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed">
              Descubre productos cuidadosamente seleccionados que combinan
              calidad, estilo y funcionalidad. Tu satisfacción es nuestra
              prioridad número uno.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href={"/shop"} className="group bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
                Comprar Ahora
                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>

              <button className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-cyan-400 hover:text-cyan-500 transition-all duration-300">
                Ver Colección
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <MdLocalShipping className="text-cyan-500 text-2xl" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Envío Gratis</p>
                  <p className="text-sm text-gray-500">+$50 compra</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <MdSecurity className="text-cyan-500 text-2xl" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Pago Seguro</p>
                  <p className="text-sm text-gray-500">100% protegido</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <FaShoppingBag className="text-cyan-500 text-2xl" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">30 Días</p>
                  <p className="text-sm text-gray-500">Devoluciones</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <FaStar className="text-cyan-500 text-2xl" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Garantía</p>
                  <p className="text-sm text-gray-500">2 años</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-float">
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-2xl z-20 w-48 transform -rotate-6 hover:scale-105 transition-transform duration-300">
              <div className="relative h-32 rounded-xl mb-3 overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
                <Image
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"
                  alt="AirPods Max"
                  fill
                  className="object-cover"
                  sizes="(max-width: 192px) 100vw, 192px"
                />
              </div>
              <p className="font-bold text-gray-900 truncate">AirPods Max</p>
              <p className="text-cyan-500 font-bold text-lg">$549.99</p>
              <div className="flex text-yellow-400 mt-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-2xl z-20 w-48 transform rotate-6 hover:scale-105 transition-transform duration-300">
              <div className="relative h-32 rounded-xl mb-3 overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
                <Image
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"
                  alt="Smart Watch"
                  fill
                  className="object-cover"
                  sizes="(max-width: 192px) 100vw, 192px"
                />
              </div>
              <p className="font-bold text-gray-900 truncate">Watch Series 9</p>
              <p className="text-cyan-500 font-bold text-lg">$399.99</p>
              <div className="flex text-yellow-400 mt-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100 overflow-hidden">
              {/* Contenedor de la imagen principal */}
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
                  alt="Shopping Experience"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <p className="text-white font-bold text-xl md:text-2xl drop-shadow-lg">
                    Shopping Experience
                  </p>
                  <p className="text-white/90 text-sm md:text-base mt-2">
                    Descubre la mejor selección
                  </p>
                </div>
              </div>

              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-xl shadow-xl z-10 w-36 hover:scale-110 transition-transform duration-300">
                <div className="relative h-20 rounded-lg mb-2 overflow-hidden bg-gradient-to-br from-orange-100 to-red-100">
                  <Image
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80"
                    alt="Sneakers"
                    fill
                    className="object-cover"
                    sizes="(max-width: 144px) 100vw, 144px"
                  />
                </div>
                <p className="font-bold text-gray-900 text-sm">Nike Air Max</p>
                <p className="text-cyan-500 font-bold">$129.99</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}
