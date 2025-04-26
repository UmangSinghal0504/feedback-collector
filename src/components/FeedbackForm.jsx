import { useState, useContext, useEffect } from 'react'
import RatingSelect from './RatingSelect'
import Card from './shared/Card'
import Button from './shared/Button'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})

  const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
      setName(feedbackEdit.item.name || '')
      setEmail(feedbackEdit.item.email || '')
    }
  }, [feedbackEdit])

  const validateForm = () => {
    const newErrors = {}
    
    if (!name.trim()) {
      newErrors.name = 'Name is required'
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!text.trim()) {
      newErrors.text = 'Feedback is required'
    } else if (text.trim().length < 10) {
      newErrors.text = 'Feedback must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleTextChange = ({ target: { value } }) => {
    setText(value)
    if (value.trim().length >= 10) {
      setMessage(null)
      setBtnDisabled(!validateForm())
    } else {
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const newFeedback = {
      text: text.trim(),
      rating,
      name: name.trim(),
      email: email.trim(),
    }

    if (feedbackEdit.edit === true) {
      updateFeedback(feedbackEdit.item.id, newFeedback)
    } else {
      addFeedback(newFeedback)
    }

    setBtnDisabled(true)
    setRating(10)
    setText('')
    setName('')
    setEmail('')
    setErrors({})
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={setRating} selected={rating} />

        <div className='input-group'>
          <input
            type='text'
            placeholder='Your Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name}</p>}
        </div>

        <div className='input-group'>
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email}</p>}
        </div>

        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
            className={errors.text ? 'border-red-500' : ''}
          />
          {errors.text && <p className='text-red-500 text-xs mt-1'>{errors.text}</p>}
        </div>

        <div className='button-container'>
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>

        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm