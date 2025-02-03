"use client";
import { getReview } from "@/helpers/auth.helper";
import { IReview } from "@/interfaces/Types";
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

const GetUserAllReview = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const user = localStorage.getItem("user");
        if (!user) return;

        const userData = JSON.parse(user);
        console.log("Usuario:", userData);

        const response = await getReview(userData.id);
        console.log("Reseñas obtenidas:", response);

        if (response) {
          setReviews(response); // Guarda las reseñas en el estado
        }
      } catch (err) {
        console.error("Error al obtener reseñas:", err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Tus Reseñas</h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No tienes reseñas aún.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-md rounded-lg border text-center"
            >
              <div className="flex justify-around m-4">
                <h3 className="text-lg font-semibold">Puntuación</h3>
                <div className="flex justify-center space-x-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= review.rate
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              {/* Descripción debajo de la puntuación */}
              <div className="mt-4">
                <p className="text-gray-700">{review.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetUserAllReview;
