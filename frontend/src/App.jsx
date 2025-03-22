import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Dashboard from './components/Dashboard';
import Preferences from './components/Preferences';
import Navbar from './components/Navbar';
import './App.css';

// Define themes
const lightTheme = {
  background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
  text: '#333333',
  cardBg: 'rgba(255, 255, 255, 0.2)',
  accent: '#4facfe',
};

const darkTheme = {
  background: 'linear-gradient(to right, #1e3c72, #2a5298)',
  text: '#ffffff',
  cardBg: 'rgba(255, 255, 255, 0.1)',
  accent: '#4facfe',
};

// Create theme context
export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('dark');
  const [temperatureUnit, setTemperatureUnit] = useState('celsius');
  const [notifications, setNotifications] = useState(false);
  
  // Load preferences from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedUnit = localStorage.getItem('temperatureUnit');
    const savedNotifications = localStorage.getItem('notifications');
    
    if (savedTheme) setTheme(savedTheme);
    if (savedUnit) setTemperatureUnit(savedUnit);
    if (savedNotifications) setNotifications(savedNotifications === 'true');
  }, []);
  
  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('temperatureUnit', temperatureUnit);
    localStorage.setItem('notifications', notifications.toString());
  }, [theme, temperatureUnit, notifications]);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  
  const updatePreferences = (newPrefs) => {
    if (newPrefs.theme) setTheme(newPrefs.theme);
    if (newPrefs.temperatureUnit) setTemperatureUnit(newPrefs.temperatureUnit);
    if (newPrefs.notifications !== undefined) setNotifications(newPrefs.notifications);
  };
  
  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      temperatureUnit, 
      notifications,
      updatePreferences 
    }}>
      <ThemeProvider theme={currentTheme}>
        <AppContainer>
          <Router>
            <Navbar />
            <MainContent>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/preferences" element={<Preferences />} />
              </Routes>
            </MainContent>
          </Router>
        </AppContainer>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  transition: all 0.3s ease;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export default App;

