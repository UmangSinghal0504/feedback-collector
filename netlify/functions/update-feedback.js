const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const id = event.path.split('/').pop();
  const updatedData = JSON.parse(event.body);
  const feedbacksPath = path.join('/tmp', 'feedbacks.json'); 
  
  
if (!fs.existsSync('/tmp/feedbacks.json')) {
    fs.writeFileSync('/tmp/feedbacks.json', '[]');
  }
  try {
    let feedbacks = [];
    if (fs.existsSync(feedbacksPath)) {
      feedbacks = JSON.parse(fs.readFileSync(feedbacksPath));
    }
    
    feedbacks = feedbacks.map(item => 
      item.id === parseInt(id) ? { ...item, ...updatedData } : item
    );
    
    fs.writeFileSync(feedbacksPath, JSON.stringify(feedbacks));
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(feedbacks.find(item => item.id === parseInt(id)))
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to update feedback" })
    };
  }
};