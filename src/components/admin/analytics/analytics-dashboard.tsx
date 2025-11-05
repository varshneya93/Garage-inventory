'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Download, TrendingUp, Eye, MousePointer, Mail } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { cn } from '@/lib/utils';

interface AnalyticsStats {
  totalEvents: number;
  eventsByType: Array<{ event: string; count: number }>;
  topPages: Array<{ page: string; views: number }>;
  recentEvents: Array<{
    id: string;
    event: string;
    page: string | null;
    data: any;
    createdAt: string;
  }>;
}

export function AnalyticsDashboard() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  useEffect(() => {
    fetchStats();
  }, [dateRange]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        startDate: dateRange.from.toISOString(),
        endDate: dateRange.to.toISOString(),
      });

      const response = await fetch(`/api/analytics/stats?${params}`);
      const result = await response.json();

      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    if (!stats) return;

    const csvContent = [
      ['Event Type', 'Count'],
      ...stats.eventsByType.map(item => [item.event, item.count.toString()]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const getEventIcon = (event: string) => {
    switch (event) {
      case 'page_view':
        return <Eye className="h-4 w-4" />;
      case 'project_click':
      case 'blog_click':
        return <MousePointer className="h-4 w-4" />;
      case 'contact_form_submit':
      case 'contact_form_success':
        return <Mail className="h-4 w-4" />;
      default:
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getEventLabel = (event: string): string => {
    return event
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return <div>Failed to load analytics data</div>;
  }

  const pageViews = stats.eventsByType.find(e => e.event === 'page_view')?.count || 0;
  const projectClicks = stats.eventsByType.find(e => e.event === 'project_click')?.count || 0;
  const contactSubmissions = stats.eventsByType.find(e => e.event === 'contact_form_success')?.count || 0;

  return (
    <div className="space-y-6">
      {/* Header with Date Range Picker */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Track visitor engagement and portfolio performance
          </p>
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn('justify-start text-left font-normal')}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-3 space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setDateRange({ from: subDays(new Date(), 7), to: new Date() })}
                >
                  Last 7 days
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setDateRange({ from: subDays(new Date(), 30), to: new Date() })}
                >
                  Last 30 days
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setDateRange({ from: subDays(new Date(), 90), to: new Date() })}
                >
                  Last 90 days
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="outline" onClick={exportData}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All tracked interactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Unique page visits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectClicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Project interactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Forms</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contactSubmissions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Successful submissions</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Details */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Events by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Events by Type</CardTitle>
            <CardDescription>Breakdown of all tracked events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.eventsByType.map((item) => {
                const percentage = (item.count / stats.totalEvents) * 100;
                return (
                  <div key={item.event} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {getEventIcon(item.event)}
                        <span>{getEventLabel(item.event)}</span>
                      </div>
                      <span className="font-medium">{item.count}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topPages.length > 0 ? (
                stats.topPages.map((item) => {
                  const maxViews = Math.max(...stats.topPages.map(p => p.views));
                  const percentage = (item.views / maxViews) * 100;
                  return (
                    <div key={item.page} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="truncate flex-1">{item.page || '/'}</span>
                        <span className="font-medium ml-2">{item.views}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground">No page views recorded</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
          <CardDescription>Latest tracked interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.recentEvents.slice(0, 10).map((event) => (
              <div
                key={event.id}
                className="flex items-start justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-start gap-3">
                  {getEventIcon(event.event)}
                  <div>
                    <p className="text-sm font-medium">{getEventLabel(event.event)}</p>
                    {event.page && (
                      <p className="text-xs text-muted-foreground">{event.page}</p>
                    )}
                    {event.data && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {JSON.stringify(event.data).slice(0, 100)}
                      </p>
                    )}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {format(new Date(event.createdAt), 'MMM d, HH:mm')}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
