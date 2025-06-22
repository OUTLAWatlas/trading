import { useEffect, useState } from 'react';
import api from '../services/api';
import CandlestickChart from '../components/CandlestickChart';

function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(() => {
    api.get('/data/latest').then(res => setData(res.data));
  }, []);
  if (!data) return <div>Loading...</div>;
  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl mb-4">Trading Dashboard</h1>
      <CandlestickChart ohlc={data.ohlc} />
      <div>Price: {data.price}</div>
      <div>Pattern: {data.pattern} (Confidence: {data.confidence}%)</div>
    </div>
  );
}
export default Dashboard;
