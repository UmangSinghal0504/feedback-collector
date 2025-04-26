const fs = require('fs');
const path = require('path');

exports.handler = async () => {
    const feedbacksPath = path.join(process.cwd(), 'netlify', 'data', 'feedbacks.json');
    if (!fs.existsSync(feedbacksPath)) {
        fs.writeFileSync(feedbacksPath, '[]'); // Create with empty array
    }
    
    try {
        const feedbacks = JSON.parse(fs.readFileSync(feedbacksPath));
        console.log("Returning feedbacks:", feedbacks); // Debug log
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Important for CORS
            },
            body: JSON.stringify(feedbacks),
        };
    } catch (error) {
        console.error('Full error details:', {
            message: error.message,
            stack: error.stack,
            feedbacksPath,
            dirContents: fs.readdirSync(path.dirname(feedbacksPath))
        });

        return { 
            statusCode: 500,
            body: JSON.stringify({ 
                error: "Failed to fetch feedbacks",
                details: error.message 
            })
        };
    }
}; 
