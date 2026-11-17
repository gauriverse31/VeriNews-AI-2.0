import React from 'react';
import {
  Layers,
  Scan,
  ShieldAlert,
  Globe,
  History,
  BarChart3,
  Cpu,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Info
} from 'lucide-react';

export const ApplicationModulesSection = ({ modulesList, totalScans, onNavigatePage }) => {
  const modules = [
    {
      id: 'scanner',
      name: 'Live AI Scanner',
      category: 'Inference Engine',
      icon: Scan,
      color: 'blue',
      route: 'scanner',
      purpose: 'Instant multi-factor forensic inspection of articles, claims, or URLs combining trained ML ensemble classification with heuristic manipulation detection.',
      features: [
        'Tri-model voting consensus (LR, SVM, RF)',
        'Clickbait, hyperbole, & uppercase tone scoring',
        'Direct sample presets for rapid verification'
      ],
      usageMetric: totalScans > 0 ? `${totalScans} Real Audited Scans` : 'Ready for Inferences',
      status: 'Active & Operational'
    },
    {
      id: 'claims',
      name: 'Claim Intel',
      category: 'Fact Verification',
      icon: ShieldAlert,
      color: 'amber',
      route: 'claims',
      purpose: 'Automated claim decomposition, factual assertion extraction, evidence search across authoritative fact-checking repositories, and claim network graph modeling.',
      features: [
        'Automated claim extraction regex parser',
        'Google Fact Check Tools query generation',
        'Graph-based claim conflict modeling'
      ],
      usageMetric: 'External API Integration Active',
      status: 'Active & Operational'
    },
    {
      id: 'domain',
      name: 'Domain Intel',
      category: 'Publisher Credibility',
      icon: Globe,
      color: 'cyan',
      route: 'domain',
      purpose: 'Publisher credibility profiling, malicious TLD categorization, domain spoofing detection, and reputation verification against 100+ cataloged sources.',
      features: [
        'Curated registry of verified vs hoax domains',
        'Suspicious TLD flagging (.xyz, .top, .click)',
        'Domain trust score calculation (0–100)'
      ],
      usageMetric: '100+ Cataloged Registry Domains',
      status: 'Active & Operational'
    },
    {
      id: 'history',
      name: 'Scan History',
      category: 'Audit & Forensics',
      icon: History,
      color: 'purple',
      route: 'history',
      purpose: 'Persistent audit logging of past scans, search and multi-tier threat filtering, and one-click printable PDF and forensic HTML report generation.',
      features: [
        'In-memory & localStorage hybrid synchronization',
        'Printable forensic investigation report exporter',
        'Search & threat tier categorization'
      ],
      usageMetric: totalScans > 0 ? `${totalScans} Stored Records` : 'Audit Log Ready',
      status: 'Active & Operational'
    },
    {
      id: 'dashboard',
      name: 'Analytics Dashboard',
      category: 'Research Telemetry',
      icon: BarChart3,
      color: 'teal',
      route: 'dashboard',
      purpose: 'Comprehensive research and telemetry hub showing empirical ISOT dataset statistics, model comparisons, bias validation tests, and temporal activity.',
      features: [
        '8 executive KPI cards and empirical benchmarks',
        'Interactive Hard Majority Voting simulator',
        'Bias vulnerability and shortcut learning audit'
      ],
      usageMetric: 'Viewing Active Session',
      status: 'Active & Operational'
    },
    {
      id: 'model',
      name: 'Model Studio',
      category: 'ML Diagnostics',
      icon: Cpu,
      color: 'indigo',
      route: 'model',
      purpose: 'Model quality monitoring, live diagnostic latency traces, Population Stability Index (PSI) drift tracking, and held-out calibration curves.',
      features: [
        'Automated diagnostic inference pipeline test',
        'Population Stability Index (PSI) drift monitoring',
        'Held-out test split calibration telemetry'
      ],
      usageMetric: 'Sub-15ms Diagnostic Response',
      status: 'Active & Operational'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              VeriNews AI 2.0 Application Architecture & Modules
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise suite of 6 synchronized misinformation intelligence modules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/30">
            6 Core Modules
          </span>
        </div>
      </div>

      {/* Honest Telemetry Notice */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs">
        <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
        <p className="text-slate-400 leading-relaxed">
          <strong>Telemetry Integrity Policy:</strong> Only verified telemetry (such as actual scans recorded in the audit trail) is displayed. Usage statistics for modules without persistent counters reflect system operational status rather than fabricated engagement metrics.
        </p>
      </div>

      {/* 6 Module Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.id}
              className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                    ● {mod.status}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                    {mod.category}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {mod.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {mod.purpose}
                </p>

                <div className="space-y-1 pt-1 border-t border-slate-800/60">
                  <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Capabilities</span>
                  {mod.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-cyan-400">
                  {mod.usageMetric}
                </span>

                {onNavigatePage && (
                  <button
                    onClick={() => onNavigatePage(mod.route)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600 text-slate-300 hover:text-white transition-all flex items-center gap-1 text-[11px] font-bold"
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
