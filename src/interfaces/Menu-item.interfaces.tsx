export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string | null;
  stock: number;
  isActive: boolean;
  category: ICategory | null;
  type: "menuItem" | "combo";
}

export interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export interface CategorySelectorProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  products: Product[];
}

export interface ProductListProps {
  products: Product[];
  search: string;
  selectedCategory: string;
  addToCart: (product: Product, type: "menuItem" | "combo") => void;
  loading: boolean;
  error?: string | null;
}

export interface ProductCardProps {
  product: Product;
  addToCart: (product: Product, type: "menuItem" | "combo") => void;
  type: "menuItem" | "combo";
}

export interface ICartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: "menuItem" | "combo";
}

export type IProduct = Product;

export interface ICategory {
  id: string;
  name: string;
  icon: string;
}

///// ORDERS /////

export interface IOrder {
  idUser: string;
  paymentMethod: "Cash" | "PayPal";
  MenuItems: (
    | { idMenuItem: string; quantity: number }
    | { idCombo: string; quantity: number }
  )[];
  comment: string;
}

export interface UserDataFormProps {
  name: string;
  email: string;
}

export interface CommentsFormProps {
  comments: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface PaymentMethodFormProps {
  paymentMethod: "Cash" | "PayPal";
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface OrderSummaryProps {
  total: number;
}

/// HOOKS ////
export interface IUserHook {
  id: string;
  name: string;
  email: string;
}