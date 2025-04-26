// netlify/functions/submit-feedback.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    const newFeedback = JSON.parse(event.body);
    const feedbacksPath = path.join('/tmp', 'feedbacks.json');
    
    // Ensure directory exists
    if (!fs.existsSync(path.dirname(feedbacksPath))) {
      fs.mkdirSync(path.dirname(feedbacksPath), { recursive: true });
    }
  
    try {
      let feedbacks = [];
      if (fs.existsSync(feedbacksPath)) {
        feedbacks = JSON.parse(fs.readFileSync(feedbacksPath));
      }
      
      const feedbackWithId = { 
        ...newFeedback, 
        id: Date.now(),
        date: new Date().toISOString() 
      };
      
      fs.writeFileSync(feedbacksPath, JSON.stringify([...feedbacks, feedbackWithId]));
      
      return {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(feedbackWithId)
      };
    } catch (error) {
      console.error('Submission error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Failed to save feedback",
          details: error.message
        })
      };
    }
  };