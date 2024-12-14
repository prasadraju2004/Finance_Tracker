from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
from sklearn.preprocessing import MinMaxScaler

# Enable CORS for all routes
app = Flask(__name__)
CORS(app)

# Load model and scaler
model_path = 'expenditure_lstm_model.pkl'
with open(model_path, 'rb') as file:
    model = pickle.load(file)
scaler = MinMaxScaler()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from the frontend
        data = request.get_json()

        # Extract features from the request
        features = [data['food'], data['transport'], data['clothing'],
                    data['groceries'], data['health'], data['personal'], data['miscellaneous']]
        
        features = np.array(features).reshape(1, -1)

        # Scale the features
        features_scaled = scaler.fit_transform(features)
        features_scaled = features_scaled.reshape(features_scaled.shape[0], 1, features_scaled.shape[1])

        # Make prediction
        prediction = model.predict(features_scaled)

        # Process prediction result
        predicted_values_20x = [value * 20 + 10 for value in prediction[0]]
        prediction_data = {
            'food': f"{predicted_values_20x[0]:.2f}",
            'transport': f"{predicted_values_20x[1]:.2f}",
            'clothing': f"{predicted_values_20x[2]:.2f}",
            'groceries': f"{predicted_values_20x[3]:.2f}",
            'health': f"{predicted_values_20x[4]:.2f}",
            'personal': f"{predicted_values_20x[5]:.2f}",
            'miscellaneous': f"{predicted_values_20x[6]:.2f}",
        }

        return jsonify(prediction_data)

    except Exception as e:
        return jsonify({'error': f'Error: {str(e)}'})

if __name__ == "__main__":
    app.run(debug=True)
