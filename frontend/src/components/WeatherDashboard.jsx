import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import WeatherCard from './WeatherCard';
import InsightsPanel from './InsightsPanel';
import SearchBar from './SearchBar';

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');

  const fetchWeather = async (searchCity) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch weather data from our backend
      const weatherResponse = await axios.get(`http://localhost:5000/api/weather?city=${searchCity}`);
      setWeather(weatherResponse.data);
      
      // Fetch insights from our Python service
      const insightsResponse = await axios.get(`http://localhost:5001/insights?city=${searchCity}&temp=${weatherResponse.data.main.temp}&conditions=${weatherResponse.data.weather[0].main}`);
      setInsights(insightsResponse.data);
      
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setLoading(false);
    }
  };

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeather(searchCity);
  };

  return (
    <DashboardContainer>
      <Header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>WeatherPulse</h1>
        <p>Your personalized weather companion</p>
      </Header>
      
      <SearchBar onSearch={handleSearch} />
      
      {loading && <LoadingMessage>Loading weather data...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {weather && (
        <ContentGrid>
          <WeatherCard weather={weather} />
          {insights && <InsightsPanel insights={insights} />}
        </ContentGrid>
      )}
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 30px;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 1.2rem;
    opacity: 0.8;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  padding: 20px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #ff6b6b;
  font-size: 1.2rem;
  padding: 20px;
`;

export default Dashboard;
