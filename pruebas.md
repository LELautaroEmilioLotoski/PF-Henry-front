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
  "id": "1eb9470a-8127-499c-acb2-4901b77342e9"
}
{
  "name": "Burgers",
  "icon": "Sandwich",
  "id": "e3e3d4cb-ecc0-492b-b0c5-bc0c738e4ebd"
}
{
  "name": "Drinks",
  "icon": "CupSoda",
  "id": "4c30efeb-f4d3-4a47-9a1a-a8b061699690"
}
{
  "name": "Desserts",
  "icon": "IceCreamCone",
  "id": "9ed93a38-40f9-4f6a-8649-d640dce0ea49"
}
{
  "name": "Sides",
  "icon": "Salad",
  "id": "ea92fd9f-61b4-4c24-8900-3fb4146680e0"
}

