from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf
import numpy as np
from trendlines import fit_trendlines_high_low

app = Flask(__name__)
CORS(app)

@app.route('/api/stock-data', methods=['GET'])
def get_stock_data():
    ticker = request.args.get('ticker', 'AAPL')
    
    try:
        stock = yf.Ticker(ticker)
        
        # Get candlestick data (last 120 5-minute intervals)
        df = stock.history(period='1d', interval='5m')
        df = df.tail(120)
        
        # Calculate trendlines
        high_vals = df['High'].to_numpy()
        low_vals = df['Low'].to_numpy()
        close_vals = df['Close'].to_numpy()
        support_resist = fit_trendlines_high_low(high_vals, low_vals, close_vals)
        
        candlestick_data = []
        for index, row in df.iterrows():
            candlestick_data.append({
                "time": int(index.timestamp()),
                "open": round(float(row['Open']), 2),
                "high": round(float(row['High']), 2),
                "low": round(float(row['Low']), 2),
                "close": round(float(row['Close']), 2),
                "volume": int(row['Volume'])
            })
        
        # Calculate trendline points
        x_vals = np.arange(len(candlestick_data))
        support_line = support_resist[0][0] * x_vals + support_resist[0][1]
        resist_line = support_resist[1][0] * x_vals + support_resist[1][1]
        
        latest_data = stock.history(period='1d', interval='1m').iloc[-1]
        current_price = latest_data['Close']
        
        open_price = stock.history(period='1d', interval='1d').iloc[0]['Open']
        price_change = ((current_price - open_price) / open_price) * 100
        
        return jsonify({
            'candlestickData': candlestick_data,
            'currentPrice': round(current_price, 2),
            'changePercent': round(price_change, 2),
            'trendlines': {
                'support': {
                    'slope': support_resist[0][0],
                    'intercept': support_resist[0][1]
                },
                'resistance': {
                    'slope': support_resist[1][0],
                    'intercept': support_resist[1][1]
                }
            }
        })
    except Exception as e:
        print(f"Error fetching stock data: {e}")
        return jsonify({
            'candlestickData': [],
            'currentPrice': 0,
            'changePercent': 0,
            'trendlines': None
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)