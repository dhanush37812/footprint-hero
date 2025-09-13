import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingDown, TrendingUp, Calendar } from "lucide-react";
import { useState } from "react";

const weeklyData = [
  { name: "Mon", emissions: 12.5, target: 15 },
  { name: "Tue", emissions: 8.2, target: 15 },
  { name: "Wed", emissions: 14.1, target: 15 },
  { name: "Thu", emissions: 6.8, target: 15 },
  { name: "Fri", emissions: 11.3, target: 15 },
  { name: "Sat", emissions: 9.7, target: 15 },
  { name: "Sun", emissions: 5.4, target: 15 }
];

const monthlyData = [
  { name: "Jan", emissions: 285, target: 300, saved: 15 },
  { name: "Feb", emissions: 267, target: 300, saved: 33 },
  { name: "Mar", emissions: 298, target: 300, saved: 2 },
  { name: "Apr", emissions: 245, target: 300, saved: 55 },
  { name: "May", emissions: 223, target: 300, saved: 77 },
  { name: "Jun", emissions: 189, target: 300, saved: 111 }
];

const categoryData = [
  { name: "Transport", value: 45, color: "#ef4444" },
  { name: "Energy", value: 32, color: "#f97316" },
  { name: "Food", value: 28, color: "#eab308" },
  { name: "Goods", value: 18, color: "#22c55e" },
  { name: "Waste", value: 8, color: "#3b82f6" }
];

export const EmissionChart = () => {
  const [timeframe, setTimeframe] = useState("weekly");
  const [chartType, setChartType] = useState("area");

  const currentData = timeframe === "weekly" ? weeklyData : monthlyData;
  const totalEmissions = currentData.reduce((sum, item) => sum + item.emissions, 0);
  const avgEmissions = totalEmissions / currentData.length;
  const trend = currentData[currentData.length - 1].emissions < currentData[0].emissions;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-destructive">
            Emissions: {payload[0].value} kg CO₂
          </p>
          {payload[1] && (
            <p className="text-sm text-muted-foreground">
              Target: {payload[1].value} kg CO₂
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data: currentData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    if (chartType === "area") {
      return (
        <AreaChart {...commonProps}>
          <defs>
            <linearGradient id="emissionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="target"
            stroke="hsl(var(--primary))"
            fill="url(#targetGradient)"
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          <Area
            type="monotone"
            dataKey="emissions"
            stroke="hsl(var(--destructive))"
            fill="url(#emissionGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      );
    }

    if (chartType === "bar") {
      return (
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="target" fill="hsl(var(--primary) / 0.3)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="emissions" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
        </BarChart>
      );
    }

    return (
      <LineChart {...commonProps}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
        <YAxis stroke="hsl(var(--muted-foreground))" />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="target"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="emissions"
          stroke="hsl(var(--destructive))"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2 }}
        />
      </LineChart>
    );
  };

  return (
    <Card className="nature-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Emission Trends</span>
            </CardTitle>
            <CardDescription>Track your carbon footprint over time</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="area">Area</SelectItem>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {trend ? (
              <TrendingDown className="h-4 w-4 text-success" />
            ) : (
              <TrendingUp className="h-4 w-4 text-destructive" />
            )}
            <span className={`text-sm font-medium ${trend ? "text-success" : "text-destructive"}`}>
              {trend ? "Decreasing" : "Increasing"} trend
            </span>
          </div>
          <Badge variant="outline">
            Avg: {avgEmissions.toFixed(1)} kg CO₂/{timeframe === "weekly" ? "day" : "month"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="mt-6 space-y-3">
          <h4 className="font-medium text-sm">Emission Breakdown</h4>
          <div className="space-y-2">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm">{category.name}</span>
                </div>
                <Badge variant="outline" style={{ color: category.color }}>
                  {category.value} kg CO₂
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};