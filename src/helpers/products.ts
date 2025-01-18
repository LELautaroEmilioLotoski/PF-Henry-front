import { IProduct } from "../interfaces/Types";

const productsToPreLoad: IProduct[] = [
  // Categoría: Hamburguesas
  {
    id: 1,
    name: 'Special Harry El Sucio Potter',
    description: 'Pan de Papa, Doble Carne Smasheada, Cuádruple Cheddar...',
    price: 12400,
    image: 'https://i.postimg.cc/F7Szskf6/hamburguesa.jpg',
    category: 'hamburguesas',
    stock: 10
  },
  {
    id: 2,
    name: 'Classic Burger',
    description: 'Pan Clásico, Carne Smasheada, Lechuga, Tomate, Cheddar, Mayonesa.',
    price: 8900,
    image: 'https://i.postimg.cc/F7Szskf6/hamburguesa.jpg',
    category: 'hamburguesas',
    stock: 20
  },
  {
    id: 3,
    name: 'BBQ Bacon Burger',
    description: 'Pan de Brioche, Doble Carne, Bacon Crujiente, Cebolla Caramelizada, Salsa BBQ.',
    price: 13200,
    image: 'https://i.postimg.cc/F7Szskf6/hamburguesa.jpg',
    category: 'hamburguesas',
    stock: 15
  },
  {
    id: 4,
    name: 'Cheese Lover Burger',
    description: 'Pan de Papa, Carne Smasheada, Triple Queso Cheddar.',
    price: 11000,
    image: 'https://i.postimg.cc/F7Szskf6/hamburguesa.jpg',
    category: 'hamburguesas',
    stock: 8
  },
  {
    id: 5,
    name: 'Spicy Jalapeño Burger',
    description: 'Pan Artesanal, Carne, Jalapeños, Salsa Picante Especial.',
    price: 11800,
    image: 'https://i.postimg.cc/F7Szskf6/hamburguesa.jpg',
    category: 'hamburguesas',
    stock: 12
  },
  // Categoría: Bebidas
  {
    id: 6,
    name: 'Pepsi',
    description: 'Lata 354CC',
    price: 1400,
    image: 'https://i.postimg.cc/HWPYP38v/coca.jpg',
    category: 'bebidas',
    stock: 50
  },
  {
    id: 7,
    name: 'Coca Cola',
    description: 'Botella 500ML',
    price: 1600,
    image: 'https://i.postimg.cc/HWPYP38v/coca.jpg',
    category: 'bebidas',
    stock: 40
  },
  {
    id: 8,
    name: 'Agua Mineral',
    description: 'Botella 600ML, Sin Gas.',
    price: 1200,
    image: 'https://i.postimg.cc/HWPYP38v/coca.jpg',
    category: 'bebidas',
    stock: 30
  },
  // Categoría: Postres
  {
    id: 9,
    name: 'Brownie con Helado',
    description: 'Brownie tibio servido con helado de vainilla.',
    price: 6000,
    image: 'https://i.postimg.cc/6yQsYkKf/chesscake.jpg',
    category: 'postres',
    stock: 10
  },
  {
    id: 10,
    name: 'Cheesecake de Frutilla',
    description: 'Clásico cheesecake con salsa de frutilla casera.',
    price: 6500,
    image: 'https://i.postimg.cc/6yQsYkKf/chesscake.jpg',
    category: 'postres',
    stock: 5
  },
  // Categoría: Acompañamientos
  {
    id: 11,
    name: 'Papas Fritas Clásicas',
    description: 'Porción generosa de papas fritas crujientes.',
    price: 4500,
    image: 'https://i.postimg.cc/YqzHB3vw/papas.jpg',
    category: 'acompañamientos',
    stock: 25
  },
  {
    id: 12,
    name: 'Aros de Cebolla',
    description: 'Aros de cebolla crujientes con salsa especial.',
    price: 4800,
    image: 'https://i.postimg.cc/YqzHB3vw/papas.jpg',
    category: 'acompañamientos',
    stock: 15
  },
  {
    id: 13,
    name: 'Ensalada César',
    description: 'Ensalada fresca con pollo, crutones y aderezo César.',
    price: 5000,
    image: 'https://i.postimg.cc/YqzHB3vw/papas.jpg',
    category: 'acompañamientos',
    stock: 10
  },
  {
    id: 14,
    name: 'Mozzarella Sticks',
    description: 'Palitos de mozzarella empanizados y fritos.',
    price: 5200,
    image: 'https://i.postimg.cc/YqzHB3vw/papas.jpg',
    category: 'acompañamientos',
    stock: 18
  }
];

export default productsToPreLoad;
