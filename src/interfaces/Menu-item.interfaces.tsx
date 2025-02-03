export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string | null;
  stock: number;
  isActive: boolean;
  category: ICategory | null;
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
  addToCart: (product: Product) => void;
  loading: boolean;
  error?: string | null;
}

export interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export interface ICartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export type IProduct = Product;

export interface ICategory {
  id: string;
  name: string;
  icon: string;
}

/////ORDERS//////
export interface IOrder {
  idUser: string;
  paymentMethod: "Efectivo" | "Transferencia";
  MenuItems: { idMenuItem: string; quantity: number }[];
  comment: string;
}

export interface UserDataFormProps {
  name: string;
  email: string;
  address: string;
}

export interface PaymentMethodFormProps {
  paymentMethod: "Efectivo" | "Transferencia";
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface OrderSummaryProps {
  total: number;
}
