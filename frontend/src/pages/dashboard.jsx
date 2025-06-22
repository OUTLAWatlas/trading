import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';

export default function Dashboard() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [price, setPrice] = useState(0);
  const [pattern, setPattern] = useState('None');
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      chartInstance.current = createChart(chartRef.current, {
        width: chartRef.current.clientWidth,
        height: 400,
        layout: {
          background: { color: '#000000' },
          textColor: '#FFFFFF',
        },
        grid: {
          vertLines: { color: '#444' },
          horzLines: { color: '#444' },
        },
        crosshair: {
          mode: 0,
        },
        rightPriceScale: {
          borderColor: '#666',
        },
        timeScale: {
          borderColor: '#666',
        },
      });

      const candleSeries = chartInstance.current.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      });

      // Dummy data
      candleSeries.setData([
        { time: '2024-06-20', open: 3400, high: 3420, low: 3380, close: 3395 },
        { time: '2024-06-21', open: 3395, high: 3410, low: 3375, close: 3385 },
        { time: '2024-06-22', open: 3385, high: 3405, low: 3365, close: 3390 },
      ]);

      // Optionally fetch real data here
      // fetchChartData(candleSeries);
    }

    const handleResize = () => {
      chartInstance.current?.applyOptions({
        width: chartRef.current.clientWidth,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Example API poll
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('/api/data') // Update to your backend endpoint
        .then(res => {
          setPrice(res.data.price);
          setPattern(res.data.pattern);
          setConfidence(res.data.confidence);
        })
        .catch(() => {
          setPrice(3396.4);
          setPattern('None');
          setConfidence(0);
        });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Trading Dashboard</h1>
      <div ref={chartRef} className="w-full mb-4" />
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
        <p>💰 <span className="font-bold">Price:</span> {price.toFixed(2)}</p>
        <p>📊 <span className="font-bold">Pattern:</span> {pattern} (<span className="font-bold">{confidence}%</span> confidence)</p>
      </div>
    </div>
  );
}
