import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calculator } from "lucide-react";
import { toast } from "sonner";
import { getActivitiesByCategory, calculateEmissions, type EmissionFactor } from "@/lib/emissionData";

interface EnhancedActivityLoggerProps {
  userType: "individual" | "business";
}

export const EnhancedActivityLogger = ({ userType }: EnhancedActivityLoggerProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [amount, setAmount] = useState("");
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  const categorizedActivities = getActivitiesByCategory(userType);
  const categoryKeys = Object.keys(categorizedActivities);

  const getCategoryIcon = (category: string) => {
    const icons = {
      energy: "⚡",
      transport: "🚗",
      food: "🍽️",
      goods: "🛍️",
      waste: "♻️",
      utilities: "💧",
      materials: "🏗️",
      operations: "⚙️",
      offsets: "🌱"
    };
    return icons[category as keyof typeof icons] || "📊";
  };

  const getCategoryName = (category: string) => {
    const names = {
      energy: "Energy & Utilities",
      transport: "Transportation",
      food: "Food & Diet",
      goods: "Goods & Services",
      waste: "Waste Management",
      utilities: "Water & Utilities",
      materials: "Raw Materials",
      operations: "Business Operations",
      offsets: "Carbon Offsets"
    };
    return names[category as keyof typeof names] || category;
  };

  const selectedActivityData = selectedActivity 
    ? categorizedActivities[selectedCategory]?.find(a => a.id === selectedActivity)
    : null;

  const handleLogActivity = () => {
    if (!selectedCategory || !selectedActivity || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    const activityData = selectedActivityData;
    if (!activityData) return;

    const emissions = calculateEmissions(selectedActivity, parseFloat(amount), userType);
    const activity = {
      id: Date.now(),
      category: getCategoryName(selectedCategory),
      name: activityData.name,
      amount: parseFloat(amount),
      unit: activityData.unit,
      emissions: Math.abs(emissions),
      isOffset: emissions < 0,
      timestamp: new Date()
    };

    setRecentActivities(prev => [activity, ...prev.slice(0, 4)]);
    setAmount("");
    setSelectedActivity("");
    setSelectedCategory("");

    if (emissions < 0) {
      toast.success(`Great! You offset ${Math.abs(emissions)} kg CO₂`, {
        description: "This positive action reduces your carbon footprint"
      });
    } else {
      toast.success(`Logged ${amount} ${activityData.unit} - ${emissions} kg CO₂`, {
        description: "Activity saved to your carbon footprint tracker"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="nature-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-primary" />
            <span>Enhanced Activity Logger</span>
            <Badge variant="outline" className="eco-gradient text-white">
              {userType === "individual" ? "👤 Personal" : "🏢 Business"}
            </Badge>
          </CardTitle>
          <CardDescription>
            {userType === "individual" 
              ? "Track your personal activities and their environmental impact"
              : "Monitor your business operations and corporate carbon footprint"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 h-auto">
              {categoryKeys.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="flex flex-col items-center space-y-1 p-3 data-[state=active]:eco-gradient data-[state=active]:text-white"
                >
                  <span className="text-lg">{getCategoryIcon(category)}</span>
                  <span className="text-xs">{getCategoryName(category)}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {categoryKeys.map((category) => (
              <TabsContent key={category} value={category} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="activity">Activity Type</Label>
                  <Select value={selectedActivity} onValueChange={setSelectedActivity}>
                    <SelectTrigger className="bg-background/50 backdrop-blur-sm">
                      <SelectValue placeholder={`Select a ${getCategoryName(category).toLowerCase()} activity`} />
                    </SelectTrigger>
                    <SelectContent className="bg-background/95 backdrop-blur-sm border shadow-lg z-50">
                      {categorizedActivities[category]?.map((activity) => (
                        <SelectItem key={activity.id} value={activity.id}>
                          <div className="flex items-center space-x-2">
                            <span>{activity.icon}</span>
                            <div className="flex flex-col">
                              <span>{activity.name}</span>
                              <span className="text-xs text-muted-foreground">{activity.description}</span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedActivity && selectedActivityData && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="amount"
                          type="number"
                          placeholder={selectedActivityData.placeholder}
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="flex-1"
                        />
                        <Badge variant="secondary" className="flex items-center px-3">
                          {selectedActivityData.unit}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {selectedActivityData.description}
                      </p>
                    </div>

                    {amount && (
                      <div className="rounded-lg border p-4 bg-muted/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Calculator className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {selectedActivityData.factor < 0 ? "CO₂ Offset:" : "Estimated Emissions:"}
                            </span>
                          </div>
                          <Badge 
                            variant={selectedActivityData.factor < 0 ? "default" : "outline"} 
                            className={selectedActivityData.factor < 0 ? "bg-success text-white" : "font-mono"}
                          >
                            {Math.abs(calculateEmissions(selectedActivity, parseFloat(amount) || 0, userType)).toFixed(2)} kg CO₂
                            {selectedActivityData.factor < 0 && " 🌱"}
                          </Badge>
                        </div>
                        {selectedActivityData.factor < 0 && (
                          <p className="text-xs text-success mt-2">
                            ✨ This activity helps reduce your carbon footprint!
                          </p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            ))}
          </Tabs>

          <Button 
            onClick={handleLogActivity} 
            className="w-full eco-gradient" 
            disabled={!selectedCategory || !selectedActivity || !amount}
          >
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
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium">{activity.name}</p>
                      {activity.isOffset && (
                        <Badge className="bg-success text-white text-xs">Offset 🌱</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {activity.amount} {activity.unit} • {activity.emissions} kg CO₂
                      {activity.isOffset ? " offset" : " emitted"}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.category}</p>
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