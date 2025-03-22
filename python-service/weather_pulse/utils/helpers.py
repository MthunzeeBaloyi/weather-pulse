"""
Utility functions for the Weather Pulse application.
"""

def celsius_to_fahrenheit(celsius):
    """Convert Celsius to Fahrenheit."""
    return (celsius * 9/5) + 32

def get_weather_category(conditions):
    """Map OpenWeatherMap conditions to standardized categories."""
    conditions = conditions.lower()
    
    if 'clear' in conditions:
        return 'Clear'
    elif 'cloud' in conditions:
        return 'Clouds'
    elif 'rain' in conditions or 'drizzle' in conditions:
        return 'Rain'
    elif 'snow' in conditions:
        return 'Snow'
    elif 'thunder' in conditions or 'storm' in conditions:
        return 'Thunderstorm'
    elif 'fog' in conditions or 'mist' in conditions or 'haze' in conditions:
        return 'Mist'
    else:
        return 'Clear'  # Default to clear if unknown

def format_temperature(temp, unit='celsius'):
    """Format temperature with the appropriate unit symbol."""
    if unit == 'fahrenheit':
        temp_value = celsius_to_fahrenheit(temp)
        return f"{temp_value:.1f}°F"
    else:
        return f"{temp:.1f}°C"

def kelvin_to_celsius(kelvin):
    return round(kelvin - 273.15)

def kelvin_to_fahrenheit(kelvin):
    celsius = kelvin_to_celsius(kelvin)
    return round((celsius * 9/5) + 32)

def format_timestamp(timestamp):
    from datetime import datetime, timezone
    return datetime.fromtimestamp(timestamp, tz=timezone.utc).strftime('%Y-%m-%d %H:%M:%S')

def calculate_wind_direction(degrees):
    directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    index = round(degrees / 45) % 8
    return directions[index]





