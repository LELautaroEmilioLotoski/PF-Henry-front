"use client"
import { getReview } from "@/helpers/reviews.helper"
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
        console.log("User:", userData.id)

        const response = await getReview(userData.id)
        console.log("Reviews fetched:", response)

        if (response) {
          setReviews(response)
        }
      } catch (err) {
        console.error("Error fetching reviews:", err)
      }
    }

    fetchReviews()
  }, [])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Reviews</h2>

      {reviews.length === 0 ? (
        <p className={styles.noReviews}>You don't have any reviews yet.</p>
      ) : (
        <div className={styles.reviewsGrid}>
          {reviews.map((review, index) => (
            <div key={index} className={styles.reviewCard}>
              <div className={styles.ratingContainer}>
                <h3 className={styles.ratingTitle}>Rating</h3>
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