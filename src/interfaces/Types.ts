// AUTH
// LOGIN

export interface ILoginProps {
  email: string;
  password: string;
}

export interface ILoginErrors {
  email?: string;
  password?: string;
}

// REGISTER

export interface IRegisterProps {
  id: string,
  name: string;
  email: string;
  password: string;
  ConfirmPassword: string;
  address: string;
  image_url: string;
  role: string
}

export interface IRegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  ConfirmPassword?: string;
  address?: string;
  image_url?: string;
}


// USERS

export interface AuthResponse {
  data: {
    token: string;
    user: IUser;
  };
  loggin: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  address: string;
  role: string;
  image_url: string;
  created_at: string;
}


// PRODUCTS

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

export interface ICategory {
  id: string;
  name: string;
  icon: string;
}


export interface IOrder {
  id: number;
  status: string;
  date: string;
}

//EMPLOYEE


export interface ICreateEmployee extends IRegisterProps {}
export interface ICartItem extends IProduct {
  quantity: number;
}

//RESERVATIONS

export interface IReservation {
  date: string,
  time: string,
  guest: number
}