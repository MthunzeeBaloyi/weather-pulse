const request = require('supertest');
const express = require('express');
const app = express();

// Create a route handler for testing
app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  
  if (city === 'Cape Town') {
    res.status(200).json({
      main: {
        temp: 25,
        feels_like: 26,
        temp_min: 23,
        temp_max: 27
      },
      weather: [{
        main: 'Clear',
        description: 'clear sky'
      }]
    });
  } else {
    res.status(404).json({ error: 'City not found' });
  }
});

describe('Weather API Endpoints', () => {
  test('GET /api/weather returns weather data', async () => {
    const response = await request(app)
      .get('/api/weather')
      .query({ city: 'Cape Town' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('main.temp');
  });

  test('handles invalid city names', async () => {
    const response = await request(app)
      .get('/api/weather')
      .query({ city: 'InvalidCityName123' });

    expect(response.status).toBe(404);
  });
});
