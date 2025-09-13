import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Medal, Crown, Gem, Target, Calendar, TreePine } from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress: number;
  target: number;
  rarity: "bronze" | "silver" | "gold" | "platinum";
  category: "streak" | "emission" | "activity";
}

const badges: BadgeData[] = [
  {
    id: "first-steps",
    name: "First Steps",
    description: "Log your first activity",
    icon: <Target className="h-6 w-6" />,
    earned: true,
    progress: 1,
    target: 1,
    rarity: "bronze",
    category: "activity"
  },
  {
    id: "week-warrior",
    name: "Week Warrior",
    description: "Log activities for 7 consecutive days",
    icon: <Calendar className="h-6 w-6" />,
    earned: true,
    progress: 7,
    target: 7,
    rarity: "silver",
    category: "streak"
  },
  {
    id: "carbon-saver",
    name: "Carbon Saver",
    description: "Save 100 kg of CO₂ emissions",
    icon: <TreePine className="h-6 w-6" />,
    earned: false,
    progress: 45,
    target: 100,
    rarity: "gold",
    category: "emission"
  },
  {
    id: "eco-master",
    name: "Eco Master",
    description: "Maintain 30-day logging streak",
    icon: <Crown className="h-6 w-6" />,
    earned: false,
    progress: 12,
    target: 30,
    rarity: "platinum",
    category: "streak"
  }
];

export const BadgeSystem = () => {
  const [userBadges, setUserBadges] = useState(badges);
  const [recentUnlock, setRecentUnlock] = useState<string | null>(null);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "bronze": return "text-amber-600 bg-amber-50";
      case "silver": return "text-slate-500 bg-slate-50";
      case "gold": return "text-yellow-500 bg-yellow-50";
      case "platinum": return "text-purple-500 bg-purple-50";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "bronze": return <Medal className="h-4 w-4" />;
      case "silver": return <Medal className="h-4 w-4" />;
      case "gold": return <Trophy className="h-4 w-4" />;
      case "platinum": return <Gem className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    // Simulate badge unlock animation
    const unlockedBadge = userBadges.find(b => b.earned && !recentUnlock);
    if (unlockedBadge) {
      setRecentUnlock(unlockedBadge.id);
      setTimeout(() => setRecentUnlock(null), 3000);
    }
  }, [userBadges, recentUnlock]);

  const earnedBadges = userBadges.filter(b => b.earned);
  const inProgressBadges = userBadges.filter(b => !b.earned);

  return (
    <div className="space-y-6">
      {/* Earned Badges */}
      <Card className="nature-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span>Earned Badges</span>
            <Badge variant="secondary">{earnedBadges.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className={cn(
                  "flex flex-col items-center space-y-2 p-4 rounded-lg border bg-card",
                  recentUnlock === badge.id && "badge-unlock"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full",
                  getRarityColor(badge.rarity)
                )}>
                  {badge.icon}
                </div>
                <div className="text-center space-y-1">
                  <h4 className="font-medium text-sm">{badge.name}</h4>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {getRarityIcon(badge.rarity)}
                    <span className="ml-1 capitalize">{badge.rarity}</span>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* In Progress Badges */}
      <Card className="nature-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-muted-foreground" />
            <span>In Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inProgressBadges.map((badge) => (
              <div key={badge.id} className="space-y-3 p-4 rounded-lg border bg-muted/30">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full opacity-60",
                    getRarityColor(badge.rarity)
                  )}>
                    {badge.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{badge.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {getRarityIcon(badge.rarity)}
                        <span className="ml-1 capitalize">{badge.rarity}</span>
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{badge.progress}/{badge.target}</span>
                  </div>
                  <Progress 
                    value={(badge.progress / badge.target) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};