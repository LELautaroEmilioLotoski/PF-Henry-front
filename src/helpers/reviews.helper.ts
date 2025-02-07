import { IReview } from "@/interfaces/Types";
import { getAuthToken } from "@/helpers/cookie.helper";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const createReview = async (reviewContent: IReview): Promise<IReview> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No token provided");
  }
  const res = await fetch(`${APIURL}review`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewContent),
  });
  const data: IReview = await res.json();
  return data;
};

export const getReview = async (id: string): Promise<IReview> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No token provided");
  }
  const res = await fetch(`${APIURL}review/user/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data: IReview = await res.json();
  return data;
};
