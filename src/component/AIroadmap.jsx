import React from "react";

// AI-Roadmap.jsx
// Single-file React component (JSX) that renders a structured, printable AI roadmap.
// Uses Tailwind CSS utility classes for styling. Default export is AIRoadmap component.

export default function AIRoadmap() {
  const phases = [
    {
      id: 1,
      title: "Discovery & Foundation",
      timeframe: "Weeks 0–4",
      goals: [
        "Define problem space & success metrics",
        "Gather datasets & legal/privacy check",
        "Select core ML/LLM model family",
      ],
      milestones: [
        "Written project brief & KPIs",
        "Seed dataset collected and documented",
        "Prototype training/eval pipeline skeleton",
      ],
    },
    {
      id: 2,
      title: "Prototype & Validation",
      timeframe: "Weeks 4–12",
      goals: [
        "Build minimum viable model/proof-of-concept",
        "Establish evaluation suite and baselines",
        "Quick UX prototype (if product-facing)",
      ],
      milestones: [
        "End-to-end prototype with sample data",
        "Offline evaluation vs baseline",
        "User feedback session (early testers)",
      ],
    },
    {
      id: 3,
      title: "Iteration & Scale",
      timeframe: "Months 3–9",
      goals: [
        "Improve model robustness and latency",
        "Add monitoring, logging, and model governance",
        "Prepare infra for production load",
      ],
      milestones: [
        "A/B test passes performance guardrails",
        "Model versioning + CI/CD for model deploy",
        "Automated data drift detection in place",
      ],
    },
    {
      id: 4,
      title: "Launch & Growth",
      timeframe: "Months 9–18",
      goals: [
        "Release beta and measure real-world impact",
        "Scale infra and on-call procedures",
        "Iterate using real user telemetry",
      ],
      milestones: [
        "Beta release and first 1000 users",
        "SLAs and incident playbooks documented",
        "Roadmap for next major features",
      ],
    },
  ];

  const techStack = [
    { name: "Data", items: ["Snowflake/Postgres", "S3/Blob Storage", "Data Catalog"] },
    { name: "Modeling", items: ["PyTorch/TensorFlow", "Hugging Face Transformers", "scikit-learn"] },
    { name: "Infra", items: ["Kubernetes/Serverless", "MLflow/DVC", "Pachyderm or Airflow"] },
    { name: "Monitoring", items: ["Prometheus/Grafana", "Sentry/Logs", "WhyLogs/WhyLabs"] },
    { name: "Product", items: ["React + Tailwind", "FastAPI/Express", "Piston/Code execution (opt)"] },
  ];

  const metrics = [
    { label: "Accuracy / Quality", desc: "task-dependent (F1, BLEU, ROUGE, etc.)" },
    { label: "Latency", desc: "95th percentile response time" },
    { label: "Cost", desc: "$ per 1K requests / model inference" },
    { label: "Adoption", desc: "DAU/MAU, feature usage rate" },
    { label: "Safety", desc: "Rate of harmful outputs, false positives" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 mt-9">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">AI Roadmap — Structured Plan </h1>
        <p className="mt-2 text-gray-600">A pragmatic, phase-based roadmap you can copy into your product wiki or repo README.</p>
      </header>

      <section className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-medium">Vision</h2>
          <p className="mt-2 text-gray-700">Ship a safe, useful AI feature that measurably improves the target user's workflow while staying within operational and ethical guardrails.</p>
        </div>

        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-medium">Success Metrics</h2>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            <li>Business impact: +X% task completion or time saved</li>
            <li>Model quality: target metric above baseline</li>
            <li>Operational: error budget & latency targets met</li>
          </ul>
        </div>
      </section>

      <section className="space-y-6 mb-10">
        {phases.map((phase) => (
          <article key={phase.id} className="p-5 border rounded-lg shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{phase.title}</h3>
                <div className="text-sm text-gray-500">{phase.timeframe}</div>
              </div>
              <div className="text-sm text-gray-600">Phase {phase.id}</div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <h4 className="font-medium">Goals</h4>
                <ul className="mt-2 list-disc list-inside text-gray-700">
                  {phase.goals.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium">Milestones</h4>
                <ul className="mt-2 list-disc list-inside text-gray-700">
                  {phase.milestones.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium">Action Items</h4>
                <ul className="mt-2 text-gray-700">
                  <li className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1" />
                    <span>Assign owner & ETA for phase</span>
                  </li>
                  <li className="flex items-start mt-2">
                    <input type="checkbox" className="mr-2 mt-1" />
                    <span>Build quick evaluation harness</span>
                  </li>
                  <li className="flex items-start mt-2">
                    <input type="checkbox" className="mr-2 mt-1" />
                    <span>Document data sources and schema</span>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mb-8 grid gap-6 sm:grid-cols-3">
        <div className="p-4 border rounded-lg shadow-sm">
          <h4 className="font-medium">Tech stack</h4>
          {techStack.map((t) => (
            <div key={t.name} className="mt-3">
              <div className="text-sm font-semibold">{t.name}</div>
              <ul className="text-gray-700 mt-1 list-disc list-inside">
                {t.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="p-4 border rounded-lg shadow-sm">
          <h4 className="font-medium">Key metrics</h4>
          <ul className="mt-2 text-gray-700">
            {metrics.map((m) => (
              <li key={m.label} className="mt-2">
                <div className="font-semibold">{m.label}</div>
                <div className="text-sm text-gray-600">{m.desc}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border rounded-lg shadow-sm">
          <h4 className="font-medium">Risks & Mitigations</h4>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            <li>Data quality: run labeling audits and sample reviews</li>
            <li>Model drift: schedule retrain cycles + drift detectors</li>
            <li>Cost overruns: track per-inference cost, optimize batch sizes</li>
            <li>Safety issues: build a human-in-loop escalation path</li>
          </ul>
        </div>
      </section>

      <section className="mb-12 p-5 border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold">Roadmap Checklist (copy this into your repo)</h3>
        <ol className="mt-3 list-decimal list-inside text-gray-700">
          <li>Project brief & KPIs documented</li>
          <li>Seed dataset & data contract created</li>
          <li>Prototype model and evaluation harness</li>
          <li>Basic infra + monitoring (logs, metrics)</li>
          <li>Beta release and user telemetry collection</li>
          <li>Scale, harden, and add governance</li>
        </ol>
      </section>

      <footer className="text-sm text-gray-600">
        <div className="mb-2">Next steps (practical):</div>
        <ul className="list-disc list-inside text-gray-700">
          <li>Pick a single measurable use-case and one success metric.</li>
          <li>Block 2 weeks for a focused prototype sprint.</li>
          <li>Schedule two user feedback sessions during prototype.</li>
        </ul>
      </footer>
    </div>
  );
}
