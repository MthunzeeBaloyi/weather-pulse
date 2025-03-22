from flask import Flask, request, jsonify
from flask_cors import CORS
from weather_pulse.insights.generator import generate_insights
from weather_pulse.utils.helpers import get_weather_category

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/insights', methods=['GET'])
def get_insights():
    city = request.args.get('city', '')
    temp = float(request.args.get('temp', 0))
    conditions = request.args.get('conditions', '')
    
    print(f"Received request for city: {city}, temp: {temp}, conditions: {conditions}")
    
    # Standardize the weather condition category
    weather_category = get_weather_category(conditions)
    
    # Generate insights
    insights = generate_insights(city, temp, weather_category)
    
    print(f"Returning insights: {insights}")
    return jsonify(insights)

if __name__ == '__main__':
    print("Starting Weather Insights Service on port 5001...")
    app.run(host='0.0.0.0', port=5001, debug=True)