import { Link } from 'react-router-dom'
import Card from '../components/shared/Card'

function AboutPage() {

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const version = `1.${currentYear - 2022}.${currentMonth}`; // 2022 as base year

  return (
    <Card>
      <div className='about'>
        <h1>About Feedback Collector</h1>
        <p>A React application demonstrating:</p>
        <ul>
          <li>Component-based architecture</li>
          <li>State management with Context API</li>
          <li>CRUD operations with mock API</li>
          <li>React Router navigation</li>
          <li>Responsive UI with theme toggling</li>
        </ul>
        
        <h2>Technical Details</h2>
        <p><strong>Version:</strong> {version}</p>
        <p><strong>Built with:</strong> React 18, Vite, React Router 6</p>
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
        
        <div className="back-home">
          <Link to='/' className="btn">
            ← Back to Home
          </Link>
        </div>
      </div>
    </Card>
  )
}

export default AboutPage