import { IProduct } from "../interfaces/Types";

const productsToPreLoad: IProduct[] = [
  // Category: Burgers
  {
    id: 1,
    name: 'The Butterbeer Beast',
    description: 'Butterbeer-infused bun, Double Smoked Patty, Cheddar, Bacon, Special Sauce.',
    price: 12.40, // $12.40
    image: 'https://i.postimg.cc/F7Szskf6/hamburguesa.jpg',
    category: 'burgers',
    stock: 10
  },
  {
    id: 2,
    name: 'Hagrid’s Classic Burger',
    description: 'Classic bun, Smoked Patty, Lettuce, Tomato, Cheddar, Mayonnaise.',
    price: 8.90, // $8.90
    image: 'https://i.postimg.cc/F7Szskf6/hamburguesa.jpg',
    category: 'burgers',
    stock: 20
  },
  {
    id: 3,
    name: 'The Sirius Black BBQ',
    description: 'Brioche bun, Double Patty, Crispy Bacon, Caramelized Onions, BBQ Sauce.',
    price: 13.20, // $13.20
    image: 'https://i.postimg.cc/F7Szskf6/hamburguesa.jpg',
    category: 'burgers',
    stock: 15
  },
  {
    id: 4,
    name: 'The Golden Snitch Cheese',
    description: 'Potato bun, Smoked Patty, Triple Cheddar, Golden Sauce.',
    price: 11.00, // $11.00
    image: 'https://i.postimg.cc/F7Szskf6/hamburguesa.jpg',
    category: 'burgers',
    stock: 8
  },
  {
    id: 5,
    name: 'The Fiery Dragon Burger',
    description: 'Handcrafted bun, Patty, Jalapeños, Fiery Spicy Sauce.',
    price: 11.80, // $11.80
    image: 'https://i.postimg.cc/F7Szskf6/hamburguesa.jpg',
    category: 'burgers',
    stock: 12
  },
  // Category: Drinks
  {
    id: 6,
    name: 'Pumpkin Juice',
    description: '354ml Bottle of Sweet Pumpkin Juice.',
    price: 1.40, // $1.40
    image: 'https://i.postimg.cc/HWPYP38v/coca.jpg',
    category: 'drinks',
    stock: 50
  },
  {
    id: 7,
    name: 'Polyjuice Potion',
    description: '500ml Bottle, magically refreshing.',
    price: 1.60, // $1.60
    image: 'https://i.postimg.cc/HWPYP38v/coca.jpg',
    category: 'drinks',
    stock: 40
  },
  {
    id: 8,
    name: 'Felix Felicis Elixir',
    description: '600ml Bottle, a lucky drink.',
    price: 1.20, // $1.20
    image: 'https://i.postimg.cc/HWPYP38v/coca.jpg',
    category: 'drinks',
    stock: 30
  },
  // Category: Desserts
  {
    id: 9,
    name: 'Treacle Tart with Ice Cream',
    description: 'Classic British dessert served warm with vanilla ice cream.',
    price: 6.00, // $6.00
    image: 'https://i.postimg.cc/6yQsYkKf/chesscake.jpg',
    category: 'desserts',
    stock: 10
  },
  {
    id: 10,
    name: 'Cauldron Cake',
    description: 'A delicious chocolate cake served with a caramel drizzle.',
    price: 6.50, // $6.50
    image: 'https://i.postimg.cc/6yQsYkKf/chesscake.jpg',
    category: 'desserts',
    stock: 5
  },
  // Category: Sides
  {
    id: 11,
    name: 'Hogwarts Fries',
    description: 'Generous portion of crispy fries.',
    price: 4.50, // $4.50
    image: 'https://i.postimg.cc/YqzHB3vw/papas.jpg',
    category: 'sides',
    stock: 25
  },
  {
    id: 12,
    name: 'Dragon Wings',
    description: 'Crispy fried onion rings with a special dipping sauce.',
    price: 4.80, // $4.80
    image: 'https://i.postimg.cc/YqzHB3vw/papas.jpg',
    category: 'sides',
    stock: 15
  },
  {
    id: 13,
    name: 'Magical Caesar Salad',
    description: 'Fresh salad with chicken, croutons, and Caesar dressing.',
    price: 5.00, // $5.00
    image: 'https://i.postimg.cc/YqzHB3vw/papas.jpg',
    category: 'sides',
    stock: 10
  },
  {
    id: 14,
    name: 'Gryffindor Mozzarella Sticks',
    description: 'Breaded and fried mozzarella sticks, served with marinara sauce.',
    price: 5.20, // $5.20
    image: 'https://i.postimg.cc/YqzHB3vw/papas.jpg',
    category: 'sides',
    stock: 18
  }
];

export default productsToPreLoad;