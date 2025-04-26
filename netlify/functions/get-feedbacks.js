// netlify/functions/get-feedbacks.js
const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  const feedbacksPath = path.join(process.cwd(), 'data', 'feedbacks.json');
  
  try {
    const feedbacks = JSON.parse(fs.readFileSync(feedbacksPath));
    return {
      statusCode: 200,
      body: JSON.stringify(feedbacks),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to fetch feedbacks" }) };
  }
};