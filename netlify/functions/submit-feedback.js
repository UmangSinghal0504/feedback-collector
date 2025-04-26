// netlify/functions/submit-feedback.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const newFeedback = JSON.parse(event.body);
  const feedbacksPath = path.join(process.cwd(), 'data', 'feedbacks.json');
  
  try {
    let feedbacks = [];
    if (fs.existsSync(feedbacksPath)) {
      feedbacks = JSON.parse(fs.readFileSync(feedbacksPath));
    }
    
    feedbacks.push({ ...newFeedback, id: Date.now() });
    fs.writeFileSync(feedbacksPath, JSON.stringify(feedbacks));
    
    return { statusCode: 201, body: JSON.stringify(newFeedback) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to save feedback" }) };
  }
};