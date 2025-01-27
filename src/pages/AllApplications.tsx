import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Edit2, Eye, Filter, Grid, List, PlusCircle, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data for demonstration
const mockApplications = [
  {
    id: 1,
    jobTitle: "Senior React Developer",
    company: "Tech Corp",
    dateApplied: "2024-03-15",
    status: "submitted",
    platform: "LinkedIn",
  },
  {
    id: 2,
    jobTitle: "Frontend Engineer",
    company: "Innovation Labs",
    dateApplied: "2024-03-14",
    status: "in_progress",
    platform: "Indeed",
  },
];

const statusColors = {
  submitted: "bg-teal text-white",
  in_progress: "bg-navy text-white",
  under_review: "bg-yellow-500 text-black",
  closed: "bg-gray-500 text-white",
};

const AllApplications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    toast({
      title: "Application deleted",
      description: "The application has been successfully removed.",
    });
    console.log("Deleting application:", id);
  };

  const renderCardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockApplications.length > 0 ? (
        mockApplications.map((application) => (
          <Card key={application.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-navy">{application.jobTitle}</h3>
                  <p className="text-gray-600">{application.company}</p>
                </div>
                <Badge className={statusColors[application.status as keyof typeof statusColors]}>{application.status.replace("_", " ")}</Badge>
              </div>
              <div className="text-sm text-gray-500">Applied: {new Date(application.dateApplied).toLocaleDateString()}</div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">{application.platform}</div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => navigate(`/application/${application.id}`)} className="hover:text-navy">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-navy">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(application.id)} className="hover:bg-red-300">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
          <div className="text-gray-400 mb-4">No applications yet</div>
          <Button onClick={() => navigate("/")} className="bg-navy hover:bg-navy-light transition-colors">
            <PlusCircle className="mr-2 h-4 w-4" />
            Start New Application
          </Button>
        </div>
      )}
    </div>
  );

  const renderTableView = () => (
    <div className="w-full overflow-auto rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockApplications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">{application.jobTitle}</TableCell>
              <TableCell>{application.company}</TableCell>
              <TableCell>{new Date(application.dateApplied).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge className={statusColors[application.status as keyof typeof statusColors]}>{application.status.replace("_", " ")}</Badge>
              </TableCell>
              <TableCell>{application.platform}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => navigate(`/application/${application.id}`)} className="hover:text-navy">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-navy">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(application.id)} className="hover:bg-red-300">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy">All Applications</h1>
          <p className="text-gray-600 mt-1">Track and manage your job applications</p>
        </div>
        <Button onClick={() => navigate("/")} className="bg-navy hover:bg-navy-light transition-colors">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Application
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input placeholder="Search applications..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === "card" ? "table" : "card")} className="hover:text-navy">
            {viewMode === "card" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Applications Display */}
      {viewMode === "card" ? renderCardView() : renderTableView()}
    </div>
  );
};

export default AllApplications;
