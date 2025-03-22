import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import WeatherCard from './WeatherCard';
import { ThemeContext } from '../App';

const Dashboard = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { temperatureUnit } = useContext(ThemeContext);

  // Load default city from localStorage if available
  useEffect(() => {
    const defaultCity = localStorage.getItem('defaultCity');
    if (defaultCity) {
      setCity(defaultCity);
      fetchWeather(defaultCity);
    }
  }, []);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`http://localhost:5000/api/weather?city=${cityName}`);
      setWeather(response.data);
      
      // After getting weather data, fetch insights
      fetchInsights(cityName, response.data.main.temp, response.data.weather[0].main);
      
      // Save as default city
      localStorage.setItem('defaultCity', cityName);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data. Please check the city name and try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchInsights = async (cityName, temp, conditions) => {
    try {
      const response = await axios.get(`http://localhost:5001/insights?city=${cityName}&temp=${temp}&conditions=${conditions}`);
      setInsights(response.data);
      console.log("Insights received:", response.data);
    } catch (err) {
      console.error('Error fetching insights:', err);
      // Don't show error to user, just log it
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  return (
    <DashboardContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SearchContainer onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          required
        />
        <SearchButton
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? 'Searching...' : 'Search'}
        </SearchButton>
      </SearchContainer>

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      {weather && (
        <ContentContainer>
          <WeatherCard weather={weather} />
          
          {insights && (
            <InsightsCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2>Personalized Insights</h2>
              
              <InsightMessage>{insights.personalized_message}</InsightMessage>
              
              <InsightSection>
                <InsightIcon>👕</InsightIcon>
                <InsightContent>
                  <InsightTitle>What to Wear</InsightTitle>
                  <InsightText>{insights.clothing_recommendation}</InsightText>
                </InsightContent>
              </InsightSection>
              
              <InsightSection>
                <InsightIcon>🎯</InsightIcon>
                <InsightContent>
                  <InsightTitle>Activity Suggestion</InsightTitle>
                  <InsightText>{insights.activity_suggestion}</InsightText>
                </InsightContent>
              </InsightSection>
              
              <InsightSection>
                <InsightIcon>❤️</InsightIcon>
                <InsightContent>
                  <InsightTitle>Health Tip</InsightTitle>
                  <InsightText>{insights.health_tip}</InsightText>
                </InsightContent>
              </InsightSection>
            </InsightsCard>
          )}
        </ContentContainer>
      )}
      
      {!weather && !loading && !error && (
        <WelcomeMessage>
          <h1>Welcome to WeatherPulse</h1>
          <p>Enter a city name to get the current weather and personalized insights</p>
        </WelcomeMessage>
      )}
    </DashboardContainer>
  );
};

const DashboardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SearchContainer = styled.form`
  display: flex;
  gap: 10px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 15px 20px;
  border-radius: 50px;
  border: none;
  background: ${props => props.theme.cardBg};
  color: ${props => props.theme.text};
  font-size: 1.1rem;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.accent};
  }
`;

const SearchButton = styled(motion.button)`
  padding: 15px 30px;
  border-radius: 50px;
  border: none;
  background: ${props => props.theme.accent};
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(255, 71, 87, 0.2);
  color: #ff4757;
  padding: 15px 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

const WelcomeMessage = styled.div`
  text-align: center;
  margin-top: 50px;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }
  
  p {
    font-size: 1.2rem;
    opacity: 0.8;
  }
`;

const InsightsCard = styled(motion.div)`
  background: ${props => props.theme.cardBg};
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 10px;
    text-align: center;
  }
`;

const InsightMessage = styled.div`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
`;

const InsightSection = styled.div`
  display: flex;
  gap: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
`;

const InsightIcon = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InsightContent = styled.div`
  flex: 1;
`;

const InsightTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const InsightText = styled.p`
  font-size: 1rem;
  opacity: 0.9;
`;

export default Dashboard;
