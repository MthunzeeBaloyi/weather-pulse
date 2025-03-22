import pytest
from datetime import datetime, timezone
from weather_pulse.utils.helpers import (
    celsius_to_fahrenheit,
    get_weather_category,
    format_temperature,
    kelvin_to_celsius,
    kelvin_to_fahrenheit,
    format_timestamp,
    calculate_wind_direction
)

def test_celsius_to_fahrenheit():
    assert celsius_to_fahrenheit(0) == 32
    assert celsius_to_fahrenheit(100) == 212
    assert celsius_to_fahrenheit(-40) == -40

def test_get_weather_category():
    test_cases = [
        ("clear sky", "Clear"),
        ("scattered clouds", "Clouds"),
        ("light rain", "Rain"),
        ("snow", "Snow"),
        ("thunderstorm", "Thunderstorm"),
        ("fog", "Mist"),
        ("unknown", "Clear")
    ]
    for condition, expected in test_cases:
        assert get_weather_category(condition) == expected

def test_format_temperature():
    assert format_temperature(20) == "20.0°C"
    assert format_temperature(20, 'fahrenheit') == "68.0°F"

def test_kelvin_to_celsius():
    assert kelvin_to_celsius(273.15) == 0
    assert kelvin_to_celsius(283.15) == 10

def test_kelvin_to_fahrenheit():
    assert kelvin_to_fahrenheit(273.15) == 32
    assert kelvin_to_fahrenheit(283.15) == 50

def test_format_timestamp():
    test_timestamp = 1648627200
    expected = datetime.fromtimestamp(test_timestamp, tz=timezone.utc).strftime('%Y-%m-%d %H:%M:%S')
    assert format_timestamp(test_timestamp) == expected

def test_calculate_wind_direction():
    test_cases = [(0, "N"), (45, "NE"), (90, "E"), (135, "SE"),
                  (180, "S"), (225, "SW"), (270, "W"), (315, "NW")]
    for degrees, expected in test_cases:
        assert calculate_wind_direction(degrees) == expected
