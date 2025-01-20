"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, createNewEmployee } from "@/helpers/auth.helper";
import { validateRegisterForm } from "@/helpers/validate";
import { IRegisterErrors, IRegisterProps } from "@/interfaces/Types";

const Register = () => {
  const router = useRouter();
  const initialState: IRegisterProps = {
    id: "",
    role: "",
    name: "",
    email: "",
    password: "",
    ConfirmPassword: "",
    address: "",
    image_url: "",
  };

  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<IRegisterErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});
  
    const validationErrors = validateRegisterForm(dataUser);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }
  
    console.log("Submitting registration data:", dataUser); // Log de los datos enviados
  
    try {
      const res = await register(dataUser);
      console.log(dataUser);
      
      console.log("Registration response:", res); // Log de la respuesta de la API
  
      if (res.message === "Registro exitoso") {
        router.push("/login");
      } else {
        setErrors({
          name: res.message,
        });
      }
    } catch (error) {
      console.error("Registration error:", error); // Log del error de la solicitud
      setErrors({});
    }
  
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 max-w-sm mx-auto">
      <div>
        <label htmlFor="name" className="text-body mb-1 block">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={dataUser.name}
          onChange={handleChange}
          className="input-field"
          disabled={isLoading}
        />
        {errors.name && (
          <span className="text-red-500 text-sm mt-1 block">{errors.name}</span>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-body mb-1 block">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={dataUser.email}
          onChange={handleChange}
          className="input-field"
          disabled={isLoading}
        />
        {errors.email && (
          <span className="text-red-500 text-sm mt-1 block">{errors.email}</span>
        )}
      </div>

      <div>
        <label htmlFor="password" className="text-body mb-1 block">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={dataUser.password}
          onChange={handleChange}
          className="input-field"
          disabled={isLoading}
        />
        {errors.password && (
          <span className="text-red-500 text-sm mt-1 block">{errors.password}</span>
        )}
      </div>

      <div>
        <label htmlFor="ConfirmPassword" className="text-body mb-1 block">
          Confirm Password
        </label>
        <input
          id="ConfirmPassword"
          name="ConfirmPassword"
          type="password"
          value={dataUser.ConfirmPassword}
          onChange={handleChange}
          className="input-field"
          disabled={isLoading}
        />
        {errors.ConfirmPassword && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.ConfirmPassword}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="address" className="text-body mb-1 block">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          value={dataUser.address}
          onChange={handleChange}
          className="input-field"
          disabled={isLoading}
        />
        {errors.address && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.address}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="image_url" className="text-body mb-1 block">
          Image URL
        </label>
        <input
          id="image_url"
          name="image_url"
          type="text"
          value={dataUser.image_url}
          onChange={handleChange}
          className="input-field"
          disabled={isLoading}
        />
        {errors.image_url && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.image_url}
          </span>
        )}
      </div>

      <button type="submit" className="button-primary" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Register;