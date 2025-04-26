import { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

 // Fetch feedbacks
const fetchFeedback = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/get-feedbacks`);
    
    // Check if response failed (4xx/5xx errors)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setFeedback(data);
  } catch (error) {
    console.error('Failed to fetch feedback:', error);
    // Optional: Show user-friendly error message in UI
    // Example: set an error state
    setFeedback([]); // Fallback empty array
  } finally {
    setIsLoading(false); // Always stop loading
  }
};

// Add feedback
const addFeedback = async (newFeedback) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/submit-feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newFeedback),
  });
  const data = await response.json();
  setFeedback([data, ...feedback]);
};

// Delete feedback
const deleteFeedback = async (id) => {
  if (window.confirm('Are you sure you want to delete?')) {
    await fetch(`${import.meta.env.VITE_API_URL}/delete-feedback/${id}`, { 
      method: 'DELETE' 
    });
    setFeedback(feedback.filter((item) => item.id !== id));
  }
}

// Update feedback
const updateFeedback = async (id, updItem) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/update-feedback/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updItem),
  });
  const data = await response.json();
  setFeedback(feedback.map((item) => (item.id === id ? data : item)));
  setFeedbackEdit({ item: {}, edit: false });
}
  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
