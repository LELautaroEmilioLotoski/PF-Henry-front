"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { deactivateUser, getAllUsers } from "@/helpers/admin.helper";
import { IUser } from "@/interfaces/Types";

const GetAllUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setError("Token not found.");
      setLoading(false);
      return;
    }

    getAllUsers(token)
      .then((data) => {
        setUsers(data || []);
      })
      .catch((err: any) => {
        setError(err.message || "Error fetching users.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDeactivateUser = async (userEmail: string) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("Token not found.");
      }
      await deactivateUser(userEmail, token);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === userEmail ? { ...user, isActive: false } : user
        )
      );
    } catch (err: any) {
      setError(err.message || "Error deactivating user.");
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10">Loading users...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">{error}</p>
    );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
        Users
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600">
                Name
              </th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600">
                Email
              </th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600">
                Role
              </th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600">
                Status
              </th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentUsers.length ? (
              currentUsers.map((user) => (
                <tr key={user.email} className="hover:bg-gray-50">
                  <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                    {user.name}
                  </td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                    {user.role || (user.roles && user.roles.join(", ")) || "Not assigned"}
                  </td>
                  <td className="px-2 md:px-4 py-2 md:py-3">
                    {user.isActive ? (
                      <span className="text-green-600 font-semibold">Active</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Inactive</span>
                    )}
                  </td>
                  <td className="px-2 md:px-4 py-2 md:py-3">
                    <button
                      onClick={() => handleDeactivateUser(user.email)}
                      disabled={!user.isActive}
                      className={`${
                        !user.isActive
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      } text-white py-1 px-2 md:px-3 rounded-lg text-xs md:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                    >
                      {user.isActive ? "Deactivate" : "Deactivated"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-gray-500 text-sm md:text-base"
                >
                  No users available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        {[...Array(Math.ceil(users.length / usersPerPage))].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className="px-3 md:px-4 py-1 md:py-2 bg-gray-200 text-xs md:text-sm rounded-lg hover:bg-gray-300"
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GetAllUsers;