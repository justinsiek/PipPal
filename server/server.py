from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

@app.route('/api/candlestick-data', methods=['GET'])
def get_candlestick_data():
    ticker = request.args.get('ticker', 'AAPL')
    
    # Get data from yfinance (last day of minute data)
    stock = yf.Ticker(ticker)
    df = stock.history(period='1d', interval='5m')
    
    # Take only the last 120 minutes
    df = df.tail(120)
    
    # Convert to list of dictionaries
    data = []
    for index, row in df.iterrows():
        data.append({
            "time": int(index.timestamp()),
            "open": round(float(row['Open']), 2),
            "high": round(float(row['High']), 2),
            "low": round(float(row['Low']), 2),
            "close": round(float(row['Close']), 2),
            "volume": int(row['Volume'])
        })
    
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=8080)