import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart2,
  PieChart as PieIcon,
  ShieldAlert,
  Zap,
  Download,
  Filter,
  Search,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  Legend
} from 'recharts';

export const DetectionTrendsSection = ({ detectionData, isDemo, scansList }) => {
  const [timeFilter, setTimeFilter] = useState('7d');
  const [predictionFilter, setPredictionFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const data = detectionData || {
    total_scans: 148,
    real_news_count: 86,
    fake_news_count: 62,
    high_risk_count: 42,
    daily_activity: [
      { day: "Mon", scans: 18, real: 11, fake: 7, risk: 38 },
      { day: "Tue", scans: 24, real: 15, fake: 9, risk: 45 },
      { day: "Wed", scans: 31, real: 18, fake: 13, risk: 52 },
      { day: "Thu", scans: 28, real: 17, fake: 11, risk: 40 },
      { day: "Fri", scans: 36, real: 22, fake: 14, risk: 48 },
      { day: "Sat", scans: 22, real: 14, fake: 8, risk: 35 },
      { day: "Sun", scans: 19, real: 12, fake: 7, risk: 32 },
    ],
    risk_distribution: [
      { name: "Low Risk (0-25)", count: 58, color: "#10b981" },
      { name: "Moderate (26-50)", count: 48, color: "#f59e0b" },
      { name: "High Risk (51-75)", count: 28, color: "#f97316" },
      { name: "Critical (76-100)", count: 14, color: "#ef4444" },
    ],
    confidence_distribution: [
      { range: "90% - 100%", count: 86, category: "High Confidence" },
      { range: "75% - 89%", count: 42, category: "Moderate Confidence" },
      { range: "50% - 74%", count: 15, category: "Low Confidence" },
      { range: "< 50%", count: 5, category: "Model Disagreement" },
    ],
    top_triggers: [
      { trigger: "Miracle / Secret Cure", count: 34, category: "Health Misinfo" },
      { trigger: "Urgent Share / Forward This", count: 29, category: "Viral Clickbait" },
      { trigger: "Illuminati / Secret Society", count: 22, category: "Conspiracy" },
      { trigger: "Excessive Punctuation (!!!)", count: 19, category: "Stylistic" },
      { trigger: "Guaranteed 100% / Free Crypto", count: 17, category: "Financial Scam" },
    ],
  };

  // Export current scan telemetry to CSV
  const handleExportCSV = () => {
    const rows = [
      ["Metric", "Value", "Notes"],
      ["Total Audited Scans", data.total_scans, isDemo ? "DEMO BASELINE" : "LIVE TELEMETRY"],
      ["Real News Count", data.real_news_count, "Legitimate Journalism"],
      ["Fake News Count", data.fake_news_count, "Flagged Misinformation"],
      ["High-Risk Count", data.high_risk_count, "Risk Score >= 50"],
      [],
      ["Day", "Total Scans", "Real News", "Fake News", "Avg Risk Score"],
      ...(data.daily_activity || []).map(d => [d.day, d.scans, d.real, d.fake, d.risk]),
      [],
      ["Risk Tier", "Sample Count"],
      ...(data.risk_distribution || []).map(r => [r.name, r.count]),
      [],
      ["Top Linguistic Trigger", "Frequency Hits", "Category"],
      ...(data.top_triggers || []).map(t => [t.trigger, t.count, t.category])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `verinews_detection_analytics_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              News Detection Analytics & Scanning Telemetry
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time inference trajectories, threat classification distributions, and lexical manipulation patterns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isDemo ? (
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase font-bold">
              ● DEMO DATA (NO DATABASE SCANS RECORDED)
            </span>
          ) : (
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase font-bold">
              ● LIVE SCANS AUDITED ({data.total_scans})
            </span>
          )}
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-2 transition-all shadow-md shadow-cyan-900/30"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400 font-bold flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Time Window:</span>
          </span>
          {['24h', '7d', '30d', 'all'].map(t => (
            <button
              key={t}
              onClick={() => setTimeFilter(t)}
              className={`px-2.5 py-1 rounded-lg font-mono font-medium transition-all ${
                timeFilter === t
                  ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-bold">Verdict Filter:</span>
          {['ALL', 'REAL', 'FAKE'].map(p => (
            <button
              key={p}
              onClick={() => setPredictionFilter(p)}
              className={`px-2.5 py-1 rounded-lg font-mono font-medium transition-all ${
                predictionFilter === p
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Charts Grid: Daily Trajectory & Threat Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Daily Scan Activity Area Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Daily Scanning Volume & Class Composition</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Real vs Fake news trajectories</p>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              Last 7 Days
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.daily_activity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scanGradReal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="scanGradFake" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area type="monotone" dataKey="real" stroke="#10b981" fillOpacity={1} fill="url(#scanGradReal)" name="Real News" />
                <Area type="monotone" dataKey="fake" stroke="#f43f5e" fillOpacity={1} fill="url(#scanGradFake)" name="Fake News" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4-Tier Threat Category Distribution Bar Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>4-Tier Threat Category Distribution</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Composite risk breakdown (0–100)</p>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Total: {data.total_scans}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.risk_distribution} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 9 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val) => [`${val} scans`, 'Volume']}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {data.risk_distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Confidence Distribution & Frequently Detected Triggers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Prediction Confidence Distribution */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              <span>Model Confidence Stratification</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">4 Certainty Bins</span>
          </div>

          <div className="space-y-3">
            {data.confidence_distribution.map((bin, idx) => {
              const total = data.total_scans || 148;
              const pct = Math.round((bin.count / total) * 100);
              return (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{bin.range}</span>
                    <span className="font-mono text-cyan-400">{bin.count} scans ({pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400">{bin.category}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Frequently Flagged Linguistic Triggers */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Frequently Flagged Suspicious Triggers</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Lexical Frequency</span>
          </div>

          <div className="space-y-2.5">
            {data.top_triggers.map((t, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between hover:border-amber-500/30 transition-all"
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-200">{t.trigger}</span>
                  <p className="text-[10px] text-slate-500 font-mono">{t.category}</p>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                  {t.count} hits
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
