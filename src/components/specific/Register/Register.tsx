"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/helpers/auth.helper";
import { validateRegisterForm } from "@/helpers/validate";
import { IRegisterErrors, IRegisterProps } from "@/interfaces/Types";

const Register = () => {
  const router = useRouter();
  const initialState = {
    name: "",
    email: "",
    password: "",
    address: "",
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

    try {
      const res = await register(dataUser);
      if (!res.message) {
        router.push("/login");
      } else {
        setErrors({
          email: "",
          password: "",
          address: "",
          name: res.message,
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        name: "",
        email: "",
        password: "",
        address: "",
      });
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
          <span className="text-red-500 text-sm mt-1 block">
            {errors.email}
          </span>
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
          <span className="text-red-500 text-sm mt-1 block">
            {errors.password}
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

      <button type="submit" className="button-primary" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Register;
