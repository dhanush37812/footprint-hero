import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, TrendingDown, Edit, Check, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: string;
  status: "active" | "completed" | "missed";
}

export const GoalSetting = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Reduce Monthly Emissions",
      target: 500,
      current: 327,
      unit: "kg CO₂",
      deadline: "End of Month",
      category: "emission",
      status: "active"
    },
    {
      id: "2", 
      title: "Daily Activity Logging",
      target: 30,
      current: 18,
      unit: "days",
      deadline: "End of Month",
      category: "activity",
      status: "active"
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    target: "",
    unit: "",
    category: ""
  });

  const goalCategories = [
    { value: "emission", label: "Emission Reduction" },
    { value: "activity", label: "Activity Logging" },
    { value: "transport", label: "Sustainable Transport" },
    { value: "energy", label: "Energy Efficiency" }
  ];

  const handleCreateGoal = () => {
    if (!newGoal.title || !newGoal.target || !newGoal.unit || !newGoal.category) {
      toast.error("Please fill in all fields");
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      target: parseFloat(newGoal.target),
      current: 0,
      unit: newGoal.unit,
      deadline: "End of Month",
      category: newGoal.category,
      status: "active"
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({ title: "", target: "", unit: "", category: "" });
    setIsCreating(false);
    toast.success("Goal created successfully!");
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return "bg-success";
    if (progress >= 75) return "bg-primary";
    if (progress >= 50) return "bg-warning";
    return "bg-muted-foreground";
  };

  const getStatusBadge = (status: string, progress: number) => {
    if (progress >= 100) return <Badge className="bg-success">Completed</Badge>;
    if (status === "active") return <Badge variant="outline">In Progress</Badge>;
    if (status === "missed") return <Badge variant="destructive">Missed</Badge>;
    return <Badge variant="secondary">{status}</Badge>;
  };

  return (
    <Card className="nature-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>Sustainability Goals</span>
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsCreating(true)}
            disabled={isCreating}
          >
            <Target className="mr-2 h-4 w-4" />
            New Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Create New Goal Form */}
        {isCreating && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Create New Goal</h4>
              <Button variant="ghost" size="sm" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Goal Title</Label>
                <Input 
                  placeholder="e.g., Reduce car usage"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={newGoal.category} onValueChange={(value) => setNewGoal(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {goalCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Target Value</Label>
                <Input 
                  type="number"
                  placeholder="100"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, target: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Unit</Label>
                <Input 
                  placeholder="e.g., kg CO₂, days, km"
                  value={newGoal.unit}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, unit: e.target.value }))}
                />
              </div>
            </div>
            
            <Button onClick={handleCreateGoal} className="w-full eco-gradient">
              <Check className="mr-2 h-4 w-4" />
              Create Goal
            </Button>
          </div>
        )}

        {/* Existing Goals */}
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = Math.min(100, (goal.current / goal.target) * 100);
            
            return (
              <div key={goal.id} className="space-y-3 p-4 border rounded-lg hover:bg-muted/30 eco-transition">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium flex items-center space-x-2">
                      <span>{goal.title}</span>
                      {getStatusBadge(goal.status, progress)}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <TrendingDown className="h-3 w-3" />
                        <span>{goal.current} / {goal.target} {goal.unit}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{goal.deadline}</span>
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{progress.toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={progress} 
                    className={`h-2 ${getProgressColor(progress)}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {goals.length === 0 && !isCreating && (
          <div className="text-center py-8 space-y-3">
            <Target className="h-12 w-12 text-muted-foreground mx-auto" />
            <h4 className="font-medium">No Goals Set</h4>
            <p className="text-sm text-muted-foreground">Create your first sustainability goal to start tracking progress</p>
            <Button onClick={() => setIsCreating(true)} className="eco-gradient">
              <Target className="mr-2 h-4 w-4" />
              Create First Goal
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
