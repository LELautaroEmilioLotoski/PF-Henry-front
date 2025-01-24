import { UserDataFormProps } from "@/interfaces/Menu-item.interfaces";
import React from "react";

const UserDataForm: React.FC<UserDataFormProps> = ({ name, email, address }) => (
  <div className="space-y-4">
    <div>
      <h2 className="block text-sm font-medium text-black mb-1">Full Name</h2>
      <p className="w-full px-4 py-2 rounded-lg text-gray-600">{name}</p>
    </div>

    <div>
      <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
        Email
      </label>
      <p className="w-full px-4 py-2 rounded-lg text-gray-600">{email}</p>
    </div>

    <div>
      <label htmlFor="address" className="block text-sm font-medium text-black mb-1">
        Delivery Address
      </label>
      <p className="w-full px-4 py-2 rounded-lg text-gray-600">{address}</p>
    </div>
  </div>
);

export default UserDataForm;