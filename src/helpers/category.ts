import { ICategory } from "@/interfaces/Types";

const categoryToPreLoad: ICategory[] = [
  { id: "all", name: "All", icon: "LoaderPinwheel" },
  { id: "hamburguesas", name: "Burgers", icon: "Sandwich" },
  { id: "bebidas", name: "Drinks", icon: "CupSoda" },
  { id: "postres", name: "Desserts", icon: "IceCreamCone" },
  { id: "acompañamientos", name: "Sides", icon: "Salad" },
];

export default categoryToPreLoad;