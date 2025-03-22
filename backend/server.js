const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
let db;

// Rest of your code remains the same...


async function initializeDatabase() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'weather_app'
    });
    
    console.log('Connected to MySQL database');
    
    // Create tables if they don't exist
    await db.execute(`
      CREATE TABLE IF NOT EXISTS user_preferences (
        user_id VARCHAR(255) PRIMARY KEY,
        default_city VARCHAR(255),
        temperature_unit ENUM('celsius', 'fahrenheit') DEFAULT 'celsius',
        notifications_enabled BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    await db.execute(`
      CREATE TABLE IF NOT EXISTS saved_cities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(255),
        city_name VARCHAR(255),
        FOREIGN KEY (user_id) REFERENCES user_preferences(user_id) ON DELETE CASCADE,
        UNIQUE KEY user_city (user_id, city_name)
      )
    `);
    
    console.log('Database tables initialized');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}

// Weather API route
app.get('/api/weather', async (req, res) => {
  try {
    const { city } = req.query;
    // API call to OpenWeatherMap
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`);
    
    // Convert temperatures from Kelvin to Celsius
    const weatherData = response.data;
    
    // Convert main temperature values
    if (weatherData.main) {
      weatherData.main.temp = weatherData.main.temp - 273.15;
      weatherData.main.feels_like = weatherData.main.feels_like - 273.15;
      weatherData.main.temp_min = weatherData.main.temp_min - 273.15;
      weatherData.main.temp_max = weatherData.main.temp_max - 273.15;
    }
    
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});


// User preferences routes
app.get('/api/preferences/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Get user preferences
    const [userRows] = await db.execute(
      'SELECT * FROM user_preferences WHERE user_id = ?',
      [userId]
    );
    
    // If user doesn't exist, create default preferences
    if (userRows.length === 0) {
      await db.execute(
        'INSERT INTO user_preferences (user_id, default_city, temperature_unit, notifications_enabled) VALUES (?, ?, ?, ?)',
        [userId, '', 'celsius', false]
      );
      
      return res.json({
        defaultCity: '',
        temperatureUnit: 'celsius',
        savedCities: [],
        notificationsEnabled: false
      });
    }
    // Get saved cities
    const [cityRows] = await db.execute(
        'SELECT city_name FROM saved_cities WHERE user_id = ?',
        [userId]
      );
      
      const savedCities = cityRows.map(row => row.city_name);
      
      res.json({
        defaultCity: userRows[0].default_city,
        temperatureUnit: userRows[0].temperature_unit,
        savedCities,
        notificationsEnabled: userRows[0].notifications_enabled
      });
    } catch (error) {
      console.error('Error fetching preferences:', error);
      res.status(500).json({ error: 'Failed to fetch preferences' });
    }
  });
  
  app.post('/api/preferences/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { defaultCity, temperatureUnit, savedCities, notificationsEnabled } = req.body;
      
      // Begin transaction
      await db.beginTransaction();
      
      // Update or insert user preferences
      await db.execute(
        `INSERT INTO user_preferences (user_id, default_city, temperature_unit, notifications_enabled) 
         VALUES (?, ?, ?, ?) 
         ON DUPLICATE KEY UPDATE 
         default_city = ?, temperature_unit = ?, notifications_enabled = ?`,
        [
          userId, defaultCity, temperatureUnit, notificationsEnabled,
          defaultCity, temperatureUnit, notificationsEnabled
        ]
      );
      
      // Delete existing saved cities
      await db.execute('DELETE FROM saved_cities WHERE user_id = ?', [userId]);
      
      // Insert new saved cities
      if (savedCities && savedCities.length > 0) {
        const values = savedCities.map(city => [userId, city]);
        await db.query(
          'INSERT INTO saved_cities (user_id, city_name) VALUES ?',
          [values]
        );
      }
      
      // Commit transaction
      await db.commit();
      
      res.json({ success: true, message: 'Preferences saved successfully' });
    } catch (error) {
      // Rollback transaction on error
      await db.rollback();
      console.error('Error saving preferences:', error);
      res.status(500).json({ error: 'Failed to save preferences' });
    }
  });
  
  // Initialize database and start server
  initializeDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });

  module.exports = app;
  
  