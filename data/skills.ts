// Skills from the resume plus the additional ones Rishi confirmed.
// No ratings or percentages, on purpose.

export type SkillGroup = { title: string; note: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    note: "What I write day to day",
    items: ["Python", "Java", "C", "C++", "TypeScript", "JavaScript"],
  },
  {
    title: "Backend",
    note: "APIs, validation, services",
    items: ["FastAPI", "Flask", "Spring Boot", "Spring Cloud (Gateway, Eureka, Config)", "Keycloak / OAuth2", "Pydantic", "REST APIs"],
  },
  {
    title: "Frontend",
    note: "Interfaces for the systems above",
    items: ["React", "Next.js", "Vite", "Redux Toolkit", "Material UI"],
  },
  {
    title: "AI & machine learning",
    note: "Models, agents and evaluation",
    items: [
      "scikit-learn",
      "XGBoost",
      "NumPy",
      "Pandas",
      "Hugging Face Transformers",
      "LangGraph",
      "LangChain",
      "RAG",
      "LLM evals",
    ],
  },
  {
    title: "Speech & audio",
    note: "Signal-level analysis",
    items: ["wav2vec2", "CTC forced alignment", "Praat / Parselmouth", "librosa", "ONNX Runtime"],
  },
  {
    title: "Databases",
    note: "Relational, document, vector",
    items: ["PostgreSQL", "MongoDB", "ChromaDB"],
  },
  {
    title: "Messaging & distributed systems",
    note: "Moving work between services",
    items: ["RabbitMQ", "Kafka"],
  },
  {
    title: "Cloud, deployment & tools",
    note: "Shipping and keeping it running",
    items: [
      "Docker",
      "GitHub Actions",
      "Azure Container Apps",
      "AWS (ECS Fargate, RDS)",
      "Render",
      "Linux",
      "Git",
    ],
  },
];

export const coreCS = [
  "Data structures & algorithms",
  "OOP",
  "DBMS",
  "Operating systems",
  "Computer networks",
];
