// Code written by Laxman Velacahndran
import { motion } from 'framer-motion';
import styled from 'styled-components';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const { name, main, weather: weatherDetails, wind, sys } = weather;
  const { temp, feels_like, humidity, pressure } = main;
  const { description, icon } = weatherDetails[0];
  const { speed } = wind;
  const { country, sunrise, sunset } = sys;

  // Format sunrise and sunset times
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <CardContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <LocationInfo>
        <h2>{name}, {country}</h2>
        <p>{new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </LocationInfo>

      <WeatherInfo>
        <WeatherIcon src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
        <Temperature>{Math.round(temp)}°C</Temperature>
        <Description>{description.charAt(0).toUpperCase() + description.slice(1)}</Description>
      </WeatherInfo>

      <DetailGrid>
        <DetailItem>
          <DetailLabel>Feels Like</DetailLabel>
          <DetailValue>{Math.round(feels_like)}°C</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Humidity</DetailLabel>
          <DetailValue>{humidity}%</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Wind</DetailLabel>
          <DetailValue>{speed} m/s</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Pressure</DetailLabel>
          <DetailValue>{pressure} hPa</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Sunrise</DetailLabel>
          <DetailValue>{formatTime(sunrise)}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Sunset</DetailLabel>
          <DetailValue>{formatTime(sunset)}</DetailValue>
        </DetailItem>
      </DetailGrid>
    </CardContainer>
  );
};

const CardContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LocationInfo = styled.div`
  text-align: center;
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 5px;
  }
  
  p {
    font-size: 1rem;
    opacity: 0.8;
  }
`;

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
`;

const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
`;

const Temperature = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
  margin: 10px 0;
`;

const Description = styled.div`
  font-size: 1.2rem;
  text-transform: capitalize;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 10px;
  border-radius: 10px;
`;

const DetailLabel = styled.span`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 5px;
`;

const DetailValue = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
`;

export default WeatherCard;