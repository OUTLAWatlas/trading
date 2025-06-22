import React, { useEffect, useState } from "react";
import {
  createChart
} from "lightweight-charts";
import axios from "axios";

export default function Dashboard() {
  const [price, setPrice] = useState(0);
  const [pattern, setPattern] = useState("None");
  const [confidence, setConfidence] = useState(0);
  const [chart, setChart] = useState(null);
  const [candlestickSeries, setCandlestickSeries] = useState(null);
  const [timeframe, setTimeframe] = useState("1m");

  useEffect(() => {
    const chartInstance = createChart(document.getElementById("chart"), {
      width: window.innerWidth * 0.75,
      height: 400,
      layout: {
        background: { color: "#111827" },
        textColor: "#F9FAFB"
      },
      grid: {
        vertLines: { color: "#374151" },
        horzLines: { color: "#374151" }
      },
    });
    const series = chartInstance.addCandlestickSeries();
    setChart(chartInstance);
    setCandlestickSeries(series);

    window.addEventListener("resize", () => {
      chartInstance.applyOptions({ width: window.innerWidth * 0.75 });
    });

    return () => chartInstance.remove();
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // auto-refresh every 10s
    return () => clearInterval(interval);
  }, [timeframe]);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://trading-backend-v84g.onrender.com/data/latest");
      setPrice(res.data.price);
      setPattern(res.data.pattern);
      setConfidence(res.data.confidence);
      
      const ohlc = res.data.ohlc.map((item, idx) => ({
        time: idx + 1,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      }));

      candlestickSeries && candlestickSeries.setData(ohlc);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">📈 Trading Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 bg-gray-800 rounded-lg shadow p-2">
          <div id="chart"></div>
        </div>
        <div className="bg-gray-800 rounded-lg shadow p-4">
          <div className="text-xl mb-2">💰 Price: {price.toFixed(2)}</div>
          <div className="text-lg mb-2">📊 Pattern: {pattern} ({confidence}% confidence)</div>
          <div className="mt-4">
            <button
              className="bg-blue-600 rounded px-3 py-1 mr-2 hover:bg-blue-700"
              onClick={fetchData}
            >
              🔄 Refresh
            </button>
            <select
              className="bg-gray-700 rounded px-2 py-1"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="1m">1m</option>
              <option value="5m">5m</option>
              <option value="15m">15m</option>
              <option value="1h">1h</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
