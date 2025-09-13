import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TreePine, Car, Home, Lightbulb, Recycle } from "lucide-react";
import { useState, useEffect } from "react";

interface ImpactEquivalent {
  id: string;
  icon: React.ReactNode;
  title: string;
  value: number;
  unit: string;
  description: string;
  color: string;
}

export const ImpactVisualizer = () => {
  const [totalSaved] = useState(127.5); // kg CO₂ saved this month
  const [animateNumbers, setAnimateNumbers] = useState(false);

  const equivalents: ImpactEquivalent[] = [
    {
      id: "trees",
      icon: <TreePine className="h-6 w-6" />,
      title: "Trees Planted",
      value: Math.round(totalSaved / 25), // 25kg CO₂ per tree annually
      unit: "trees",
      description: "Equivalent trees that absorb this CO₂",
      color: "text-green-600 bg-green-50"
    },
    {
      id: "driving",
      icon: <Car className="h-6 w-6" />,
      title: "Car Miles Avoided",
      value: Math.round(totalSaved / 0.4), // 0.4kg CO₂ per mile
      unit: "miles",
      description: "Distance not driven by car",
      color: "text-blue-600 bg-blue-50"
    },
    {
      id: "energy",
      icon: <Lightbulb className="h-6 w-6" />,
      title: "LED Bulbs",
      value: Math.round(totalSaved / 0.5), // 0.5kg CO₂ savings per LED vs incandescent
      unit: "bulbs",
      description: "LED bulbs switched from incandescent",
      color: "text-yellow-600 bg-yellow-50"
    },
    {
      id: "recycling",
      icon: <Recycle className="h-6 w-6" />,
      title: "Bottles Recycled",
      value: Math.round(totalSaved / 0.1), // 0.1kg CO₂ per plastic bottle
      unit: "bottles",
      description: "Plastic bottles recycled properly",
      color: "text-purple-600 bg-purple-50"
    }
  ];

  useEffect(() => {
    setAnimateNumbers(true);
  }, []);

  return (
    <Card className="nature-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TreePine className="h-5 w-5 text-success" />
          <span>Your Environmental Impact</span>
        </CardTitle>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="eco-gradient text-white font-bold">
            {totalSaved} kg CO₂ Saved
          </Badge>
          <p className="text-sm text-muted-foreground">This month</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {equivalents.map((equivalent, index) => (
            <div
              key={equivalent.id}
              className="flex items-center space-x-4 p-4 rounded-lg border bg-card hover:bg-muted/30 eco-transition"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${equivalent.color}`}>
                {equivalent.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{equivalent.title}</h4>
                  <Badge variant="secondary" className={animateNumbers ? "counter-up" : ""}>
                    {equivalent.value} {equivalent.unit}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{equivalent.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Progress */}
        <div className="mt-6 space-y-3">
          <h4 className="font-medium text-sm flex items-center space-x-2">
            <span>🌱</span>
            <span>Growing Your Green Impact</span>
          </h4>
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 ${
                  i < Math.min(5, Math.floor(totalSaved / 25))
                    ? "bg-success text-white tree-grow"
                    : "bg-muted text-muted-foreground"
                }`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <TreePine className="h-4 w-4" />
              </div>
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              Level {Math.floor(totalSaved / 25) + 1} Eco Warrior
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};