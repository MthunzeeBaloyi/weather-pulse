import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeContext } from '../context/ThemeContext';
import WeatherCard from '../components/WeatherCard';

describe('WeatherCard', () => {
  const mockWeather = {
    name: 'London',
    sys: { country: 'GB' },
    main: { temp: 20 },
    weather: [{ description: 'Clear sky' }]
  };

  it('renders weather information correctly', () => {
    render(
      <ThemeContext.Provider value={{ temperatureUnit: 'celsius', theme: 'light' }}>
        <WeatherCard weather={mockWeather} />
      </ThemeContext.Provider>
    );

    expect(screen.getByTestId('location')).toHaveTextContent('London, GB');
    expect(screen.getByTestId('temperature')).toHaveTextContent('20°C');
    expect(screen.getByTestId('weather-description')).toHaveTextContent('Clear sky');
  });
});


