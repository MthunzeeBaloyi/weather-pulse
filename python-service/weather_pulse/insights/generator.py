"""
Functions for generating personalized weather insights.
"""
import random
import json
import os

def load_recommendations():
    """Load recommendations from JSON file."""
    try:
        file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'recommendations.json')
        with open(file_path, 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        # Return default recommendations if file not found or invalid
        return {
            "clothing": {
                "freezing": "Heavy winter coat, thermal layers, gloves, scarf, and warm hat",
                "cold": "Winter coat, sweater, long pants, and a light scarf",
                "cool": "Light jacket or sweater with long pants",
                "warm": "T-shirt with light pants or shorts",
                "hot": "Light, breathable clothing, shorts, and consider a hat for sun protection"
            },
            "activities": {
                "Clear": ["Go for a hike", "Have a picnic in the park", "Visit an outdoor cafe"],
                "Clouds": ["Visit a museum", "Go shopping", "Take a scenic drive"],
                "Rain": ["Visit a cozy cafe", "Go to a movie", "Read a book at home"],
                "Snow": ["Build a snowman", "Go sledding", "Enjoy hot chocolate by the fire"],
                "Thunderstorm": ["Watch movies at home", "Visit an indoor mall", "Cook a nice meal"],
                "Drizzle": ["Visit an art gallery", "Go to a bookstore", "Try a new restaurant"],
                "Mist": ["Take atmospheric photos", "Visit a botanical garden", "Explore local shops"]
            },
            "health_tips": {
                "Clear": "Don't forget sunscreen and stay hydrated!",
                "Clouds": "Moderate UV levels - still consider sun protection.",
                "Rain": "Stay dry to avoid catching a cold.",
                "Snow": "Dress in layers and protect your extremities from the cold.",
                "Thunderstorm": "Stay indoors and away from windows during lightning.",
                "Drizzle": "Carry an umbrella and wear water-resistant shoes.",
                "Mist": "Drive carefully if visibility is reduced."
            }
        }

def get_clothing_recommendation(temp):
    """Get clothing recommendation based on temperature."""
    recommendations = load_recommendations()
    
    if temp < 0:
        category = "freezing"
    elif temp < 10:
        category = "cold"
    elif temp < 20:
        category = "cool"
    elif temp < 30:
        category = "warm"
    else:
        category = "hot"
    
    return recommendations["clothing"].get(category, recommendations["clothing"]["cool"])

def get_activity_suggestion(conditions):
    """Get activity suggestion based on weather conditions."""
    recommendations = load_recommendations()
    
    # Default to "Clear" if condition not found
    activities = recommendations["activities"].get(conditions, recommendations["activities"]["Clear"])
    return random.choice(activities)

def get_health_tip(conditions):
    """Get health tip based on weather conditions."""
    recommendations = load_recommendations()
    
    # Default to "Clear" if condition not found
    return recommendations["health_tips"].get(conditions, recommendations["health_tips"]["Clear"])

def generate_personalized_message(city, temp, conditions):
    """Generate a personalized message based on location and weather."""
    messages = [
        f"Perfect {conditions.lower()} weather in {city} at {temp:.1f}°C!",
        f"Enjoy your day in {city} with {conditions.lower()} skies.",
        f"Current conditions in {city}: {conditions} at {temp:.1f}°C.",
        f"Welcome to {city}! It's {temp:.1f}°C with {conditions.lower()} conditions."
    ]
    
    return random.choice(messages)

def generate_insights(city, temp, conditions):
    """Generate complete weather insights."""
    return {
        "clothing_recommendation": get_clothing_recommendation(temp),
        "activity_suggestion": get_activity_suggestion(conditions),
        "health_tip": get_health_tip(conditions),
        "personalized_message": generate_personalized_message(city, temp, conditions)
    }

