import { createChart } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

function CandlestickChart({ ohlc }) {
  const chartContainerRef = useRef();
  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: { background: { color: '#111' }, textColor: '#DDD' },
      grid: { vertLines: { color: '#333' }, horzLines: { color: '#333' } },
    });
    const series = chart.addCandlestickSeries();
    series.setData(ohlc);
    window.addEventListener('resize', () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    });
  }, [ohlc]);
  return <div ref={chartContainerRef} />;
}
export default CandlestickChart;
    