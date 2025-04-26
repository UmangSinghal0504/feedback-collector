## Features

- ✨ Name,Email,Add, edit, and delete feedback items
- ⭐ Rate services from 1-10 stars
- 🌓 Dark/Light mode toggle 
- 📱 Fully responsive design
- 🏗️ Built with React functional components
- 🧩 Context API for state management
- 🔄 Mock REST API using json-server

## Key Concepts Implemented

- Components & JSX
- Props (propTypes, defaultProps)
- State management (component & app level)
- Event handling
- Forms and validation
- Context API
- HTTP requests
- Dark/Light theme toggling

  
## 🚀 Deployment Steps

### 1. **Netlify Setup**
- Sign in to [Netlify](https://app.netlify.com/)
- Select "Add new site" → "Import an existing project"
- Connect your GitHub/GitLab repository

### 2. **Configure Build Settings**
```yaml
Build command: npm run build
Publish directory: dist
Functions directory: netlify/functions
3. Environment Variables
Go to Site settings → Environment variables

Add if needed:

VITE_API_URL = /.netlify/functions
4. Deploy
Netlify will auto-deploy when pushing to main branch

For manual deploy: Trigger "Deploy site" in Netlify dashboard

🔧 Local Development
bash
npm install
npm run dev  # Starts Vite dev server
netlify dev  # Simulates Netlify environment

## Installation

```bash
npm install
npm run dev
