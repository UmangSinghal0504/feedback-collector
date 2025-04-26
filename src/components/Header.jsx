import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Toggle from './Toggle'

function Header({ text }) {
  const [darkMode, setDarkMode] = useState(false)
  
  return (
    <header style={{
      backgroundColor: 'var(--body-bg)',
      color: 'var(--text-color)',
      padding: '1rem 2rem',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '768px',
        margin: '0 auto'
      }}>
        <Link to='/' style={{
          textDecoration: 'none',
          color: 'var(--link-color)'
        }}>
          <h2 style={{ margin: 0 }}>{text}</h2>
        </Link>
        
        <div style={{
          position: 'absolute',
          right: '2rem',
          top: '50%',
          transform: 'translateY(-50%)'
        }}>
          <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </div>
    </header>
  )
}

Header.defaultProps = {
  text: 'Feedback UI'
}

Header.propTypes = {
  text: PropTypes.string
}

export default Header