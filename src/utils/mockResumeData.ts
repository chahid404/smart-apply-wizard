import { ResumeData } from "@/types/resume";

export const generateMockResumeData = (): ResumeData => ({
  personalInfo: {
    fullName: "Alex Johnson",
    firstName: "Alex",
    lastName: "Johnson",
    role: "Senior Software Engineer",
    address: {
      streetAddress: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94101",
      country: "USA",
    },
    email: "alex.johnson@example.com",
    phone: "5551234567",
    phoneCode: "1",
    linkedIn: "linkedin.com/in/alexjohnson",
    website: "alexjohnson.com",
    gender: "male",
  },
  summary:
    "Experienced software engineer with a strong background in full-stack development and cloud technologies. Passionate about creating efficient, scalable solutions and mentoring junior developers.",
  experience: [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      startDate: "2020-06",
      endDate: "Present",
      techStack: ["React", "Node.js", "AWS"],
      description: ["Led development of cloud-based applications using React and Node.js", "Implemented CI/CD pipelines"],
    },
    {
      company: "StartUp Co",
      position: "Software Developer",
      startDate: "2018-06",
      endDate: "2020-05",
      techStack: ["JavaScript", "React"],
      description: ["Developed and maintained web applications using modern JavaScript frameworks", "Worked on front-end development"],
    },
  ],
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      graduationDate: "2020-05",
    },
    {
      institution: "Stanford University",
      degree: "Master of Science",
      field: "Software Engineering",
      graduationDate: "2022-05",
    },
  ],
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker"],
  languages: [
    {
      name: "English",
      proficiency: "Native",
    },
    {
      name: "Spanish",
      proficiency: "Intermediate",
    },
  ],
  certifications: [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2021-01",
    },
  ],
  projects: [
    {
      name: "Personal Portfolio Website",
      description: "Developed a personal portfolio website to showcase my skills and projects.",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      url: "alexjohnson.com",
    },
  ],
});
