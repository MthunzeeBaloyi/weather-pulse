import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeContext } from '../context/ThemeContext';
import InsightsPanel from '../components/InsightsPanel';

describe('InsightsPanel', () => {
  const mockWeatherData = {
    main: {
      humidity: 65,
      pressure: 1015
    },
    wind: { speed: 5.5 }
  };

  it('renders weather metrics correctly', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'light' }}>
        <InsightsPanel weatherData={mockWeatherData} />
      </ThemeContext.Provider>
    );
    
    expect(screen.getByTestId('humidity-value')).toHaveTextContent('65%');
    expect(screen.getByTestId('wind-speed')).toHaveTextContent('5.5 m/s');
    expect(screen.getByTestId('pressure-value')).toHaveTextContent('1015 hPa');
  });
});


