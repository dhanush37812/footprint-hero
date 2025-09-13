// Enhanced emission data structure based on the Excel file
export interface EmissionFactor {
  id: string;
  name: string;
  description: string;
  unit: string;
  factor: number;
  category: string;
  icon: string;
  placeholder: string;
  userType: "individual" | "business" | "both";
}

export const individualActivities: EmissionFactor[] = [
  {
    id: "electricity",
    name: "Electricity Usage",
    description: "Monthly electricity usage",
    unit: "kWh",
    factor: 0.82,
    category: "energy",
    icon: "⚡",
    placeholder: "250",
    userType: "individual"
  },
  {
    id: "cooking-gas",
    name: "Cooking Gas",
    description: "LPG cylinders or piped gas usage",
    unit: "kg",
    factor: 2.98,
    category: "energy",
    icon: "🔥",
    placeholder: "30",
    userType: "individual"
  },
  {
    id: "heating-cooling",
    name: "Heating/Cooling",
    description: "Hours of AC/heater use",
    unit: "hours",
    factor: 0.7,
    category: "energy",
    icon: "❄️",
    placeholder: "120",
    userType: "individual"
  },
  {
    id: "transport-car",
    name: "Car Transportation",
    description: "Distance traveled by car",
    unit: "km",
    factor: 0.21,
    category: "transport",
    icon: "🚗",
    placeholder: "500",
    userType: "individual"
  },
  {
    id: "transport-public",
    name: "Public Transportation",
    description: "Distance traveled by bus/train/metro",
    unit: "km",
    factor: 0.05,
    category: "transport",
    icon: "🚌",
    placeholder: "200",
    userType: "individual"
  },
  {
    id: "flights",
    name: "Air Travel",
    description: "Flight distance (economy class)",
    unit: "km",
    factor: 0.115,
    category: "transport",
    icon: "✈️",
    placeholder: "1200",
    userType: "individual"
  },
  {
    id: "food-meat",
    name: "Meat Consumption",
    description: "Weekly meat consumption",
    unit: "kg/week",
    factor: 27,
    category: "food",
    icon: "🥩",
    placeholder: "3",
    userType: "individual"
  },
  {
    id: "food-dairy",
    name: "Dairy Consumption",
    description: "Weekly dairy consumption",
    unit: "liters/week",
    factor: 2.5,
    category: "food",
    icon: "🥛",
    placeholder: "5",
    userType: "individual"
  },
  {
    id: "clothing",
    name: "Clothing Purchases",
    description: "Items purchased per month",
    unit: "items",
    factor: 60,
    category: "goods",
    icon: "👕",
    placeholder: "5",
    userType: "individual"
  },
  {
    id: "electronics",
    name: "Electronics Purchases",
    description: "Devices purchased per year",
    unit: "items",
    factor: 200,
    category: "goods",
    icon: "📱",
    placeholder: "2",
    userType: "individual"
  },
  {
    id: "deliveries",
    name: "Online Deliveries",
    description: "Orders per month",
    unit: "orders",
    factor: 1.5,
    category: "goods",
    icon: "📦",
    placeholder: "8",
    userType: "individual"
  },
  {
    id: "waste",
    name: "Household Waste",
    description: "Waste generated per week",
    unit: "kg",
    factor: 1.8,
    category: "waste",
    icon: "🗑️",
    placeholder: "10",
    userType: "individual"
  },
  {
    id: "recycling",
    name: "Recyclables",
    description: "Materials recycled per week",
    unit: "kg",
    factor: -1.5,
    category: "waste",
    icon: "♻️",
    placeholder: "3",
    userType: "individual"
  },
  {
    id: "water",
    name: "Water Usage",
    description: "Daily water consumption",
    unit: "liters",
    factor: 0.0003,
    category: "utilities",
    icon: "💧",
    placeholder: "1200",
    userType: "individual"
  },
  {
    id: "bottled-water",
    name: "Bottled Water",
    description: "Monthly bottled water consumption",
    unit: "liters",
    factor: 0.5,
    category: "utilities",
    icon: "🍼",
    placeholder: "20",
    userType: "individual"
  }
];

export const businessActivities: EmissionFactor[] = [
  {
    id: "business-electricity",
    name: "Electricity Usage",
    description: "Monthly kWh usage for operations",
    unit: "kWh",
    factor: 0.82,
    category: "energy",
    icon: "⚡",
    placeholder: "15000",
    userType: "business"
  },
  {
    id: "operational-fuel",
    name: "Operational Fuel",
    description: "Fuel for operations (diesel/petrol/gas)",
    unit: "liters",
    factor: 2.68,
    category: "energy",
    icon: "⛽",
    placeholder: "2000",
    userType: "business"
  },
  {
    id: "company-vehicles",
    name: "Company Vehicles",
    description: "Fuel used by company fleet",
    unit: "liters",
    factor: 2.31,
    category: "transport",
    icon: "🚐",
    placeholder: "500",
    userType: "business"
  },
  {
    id: "employee-commuting",
    name: "Employee Commuting",
    description: "Average daily commute distance per employee",
    unit: "km",
    factor: 0.05,
    category: "transport",
    icon: "👥",
    placeholder: "15",
    userType: "business"
  },
  {
    id: "freight-shipping",
    name: "Freight & Shipping",
    description: "Cargo transport distance",
    unit: "ton-km",
    factor: 0.09,
    category: "transport",
    icon: "🚛",
    placeholder: "10000",
    userType: "business"
  },
  {
    id: "raw-materials",
    name: "Raw Materials",
    description: "Steel, concrete, and other materials",
    unit: "tons",
    factor: 1.9,
    category: "materials",
    icon: "🏗️",
    placeholder: "50",
    userType: "business"
  },
  {
    id: "packaging",
    name: "Packaging Materials",
    description: "Plastic, cardboard packaging",
    unit: "tons",
    factor: 6.0,
    category: "materials",
    icon: "📦",
    placeholder: "2",
    userType: "business"
  },
  {
    id: "machinery",
    name: "Machinery Use",
    description: "Operating hours of heavy machinery",
    unit: "hours",
    factor: 1.2,
    category: "operations",
    icon: "⚙️",
    placeholder: "3000",
    userType: "business"
  },
  {
    id: "office-energy",
    name: "Office Energy",
    description: "Heating, cooling, lighting for office spaces",
    unit: "kWh",
    factor: 0.82,
    category: "energy",
    icon: "🏢",
    placeholder: "5000",
    userType: "business"
  },
  {
    id: "business-waste",
    name: "Business Waste",
    description: "Commercial waste generation",
    unit: "tons",
    factor: 1800,
    category: "waste",
    icon: "🗑️",
    placeholder: "5",
    userType: "business"
  },
  {
    id: "business-travel",
    name: "Business Travel",
    description: "Employee flights and business trips",
    unit: "km",
    factor: 0.115,
    category: "transport",
    icon: "✈️",
    placeholder: "50000",
    userType: "business"
  },
  {
    id: "carbon-offsets",
    name: "Carbon Offsets",
    description: "Purchased carbon offset credits",
    unit: "tons CO₂",
    factor: -1000,
    category: "offsets",
    icon: "🌱",
    placeholder: "10",
    userType: "business"
  }
];

export const getActivitiesByUserType = (userType: "individual" | "business") => {
  return userType === "individual" ? individualActivities : businessActivities;
};

export const getActivitiesByCategory = (userType: "individual" | "business") => {
  const activities = getActivitiesByUserType(userType);
  return activities.reduce((acc, activity) => {
    if (!acc[activity.category]) {
      acc[activity.category] = [];
    }
    acc[activity.category].push(activity);
    return acc;
  }, {} as Record<string, EmissionFactor[]>);
};

export const calculateEmissions = (activityId: string, value: number, userType: "individual" | "business"): number => {
  const activities = getActivitiesByUserType(userType);
  const activity = activities.find(a => a.id === activityId);
  if (!activity) return 0;
  return parseFloat((value * activity.factor).toFixed(2));
};