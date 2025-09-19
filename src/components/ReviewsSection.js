import React, { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import StarRating from './StarRating';
import './ReviewsSection.css';

function ReviewsSection({ itemId, itemType }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(`/reviews/${itemType}/${itemId}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };
    fetchReviews();
  }, [itemId, itemType]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      addToast('Please select a star rating.', 'error');
      return;
    }

    const reviewData = {
      userId: user.id,
      [itemType === 'package' ? 'packageId' : 'hotelId']: itemId,
      rating,
      comment
    };

    try {
      const response = await api.post('/reviews', reviewData);
      setReviews([response.data, ...reviews]);
      setRating(0);
      setComment('');
      addToast('Thank you for your review!', 'success');
    } catch (error) {
      addToast('Failed to submit review.', 'error');
    }
  };

  return (
    <div className="reviews-section">
      <h3>Reviews & Ratings</h3>
      {user && (
        <form onSubmit={handleSubmitReview} className="review-form">
          <h4>Leave a Review</h4>
          <StarRating rating={rating} setRating={setRating} />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
          ></textarea>
          <button type="submit">Submit Review</button>
        </form>
      )}

      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="review-card">
              <StarRating rating={review.rating} />
              <p className="review-comment">{review.comment}</p>
              <small className="review-meta">
                Reviewed on {new Date(review.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to leave one!</p>
        )}
      </div>
    </div>
  );
}
export default ReviewsSection;