import { ICategory } from "@/interfaces/Types";

const categoryToPreLoad: ICategory[] = [
  { id: "all", name: "All", icon: "LoaderPinwheel" },
  { id: "hamburguesas", name: "Hamburguesas", icon: "Sandwich" },
  { id: "bebidas", name: "Bebidas", icon: "CupSoda" },
  { id: "postres", name: "Postres", icon: "IceCreamCone" },
  { id: "acompañamientos", name: "Acompañamientos", icon: "Salad" },
];

export default categoryToPreLoad;