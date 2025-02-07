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
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import styles from "./Review.module.css"; 

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

export default function RestaurantReview() {
  const [rating, setRating] = useState(0);
  const [userData, setUserData] = useState<User | null>(null);
  const [dataReview, setDataReview] = useState<IReview>({
    rate: 0,
    description: "",
  });
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const tokenData = Cookies.get("token");
    console.log("Token guardado en localStorage:", tokenData);
    
    if (tokenData) {
      setToken(tokenData);
    }

    const userString = localStorage.getItem("user");
    console.log("Usuario guardado en localStorage:", userString);
    
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
       await createReview(reviewData, token);
      alert("¡Reseña creada exitosamente!");
      router.push("/myReviews")
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
<div className={styles.reviewContainer}>
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Ayúdanos a mejorar 😁</CardTitle>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Tu email</label>
            <input value={userData?.email || ""} disabled className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Calificación</label>
            <div className={styles.starRating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`${styles.star} ${star <= rating ? styles.starFilled : styles.starEmpty}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="review" className={styles.label}>
              Tu reseña
            </label>
            <Textarea
              id="review"
              placeholder="Comparte tu experiencia..."
              value={dataReview.description}
              onChange={handleChange}
              className={styles.textarea}
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter className={styles.cardFooter}>
          <Button className={styles.button} onClick={handleSubmit}>
            Enviar Reseña
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}



