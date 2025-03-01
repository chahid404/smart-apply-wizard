import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { SignInButton, SignUpButton, useAuth } from "@clerk/clerk-react";
import { ArrowRight, Award, CheckCircle, Shield } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      navigate(routes.Applications);
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-mint/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-navy mb-6 leading-tight">
              AI-Powered Job Applications Made <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-mint">Simple</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">Apply to multiple jobs with a single click. Our AI tailors your applications to increase your chances of landing interviews by 3x.</p>
            <div className="flex flex-wrap gap-4">
              <SignUpButton mode="modal">
                <Button size="lg" className="bg-gradient-to-r from-teal to-mint hover:from-teal-light hover:to-mint-light text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button variant="outline" size="lg" className="border-navy text-navy hover:bg-navy/5">
                  Sign In
                </Button>
              </SignInButton>
            </div>
          </div>
          <div className="flex-1 max-w-xl">
            <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" alt="Person using AI job application platform" className="rounded-xl shadow-2xl w-full h-auto" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">Why Choose Our Platform?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-sand p-6 rounded-xl transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center mb-4">
                <Shield className="h-12 w-12 text-teal" />
              </div>
              <h3 className="text-xl font-semibold text-navy text-center mb-3">Smart AI Matching</h3>
              <p className="text-gray-700 text-center">Our AI matches your skills to job requirements for perfectly tailored applications.</p>
            </div>

            <div className="bg-sand p-6 rounded-xl transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-teal" />
              </div>
              <h3 className="text-xl font-semibold text-navy text-center mb-3">Apply in Seconds</h3>
              <p className="text-gray-700 text-center">Save hours on each application with our one-click apply system.</p>
            </div>

            <div className="bg-sand p-6 rounded-xl transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-teal" />
              </div>
              <h3 className="text-xl font-semibold text-navy text-center mb-3">Higher Success Rate</h3>
              <p className="text-gray-700 text-center">Users report 3x more interview invitations compared to traditional applications.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Job Search?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">Join thousands of job seekers who've already landed their dream jobs using our platform.</p>
          <SignUpButton mode="modal">
            <Button size="lg" className="bg-mint hover:bg-mint-light text-navy font-semibold transition-all duration-300">
              Start Your Free Trial
            </Button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
