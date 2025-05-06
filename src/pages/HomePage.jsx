import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const HomePage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, "reviews"),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const reviewsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(reviewsData);
      } catch (err) {
        console.error("Error fetching reviews: ", err);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Latest Reviews</h1>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to submit a review!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full"
            >
              {/* Image section */}
              {review.imageUrl ? (
                <img
                  src={review.imageUrl}
                  alt={review.title}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-gray-500 text-sm">
                  No Image Available
                </div>
              )}

              {/* Content section */}
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-lg font-bold mb-2">{review.title}</h2>
                <p className="text-sm text-gray-700 mb-4 flex-1 overflow-hidden text-ellipsis">
                  {review.content}
                </p>
                <p className="text-sm font-medium text-gray-500 mt-auto">
                  Rating: {review.rating} Stars
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;