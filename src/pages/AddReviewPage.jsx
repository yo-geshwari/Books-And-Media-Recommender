import React, { useState } from 'react';
import { db, auth } from '../firebase'; // Removed storage
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AddReviewPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(1);
  const [error, setError] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      setError('You must be logged in to submit a review.');
      return;
    }

    setLoading(true);
    setError('');
    let imageUrl = '';

    try {
      // Upload the image to Cloudinary if selected
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'unsigned_preset'); // Replace with your preset

        const cloudName = 'df8g9wlpk'; // Replace with your Cloudinary cloud name
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Image upload failed');
        }

        const data = await response.json();
        imageUrl = data.secure_url;
      }

      // Add the review document with imageUrl
      await addDoc(collection(db, 'reviews'), {
        userId: auth.currentUser.uid,
        title,
        content,
        rating,
        imageUrl, // Cloudinary URL
        timestamp: serverTimestamp(),
      });

      // Reset form
      setTitle('');
      setContent('');
      setRating(1);
      setImage(null);
      alert('Review submitted successfully!');
    } catch (err) {
      setError('Error submitting review: ' + err.message);
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Add a Review</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <textarea
          placeholder="Review Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <select
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-2 mb-4 border rounded"
        />

        <button
          type="submit"
          className={`w-full text-white p-2 rounded ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default AddReviewPage;