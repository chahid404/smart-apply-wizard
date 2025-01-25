import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, Download, ExternalLink, FileText, PauseCircle, PlayCircle, RefreshCw, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApplicationDetails = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Mock data - In a real app, this would come from your backend
  const applicationStatus = "In Progress";
  const timeElapsed = "10 minutes";
  const confidenceScore = 95;
  const successRate = 90;

  // Updated screenshots array with descriptive stages of the AI application process
  const screenshots = [
    {
      url: "/placeholder.svg",
      stage: "Initial Form Analysis",
      description: "AI analyzing job application form structure",
    },
    {
      url: "/placeholder.svg",
      stage: "Resume Parsing",
      description: "Extracting relevant information from resume",
    },
    {
      url: "/placeholder.svg",
      stage: "Cover Letter Generation",
      description: "AI generating personalized cover letter",
    },
    {
      url: "/placeholder.svg",
      stage: "Form Field Population",
      description: "Automatically filling application fields",
    },
    {
      url: "/placeholder.svg",
      stage: "Final Review",
      description: "Pre-submission verification of all fields",
    },
  ];

  const steps = [
    { id: 1, status: "completed", title: "AI analyzing form fields", time: "2 minutes ago" },
    { id: 2, status: "completed", title: "Cover letter generated", time: "1 minute ago" },
    { id: 3, status: "in-progress", title: "Form submission", time: "Just now" },
  ];

  const automationLogs = [
    "Detected 5 form fields",
    "Successfully parsed resume.pdf",
    "Generated cover letter based on job description",
    "Analyzing form submission requirements",
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-sand via-mint-light/10 to-teal-light/20 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy">Application Status & Progress</h1>
            <p className="text-gray-600 mt-1">Software Engineer at TechCorp</p>
          </div>
          <Badge
            variant="secondary"
            className={`${
              applicationStatus === "In Progress"
                ? "bg-mint text-navy"
                : applicationStatus === "Error"
                ? "bg-red-500 text-white"
                : "bg-teal text-white"
            } px-3 py-1`}
          >
            {applicationStatus}
          </Badge>
        </div>

        {/* Progress Overview Card */}
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Progress Overview</CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{timeElapsed} elapsed</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Progress value={66} className="h-2" />
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.id} className="flex items-start gap-4">
                  <div
                    className={`mt-1 h-2 w-2 rounded-full ${
                      step.status === "completed" ? "bg-teal" : step.status === "in-progress" ? "bg-mint animate-pulse" : "bg-gray-300"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-navy">{step.title}</p>
                    <p className="text-sm text-gray-500">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Job Details Card */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-teal" />
              <a href="#" className="text-teal hover:underline">
                View Original Job Posting
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="text-navy">San Francisco, CA</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Job Type</h3>
                <p className="text-navy">Full-time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Screenshots Section */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Application Process Screenshots</CardTitle>
          </CardHeader>
          <CardContent>
            <Carousel className="w-full max-w-xl mx-auto">
              <CarouselContent>
                {screenshots.map((screenshot, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1 space-y-2">
                      <img src={screenshot.url} alt={`${screenshot.stage} - ${screenshot.description}`} className="w-full rounded-lg shadow-md" />
                      <div className="text-center space-y-1">
                        <h3 className="font-medium text-navy">{screenshot.stage}</h3>
                        <p className="text-sm text-gray-600">{screenshot.description}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
        </Card>

        {/* Cover Letter Section */}
        <Collapsible open={!isCollapsed} onOpenChange={setIsCollapsed}>
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
                <p className="text-gray-600">Dear Hiring Manager, I am writing to express my strong interest...</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Automation Logs */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Automation Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {automationLogs.map((log, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-teal" />
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analytics Card */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Analytics & Insights</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Success Rate</h3>
              <p className="text-2xl font-semibold text-navy">{successRate}%</p>
              <p className="text-sm text-gray-500">of similar applications succeeded</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">AI Confidence</h3>
              <p className="text-2xl font-semibold text-navy">{confidenceScore}%</p>
              <p className="text-sm text-gray-500">profile match score</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-end mt-8 animate-fade-in">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button variant="outline" onClick={() => setIsPaused(!isPaused)}>
            {isPaused ? <PlayCircle className="h-4 w-4 mr-2" /> : <PauseCircle className="h-4 w-4 mr-2" />}
            {isPaused ? "Resume" : "Pause"}
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
          <Button variant="outline" className="text-red-500 hover:bg-red-50">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Button variant="secondary">
            <Download className="h-4 w-4 mr-2" />
            Download Package
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
