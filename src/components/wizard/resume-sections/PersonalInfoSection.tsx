import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResumeData } from "@/types/resume";
import { User } from "lucide-react";

interface PersonalInfoSectionProps {
  personalInfo: ResumeData["personalInfo"];
  onUpdate: (
    field: keyof Omit<ResumeData["personalInfo"], "linkedIn" | "github" | "portfolio">,
    value:
      | string
      | {
          streetAddress: string;
          city: string;
          state: string;
          zipCode: string;
          country: string;
        }
      | "male"
      | "female"
  ) => void;
}

export const PersonalInfoSection = ({ personalInfo, onUpdate }: PersonalInfoSectionProps) => {
  // Helper function to ensure address updates maintain all required fields
  const updateAddress = (field: keyof ResumeData["personalInfo"]["address"], value: string) => {
    onUpdate("address", {
      streetAddress: field === "streetAddress" ? value : personalInfo.address.streetAddress || "",
      city: field === "city" ? value : personalInfo.address.city || "",
      state: field === "state" ? value : personalInfo.address.state || "",
      zipCode: field === "zipCode" ? value : personalInfo.address.zipCode || "",
      country: field === "country" ? value : personalInfo.address.country || "",
    });
  };

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 space-y-6 border shadow-sm">
      <div className="flex items-center gap-2 text-lg font-semibold text-navy">
        <User className="h-5 w-5" />
        <h3>Personal Information</h3>
      </div>

      {/* Basic Information */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold">Basic Information</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={personalInfo.firstName}
              onChange={(e) => onUpdate("firstName", e.target.value)}
              className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={personalInfo.lastName}
              onChange={(e) => onUpdate("lastName", e.target.value)}
              className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneCode">Phone Code</Label>
            <Input
              id="phoneCode"
              type="number"
              value={personalInfo.phoneCode || ""}
              onChange={(e) => onUpdate("phoneCode", e.target.value)}
              className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => onUpdate("phone", e.target.value)}
              className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => onUpdate("email", e.target.value)}
              className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select onValueChange={(value) => onUpdate("gender", value)} value={personalInfo.gender || "male"}>
              <SelectTrigger className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold">Address</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="streetAddress">Street Address</Label>
            <Input
              id="streetAddress"
              value={personalInfo.address.streetAddress || ""}
              onChange={(e) => updateAddress("streetAddress", e.target.value)}
              className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={personalInfo.address.city || ""}
              onChange={(e) => updateAddress("city", e.target.value)}
              className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={personalInfo.address.state || ""}
              onChange={(e) => updateAddress("state", e.target.value)}
              className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              value={personalInfo.address.zipCode || ""}
              onChange={(e) => updateAddress("zipCode", e.target.value)}
              className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={personalInfo.address.country || ""}
              onChange={(e) => updateAddress("country", e.target.value)}
              className="bg-white/50 border-gray-200 focus:border-teal hover:border-teal-light transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
