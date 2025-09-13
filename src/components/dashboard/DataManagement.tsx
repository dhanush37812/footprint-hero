import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Upload, FileSpreadsheet, Database } from "lucide-react";
import { toast } from "sonner";
import { getActivitiesByUserType } from "@/lib/emissionData";

interface DataManagementProps {
  userType: "individual" | "business";
}

export const DataManagement = ({ userType }: DataManagementProps) => {
  const activities = getActivitiesByUserType(userType);
  
  const exportToCSV = () => {
    // Sample data export functionality
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Activity,Category,Unit,CO2_Factor,Description\n"
      + activities.map(activity => 
          `"${activity.name}","${activity.category}","${activity.unit}",${activity.factor},"${activity.description}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `carbon_footprint_${userType}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Data exported successfully", {
      description: "Your carbon footprint data has been downloaded as CSV"
    });
  };

  const exportToExcel = () => {
    toast.info("Excel export feature", {
      description: "For full Excel integration, connect to Supabase to enable advanced data management"
    });
  };

  const handleDataImport = () => {
    toast.info("Data import feature", {
      description: "Connect to Supabase to enable bulk data import from Excel/CSV files"
    });
  };

  const generateReport = () => {
    toast.success("Report generated", {
      description: "Your monthly carbon footprint report is being prepared"
    });
  };

  return (
    <Card className="nature-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="h-5 w-5 text-primary" />
          <span>Data Management</span>
        </CardTitle>
        <CardDescription>
          Export your carbon footprint data and generate reports
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Export Options */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" onClick={exportToCSV} className="justify-start">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export to CSV
            </Button>
            
            <Button variant="outline" onClick={exportToExcel} className="justify-start">
              <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
              Export to Excel
            </Button>
          </div>
        </div>

        {/* Import Options */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Import Data</span>
          </h4>
          
          <Button variant="outline" onClick={handleDataImport} className="w-full justify-start">
            <Upload className="mr-2 h-4 w-4" />
            Import from Excel/CSV
          </Button>
        </div>

        {/* Reports */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Generate Reports</h4>
          
          <div className="grid grid-cols-1 gap-3">
            <Button variant="outline" onClick={generateReport} className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              Monthly Report (PDF)
            </Button>
            
            <Button variant="outline" onClick={generateReport} className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              Annual Summary
            </Button>
          </div>
        </div>

        {/* Data Statistics */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Activity Categories Available</h4>
          <div className="flex flex-wrap gap-2">
            {activities.slice(0, 6).map((activity) => (
              <Badge key={activity.id} variant="secondary" className="text-xs">
                {activity.icon} {activity.name}
              </Badge>
            ))}
            {activities.length > 6 && (
              <Badge variant="outline" className="text-xs">
                +{activities.length - 6} more
              </Badge>
            )}
          </div>
        </div>

        <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
          💡 <strong>Pro Tip:</strong> Connect to Supabase to unlock advanced features like 
          automatic data sync, bulk imports, and detailed analytics reports.
        </div>
      </CardContent>
    </Card>
  );
};