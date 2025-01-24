////////////////////////////////////////////////////orders/////////////////////////////////////////////////
request
{
  "idUser": "41d98a93-a4a3-4e48-9d17-2755ff2daa65",
  "paymentMethod": "CREDIT_CARD",
  "MenuItems": [
    {
      "idMenuItem": "85c1be15-3d7b-4706-8933-081598d0bdbd",
      "quantity": 2
    }
  ]
}

response
{
  "message": "Orden creada exitosamente",
  "order": {
    "id": "5acc9c02-8152-4bec-aa83-4c229805ead2",
    "status": "en preparación",
    "totalPrice": 24.8,
    "createdAt": "2025-01-22T03:00:00.000Z",
    "payment_status": "pendiente",
    "paymentMethod": "Efectivo",
    "user": {
      "id": "4eb26de2-5ae6-47c0-8ebe-c3a3ee9b43be"
    },
    "orderDetails": [
      {
        "id": "41cdf7de-6e85-43b1-a331-ad20fea99b77",
        "quantity": 2,
        "subtotal": 24.8
      }
    ]
  }
}


/////////////////////////////////////////////////////////product//////////////////////////////////////////////////
request
{
  "name": "Hagrid’s Classic Burger",
  "description": "Deliciosa pizza con tomate, albahaca y mozzarella",
  "price": 8.90,
  "stock": 15,
  "image_url": "https://i.postimg.cc/F7Szskf6/hamburguesa.jpg",
  "categoryId": "e3e3d4cb-ecc0-492b-b0c5-bc0c738e4ebd"
}

response
{
  "name": "Hagrid’s Classic Burger",
  "description": "Classic bun, Smoked Patty, Lettuce, Tomato, Cheddar, Mayonnaise.",
  "price": 8.9,
  "image_url": "https://i.postimg.cc/F7Szskf6/hamburguesa.jpg",
  "stock": 15,
  "id": "7317923c-d495-4e0e-a991-415430431a2f",
  "isActive": true
}





//////////////////////////////////////////////////category//////////////////////////////////////////////
request




response


{
  "name": "All",
  "icon": "LoaderPinwheel",
  "id": "afe31852-1cde-4585-8f91-3a87bbda50f9"
}

{
  "name": "Burgers",
  "icon": "Sandwich",
  "id": "63696cd0-46dc-46db-9c33-b95da0f29483"
}

{
  "name": "Drinks",
  "icon": "CupSoda",
  "id": "10bef6fe-43f2-49dc-ab5e-d5cf70695d91"
}

{
  "name": "Desserts",
  "icon": "IceCreamCone",
  "id": "e2fda007-41b0-450b-aae7-ec87df48fdff"
}

{
  "name": "Sides",
  "icon": "Salad",
  "id": "bdbbff4e-9f91-4fae-9999-839917bea225"
}





[
  {
    "name": "The Butterbeer Beast",
    "description": "Butterbeer-infused bun, Double Smoked Patty, Cheddar, Bacon, Special Sauce.",
    "price": 12.40,
    "stock": 10,
    "image_url": "https://i.postimg.cc/F7Szskf6/hamburguesa.jpg",
    "categoryId": "63696cd0-46dc-46db-9c33-b95da0f29483"
  },
  {
    "name": "Hagrid’s Classic Burger",
    "description": "Classic bun, Smoked Patty, Lettuce, Tomato, Cheddar, Mayonnaise.",
    "price": 8.90,
    "stock": 20,
    "image_url": "https://i.postimg.cc/F7Szskf6/hamburguesa.jpg",
    "categoryId": "63696cd0-46dc-46db-9c33-b95da0f29483"
  },
  {
    "name": "The Sirius Black BBQ",
    "description": "Brioche bun, Double Patty, Crispy Bacon, Caramelized Onions, BBQ Sauce.",
    "price": 13.20,
    "stock": 15,
    "image_url": "https://i.postimg.cc/F7Szskf6/hamburguesa.jpg",
    "categoryId": "63696cd0-46dc-46db-9c33-b95da0f29483"
  },
  {
    "name": "The Golden Snitch Cheese",
    "description": "Potato bun, Smoked Patty, Triple Cheddar, Golden Sauce.",
    "price": 11.00,
    "stock": 8,
    "image_url": "https://i.postimg.cc/F7Szskf6/hamburguesa.jpg",
    "categoryId": "63696cd0-46dc-46db-9c33-b95da0f29483"
  },
  {
    "name": "The Fiery Dragon Burger",
    "description": "Handcrafted bun, Patty, Jalapeños, Fiery Spicy Sauce.",
    "price": 11.80,
    "stock": 12,
    "image_url": "https://i.postimg.cc/F7Szskf6/hamburguesa.jpg",
    "categoryId": "63696cd0-46dc-46db-9c33-b95da0f29483"
  },
  {
    "name": "Pumpkin Juice",
    "description": "354ml Bottle of Sweet Pumpkin Juice.",
    "price": 1.40,
    "stock": 50,
    "image_url": "https://i.postimg.cc/HWPYP38v/coca.jpg",
    "categoryId": "10bef6fe-43f2-49dc-ab5e-d5cf70695d91"
  },
  {
    "name": "Polyjuice Potion",
    "description": "500ml Bottle, magically refreshing.",
    "price": 1.60,
    "stock": 40,
    "image_url": "https://i.postimg.cc/HWPYP38v/coca.jpg",
    "categoryId": "10bef6fe-43f2-49dc-ab5e-d5cf70695d91"
  },
  {
    "name": "Felix Felicis Elixir",
    "description": "600ml Bottle, a lucky drink.",
    "price": 1.20,
    "stock": 30,
    "image_url": "https://i.postimg.cc/HWPYP38v/coca.jpg",
    "categoryId": "10bef6fe-43f2-49dc-ab5e-d5cf70695d91"
  },
  {
    "name": "Treacle Tart with Ice Cream",
    "description": "Classic British dessert served warm with vanilla ice cream.",
    "price": 6.00,
    "stock": 10,
    "image_url": "https://i.postimg.cc/6yQsYkKf/chesscake.jpg",
    "categoryId": "e2fda007-41b0-450b-aae7-ec87df48fdff"
  },
  {
    "name": "Cauldron Cake",
    "description": "A delicious chocolate cake served with a caramel drizzle.",
    "price": 6.50,
    "stock": 5,
    "image_url": "https://i.postimg.cc/6yQsYkKf/chesscake.jpg",
    "categoryId": "e2fda007-41b0-450b-aae7-ec87df48fdff"
  },
  {
    "name": "Hogwarts Fries",
    "description": "Generous portion of crispy fries.",
    "price": 4.50,
    "stock": 25,
    "image_url": "https://i.postimg.cc/YqzHB3vw/papas.jpg",
    "categoryId": "bdbbff4e-9f91-4fae-9999-839917bea225"
  },
  {
    "name": "Dragon Wings",
    "description": "Crispy fried onion rings with a special dipping sauce.",
    "price": 4.80,
    "stock": 15,
    "image_url": "https://i.postimg.cc/YqzHB3vw/papas.jpg",
    "categoryId": "bdbbff4e-9f91-4fae-9999-839917bea225"
  },
  {
    "name": "Magical Caesar Salad",
    "description": "Fresh salad with chicken, croutons, and Caesar dressing.",
    "price": 5.00,
    "stock": 10,
    "image_url": "https://i.postimg.cc/YqzHB3vw/papas.jpg",
    "categoryId": "bdbbff4e-9f91-4fae-9999-839917bea225"
  },
  {
    "name": "Gryffindor Mozzarella Sticks",
    "description": "Breaded and fried mozzarella sticks, served with marinara sauce.",
    "price": 5.20,
    "stock": 18,
    "image_url": "https://i.postimg.cc/YqzHB3vw/papas.jpg",
    "categoryId": "bdbbff4e-9f91-4fae-9999-839917bea225"
  }
]