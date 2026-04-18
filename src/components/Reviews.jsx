import { useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'

const reveal = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' },
  viewport: { once: true },
}

const initialReviews = [
  {
    id: 1,
    name: 'Ariana M.',
    text: 'The contract law module was practical and easy to apply in real internship work.',
  },
  {
    id: 2,
    name: 'Daniel R.',
    text: 'The mentorship and feedback made legal writing finally click for me.',
  },
]

function Reviews() {
  const [name, setName] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [reviews, setReviews] = useState(initialReviews)

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedName = name.trim()
    const trimmedText = reviewText.trim()

    if (!trimmedName || !trimmedText) {
      return
    }

    const newReview = {
      id: Date.now(),
      name: trimmedName,
      text: trimmedText,
    }

    setReviews((prevReviews) => [newReview, ...prevReviews])
    setName('')
    setReviewText('')
  }

  return (
    <section className="section section-reviews" id="reviews">
      <Motion.div className="section-inner reviews-inner" {...reveal}>
        <h2>Student Reviews</h2>

        <form className="review-form" onSubmit={handleSubmit}>
          <label htmlFor="reviewer-name">Name</label>
          <input
            id="reviewer-name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label htmlFor="review-text">Review</label>
          <textarea
            id="review-text"
            rows="4"
            placeholder="Share your experience"
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
          />

          <Motion.button
            type="submit"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Review
          </Motion.button>
        </form>

        <div className="review-list" aria-live="polite">
          <AnimatePresence>
            {reviews.map((review) => (
              <Motion.article
                key={review.id}
                className="review-card"
                initial={{ opacity: 0, scale: 0.92, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -12 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                layout
              >
                <h3>{review.name}</h3>
                <p>{review.text}</p>
              </Motion.article>
            ))}
          </AnimatePresence>
        </div>
      </Motion.div>
    </section>
  )
}

export default Reviews
