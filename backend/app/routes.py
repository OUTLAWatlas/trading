from flask import Blueprint, request, jsonify
from .utils import get_live_data, detect_pattern, calculate_risk

api = Blueprint('api', __name__)

@api.route('/data/latest')
def data_latest():
    price, ohlc, indicators = get_live_data()
    pattern, confidence = detect_pattern(ohlc)
    return jsonify({
        "price": price,
        "ohlc": ohlc,
        "indicators": indicators,
        "pattern": pattern,
        "confidence": confidence
    })

@api.route('/risk-calc', methods=['POST'])
def risk_calc():
    data = request.json
    result = calculate_risk(data)
    return jsonify(result)
