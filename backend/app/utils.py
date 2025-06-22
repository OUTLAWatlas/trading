import yfinance as yf

def get_live_data():
    ticker = yf.Ticker("GC=F")
    hist = ticker.history(period="1d", interval="5m")
    ohlc = [{"time": int(idx.timestamp()), "open": row.Open, "high": row.High,
             "low": row.Low, "close": row.Close} for idx, row in hist.iterrows()]
    price = hist.Close.iloc[-1] if not hist.empty else 0
    return price, ohlc, {}

def detect_pattern(ohlc):
    if not ohlc: return "None", 0
    last = ohlc[-1]
    if last['close'] > last['open']: return "Bullish Engulfing", 75
    return "None", 0

def calculate_risk(data):
    capital = float(data.get("capital", 0))
    risk_pct = float(data.get("risk", 1)) / 100
    rr = float(data.get("rr", 1))
    risk_amt = capital * risk_pct
    lot_size = risk_amt / 100
    return {"lot_size": round(lot_size,2), "sl": 100, "target": 100 * rr}
