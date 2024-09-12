from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

def validate_symbol(symbol):
    # Simple validation: uppercase letters, numbers, and hyphen/underscore
    return symbol.replace('-', '').replace('_', '').isalnum() and symbol.isupper()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/compute-symbol', methods=['POST'])
def compute_symbol():
    try:
        data = request.json
        symbol = data['symbol']
        weight = float(data['weight'])
        interval = data['interval']

        # Input validation
        if not validate_symbol(symbol):
            return jsonify({"error": "Invalid symbol format"}), 400
        if not 0 <= weight <= 1:
            return jsonify({"error": "Weight must be between 0 and 1"}), 400

        # Fetch data from Binance API
        url = f"https://api.binance.com/api/v3/klines"
        params = {
            "symbol": symbol,
            "interval": interval,
            "limit": 100  # Fetch last 100 data points
        }
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors
        klines = response.json()

        if not klines:
            return jsonify({"error": "No data available for the specified parameters"}), 404

        result = []
        for kline in klines:
            close_time = kline[6] / 1000  # Convert to seconds
            close_price = float(kline[4])
            result.append({
                "close_time": close_time,
                "value": close_price * weight
            })

        return jsonify(result)

    except requests.RequestException as e:
        return jsonify({"error": f"Error fetching data from Binance API: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True,port=5001)