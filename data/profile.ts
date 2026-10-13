// Every value here comes from Rishi's resume (Rishi_final.pdf) or was
// confirmed directly by Rishi. Edit this file to update the site.

export const profile = {
  name: "Rishi Navroop",
  firstName: "Rishi",
  lastName: "Navroop",
  headline: "Software developer building distributed backends and verifiable AI systems.",
  intro:
    "I build backend services, machine-learning pipelines and interactive apps, with a habit of keeping the parts that must be right out of the model's hands and covering them with tests.",
  status: "Open to internships & full-time roles",
  location: "Mysuru, India",
  email: "rishinavroop@gmail.com",
  links: {
    github: "https://github.com/rishinavroop22",
    linkedin: "https://www.linkedin.com/in/rishi-navroop",
    resume: "/resume/Rishi_Navroop_Resume.pdf",
  },
  /**
   * Portrait. Put your photo at public/images/profile.jpg and set this to
   * "/images/profile.jpg". While it is null the hero shows a monogram frame.
   */
  photo: "/images/profile.jpg" as string | null,
  education: {
    degree: "B.E. in Computer Science and Engineering",
    school: "JSS Science and Technology University",
    place: "Mysuru",
    years: "2023 – 2027",
    cgpa: "8.64",
  },
  about: [
    "I'm a Computer Science undergraduate at JSS Science and Technology University in Mysuru, graduating in 2027, looking for software engineering internships and full-time roles.",
    "My main project is a Java 21 microservices system for patient management: services that talk over REST, gRPC and Kafka, JWT auth at the gateway, and AWS infrastructure defined in CDK. Alongside it I work where machine learning meets ordinary engineering: an agentic LLM assistant whose safety decisions come from a deterministic policy engine, a set of Spring Boot microservices that hand work to an AI service over RabbitMQ, a speech-analytics system that grounds every finding in measured audio, and an ML pipeline served through a small REST API with CI on every push.",
    "What ties it together is verification. I like systems that can explain why they produced an answer, fail safely when data is missing, and come with the tests to prove it.",
  ],
} as const;

export const experience = [
  {
    role: "Treasurer",
    org: "VISION, JSSSTU",
    place: "Mysuru, India",
    period: "Nov 2024 – Present",
    points: [
      "Manage budgeting and financial planning for student-led technical events, coordinating with organising teams.",
      "Lead financial planning and execution for student initiatives involving 100+ participants.",
    ],
  },
] as const;

export const achievements = [
  {
    title: "Second Runner-Up, Ideaforge 1.0 Innovation Challenge",
    org: "SJCE-STEP",
  },
] as const;
