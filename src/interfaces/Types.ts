// AUTH

export interface ILoginProps {
  email: string
  password: string
}

export interface ILoginErrors {
  email?: string
  password?: string
}

export interface JwtPayload {
  roles: string[];
}

// USERS

export interface IUser {
  id: string
  email: string
  roles: string[]
  name?: string
  address?: string
  role?: string
  image_url?: string
  created_atts?: string
}

export interface IRegisterProps {
  id: string
  name: string
  email: string
  password: string
  ConfirmPassword: string
  address: string
  image_url: string
  role: string
}

export interface IRegisterErrors {
  name?: string
  email?: string
  password?: string
  ConfirmPassword?: string
  address?: string
  image_url?: string
}

// PRODUCTS

export interface ICategory {
  id: string
  name: string
  icon: string
}

export interface IBaseProduct {
  id: string
  name: string
  description: string
  price: string | number
  image_url: string | null
  stock: number
  isActive: boolean
  category: ICategory | string
  createdAt?: string
  updatedAt?: string
}

export interface IMenuItem extends IBaseProduct {
  type: "menuItem"
}

export interface ICombo extends IBaseProduct {
  type: "combo"
  menuItems: IMenuItem[]
  stockCombos: number
}

export type IProduct = IMenuItem | ICombo

export interface ICartItem extends IBaseProduct {
  quantity: number
  type: "menuItem" | "combo"
}

export interface IProductCardProps {
  product: IProduct
  addToCart: (product: IProduct, type: "menuItem" | "combo") => void
  type: "menuItem" | "combo"
}

// ORDERS

export interface IOrder {
  idUser: string
  paymentMethod: "Cash" | "PayPal"
  MenuItems: ({ idMenuItem: string; quantity: number } | { idCombo: string; quantity: number })[]
  comment: string
}

export interface IOrderDetail {
  id: string
  quantity: number
  subtotal: string
  menuItem?: IMenuItem
  combo?: ICombo
}

export interface IOrderResponse {
  id: string
  status: string
  totalPrice: string
  createdAt: string
  payment_status: string
  paymentMethod: "Cash" | "PayPal"
  comment: string
  isActive: boolean
  orderDetails: IOrderDetail[]
}

export interface IOrdersResponse {
  data: IOrderResponse[]
  message?: string
}

export interface OrderSummaryProps {
  total: number
}

// EMPLOYEE

export interface UserDataFormProps {
  name: string
  email: string
}

export interface CommentsFormProps {
  comments: string
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export interface PaymentMethodFormProps {
  paymentMethod: "Cash" | "PayPal"
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// PRODUCT LISTING

export interface SearchBarProps {
  search: string
  setSearch: (value: string) => void
}

export interface CategorySelectorProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  products: IProduct[]
}

export interface ProductListProps {
  products: IProduct[]
  search: string
  selectedCategory: string
  addToCart: (product: IProduct, type: "menuItem" | "combo") => void
  loading: boolean
  error?: string | null
}

export interface ProductCardProps {
  product: IProduct
  addToCart: (product: IProduct, type: "menuItem" | "combo") => void
  type: "menuItem" | "combo"
}

// RESPONSE TYPES

export interface ApiResponse<T> {
  data?: T
  message?: string
  error?: string
  statusCode?: number
}

// INFO CARD

export interface InfoCardProps {
  isOpen: boolean
  onClose: () => void
  combo: {
    name: string
    menuItems?: IMenuItem[]
  }
}

// ADDED INTERFACES

// AUTH

export interface AuthResponse {
  data: {
    token: string
    user: IUser
  }
  loggin: boolean
}

export interface IUserDataUpdate {
  address: string
  password: string
}

// RESERVATIONS

export interface IReservation {
  date: string
  time: string
  guest: number
}

export interface IReservations extends IReservation {
  id: string
  status: string
  create_at: string
}

// REVIEW

export interface IReview {
  rate: number
  description: string
}

export interface UserProps {
  email: string
  image_url?: string
}

export interface FileUploadProps {
  userprops: {
    email: string
    image_url?: string
  }
}