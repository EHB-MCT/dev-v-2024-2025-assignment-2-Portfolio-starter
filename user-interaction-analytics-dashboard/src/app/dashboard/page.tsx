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
  Legend,
  Colors
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { subDays } from 'date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

type DateRange = '7days' | '30days' | 'all';
type EventType = 'page_view' | 'click' | 'scroll_depth' | 'form_submission';

interface KPIData {
  totalPageViews: number;
  totalInteractions: number;
  mostPopularPage: string;
  mostFrequentEvent: string;
}

const Dashboard = () => {
  const [data, setData] = useState<{ event_type: string; count: number }[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>('7days');
  const [selectedEventTypes, setSelectedEventTypes] = useState<EventType[]>(['page_view', 'click', 'scroll_depth', 'form_submission']);
  const [kpiData, setKpiData] = useState<KPIData>({
    totalPageViews: 0,
    totalInteractions: 0,
    mostPopularPage: '',
    mostFrequentEvent: ''
  });

  const fetchData = async (range: DateRange) => {
    let query = supabase
      .from('user_interactions')
      .select('*');

    // Apply date filter
    if (range !== 'all') {
      const daysToSubtract = range === '7days' ? 7 : 30;
      const startDate = subDays(new Date(), daysToSubtract).toISOString();
      query = query.gte('timestamp', startDate);
    }

    const result = await query;

    if (result.error) {
      console.error('Error fetching data:', result.error);
      return;
    }

    if (result.data) {
      // Calculate KPIs
      const pageViews = result.data.filter(item => item.event_type === 'page_view').length;
      const pageCount = result.data.reduce((acc, curr) => {
        if (curr.event_type === 'page_view') {
          acc[curr.page] = (acc[curr.page] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      const mostVisitedPage = Object.entries(pageCount)
        .sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] || '';

      const eventCount = result.data.reduce((acc, curr) => {
        acc[curr.event_type] = (acc[curr.event_type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const mostFrequent = Object.entries(eventCount)
        .sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] || '';

      setKpiData({
        totalPageViews: pageViews,
        totalInteractions: result.data.length,
        mostPopularPage: mostVisitedPage,
        mostFrequentEvent: mostFrequent
      });

      // Process chart data
      const filteredData = result.data.filter(item => 
        selectedEventTypes.includes(item.event_type as EventType)
      );

      const counts = filteredData.reduce<Record<string, number>>((acc, curr) => {
        const eventType = curr.event_type as string;
        acc[eventType] = (acc[eventType] || 0) + 1;
        return acc;
      }, {});

      const processedData: Array<{ event_type: string; count: number }> = 
        Object.entries(counts).map(([event_type, count]) => ({
          event_type,
          count
        }));

      setData(processedData);
    }
  };

  useEffect(() => {
    fetchData(dateRange);
  }, [dateRange, selectedEventTypes]);

  const chartData = {
    labels: data.map((item) => item.event_type.replace('_', ' ')),
    datasets: [
      {
        label: 'Interactions by Type',
        data: data.map((item) => item.count),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  };

  return (
    <div className="h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="h-100 max-w-7xl mx-auto grid grid-rows-[auto,1fr] gap-4">
        {/* Top Section: Header and KPIs */}
        <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as DateRange)}
            className="rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1"
            aria-label="Select date range"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-[300px,1fr] gap-4">
          {/* Left Column: KPIs and Filters */}
          <div className="space-y-4">
            {/* KPI Cards */}
            <div className="grid grid-rows-4 gap-2">
              <div className="card bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Page Views</h3>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{kpiData.totalPageViews}</p>
              </div>
              <div className="card bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Interactions</h3>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{kpiData.totalInteractions}</p>
              </div>
              <div className="card bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Most Popular Page</h3>
                <p className="text-xl font-bold text-gray-900 dark:text-white truncate" title={kpiData.mostPopularPage || 'N/A'}>
                  {kpiData.mostPopularPage || 'N/A'}
                </p>
              </div>
              <div className="card bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Most Frequent Event</h3>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {kpiData.mostFrequentEvent?.replace('_', ' ') || 'N/A'}
                </p>
              </div>
            </div>

            {/* Event Type Filters */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Event Types</h3>
              <div className="space-y-2">
                {(['page_view', 'click', 'scroll_depth', 'form_submission'] as EventType[]).map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedEventTypes.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEventTypes([...selectedEventTypes, type]);
                        } else {
                          setSelectedEventTypes(selectedEventTypes.filter(t => t !== type));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {type.replace('_', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Chart */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <Bar options={options} data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
