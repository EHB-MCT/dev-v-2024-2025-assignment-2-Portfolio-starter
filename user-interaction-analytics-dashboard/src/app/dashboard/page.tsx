'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState<{ event_type: string; count: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await supabase
        .from('user_interactions')
        .select('*');

      if (result.error) {
        console.error('Error fetching data:', result.error);
        return;
      }

      if (result.data) {
        // Group and count events by type
        const counts = result.data.reduce<Record<string, number>>((acc, curr) => {
          const eventType = curr.event_type as string;
          acc[eventType] = (acc[eventType] || 0) + 1;
          return acc;
        }, {});
        
        // Convert to array format with explicit typing
        const processedData: Array<{ event_type: string; count: number }> = 
          Object.entries(counts).map(([event_type, count]) => ({
            event_type,
            count
          }));

        setData(processedData);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: data.map((item) => item.event_type),
    datasets: [
      {
        label: 'Interactions by Type',
        data: data.map((item) => item.count),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'User Interactions Analytics'
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Analytics Dashboard
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
