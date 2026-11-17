import React, { useState } from 'react';
import {
  GitBranch,
  Layers,
  CheckCircle2,
  Cpu,
  Database,
  ArrowDown,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';

export const ArchitectureTimelineSection = ({ onNavigateSection }) => {
  const [selectedNode, setSelectedNode] = useState('ensemble');
  const [selectedTimelineStep, setSelectedTimelineStep] = useState(8);

  const architectureNodes = [
    {
      id: 'dataset',
      title: 'ISOT News Dataset',
      stage: 'Phase 1: Ingestion',
      icon: Database,
      color: 'blue',
      badge: '44,689 Records',
      summary: 'Corpus of real (21,417) and fake (23,481) political and world news articles collected from University of Victoria benchmark.',
      specs: ['Source: Reuters + Flagged Disinformation Outlets', 'Format: Title + Text Body CSV', 'Ground-truth Binary Labels: 0 (Fake), 1 (Real)']
    },
    {
      id: 'prep',
      title: 'Data Preprocessing',
      stage: 'Phase 2: Sanitization',
      icon: Layers,
      color: 'cyan',
      badge: 'Regex De-Biasing',
      summary: 'Cleans news text and systematically eliminates wire artifacts to counteract publisher shortcut learning.',
      specs: ['Explicit Reuters & AP Dateline Removal', 'URL, Email, & Punctuation Stripping', 'Case Folding & English Stop-Word Filtering']
    },
    {
      id: 'tfidf',
      title: 'TF-IDF Vectorization',
      stage: 'Phase 3: Feature Space',
      icon: Cpu,
      color: 'teal',
      badge: '50,000 Dimensions',
      summary: 'Extracts statistical n-gram token frequencies scaled by inverse document frequency to highlight distinctive vocabulary.',
      specs: ['N-Gram Range: (1, 2) Unigram + Bigram', 'Max Features: 50,000 Vocabulary Columns', 'Sublinear TF Scaling: 1 + log(tf)']
    },
    {
      id: 'models',
      title: 'Base Classifiers (3 Algorithms)',
      stage: 'Phase 4: Multi-Model Inference',
      icon: Layers,
      color: 'purple',
      badge: 'Parallel Tri-Model',
      summary: 'Three diverse machine learning classifiers trained simultaneously on the extracted TF-IDF matrix.',
      specs: [
        'Logistic Regression: L2-regularized log-loss on full 50k space (98.68% Acc)',
        'Linear SVM: Maximum-margin LinearSVC on full 50k space (98.84% Acc)',
        'Random Forest: 100 Gini decision trees on first 5k space (97.38% Acc)'
      ]
    },
    {
      id: 'ensemble',
      title: 'Hybrid Hard Majority Voting',
      stage: 'Phase 5: Decision Layer',
      icon: GitBranch,
      color: 'cyan',
      badge: 'Discrete Class Consensus',
      summary: 'Fuses class predictions using unweighted majority consensus, minimizing false negatives and enhancing recall to 99.31%.',
      specs: [
        'Consensus Rule: mode([ pred_LR, pred_SVM, pred_RF ])',
        'Output: Class 0 (FAKE) or Class 1 (REAL)',
        'Zero-Weight Hard Voting (No uncalibrated probability distortion)'
      ]
    },
    {
      id: 'eval',
      title: 'Performance & Bias Evaluation',
      stage: 'Phase 6: Scientific Audit',
      icon: CheckCircle2,
      color: 'emerald',
      badge: 'Held-Out Validation',
      summary: 'Adversarial validation across 5 experiments: subject-only, source-marker, source-neutral, duplicate-aware, and temporal testing.',
      specs: ['80/20 Stratified Held-Out Split (8,980 Samples)', 'Confusion Matrix: TP=4254, TN=4657, FP=39, FN=30', '98.71% Source-Neutral Accuracy Retained']
    },
    {
      id: 'app',
      title: 'VeriNews AI Web Application',
      stage: 'Phase 7: Production Integration',
      icon: ExternalLink,
      color: 'blue',
      badge: 'FastAPI + React',
      summary: 'Full-stack enterprise application exposing live scanner, claim graph intelligence, domain credibility, and research analytics.',
      specs: ['FastAPI Asynchronous Micro-Services', 'Vite + React 18 + Tailwind UI', 'Sub-15ms Live Ensemble Inference Latency']
    }
  ];

  const timelineSteps = [
    {
      step: 1,
      title: "Research Problem Identification",
      phase: "Conceptualization",
      date: "Milestone 1",
      desc: "Investigate rapid proliferation of automated disinformation and limitations of naive single-classifier fake news detectors.",
      deliverable: "Problem Statement & Threat Modeling Document"
    },
    {
      step: 2,
      title: "Literature Review",
      phase: "Theory & State-of-the-Art",
      date: "Milestone 2",
      desc: "Survey existing academic research on NLP text classification, deceptive syntax patterns, and ensemble voting strategies.",
      deliverable: "Taxonomy of Lexical & Stylistic Disinformation Markers"
    },
    {
      step: 3,
      title: "Research Gap Identification",
      phase: "Scientific Value",
      date: "Milestone 3",
      desc: "Identify critical publisher bias in benchmark datasets (Reuters wire datelines) that artificially inflate model performance.",
      deliverable: "Source-De-biasing Hypothesis Formulation"
    },
    {
      step: 4,
      title: "ISOT Dataset Collection",
      phase: "Corpus Ingestion",
      date: "Milestone 4",
      desc: "Acquire and consolidate 44,689 prepared articles from the University of Victoria benchmark (Fake.csv & True.csv).",
      deliverable: "Normalized Binary Label Corpus (0=Fake, 1=Real)"
    },
    {
      step: 5,
      title: "Data Preprocessing & De-Biasing",
      phase: "Feature Engineering",
      date: "Milestone 5",
      desc: "Implement regex publisher stripping to eliminate wire datelines, followed by case folding, URL removal, and stop-word filtering.",
      deliverable: "Source-Neutral Sanitized Text Pipeline"
    },
    {
      step: 6,
      title: "TF-IDF Feature Extraction",
      phase: "Vectorization",
      date: "Milestone 6",
      desc: "Generate 50,000 sublinear scaled unigram and bigram TF-IDF features to capture nuanced lexical distributions.",
      deliverable: "High-Dimensional Sparse Vectorizer Artifact"
    },
    {
      step: 7,
      title: "ML Model Training",
      phase: "Algorithm Optimization",
      date: "Milestone 7",
      desc: "Train Logistic Regression, Linear SVM (LinearSVC), and Random Forest (100 trees) under 80/20 stratified cross-validation.",
      deliverable: "Trained Base Model Package (PKL Artifacts)"
    },
    {
      step: 8,
      title: "Hybrid Majority Voting",
      phase: "Ensemble Architecture",
      date: "Milestone 8",
      desc: "Design Hard Majority Voting consensus mechanism to combine predictions, achieving 99.31% recall on the held-out test split.",
      deliverable: "Tri-Model Voting Classifier Decision Layer"
    },
    {
      step: 9,
      title: "Performance Evaluation",
      phase: "Validation & Metrics",
      date: "Milestone 9",
      desc: "Compute accuracy, precision, recall, F1-score, and confusion matrix on 8,980 held-out test articles.",
      deliverable: "Empirical Benchmark Results Table"
    },
    {
      step: 10,
      title: "Bias and Robustness Experiments",
      phase: "Adversarial Stress Testing",
      date: "Milestone 10",
      desc: "Execute 5 adversarial experiments (subject-only, source-marker, source-neutral, duplicate-aware, temporal) to identify shortcut learning.",
      deliverable: "Empirical Bias Vulnerability Report"
    },
    {
      step: 11,
      title: "Web Application Integration",
      phase: "Production Deployment",
      date: "Milestone 11",
      desc: "Integrate trained ensemble into VeriNews AI 2.0 full-stack platform with live scanner, claim intel, and analytics dashboard.",
      deliverable: "Fully Operational Enterprise System"
    }
  ];

  const activeNodeData = architectureNodes.find(n => n.id === selectedNode) || architectureNodes[4];
  const activeTimeline = timelineSteps.find(t => t.step === selectedTimelineStep) || timelineSteps[7];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              System Architecture & Research Methodology Timeline
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end data pipeline architecture and 11-stage academic research lifecycle mapping.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/30">
            Interactive Architecture & Lifecycle
          </span>
        </div>
      </div>

      {/* Part 1: Interactive Model Architecture Diagram */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Interactive Model Architecture Flow (Click Nodes to Inspect)</span>
          </h3>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
            Selected: {activeNodeData.title}
          </span>
        </div>

        {/* Visual Architecture Flow Layout */}
        <div className="space-y-3">
          
          {/* Level 1: Ingestion & Prep */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {architectureNodes.slice(0, 3).map((node) => (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedNode === node.id
                    ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-950/30'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-slate-400">
                  <span>{node.stage}</span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300 font-bold">{node.badge}</span>
                </div>
                <h4 className="text-xs font-bold text-white">{node.title}</h4>
              </div>
            ))}
          </div>

          {/* Central Down Arrow */}
          <div className="flex justify-center my-1 text-cyan-400">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>

          {/* Level 2: 3 Parallel Base Classifiers */}
          <div
            onClick={() => setSelectedNode('models')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedNode === 'models'
                ? 'bg-purple-950/40 border-purple-500/60 shadow-lg shadow-purple-950/30'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono mb-2 text-purple-400">
              <span>Phase 4: Parallel Classifier Layer</span>
              <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 font-bold">
                Tri-Model Execution
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-center">
                <span className="font-bold text-blue-400 block">Logistic Regression</span>
                <span className="text-[10px] text-slate-400 font-mono">50k TF-IDF • 98.68% Acc</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-cyan-500/40 text-center shadow-sm">
                <span className="font-bold text-cyan-300 block">Linear SVM</span>
                <span className="text-[10px] text-cyan-400 font-mono">50k TF-IDF • 98.84% Acc (Lead)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-center">
                <span className="font-bold text-teal-400 block">Random Forest</span>
                <span className="text-[10px] text-slate-400 font-mono">5k TF-IDF • 97.38% Acc</span>
              </div>
            </div>
          </div>

          {/* Central Down Arrow */}
          <div className="flex justify-center my-1 text-cyan-400">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>

          {/* Level 3: Ensemble + Evaluation + Production Application */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {architectureNodes.slice(4).map((node) => (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedNode === node.id
                    ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-950/30'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-slate-400">
                  <span>{node.stage}</span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-800 text-teal-300 font-bold">{node.badge}</span>
                </div>
                <h4 className="text-xs font-bold text-white">{node.title}</h4>
              </div>
            ))}
          </div>

        </div>

        {/* Selected Architecture Node Inspector Panel */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3 text-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">{activeNodeData.title}</span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                {activeNodeData.stage}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Node ID: #{activeNodeData.id}</span>
          </div>

          <p className="text-slate-300 leading-relaxed">{activeNodeData.summary}</p>

          <div className="space-y-1 text-[11px] font-mono text-slate-400">
            {activeNodeData.specs.map((s, idx) => (
              <p key={idx} className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">&gt;&gt;</span>
                <span>{s}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Part 2: Interactive Research Methodology Timeline (11 Steps) */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>11-Stage Research Methodology Lifecycle</span>
          </h3>
          <span className="text-[10px] font-mono text-slate-400">
            Problem Identification to Web App Integration
          </span>
        </div>

        {/* Step Selector Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {timelineSteps.map((s) => (
            <button
              key={s.step}
              onClick={() => setSelectedTimelineStep(s.step)}
              className={`px-3 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 flex-shrink-0 transition-all ${
                selectedTimelineStep === s.step
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{s.step}.</span>
              <span className="truncate max-w-[120px]">{s.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Timeline Step Details Box */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono font-bold flex items-center justify-center text-xs">
                {activeTimeline.step}
              </span>
              <h4 className="text-sm font-bold text-white">{activeTimeline.title}</h4>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              {activeTimeline.phase}
            </span>
          </div>

          <p className="text-slate-300 text-xs leading-relaxed">
            {activeTimeline.desc}
          </p>

          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">Primary Artifact / Deliverable:</span>
            <span className="text-cyan-300 font-bold">{activeTimeline.deliverable}</span>
          </div>
        </div>

        {/* Full 11-Step Progress List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {timelineSteps.map((step) => (
            <div
              key={step.step}
              onClick={() => setSelectedTimelineStep(step.step)}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                selectedTimelineStep === step.step
                  ? 'bg-cyan-950/30 border-cyan-500/50 text-white'
                  : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="w-5 h-5 rounded-md bg-slate-800 text-cyan-400 font-mono font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                {step.step}
              </span>
              <div className="space-y-0.5 min-w-0">
                <p className="font-bold truncate text-white">{step.title}</p>
                <p className="text-[10px] text-slate-500">{step.phase}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
