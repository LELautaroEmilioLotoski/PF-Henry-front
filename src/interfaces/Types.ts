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

export interface IUserContextProps {
  user: IUser | null;
  token: string | null;
  setUser: (user: IUser | null, token: string | null) => void;
  logoutUser: () => void;
}

// REGISTER

export interface IRegisterProps {
  name: string;
  email: string;
  password: string;
  ConfirmPassword: string;
  address: string;
  image_url: string;
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