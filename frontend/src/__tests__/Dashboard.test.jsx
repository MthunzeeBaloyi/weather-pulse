// src/__tests__/Dashboard.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: () => ({
      temperatureUnit: 'celsius',
      theme: 'light',
      toggleTheme: vi.fn(),
      setTemperatureUnit: vi.fn()
    })
  };
});

describe('Dashboard', () => {
  it('renders the dashboard component', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    
    const searchInput = screen.getByPlaceholderText(/enter city name/i);
    expect(searchInput).toBeInTheDocument();
  });
});

