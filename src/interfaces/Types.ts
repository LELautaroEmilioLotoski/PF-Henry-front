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
    name: string;
    email: string;
    password: string;
    address: string;
  }
  
  export interface IRegisterErrors {
    name?: string;
    email?: string;
    password?: string;
    address?: string;
  }


// USERS

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