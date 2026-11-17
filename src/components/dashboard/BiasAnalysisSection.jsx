import React from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  TrendingDown,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';

export const BiasAnalysisSection = ({ experimentsData }) => {
  const experiments = experimentsData || [
    {
      id: "exp-1",
      title: "1. Subject-Only Evaluation",
      score: 100.0,
      metric: "Accuracy",
      status: "Severe Shortcut Memorization",
      severity: "critical",
      chartColor: "#ef4444",
      finding: "100.0% accuracy achieved using ONLY the 'subject' category label.",
      explanation: "In the ISOT dataset, True news categories ('politicsNews', 'worldnews') are completely disjoint from Fake news categories ('News', 'politics', 'Government News', etc.). Any model fed the subject tag learns a trivial 1-to-1 lookup table without reading any news content.",
      implication: "Exposes critical metadata leakage. Subject tags are strictly quarantined and never fed to production models."
    },
    {
      id: "exp-2",
      title: "2. Source-Marker-Only Evaluation",
      score: 99.25,
      metric: "Accuracy",
      status: "High Publisher Artifact Bias",
      severity: "warning",
      chartColor: "#f97316",
      finding: "99.25% accuracy achieved evaluating only publisher wire markers (e.g. 'WASHINGTON (Reuters) -').",
      explanation: "Nearly all genuine articles in ISOT originate from Reuters news wire services, typically preceded by dateline markers. The model latches onto '(Reuters)' as an artificial proxy for credibility.",
      implication: "Requires explicit regex publisher sanitization to ensure classifiers evaluate narrative style rather than publisher tags."
    },
    {
      id: "exp-3",
      title: "3. Source-Neutral Evaluation",
      score: 98.71,
      metric: "Accuracy",
      status: "De-biased Research Benchmark",
      severity: "info",
      chartColor: "#06b6d4",
      finding: "98.71% accuracy retained after explicit regex removal of Reuters, AP, BBC, and wire city datelines.",
      explanation: "Even with explicit source markers stripped, the model maintains high accuracy on subtle lexical patterns and punctuation frequencies.",
      implication: "Critical caveat: Source-neutral evaluation does NOT prove that all source bias has been eliminated. Latent editorial formatting remains."
    },
    {
      id: "exp-4",
      title: "4. Duplicate-Aware Evaluation",
      score: 0.0,
      metric: "Overlap Rate",
      status: "Zero Contamination Verified",
      severity: "success",
      chartColor: "#10b981",
      finding: "0.0% exact normalized text overlap detected between Fake and Real news corpuses.",
      explanation: "Hashing and fuzzy n-gram matching confirmed zero duplicate articles across the class partition.",
      implication: "Confirms corpus hygiene and prevents memorization of identical text across training and testing splits."
    },
    {
      id: "exp-5",
      title: "5. Temporal Evaluation",
      score: null,
      metric: "Not Performed",
      status: "Methodological Limitation",
      severity: "neutral",
      chartColor: "#64748b",
      finding: "Temporal chronological evaluation was not performed due to date distribution constraints.",
      explanation: "Fake and Real articles were scraped across non-continuous, asynchronous time intervals (2016-2017). An artificial chronological split created extreme class imbalance.",
      implication: "Temporal generalization CANNOT be claimed. Performance may drift when exposed to 2024-2026 political events."
    }
  ];

  const chartData = [
    { name: "Subject-Only", score: 100.0, color: "#ef4444", note: "100% Shortcut" },
    { name: "Source-Marker", score: 99.25, color: "#f97316", note: "Wire Artifact" },
    { name: "Source-Neutral", score: 98.71, color: "#06b6d4", note: "De-biased" },
    { name: "Duplicate Overlap", score: 0.0, color: "#10b981", note: "Zero Overlap" }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Research Validation & Bias Analysis
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Empirical stress tests probing shortcut learning, publisher markers, metadata leakage, and temporal limitations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
            Adversarial Audit
          </span>
        </div>
      </div>

      {/* Prominent Warning Callout */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Adversarial Stress Tests (Not Normal Production Accuracy)</span>
          </div>
          <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40 font-bold">
            Diagnostic Experiments Only
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          The experiments below are <strong>deliberate adversarial stress tests</strong> designed to probe whether algorithms are learning genuine journalistic style or merely exploiting dataset artifacts. For example, the <strong className="text-rose-400">100% subject-only score</strong> and <strong className="text-amber-400">99.25% source-marker score</strong> expose severe shortcut learning in raw data. They are <strong>NOT operational production metrics</strong>; rather, they demonstrate why subject metadata and publisher wire prefixes must be rigorously stripped from real-world inputs.
        </p>
      </div>

      {/* Bias Experiments Chart & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bar Chart */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white">Vulnerability Scores (%)</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Subject vs Marker vs Clean</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 9 }} angle={-20} textAnchor="end" />
                <YAxis stroke="#64748b" domain={[0, 105]} tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val, name, item) => [`${val}% (${item.payload.note})`, 'Result']}
                />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 text-[10px] space-y-1 font-mono text-slate-400 border border-slate-900">
            <p className="text-rose-400 font-bold">● Subject Only: 100.0% (Zero text read)</p>
            <p className="text-amber-400 font-bold">● Source Marker: 99.25% (Wire dateline)</p>
            <p className="text-cyan-400 font-bold">● Source-Neutral: 98.71% (De-biased)</p>
          </div>
        </div>

        {/* 5 Experiment Cards */}
        <div className="lg:col-span-2 space-y-3">
          {experiments.map((exp) => (
            <div
              key={exp.id}
              className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2 hover:border-slate-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 border-b border-slate-800/60 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{exp.title}</span>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold uppercase border ${
                      exp.severity === 'critical'
                        ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                        : exp.severity === 'warning'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : exp.severity === 'success'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : exp.severity === 'info'
                        ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {exp.status}
                  </span>
                </div>

                <span className="text-xs font-mono font-bold text-cyan-300">
                  {exp.score !== null ? `${exp.score}% ${exp.metric}` : exp.metric}
                </span>
              </div>

              <div className="text-xs space-y-1.5 text-slate-300">
                <p className="text-slate-200">
                  <strong className="text-slate-400">Finding:</strong> {exp.finding}
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  <strong className="text-slate-400">Mechanism:</strong> {exp.explanation}
                </p>
                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/60 text-[11px] text-cyan-300/90 font-mono">
                  &gt;&gt; {exp.implication}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Honest Research Disclaimers Box */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-cyan-400">
          <Info className="w-4 h-4" />
          <h4 className="text-xs font-bold uppercase tracking-wider">
            Important Scientific Transparency Statements
          </h4>
        </div>
        <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside leading-relaxed">
          <li>
            <strong className="text-slate-200">Source-neutral does not equal source-immune:</strong> While explicit names ("Reuters", "Associated Press") are stripped, latent syntactic cadences and professional copy-editing habits remain subtly distinct between genuine news agencies and independent conspiracy blogs.
          </li>
          <li>
            <strong className="text-slate-200">No claim of temporal generalization:</strong> Because chronological evaluation was constrained by the collection timeline, we explicitly refrain from asserting that 2016-trained models generalize indefinitely into future political news cycles without degradation.
          </li>
        </ul>
      </div>

    </div>
  );
};
