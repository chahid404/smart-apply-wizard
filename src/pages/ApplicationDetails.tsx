import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Copy, Download, Edit, ExternalLink, Image, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

const ApplicationDetails = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const mockScreenshots = [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText("Cover letter content here...");
    toast({
      title: "Copied to clipboard",
      description: "The cover letter has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-sand via-mint-light/10 to-teal-light/20 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy">Application Details</h1>
            <p className="text-gray-600 mt-1">Software Engineer at TechCorp</p>
          </div>
          <Badge variant="secondary" className="bg-mint text-navy px-3 py-1">
            Submitted
          </Badge>
        </div>

        {/* Overview Card */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-teal" />
              <span>Applied on March 15, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-teal" />
              <span>Via LinkedIn</span>
            </div>
          </CardContent>
        </Card>

        {/* Cover Letter Section */}
        <Collapsible
          open={!isCollapsed}
          onOpenChange={setIsCollapsed}
          className="animate-fade-in"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>AI-Generated Cover Letter</CardTitle>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {isCollapsed ? "Show" : "Hide"}
                </Button>
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Dear Hiring Manager, I am writing to express my strong interest...
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Personal Info Section */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-700">Full Name</h3>
              <p>John Doe</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Email</h3>
              <p>john.doe@example.com</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Location</h3>
              <p>San Francisco, CA</p>
            </div>
          </CardContent>
        </Card>

        {/* Screenshots Section */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Application Screenshots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mockScreenshots.map((src, index) => (
                <Sheet key={index}>
                  <SheetTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative aspect-video rounded-lg overflow-hidden cursor-pointer border hover:border-teal transition-colors"
                    >
                      <Image className="absolute top-2 right-2 h-4 w-4 text-gray-500" />
                      <img
                        src={src}
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[90vw] sm:w-[600px]">
                    <SheetHeader>
                      <SheetTitle>Screenshot {index + 1}</SheetTitle>
                      <SheetDescription>
                        Application step captured by AI
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <img
                        src={src}
                        alt={`Full Screenshot ${index + 1}`}
                        className="w-full rounded-lg"
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8 animate-fade-in">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="secondary">
            <Download className="h-4 w-4 mr-2" />
            Download Screenshots
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;