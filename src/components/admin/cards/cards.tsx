import React from "react";

const Card = () => {
  return (
    <div className="bg-slate-300 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300 transform flex flex-col h-full">
      <hr className="m-2 bg-black" />

      <div className="p-4 flex">
        <h3 className="text-xl font-semibold text-gray-700">hola</h3>
        <div className="flex justify-end items-end">
          <p className="text-lg font-bold text-gray-900">hola</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
