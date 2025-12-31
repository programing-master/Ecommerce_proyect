export const products = [
  {
    id: 1,
    name: "AirPods Max - Silver",
    slug: "airpods-max-silver",
    price: 549.99,
    discountPrice: 499.99,
    category: "Electronics",
    subcategory: "Headphones",
    brand: "Apple",
    description: "Audio de alta fidelidad con Cancelación Activa de Ruido, ecualización adaptativa y hasta 20 horas de autonomía. Diseño premium con diadema acolchada y almohadillas de malla.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 45,
    rating: 4.8,
    reviews: 1289,
    features: [
      "Cancelación activa de ruido",
      "Hasta 20 horas de autonomía",
      "Diseño premium en aluminio",
      "Sonido espacial con seguimiento dinámico de la cabeza"
    ],
    specifications: {
      color: "Silver",
      weight: "384.8g",
      connectivity: "Bluetooth 5.0",
      batteryLife: "20 horas"
    },
    isFeatured: true,
    isNew: false,
    tags: ["wireless", "premium", "noise-cancelling", "apple"]
  },
  {
    id: 2,
    name: "Apple Watch Series 9",
    slug: "apple-watch-series-9",
    price: 399.99,
    discountPrice: 349.99,
    category: "Electronics",
    subcategory: "Smart Watches",
    brand: "Apple",
    description: "Monitorización avanzada de salud, GPS incorporado, resistencia al agua y pantalla Retina siempre activa. Perfecto para el día a día y actividades deportivas.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1434493650001-5d43a6fea0a7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3fbe9e6f4d6d?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 32,
    rating: 4.7,
    reviews: 2341,
    features: [
      "Monitorización de frecuencia cardíaca",
      "GPS incorporado",
      "Resistente al agua 50m",
      "Pantalla Retina siempre activa"
    ],
    specifications: {
      color: "Midnight",
      size: "45mm",
      connectivity: "Bluetooth, Wi-Fi, Cellular",
      batteryLife: "18 horas"
    },
    isFeatured: true,
    isNew: true,
    tags: ["smartwatch", "fitness", "health", "apple"]
  },
  {
    id: 3,
    name: "Nike Air Max 270",
    slug: "nike-air-max-270",
    price: 129.99,
    discountPrice: 109.99,
    category: "Fashion",
    subcategory: "Sneakers",
    brand: "Nike",
    description: "Zapatillas deportivas con amortiguación Air Max visible en el talón para una comodidad inigualable durante todo el día. Diseño moderno y transpirable.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 78,
    rating: 4.6,
    reviews: 897,
    features: [
      "Amortiguación Air Max visible",
      "Parte superior transpirable",
      "Suela de goma duradera",
      "Diseño moderno y versátil"
    ],
    specifications: {
      color: "Black/White",
      sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
      material: "Mesh y sintético",
      weight: "320g"
    },
    isFeatured: true,
    isNew: false,
    tags: ["sneakers", "running", "sports", "nike"]
  },
  {
    id: 4,
    name: "MacBook Pro 14\" M3",
    slug: "macbook-pro-14-m3",
    price: 1899.99,
    discountPrice: 1749.99,
    category: "Electronics",
    subcategory: "Laptops",
    brand: "Apple",
    description: "Potente laptop profesional con chip M3, pantalla Liquid Retina XDR de 14 pulgadas, hasta 18 horas de batería y rendimiento excepcional para creativos y profesionales.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 15,
    rating: 4.9,
    reviews: 567,
    features: [
      "Chip Apple M3 Pro",
      "Pantalla Liquid Retina XDR",
      "Hasta 18 horas de batería",
      "16GB RAM, 512GB SSD"
    ],
    specifications: {
      color: "Space Gray",
      display: "14.2\" Liquid Retina XDR",
      processor: "Apple M3 Pro",
      memory: "16GB RAM, 512GB SSD"
    },
    isFeatured: true,
    isNew: true,
    tags: ["laptop", "professional", "apple", "creative"]
  },
  {
    id: 5,
    name: "Sony PlayStation 5",
    slug: "sony-playstation-5",
    price: 499.99,
    discountPrice: null,
    category: "Electronics",
    subcategory: "Gaming",
    brand: "Sony",
    description: "Consola de videojuegos de última generación con gráficos 4K a 120fps, almacenamiento SSD ultra rápido y retrocompatibilidad con juegos de PS4.",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 8,
    rating: 4.8,
    reviews: 3124,
    features: [
      "Gráficos 4K a 120fps",
      "SSD de 825GB ultra rápido",
      "Retrocompatibilidad con PS4",
      "Control DualSense con feedback háptico"
    ],
    specifications: {
      color: "White/Black",
      storage: "825GB SSD",
      resolution: "4K UHD",
      included: "Consola + 1 control DualSense"
    },
    isFeatured: true,
    isNew: false,
    tags: ["gaming", "console", "4k", "entertainment"]
  },
  {
    id: 6,
    name: "Leather Backpack Premium",
    slug: "leather-backpack-premium",
    price: 89.99,
    discountPrice: 69.99,
    category: "Fashion",
    subcategory: "Bags",
    brand: "Fossil",
    description: "Mochila de cuero genuino con múltiples compartimentos, diseño elegante y funcional para uso diario. Perfecta para trabajo, estudios o viajes.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559170892-3b034ca3d0d0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 56,
    rating: 4.5,
    reviews: 432,
    features: [
      "Cuero genuino de alta calidad",
      "Compartimento para laptop de 15\"",
      "Múltiples bolsillos organizadores",
      "Correas acolchadas para mayor comodidad"
    ],
    specifications: {
      color: "Brown",
      material: "Genuine Leather",
      capacity: "20L",
      laptopSleeve: "Up to 15\""
    },
    isFeatured: false,
    isNew: true,
    tags: ["backpack", "leather", "office", "travel"]
  },
  {
    id: 7,
    name: "iPhone 15 Pro",
    slug: "iphone-15-pro",
    price: 999.99,
    discountPrice: 899.99,
    category: "Electronics",
    subcategory: "Smartphones",
    brand: "Apple",
    description: "Smartphone flagship con cámara triple de 48MP, chip A17 Pro, diseño en titanio y Dynamic Island. Rendimiento premium para todo tipo de usuarios.",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1695048123168-3d4e38ae3351?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 23,
    rating: 4.9,
    reviews: 1897,
    features: [
      "Chip A17 Pro",
      "Cámara triple de 48MP",
      "Diseño en titanio",
      "Dynamic Island",
      "USB-C"
    ],
    specifications: {
      color: "Natural Titanium",
      storage: "128GB",
      display: "6.1\" Super Retina XDR",
      battery: "Up to 23 hours video playback"
    },
    isFeatured: true,
    isNew: true,
    tags: ["smartphone", "iphone", "camera", "premium"]
  },
  {
    id: 8,
    name: "Coffee Maker Premium",
    slug: "coffee-maker-premium",
    price: 149.99,
    discountPrice: 129.99,
    category: "Home",
    subcategory: "Kitchen",
    brand: "Breville",
    description: "Máquina de café espresso semiautomática con molinillo integrado, vaporizador de leche y sistema de preinfusión. Café de calidad de barista en casa.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 34,
    rating: 4.7,
    reviews: 654,
    features: [
      "Molinillo integrado de acero",
      "Vaporizador de leche profesional",
      "Sistema de preinfusión",
      "Temporizador de café"
    ],
    specifications: {
      color: "Stainless Steel",
      power: "1600W",
      capacity: "2L water tank",
      material: "Stainless steel and BPA-free plastic"
    },
    isFeatured: false,
    isNew: false,
    tags: ["coffee", "kitchen", "home", "appliance"]
  },
  {
    id: 9,
    name: "Running Shoes Ultra Boost",
    slug: "running-shoes-ultra-boost",
    price: 179.99,
    discountPrice: 149.99,
    category: "Sports",
    subcategory: "Running",
    brand: "Adidas",
    description: "Zapatillas de running con tecnología Boost para máxima amortiguación y retorno de energía. Ideal para corredores de larga distancia y entrenamientos intensos.",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 67,
    rating: 4.6,
    reviews: 987,
    features: [
      "Amortiguación Boost",
      "Upper Primeknit transpirable",
      "Suela Continental para mejor tracción",
      "Torsion System para estabilidad"
    ],
    specifications: {
      color: "White/Black",
      weight: "310g (size US 9)",
      drop: "10mm",
      bestFor: "Long distance running"
    },
    isFeatured: true,
    isNew: true,
    tags: ["running", "sports", "athletic", "adidas"]
  },
  {
    id: 10,
    name: "Smart TV 4K 55\"",
    slug: "smart-tv-4k-55",
    price: 699.99,
    discountPrice: 599.99,
    category: "Electronics",
    subcategory: "TV & Home Theater",
    brand: "Samsung",
    description: "Televisor 4K UHD con procesador Crystal 4K, sistema operativo Tizen, HDR10+ y compatibilidad con asistentes de voz. Experiencia cinematográfica en casa.",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 12,
    rating: 4.7,
    reviews: 1234,
    features: [
      "Resolución 4K UHD",
      "Procesador Crystal 4K",
      "HDR10+",
      "Sistema operativo Tizen",
      "Alexa y Google Assistant compatibles"
    ],
    specifications: {
      color: "Black",
      screenSize: "55 inches",
      resolution: "3840 x 2160",
      refreshRate: "60Hz"
    },
    isFeatured: true,
    isNew: false,
    tags: ["tv", "4k", "entertainment", "smart"]
  }
];