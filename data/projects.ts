// Project details are taken from Rishi's resume and the READMEs of the
// linked public repositories. Numbers are copied, not rounded up.

export type Metric = { value: string; label: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  context?: string;
  problem: string;
  built: string[];
  stack: string[];
  metrics: Metric[];
  repo?: string;
  live?: string;
  liveNote?: string;
  /** Short note shown under the signal graphic, e.g. how the system flows. */
  flow: string[];
};

export const projects: Project[] = [
  {
    slug: "weather-safety-assistant",
    name: "Weather Safety Assistant",
    tagline: "Agentic LLM advisory system",
    problem:
      "People ask whether it is safe to cycle, hike or run in today's weather. A chatbot that guesses can confidently say \"safe\" when it shouldn't, so every answer needs to come from live data and a written safety policy.",
    built: [
      "A 9-node LangGraph workflow with per-session memory that turns a natural-language question into live Open-Meteo weather facts and cites the written safety policy behind every answer.",
      "A deterministic policy engine that evaluates 12 versioned YAML SOPs using three-valued (Kleene) logic, so missing data resolves to UNKNOWN, never a false \"safe\".",
      "A verification layer that checks every number and citation against the fetched weather values and policy thresholds, and serves a deterministic fallback answer if anything doesn't match.",
      "An LLM limited to intent extraction and wording (2 calls per turn) so injected text cannot change policy, covered by 412 deterministic tests and 26 real-LLM evals including prompt-injection attacks.",
    ],
    stack: [
      "Python",
      "LangGraph",
      "FastAPI",
      "Pydantic",
      "React",
      "Vite",
      "Open-Meteo API",
      "OpenAI-compatible LLMs",
      "pytest",
      "Render",
    ],
    metrics: [
      { value: "9", label: "graph nodes" },
      { value: "12", label: "versioned SOPs" },
      { value: "412", label: "deterministic tests" },
      { value: "26", label: "real-LLM evals" },
    ],
    flow: ["Question", "Intent (LLM)", "Live weather", "Policy engine", "Verifier", "Answer"],
    repo: "https://github.com/rishinavroop22/weather-safety-assistant",
    live: "https://weather-safety-assistant.onrender.com/",
    liveNote: "Hosted on Render's free tier; the first load can take a moment to wake up.",
  },
  {
    slug: "fitness-microservices",
    name: "Fitness Microservices App",
    tagline: "Event-driven Spring Cloud system with AI coaching",
    problem:
      "A workout log only records what happened. This app turns each logged activity into personalised feedback, without making the person wait on an AI call or coupling the tracker to the model.",
    built: [
      "Six Spring Boot 3.5 services: activity, user and AI services behind a Spring Cloud Gateway, with Eureka for service discovery and a Config Server for centralised configuration.",
      "Event-driven AI processing: the activity service validates the user, saves the activity to MongoDB and publishes it to RabbitMQ; the AI service consumes it, asks the Gemini API for an analysis and stores the recommendation.",
      "Structured AI output: the Gemini response is parsed into overall analysis, improvements, suggestions and safety guidelines, with a safe default recommendation if parsing fails.",
      "Keycloak OAuth2 at the gateway (JWT resource server) with a filter that syncs new Keycloak users into the PostgreSQL-backed user service, and a React + Redux + MUI frontend using PKCE login.",
    ],
    stack: [
      "Java",
      "Spring Boot",
      "Spring Cloud Gateway",
      "Eureka",
      "Config Server",
      "RabbitMQ",
      "MongoDB",
      "PostgreSQL",
      "Keycloak (OAuth2)",
      "Gemini API",
      "React",
      "Redux Toolkit",
      "Material UI",
      "Docker",
    ],
    metrics: [
      { value: "6", label: "Spring Boot services" },
      { value: "10", label: "activity types" },
      { value: "2", label: "databases" },
      { value: "PKCE", label: "OAuth2 login flow" },
    ],
    flow: ["Login (Keycloak)", "API gateway", "Activity service", "RabbitMQ", "AI service + Gemini", "Recommendation"],
    repo: "https://github.com/rishinavroop22/fitness-microservices",
  },
  {
    slug: "speechlens",
    name: "SpeechLens",
    tagline: "Contrastive speech analytics",
    context: "Multimodal AI Hackathon 2026, Track C",
    problem:
      "Feedback on spoken delivery is usually vague: \"slow down\", \"more energy\". SpeechLens compares a speaker with a reference reading of the same text, word by word, and points to exactly where and why the delivery differs.",
    built: [
      "Localisation of 11 delivery flaws (pace, pauses, pitch, fillers, skipped words, restarts) to a median 150 ms, each with measured evidence and a suggested fix.",
      "wav2vec2 CTC forced alignment (exact Viterbi on CPU) and speaker-normalised prosody features; deviations scored as robust z-scores against the reference speaker's own variability, with cross-validated gates.",
      "A 386-clip labelled dataset built with a PSOLA flaw-injection engine: cross-validated F1 0.66 (precision 0.82), F1 0.85 on 20 unseen speakers, 0.03 false findings per minute on clean audio.",
      "Causal verification of explanations: repairing only the named cause removes 91% of findings (\"Hear it fixed\"). Deployed with Docker on Azure Container Apps via GitHub Actions.",
    ],
    stack: [
      "Python",
      "wav2vec2 (CTC)",
      "ONNX Runtime",
      "Praat / Parselmouth",
      "librosa",
      "NumPy",
      "SciPy",
      "FastAPI",
      "Docker",
      "Azure Container Apps",
    ],
    metrics: [
      { value: "150 ms", label: "median boundary error" },
      { value: "0.85", label: "F1, 20 unseen speakers" },
      { value: "0.82", label: "precision" },
      { value: "91%", label: "findings removed by repair" },
    ],
    flow: ["Two readings", "Forced alignment", "Prosody features", "Word-paired contrast", "Flaw regions", "Evidence + fix"],
    repo: "https://github.com/rishinavroop22/speechlens",
    live: "https://rishinavroop22.github.io/speechlens/",
    liveNote: "The first analysis after a quiet period can take about a minute while the server starts.",
  },
  {
    slug: "student-performance-ai-assistant",
    name: "Student Performance Prediction & Academic Assistant",
    tagline: "ML pipeline with a model-grounded assistant",
    problem:
      "A score prediction on its own doesn't tell a student what to do next. This project predicts a student's math score and then explains, using the trained model itself, which changes would actually raise it.",
    built: [
      "An end-to-end scikit-learn Pipeline (feature engineering, imputation, one-hot encoding, scaling) predicting math scores from 1,000 student records.",
      "A comparison of 10 regressors with GridSearchCV and 5-fold CV; Ridge selected with test R² 0.88 and MAE 4.2 marks.",
      "A model-grounded NLP assistant: what-if scenarios run through the trained model, and FLAN-T5 turns only the verified gains into explanations and study recommendations, with a template fallback.",
      "A Flask REST API with a React UI at about 10 ms p50 / 15 ms p95 prediction latency; GitHub Actions trains, tests and benchmarks on every push.",
    ],
    stack: [
      "Python",
      "scikit-learn",
      "XGBoost",
      "CatBoost",
      "Pandas",
      "Hugging Face Transformers (FLAN-T5)",
      "Flask",
      "React",
      "GitHub Actions",
    ],
    metrics: [
      { value: "0.88", label: "test R²" },
      { value: "4.2", label: "MAE (marks)" },
      { value: "10", label: "models compared" },
      { value: "~10 ms", label: "p50 latency" },
    ],
    flow: ["Student record", "Pipeline", "Ridge model", "What-if runs", "FLAN-T5", "Advice"],
    repo: "https://github.com/rishinavroop22/student-performance-ai-assistant",
  },
];

/**
 * Smaller projects shown in a compact list. Only details Rishi has confirmed.
 * Add `repo` (and `live`) once the link is ready; the link appears automatically.
 */
export type MinorProject = {
  name: string;
  summary: string;
  stack: string[];
  repo?: string;
  live?: string;
};

export const otherProjects: MinorProject[] = [];
