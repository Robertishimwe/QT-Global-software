import { useEffect, useState } from 'react';
import { fetchUserStats } from '@/services/api';
import type { UserStat } from '@/types/user';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { BarChart3, Loader2, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const UserCreationChart = () => {
  const [stats, setStats] = useState<UserStat[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await fetchUserStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
      toast({
        title: 'Error',
        description: 'Failed to load user statistics. Make sure the backend is running.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: stats.map((stat) => {
      const date = new Date(stat.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Users Created',
        data: stats.map((stat) => stat.count),
        backgroundColor: 'hsl(var(--chart-primary) / 0.8)',
        borderColor: 'hsl(var(--chart-primary))',
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: 'hsl(var(--chart-primary))',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'hsl(var(--popover))',
        titleColor: 'hsl(var(--popover-foreground))',
        bodyColor: 'hsl(var(--popover-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (items: any) => {
            const index = items[0].dataIndex;
            return new Date(stats[index].date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
          },
          label: (context: any) => {
            const count = context.parsed.y;
            return `${count} ${count === 1 ? 'user' : 'users'} created`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'hsl(var(--border) / 0.5)',
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: {
            size: 12,
          },
          stepSize: 1,
        },
      },
    },
  };

  const totalUsers = stats.reduce((sum, stat) => sum + stat.count, 0);
  const avgPerDay = stats.length > 0 ? (totalUsers / stats.length).toFixed(1) : '0';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">User Creation Analytics</h2>
            <p className="text-muted-foreground">Last 7 days statistics</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total (7 days)</p>
              <p className="text-2xl font-bold text-foreground">{totalUsers}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Per Day</p>
              <p className="text-2xl font-bold text-foreground">{avgPerDay}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Users Created Per Day</h3>
        <div className="h-80">
          <Bar data={chartData} options={options} />
        </div>
      </Card>
    </div>
  );
};
