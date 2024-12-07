import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {
  const [data, setData] = useState<{ element: string; count: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: interactions, error } = await supabase
        .from('user_interactions')
        .select('element, count:element')
        .group('element');
      if (error) console.error('Error fetching data:', error);
      else setData(interactions || []);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: data.map((item) => item.element),
    datasets: [
      {
        label: 'Interactions per Element',
        data: data.map((item) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }
    ]
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Bar data={chartData} />
    </div>
  );
};

export default Dashboard;
