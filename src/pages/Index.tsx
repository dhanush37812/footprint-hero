import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ActivityLogger } from "@/components/dashboard/ActivityLogger";
import { BadgeSystem } from "@/components/dashboard/BadgeSystem";
import { ImpactVisualizer } from "@/components/dashboard/ImpactVisualizer";
import { GoalSetting } from "@/components/dashboard/GoalSetting";
import { EmissionChart } from "@/components/charts/EmissionChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Leaf, 
  TrendingDown, 
  Target, 
  Zap, 
  Users, 
  Building2,
  AlertCircle,
  LogIn
} from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [userType, setUserType] = useState<"individual" | "business" | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sample data
  const statsData = {
    individual: [
      {
        title: "Monthly Emissions",
        value: "127.5 kg",
        subtitle: "CO₂ equivalent",
        change: -12,
        progress: 74,
        goal: "Save 200kg this month",
        icon: <TrendingDown className="h-4 w-4" />,
        variant: "success" as const
      },
      {
        title: "Activities Logged",
        value: "23",
        subtitle: "This month",
        change: 8,
        progress: 77,
        goal: "30 activities monthly",
        icon: <Target className="h-4 w-4" />,
        variant: "default" as const
      },
      {
        title: "Energy Efficiency",
        value: "85%",
        subtitle: "Above average",
        change: -5,
        progress: 85,
        goal: "90% efficiency target",
        icon: <Zap className="h-4 w-4" />,
        variant: "warning" as const
      }
    ],
    business: [
      {
        title: "Company Emissions",
        value: "2,450 kg",
        subtitle: "CO₂ equivalent this month",
        change: -18,
        progress: 64,
        goal: "Reduce by 25%",
        icon: <Building2 className="h-4 w-4" />,
        variant: "success" as const
      },
      {
        title: "Employee Participation",
        value: "156",
        subtitle: "Active users",
        change: 12,
        progress: 78,
        goal: "200 employees",
        icon: <Users className="h-4 w-4" />,
        variant: "default" as const
      },
      {
        title: "Operational Efficiency",
        value: "92%",
        subtitle: "Sustainability score",
        change: -3,
        progress: 92,
        goal: "95% target",
        icon: <Zap className="h-4 w-4" />,
        variant: "warning" as const
      }
    ]
  };

  const handleAuthAction = (action: "login" | "signup") => {
    toast.info(`To implement ${action}, please connect your Lovable project to Supabase for authentication functionality.`);
  };

  const handleUserTypeSelect = (type: "individual" | "business") => {
    setUserType(type);
    toast.success(`Welcome! Dashboard configured for ${type} tracking.`);
  };

  // Authentication required notice
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
        <Header />
        <main className="container py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full eco-gradient glow-green">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tight">
                  Track Your Carbon Footprint
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Monitor, reduce, and offset your environmental impact with our gamified sustainability tracker. 
                  Join thousands making a difference, one activity at a time.
                </p>
              </div>
              
              {/* Feature highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Card className="nature-shadow">
                  <CardContent className="pt-6 text-center">
                    <Target className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Smart Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                      Log activities with automatic CO₂ calculations
                    </p>
                  </CardContent>
                </Card>
                <Card className="nature-shadow">
                  <CardContent className="pt-6 text-center">
                    <Badge className="h-8 w-8 text-primary mx-auto mb-3 flex items-center justify-center">🏆</Badge>
                    <h3 className="font-semibold mb-2">Gamification</h3>
                    <p className="text-sm text-muted-foreground">
                      Earn badges and rewards for eco-friendly actions
                    </p>
                  </CardContent>
                </Card>
                <Card className="nature-shadow">
                  <CardContent className="pt-6 text-center">
                    <TrendingDown className="h-8 w-8 text-success mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Visual Impact</h3>
                    <p className="text-sm text-muted-foreground">
                      See your environmental impact in real-world terms
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* User Type Selection */}
            <Card className="nature-shadow">
              <CardHeader className="text-center">
                <CardTitle>Choose Your Tracking Profile</CardTitle>
                <CardDescription>
                  Select how you want to track your carbon footprint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Button
                    variant="outline"
                    className="h-auto p-6 flex flex-col space-y-3 eco-transition hover:scale-[1.02]"
                    onClick={() => handleUserTypeSelect("individual")}
                  >
                    <Users className="h-8 w-8 text-primary" />
                    <div className="text-center">
                      <h3 className="font-semibold">Individual Tracking</h3>
                      <p className="text-sm text-muted-foreground">
                        Track personal activities: transport, energy, food, and lifestyle
                      </p>
                    </div>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-auto p-6 flex flex-col space-y-3 eco-transition hover:scale-[1.02]"
                    onClick={() => handleUserTypeSelect("business")}
                  >
                    <Building2 className="h-8 w-8 text-primary" />
                    <div className="text-center">
                      <h3 className="font-semibold">Business Tracking</h3>
                      <p className="text-sm text-muted-foreground">
                        Monitor company operations, employee commuting, and corporate sustainability
                      </p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Authentication Notice */}
            <Card className="border-warning/20 bg-warning/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  <span>Authentication Required</span>
                </CardTitle>
                <CardDescription>
                  To save your progress, track long-term trends, and unlock all features, you'll need to set up authentication.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Connect your Lovable project to Supabase to enable secure login, data persistence, and full tracking capabilities.
                </p>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleAuthAction("login")}
                    className="flex-1"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                  <Button 
                    onClick={() => handleAuthAction("signup")}
                    className="flex-1 eco-gradient"
                  >
                    Sign Up Free
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  const currentStats = userType ? statsData[userType] : statsData.individual;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Header />
      <main className="container py-6 space-y-6">
        {/* User Type Badge */}
        {userType && (
          <div className="flex justify-center">
            <Badge className="eco-gradient text-white">
              {userType === "individual" ? "👤 Individual" : "🏢 Business"} Dashboard
            </Badge>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="log">Log Activity</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EmissionChart />
              <ImpactVisualizer />
            </div>
          </TabsContent>

          <TabsContent value="log" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ActivityLogger />
              </div>
              <div>
                <ImpactVisualizer />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <GoalSetting />
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <BadgeSystem />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
