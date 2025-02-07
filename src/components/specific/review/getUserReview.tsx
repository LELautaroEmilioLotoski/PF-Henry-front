"use client"
import { getReview } from "@/helpers/auth.helper"
import type { IReview } from "@/interfaces/Types"
import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import styles from "./getReview.module.css"

const GetUserAllReview = () => {
  const [reviews, setReviews] = useState<IReview[]>([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const user = localStorage.getItem("user")
        console.log(user)

        if (!user) return

        const userData = JSON.parse(user)
        console.log("Usuario:", userData.id)

        const response = await getReview(userData.id)
        console.log("Reseñas obtenidas:", response)

        if (response) {
          setReviews(response)
        }
      } catch (err) {
        console.error("Error al obtener reseñas:", err)
      }
    }

    fetchReviews()
  }, [])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tus Reseñas</h2>

      {reviews.length === 0 ? (
        <p className={styles.noReviews}>No tienes reseñas aún.</p>
      ) : (
        <div className={styles.reviewsGrid}>
          {reviews.map((review, index) => (
            <div key={index} className={styles.reviewCard}>
              <div className={styles.ratingContainer}>
                <h3 className={styles.ratingTitle}>Puntuación</h3>
                <div className={styles.starContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`${styles.star} ${star <= review.rate ? styles.starFilled : styles.starEmpty}`}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.reviewDescription}>
                <p>{review.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GetUserAllReview


