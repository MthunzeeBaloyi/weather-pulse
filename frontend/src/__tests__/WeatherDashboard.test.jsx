import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeContext } from '../context/ThemeContext';
import WeatherDashboard from '../components/WeatherDashboard';

describe('WeatherDashboard', () => {
  it('shows loading state when isLoading is true', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'light', temperatureUnit: 'celsius' }}>
        <WeatherDashboard isLoading={true} />
      </ThemeContext.Provider>
    );
    
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });
});





