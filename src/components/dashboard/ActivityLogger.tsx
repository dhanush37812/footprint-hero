import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Calculator, Zap, Car, Utensils, Package, Droplets } from "lucide-react";
import { toast } from "sonner";

const activityCategories = [
  {
    id: "electricity",
    name: "Electricity Usage",
    icon: <Zap className="h-4 w-4" />,
    unit: "kWh",
    factor: 0.82,
    placeholder: "250"
  },
  {
    id: "transport-car",
    name: "Car Transportation",
    icon: <Car className="h-4 w-4" />,
    unit: "km",
    factor: 0.21,
    placeholder: "50"
  },
  {
    id: "food-meat",
    name: "Meat Consumption",
    icon: <Utensils className="h-4 w-4" />,
    unit: "kg",
    factor: 27,
    placeholder: "2"
  },
  {
    id: "deliveries",
    name: "Online Deliveries",
    icon: <Package className="h-4 w-4" />,
    unit: "orders",
    factor: 1.5,
    placeholder: "3"
  },
  {
    id: "water",
    name: "Water Usage",
    icon: <Droplets className="h-4 w-4" />,
    unit: "liters",
    factor: 0.0003,
    placeholder: "200"
  }
];

export const ActivityLogger = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  const calculateEmissions = (categoryId: string, value: number): number => {
    const category = activityCategories.find(c => c.id === categoryId);
    if (!category) return 0;
    return parseFloat((value * category.factor).toFixed(2));
  };

  const handleLogActivity = () => {
    if (!selectedCategory || !amount) {
      toast.error("Please select a category and enter an amount");
      return;
    }

    const category = activityCategories.find(c => c.id === selectedCategory);
    if (!category) return;

    const emissions = calculateEmissions(selectedCategory, parseFloat(amount));
    const activity = {
      id: Date.now(),
      category: category.name,
      amount: parseFloat(amount),
      unit: category.unit,
      emissions: emissions,
      timestamp: new Date()
    };

    setRecentActivities(prev => [activity, ...prev.slice(0, 4)]);
    setAmount("");
    setSelectedCategory("");

    toast.success(`Logged ${amount} ${category.unit} - ${emissions} kg CO₂`, {
      description: "Activity saved to your carbon footprint tracker"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="nature-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-primary" />
            <span>Log New Activity</span>
          </CardTitle>
          <CardDescription>
            Track your daily activities and see their environmental impact
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category">Activity Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select an activity category" />
              </SelectTrigger>
              <SelectContent>
                {activityCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center space-x-2">
                      {category.icon}
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount Input */}
          {selectedCategory && (
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="flex space-x-2">
                <Input
                  id="amount"
                  type="number"
                  placeholder={activityCategories.find(c => c.id === selectedCategory)?.placeholder}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1"
                />
                <Badge variant="secondary" className="flex items-center px-3">
                  {activityCategories.find(c => c.id === selectedCategory)?.unit}
                </Badge>
              </div>
            </div>
          )}

          {/* Emission Preview */}
          {selectedCategory && amount && (
            <div className="rounded-lg border p-3 bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calculator className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Estimated Emissions:</span>
                </div>
                <Badge variant="outline" className="font-mono">
                  {calculateEmissions(selectedCategory, parseFloat(amount) || 0).toFixed(2)} kg CO₂
                </Badge>
              </div>
            </div>
          )}

          <Button onClick={handleLogActivity} className="w-full eco-gradient" disabled={!selectedCategory || !amount}>
            <Plus className="mr-2 h-4 w-4" />
            Log Activity
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      {recentActivities.length > 0 && (
        <Card className="nature-shadow">
          <CardHeader>
            <CardTitle className="text-sm">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={activity.id}>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.category}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.amount} {activity.unit} • {activity.emissions} kg CO₂
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.timestamp.toLocaleTimeString()}
                  </Badge>
                </div>
                {index < recentActivities.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};