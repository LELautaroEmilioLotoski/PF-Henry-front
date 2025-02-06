'use client'

import React, { useEffect, useState } from 'react';
import { fetchCombos, fetchMenuItems } from '@/helpers/menu-items.helper';
import { fetchComboById, updateCombo } from '@/helpers/admin.helper';
import { ICombo, IMenuItem } from '@/interfaces/Types';

const EditCombo = () => {
  const [combos, setCombos] = useState<ICombo[]>([]);
  const [selectedComboId, setSelectedComboId] = useState<string | null>(null);
  const [comboData, setComboData] = useState<{
    name: string;
    description: string;
    menuItems: IMenuItem[];
  }>({
    name: '',
    description: '',
    menuItems: [] as IMenuItem[],
  });

  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [comboData, menuData] = await Promise.all([fetchCombos(), fetchMenuItems()]);
        setCombos(comboData);
        setMenuItems(menuData);
      } catch {
        console.error('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedComboId) {
      const fetchComboDetails = async () => {
        try {
          const data = await fetchComboById(selectedComboId);
          setComboData({
            name: data.name,
            description: data.description,
            menuItems: data.menuItems,
          });
        } catch {
          console.error('Error fetching combo details');
        }
      };

      fetchComboDetails();
    }
  }, [selectedComboId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setComboData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMenuItemChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newMenuItems = [...comboData.menuItems];
    const selectedMenuItem = menuItems.find(item => item.id === e.target.value);
    if (selectedMenuItem) {
      newMenuItems[index] = selectedMenuItem;
    }
    setComboData(prev => ({
      ...prev,
      menuItems: newMenuItems,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedCombo = await updateCombo(selectedComboId!, comboData);
      alert(`Combo updated: ${updatedCombo.name}`);
    } catch {
      alert('Error updating combo');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit Combo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="combo" className="block text-sm font-medium text-gray-700">
            Select Combo to Edit
          </label>
          <select
            id="combo"
            value={selectedComboId || ''}
            onChange={(e) => setSelectedComboId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Combo</option>
            {combos.map((combo) => (
              <option key={combo.id} value={combo.id}>
                {combo.name}
              </option>
            ))}
          </select>
        </div>

        {selectedComboId && (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={comboData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={comboData.description}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {menuItems.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Menu Items
                </label>
                {menuItems.slice(0, 4).map((item: IMenuItem, index: number) => (
                  <div key={item.id} className="mb-2">
                    <label htmlFor={`menu-item-${index}`} className="block text-sm text-gray-600">
                      {item.name}
                    </label>
                    <select
                      id={`menu-item-${index}`}
                      value={comboData.menuItems[index]?.id || ''}
                      onChange={(e) => handleMenuItemChange(e, index)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      {menuItems.map((menuItem: IMenuItem) => (
                        <option key={menuItem.id} value={menuItem.id}>
                          {menuItem.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}
            <div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Update Combo
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default EditCombo;