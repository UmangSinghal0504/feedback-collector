import PropTypes from 'prop-types'
import { useEffect } from 'react'

export default function Toggle({ darkMode, setDarkMode }) {
  // Persist theme preference
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedMode)
  }, [])

  const toggleTheme = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', newMode)
    document.documentElement.classList.toggle('dark', newMode)
  }

  return (
    <button 
      onClick={toggleTheme}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60px',
        height: '30px',
        borderRadius: '15px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: darkMode ? '#4f46e5' : '#cccccc',
        transition: 'all 0.3s ease',
        outline: 'none'
      }}
      aria-label="Toggle dark mode"
    >
      <span style={{
        position: 'absolute',
        left: darkMode ? 'calc(100% - 26px)' : '4px',
        width: '22px',
        height: '22px',
        borderRadius: '50%',
        backgroundColor: '#ffffff',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }} />
      {darkMode ? '🌙' : '☀️'}
    </button>
  )
}

Toggle.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired
}