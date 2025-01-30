"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createReview } from "@/helpers/auth.helper";
import { IReview } from "@/interfaces/Types";
import { useUserContext } from "@/context/UserContext";

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  image_url: string;
  role: string;
  create_at: string;
  isActive: boolean;
}

// export default function RestaurantReview() {
//   const [rating, setRating] = useState(0);
//   const [userData, setUserData] = useState<User | null>(null);
//   const [dataReview, setDataReview] = useState<IReview>({
//     rate: 0,
//     description: "",
//   });
//   const tokenData = localStorage.getItem("backendToken");
//   const token = JSON.parse(tokenData!)
//   console.log(token)

//   useEffect(() => {
//     const userString = localStorage.getItem("user");
//     // console.log(userString);

//     if (userString) {
//       const user: User = JSON.parse(userString);
//       console.log(user);

//       setUserData(user);
//     }
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const userString = localStorage.getItem("user");

//     const user: User = JSON.parse(userString!);
//     if (userString) {
//       console.log(user);

//       setUserData(user);
//     }

//     if (!rating || !dataReview.description) {
//       return alert("Completa los campos correspondientes.");
//     }

//     try {
//       const reviewData = { ...dataReview, rate: rating };
//       const response = await createReview(reviewData, token);
//       console.log(response);

//       console.log("Reseña creada:", response);
//       alert("¡Reseña creada exitosamente!");
//     } catch (error) {
//       console.error("Error al crear la reseña:", error);
//       alert("Hubo un problema al enviar tu reseña.");
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const { value } = e.target;

//     setDataReview((prev) => ({
//       ...prev,
//       description: value,
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
//       <Card className="w-full max-w-md shadow-xl">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold text-center">
//             Ayúdanos a mejorar 😁
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               Tu email
//             </label>
//             <input
//               value={userData?.email || ""}
//               disabled
//               className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               Calificación
//             </label>
//             <div className="flex items-center space-x-1 mt-1">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                   key={star}
//                   className={`w-8 h-8 cursor-pointer ${
//                     star <= rating
//                       ? "text-yellow-400 fill-yellow-400"
//                       : "text-gray-300"
//                   }`}
//                   onClick={() => setRating(star)}
//                 />
//               ))}
//             </div>
//           </div>
//           <div>
//             <label
//               htmlFor="review"
//               className="text-sm font-medium text-gray-700"
//             >
//               Tu reseña
//             </label>
//             <Textarea
//               id="review"
//               placeholder="Comparte tu experiencia..."
//               value={dataReview.description}
//               onChange={handleChange}
//               className="mt-1"
//               rows={4}
//             />
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Button className="w-full" onClick={handleSubmit}>
//             Enviar Reseña
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }


export default function RestaurantReview() {
  const [rating, setRating] = useState(0);
  const [userData, setUserData] = useState<User | null>(null);
  const [dataReview, setDataReview] = useState<IReview>({
    rate: 0,
    description: "",
  });
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenData = localStorage.getItem("backendToken");
    if (tokenData) {
      setToken(JSON.parse(tokenData));
    }

    const userString = localStorage.getItem("user");
    if (userString) {
      setUserData(JSON.parse(userString));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating || !dataReview.description) {
      return alert("Completa los campos correspondientes.");
    }

    if (!token) {
      return alert("No se encontró el token.");
    }

    try {
      const reviewData = { ...dataReview, rate: rating };
      const response = await createReview(reviewData, token);
      console.log("Reseña creada:", response);
      alert("¡Reseña creada exitosamente!");
    } catch (error) {
      console.error("Error al crear la reseña:", error);
      alert("Hubo un problema al enviar tu reseña.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDataReview((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Ayúdanos a mejorar 😁
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Tu email</label>
            <input
              value={userData?.email || ""}
              disabled
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Calificación</label>
            <div className="flex items-center space-x-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer ${
                    star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="review" className="text-sm font-medium text-gray-700">
              Tu reseña
            </label>
            <Textarea
              id="review"
              placeholder="Comparte tu experiencia..."
              value={dataReview.description}
              onChange={handleChange}
              className="mt-1"
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>
            Enviar Reseña
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
