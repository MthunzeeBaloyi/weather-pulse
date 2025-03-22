// src/context/ThemeContext.jsx
import { createContext } from 'react';

export const ThemeContext = createContext({
  temperatureUnit: 'celsius',
  theme: 'light',
  toggleTheme: () => {},
  setTemperatureUnit: () => {}
});
