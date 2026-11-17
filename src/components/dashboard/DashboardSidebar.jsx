import React from 'react';
import {
  LayoutDashboard,
  Award,
  GitMerge,
  Database,
  ShieldAlert,
  GraduationCap,
  TrendingUp,
  GitBranch,
  Layers,
  AlertTriangle,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const DASHBOARD_SECTIONS = [
  { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard, badge: 'KPIs' },
  { id: 'ml-performance', label: 'ML Model Performance', icon: Award, badge: 'Research' },
  { id: 'hybrid-ensemble', label: 'Hybrid Hard Voting', icon: GitMerge, badge: 'Interactive' },
  { id: 'dataset-analytics', label: 'ISOT Dataset Analytics', icon: Database, badge: '44.6k' },
  { id: 'bias-validation', label: 'Bias & Robustness', icon: ShieldAlert, badge: 'Validation' },
  { id: 'training-testing', label: 'Training vs Testing', icon: GraduationCap, badge: 'Metrics' },
  { id: 'detection-trends', label: 'Detection Analytics', icon: TrendingUp, badge: 'Telemetry' },
  { id: 'architecture-timeline', label: 'Architecture & Timeline', icon: GitBranch, badge: 'Workflow' },
  { id: 'application-modules', label: 'Application Modules', icon: Layers, badge: '6 Tools' },
  { id: 'limitations-scope', label: 'Limitations & Scope', icon: AlertTriangle, badge: 'Ethics' },
];

export const DashboardSidebar = ({ activeSection, setActiveSection, isMobileOpen, setIsMobileOpen }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 glass-panel border-r border-slate-800/80 p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-4 overflow-y-auto pr-1">
          {/* Header Badge */}
          <div className="px-2 py-1.5 rounded-xl bg-gradient-to-r from-blue-900/30 via-cyan-900/20 to-transparent border border-blue-500/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 font-mono">
                Research Portal
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              ISOT Corpus & Ensemble Audit
            </p>
          </div>

          {/* Navigation Items */}
          <div className="space-y-1">
            <p className="text-[9px] uppercase font-bold tracking-widest text-slate-500 px-2.5 py-1">
              Dashboard Sections
            </p>
            {DASHBOARD_SECTIONS.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    setActiveSection(sec.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/10 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-900/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 transition-colors ${
                        isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    />
                    <span className="truncate text-left">{sec.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {sec.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-medium ${
                          isActive
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            : 'bg-slate-800/80 text-slate-500 group-hover:text-slate-400 border border-slate-700/50'
                        }`}
                      >
                        {sec.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-3 h-3 text-cyan-400" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer Metadata */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[10px] space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span>Benchmark Ver</span>
              <span className="font-mono text-cyan-400 font-bold">v2.1 Research</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Model Scheme</span>
              <span className="font-mono text-emerald-400">3 Base + 1 Ensemble</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Corpus Size</span>
              <span className="font-mono text-slate-300">44,689 Prepared</span>
            </div>
          </div>
          <p className="text-[9px] text-slate-500 text-center">
            VeriNews AI 2.0 • Research Benchmark Protocol
          </p>
        </div>
      </aside>
    </>
  );
};
