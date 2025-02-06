"use client";

import { useEffect, useState } from "react";
import { fetchCategories, postMenuItem } from "@/helpers/admin.helper";
import { ICategory, IMenuItem, ApiResponse } from "@/interfaces/Types";

function CreateMenuItem() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    price: string;
    stock: string;
    image_url: string;
    category: string;
  }>({
    name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
    category: "",
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data } = await fetchCategories();
        if (data) {
          setCategories(data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    loadCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const menuItem: IMenuItem = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      category: formData.category,
      type: "menuItem",
      id: "",
      isActive: true,
    };
    try {
      const response: ApiResponse<IMenuItem> = await postMenuItem(menuItem);
      if (response.data) {
        alert("Item agregado con éxito");
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          image_url: "",
          category: "",
        });
      }
    } catch (err) {
      alert("Error al agregar el item");
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Agregar Item al Menú</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="image_url"
          placeholder="URL de Imagen"
          value={formData.image_url}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Agregar
        </button>
      </form>
    </div>
  );
}

export default CreateMenuItem;
