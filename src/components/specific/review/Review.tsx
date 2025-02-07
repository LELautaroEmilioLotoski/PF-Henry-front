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
import { createReview } from "@/helpers/reviews.helper";
import { IReview } from "@/interfaces/Types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import styles from "./Review.module.css";
import { toast } from "react-toastify"; // Importación de Toastify

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
    console.log("Token saved in localStorage:", tokenData);

    if (tokenData) {
      setToken(tokenData);
    }

    const userString = localStorage.getItem("user");
    console.log("User saved in localStorage:", userString);

    if (userString) {
      setUserData(JSON.parse(userString));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating || !dataReview.description) {
      toast.error("Complete the required fields."); // Reemplazo de alert
      return;
    }

    if (!token) {
      toast.error("Token not found."); // Reemplazo de alert
      return;
    }

    try {
      const reviewData = { ...dataReview, rate: rating };
      await createReview(reviewData);
      toast.success("Review created successfully!"); // Reemplazo de alert
      router.push("/myReviews");
    } catch (error) {
      console.error("Error creating review:", error);
      toast.error("There was a problem submitting your review."); // Reemplazo de alert
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
          <CardTitle className={styles.cardTitle}>Help us improve 😁</CardTitle>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Your email</label>
            <input
              value={userData?.email || ""}
              disabled
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Rating</label>
            <div className={styles.starRating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`${styles.star} ${
                    star <= rating ? styles.starFilled : styles.starEmpty
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="review" className={styles.label}>
              Your review
            </label>
            <Textarea
              id="review"
              placeholder="Share your experience..."
              value={dataReview.description}
              onChange={handleChange}
              className={styles.textarea}
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter className={styles.cardFooter}>
          <Button className={styles.button} onClick={handleSubmit}>
            Submit Review
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
