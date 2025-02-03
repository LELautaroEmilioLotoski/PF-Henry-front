import {
  AuthResponse,
  ILoginProps,
  IRegisterProps,
  IReservation,
  IReview,
  IUserDataUpdate,
} from "@/interfaces/Types";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const register = async (userData: IRegisterProps) => {
  const res = await fetch(`${APIURL}auth/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  console.log(data);
  
  return data;
};

export const login = async (userData: ILoginProps): Promise<AuthResponse> => {
  const res = await fetch(`${APIURL}auth/signin`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    console.log("error al iniciar sesion");
  }

  const data: AuthResponse = await res.json(); // Ajustamos a la nueva estructura con el token y el user
  return data;
};


export const updateAccount = async (
  id: string,
  userData: IUserDataUpdate
) => {
  const res = await fetch(`${APIURL}users/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  return data;
};


export const createNewEmployee = async (
  id: string,
  employeeData: IRegisterProps
) => {
  const res = await fetch(`${APIURL}users/UpdateRole/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });
  const data = await res.json();
  return data;
};

export const reservation = async (id: string, userData: IReservation) => {
  const res = await fetch(`${APIURL}reservations/create/${id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  console.log(data);
  
  return data;
};

export const getReservations = async (email: string) => {
  const url = `${APIURL}users/reservations/${email}`;

  console.log(email);
  
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const cancelledReservation = async (id: string) => {
  const res = await fetch(`${APIURL}reservations/cancelled/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

//  REVIEWS

export const createReview = async (reviewContent: IReview, token: string | null) => {
  if (!token) {
    throw new Error("No token provided");
  }
  const res = await fetch(`${APIURL}review`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewContent),
  });
  const data = await res.json();
  return data;
};
;

export const getReview = async (id: string) => {
  const res = await fetch(`${APIURL}review/user/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};


export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default");

  const response = await fetch("https://api.cloudinary.com/v1_1/demo/image/upload", {
    method: "POST",
    body: formData,
  });

  return response.json();
};
