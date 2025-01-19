import { ResumeData } from "@/types/resume";

export const generateMockResumeData = (): ResumeData => ({
  personalInfo: {
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    linkedIn: "linkedin.com/in/alexjohnson",
  },
  education: [
    {
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2016-09",
      endDate: "2020-05",
    },
  ],
  experience: [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      startDate: "2020-06",
      endDate: "Present",
      description: "Led development of cloud-based applications using React and Node.js",
    },
    {
      company: "StartUp Co",
      position: "Software Developer",
      startDate: "2018-06",
      endDate: "2020-05",
      description: "Developed and maintained web applications using modern JavaScript frameworks",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
  ],
  summary: "Experienced software engineer with a strong background in full-stack development and cloud technologies. Passionate about creating efficient, scalable solutions and mentoring junior developers.",
});