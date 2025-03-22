-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS weather_app;

-- Use the database
USE weather_app;

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  user_id VARCHAR(255) PRIMARY KEY,
  default_city VARCHAR(255),
  temperature_unit ENUM('celsius', 'fahrenheit') DEFAULT 'celsius',
  notifications_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create saved_cities table
CREATE TABLE IF NOT EXISTS saved_cities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(255),
  city_name VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES user_preferences(user_id) ON DELETE CASCADE,
  UNIQUE KEY user_city (user_id, city_name)
);

-- Insert some sample data
INSERT INTO user_preferences (user_id, default_city, temperature_unit, notifications_enabled)
VALUES ('user123', 'London', 'celsius', true);

INSERT INTO saved_cities (user_id, city_name)
VALUES 
  ('user123', 'London'),
  ('user123', 'New York'),
  ('user123', 'Tokyo');