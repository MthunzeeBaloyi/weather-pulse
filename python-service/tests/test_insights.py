import pytest
from weather_pulse.insights.generator import (
    get_clothing_recommendation,
    get_activity_suggestion,
    get_health_tip
)

def test_clothing_recommendations():
    assert "coat" in get_clothing_recommendation(5)  # Cold
    assert "T-shirt" in get_clothing_recommendation(25)  # Warm

def test_activity_suggestions():
    suggestion = get_activity_suggestion("Clear")
    assert isinstance(suggestion, str)
    assert len(suggestion) > 0

def test_health_tips():
    assert "sunscreen" in get_health_tip("Clear")
    assert "dry" in get_health_tip("Rain")


