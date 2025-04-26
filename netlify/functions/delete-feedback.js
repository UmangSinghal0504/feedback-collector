const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const id = event.path.split('/').pop();
  const feedbacksPath = path.join('/tmp', 'feedbacks.json');

  // Add to the beginning of each function
if (!fs.existsSync('/tmp/feedbacks.json')) {
    fs.writeFileSync('/tmp/feedbacks.json', '[]');
  }
  
  try {
    let feedbacks = JSON.parse(fs.readFileSync(feedbacksPath));
    feedbacks = feedbacks.filter(item => item.id !== parseInt(id));
    fs.writeFileSync(feedbacksPath, JSON.stringify(feedbacks));
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to delete feedback" }) };
  }
};