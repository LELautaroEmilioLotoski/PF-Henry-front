'use client'

import { useState, useEffect } from 'react';
import { fetchMenuItems } from '@/helpers/menu-items.helper';
import { fetchCategories, patchMenuItem } from '@/helpers/admin.helper';
import { ICategory, IMenuItem } from '@/interfaces/Types';

const EditMenuItem = ({ menuItemId }: { menuItemId: string }) => {
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedMenuItemId, setSelectedMenuItemId] = useState<string>(menuItemId);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [stock, setStock] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [category, setCategory] = useState<string | ICategory>('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await fetchMenuItems();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const { data } = await fetchCategories();
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCats();
  }, []);

  useEffect(() => {
    if (selectedMenuItemId) {
      const menuItem = menuItems.find((item) => item.id === selectedMenuItemId);
      if (menuItem) {
        setName(menuItem.name);
        setDescription(menuItem.description);
        setPrice(String(menuItem.price));
        setStock(String(menuItem.stock));
        setImageUrl(menuItem.image_url || '');
        setCategory(menuItem.category);
      }
    }
  }, [selectedMenuItemId, menuItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedMenuItem: IMenuItem = {
      id: selectedMenuItemId,
      type: "menuItem",
      isActive: true,
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      image_url: imageUrl,
      category: typeof category === 'string' ? category : category?.name,
    };

    try {
      const { data } = await patchMenuItem(selectedMenuItemId, updatedMenuItem);
      console.log('Updated menu item:', data);
      alert('Menu item updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Error updating menu item.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit Menu Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="menuItem" className="block text-sm font-medium text-gray-700">
            Select Menu Item
          </label>
          <select
            id="menuItem"
            value={selectedMenuItemId}
            onChange={(e) => setSelectedMenuItemId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select an item</option>
            {menuItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {selectedMenuItemId && (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                id="image_url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                value={typeof category === 'string' ? category : category?.name}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Update Item
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default EditMenuItem;