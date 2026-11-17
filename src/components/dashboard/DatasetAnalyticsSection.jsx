import React from 'react';
import {
  Database,
  PieChart as PieIcon,
  Layers,
  FileText,
  Filter,
  CheckCircle2,
  ArrowRight,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';

export const DatasetAnalyticsSection = ({ datasetData }) => {
  const data = datasetData || {
    dataset_name: "ISOT Fake News Dataset (University of Victoria)",
    prepared_records: 44689,
    raw_records: 44898,
    classes: [
      { name: "Fake News", count: 23481, percentage: 52.3, color: "#f43f5e" },
      { name: "Real News", count: 21417, percentage: 47.7, color: "#10b981" }
    ],
    subject_distribution: [
      { subject: "politicsNews (True)", count: 11272, class: "Real", fill: "#10b981" },
      { subject: "worldnews (True)", count: 10145, class: "Real", fill: "#059669" },
      { subject: "News (Fake)", count: 9050, class: "Fake", fill: "#f43f5e" },
      { subject: "politics (Fake)", count: 6841, class: "Fake", fill: "#e11d48" },
      { subject: "left-news (Fake)", count: 4459, class: "Fake", fill: "#be123c" },
      { subject: "Government News (Fake)", count: 1570, class: "Fake", fill: "#9f1239" },
      { subject: "US_News (Fake)", count: 783, class: "Fake", fill: "#881337" },
      { subject: "Middle-east (Fake)", count: 778, class: "Fake", fill: "#4c0519" }
    ],
    preprocessing_pipeline: [
      { step: 1, title: "Corpus Consolidation", desc: "Ingest Fake.csv (23,481) & True.csv (21,417); concatenate headline and article text." },
      { step: 2, title: "Source-Marker Sanitization", desc: "Strip publisher wire artifacts (e.g. 'WASHINGTON (Reuters) -') to counter wire dateline memorization." },
      { step: 3, title: "Text De-biasing & Normalization", desc: "Lowercase transformation, URL/email/handle removal, and standard punctuation filtering." },
      { step: 4, title: "Stop-Word Filtering", desc: "Eliminate standard English stop words that carry negligible semantic or stylistic discriminative power." },
      { step: 5, title: "TF-IDF Vectorization", desc: "Construct 50,000 sublinear scaled n-gram (1,2) features for high-dimensional representation." },
      { step: 6, title: "Feature Subspace Slicing", desc: "Deploy full 50k space to LR & SVM; slice first 5k principal components to Random Forest." }
    ]
  };

  const classData = [
    { name: "Fake News (Label 0)", count: 23481, value: 52.3, color: "#f43f5e" },
    { name: "Real News (Label 1)", count: 21417, value: 47.7, color: "#10b981" }
  ];

  const subjectsData = [
    { subject: "politicsNews", count: 11272, label: "Real" },
    { subject: "worldnews", count: 10145, label: "Real" },
    { subject: "News", count: 9050, label: "Fake" },
    { subject: "politics", count: 6841, label: "Fake" },
    { subject: "left-news", count: 4459, label: "Fake" },
    { subject: "Govt News", count: 1570, label: "Fake" },
    { subject: "US_News", count: 783, label: "Fake" },
    { subject: "Middle-east", count: 778, label: "Fake" }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              ISOT Benchmark Dataset Analytics & Preprocessing
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Corpus structure, class balance, subject distributions, and de-biasing data preparation workflow.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/30">
            University of Victoria
          </span>
        </div>
      </div>

      {/* 4 Dataset Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Prepared Records</span>
          <p className="text-3xl font-black text-white font-mono">{data.prepared_records.toLocaleString()}</p>
          <p className="text-[11px] text-cyan-400 font-medium">Clean, deduplicated research corpus</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-rose-500/20 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400">Fake News Corpus (Label 0)</span>
          <p className="text-3xl font-black text-rose-400 font-mono">23,481</p>
          <p className="text-[11px] text-slate-400">52.3% of total corpus (Fake.csv)</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Real News Corpus (Label 1)</span>
          <p className="text-3xl font-black text-emerald-400 font-mono">21,417</p>
          <p className="text-[11px] text-slate-400">47.7% of total corpus (True.csv)</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-300">Feature Dimensions</span>
          <p className="text-3xl font-black text-cyan-300 font-mono">50,000</p>
          <p className="text-[11px] text-slate-400">Sublinear TF-IDF (1,2) N-Grams</p>
        </div>
      </div>

      {/* Verified Reconciliation Panel: 44,689 Prepared vs 44,898 Raw Records */}
      <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 space-y-3 bg-gradient-to-r from-slate-900/90 via-cyan-950/20 to-slate-900/90">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Dataset Verification & Record Count Reconciliation
            </h3>
          </div>
          <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            CSV File Integrity Verified
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">True.csv Rows</span>
            <span className="text-emerald-400 font-bold text-base">21,417</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Real wire articles</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">Fake.csv Rows</span>
            <span className="text-rose-400 font-bold text-base">23,481</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Flagged hoaxes/blogs</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">Total Raw Rows</span>
            <span className="text-cyan-300 font-bold text-base">44,898</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Physical lines on disk</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30">
            <span className="text-[10px] text-slate-500 uppercase block">Clean Prepared</span>
            <span className="text-cyan-400 font-bold text-base">44,689</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">(-209 duplicates removed)</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed pt-1">
          <strong>Why do both numbers exist?</strong> The physical dataset on disk contains <strong className="text-white">44,898 raw records</strong> (21,417 in True.csv + 23,481 in Fake.csv). During data ingestion and source-neutral preprocessing, exact string duplicate pairs and empty/unparsed records are systematically filtered out (<strong className="text-cyan-300">209 duplicate records removed</strong>), yielding the exact benchmark corpus of <strong className="text-white">44,689 unique prepared articles</strong> used in training, cross-validation, and evaluation. Neither number is an error.
        </p>
      </div>

      {/* Charts Grid: Class Donut & Subject Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Fake vs Real News Donut Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-cyan-400" />
              <span>Binary Class Distribution</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Near-Balanced 52/48 Split</span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={classData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {classData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val, name, item) => [`${val.toLocaleString()} articles (${item.payload.value}%)`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between">
              <span className="text-xs text-rose-300 font-semibold">Fake News (0)</span>
              <span className="text-xs font-mono font-bold text-rose-400">52.3%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
              <span className="text-xs text-emerald-300 font-semibold">Real News (1)</span>
              <span className="text-xs font-mono font-bold text-emerald-400">47.7%</span>
            </div>
          </div>
        </div>

        {/* Dataset Subject Breakdown Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>ISOT Subject Metadata Distribution</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">8 Distinct Categories</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectsData} layout="vertical" margin={{ top: 5, right: 20, left: 25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis dataKey="subject" type="category" stroke="#64748b" tick={{ fontSize: 10 }} width={75} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val, name, item) => [`${val.toLocaleString()} articles (${item.payload.label})`, 'Volume']}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {subjectsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.label === 'Real' ? '#10b981' : '#f43f5e'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Real: politicsNews, worldnews
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              Fake: News, politics, left-news, etc.
            </span>
          </div>
        </div>

      </div>

      {/* 6-Stage Preprocessing Pipeline Visualization */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Data Preprocessing & De-Biasing Workflow</h3>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
            6 Sequential Stages
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.preprocessing_pipeline.map((p) => (
            <div
              key={p.step}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 relative group hover:border-cyan-500/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center">
                  {p.step}
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">
                  Phase {p.step}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                {p.title}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
