// components/Menu.tsx
import React from 'react';
import MenuLeft from './MenuLeft';
import Cart from './Cart';

const Menu: React.FC = () => {
  return (
      <div className="flex h-screen">
        <div className="w-1/2 p-4">
        <h1>Menu</h1>
          <MenuLeft />
        </div>
        <div className="w-1/2 p-4">
          <Cart />
        </div>
      </div>
  );
};

export default Menu;
