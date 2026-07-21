// Main Application Orchestrator - Founded & Maintained by M Durga Prasad
import React, { useState } from 'react';
import Auth from './components/Auth';
import MathCalc from './components/MathCalc';
import CurrencyCalc from './components/CurrencyCalc';
import FinancialCalc from './components/FinancialCalc';
import HealthCalc from './components/HealthCalc';
import MiscCalc from './components/MiscCalc';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [activeView, setActiveView] = useState('dashboard'); 
  const [history, setHistory] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const menu = [
    { id: 'dashboard', title: '📊 Overview Hub', icon: '🏠', desc: 'Platform Command Center' },
    { id: 'math', title: '📐 Math & Scientific', icon: '🔢', desc: 'Scientific, Fractions, Percentages, GPA', count: '6 Tools' },
    { id: 'financial', title: '📈 Financial & Loans', icon: '💰', desc: 'Mortgage, Compound Interest, Retirement', count: '6 Tools' },
    { id: 'health', title: '🍏 Health & Fitness', icon: '❤️', desc: 'BMI, Calories, Body Fat, BMR', count: '6 Tools' },
    { id: 'misc', title: '⚙️ Utilities & Passwords', icon: '🛠️', desc: 'Age, Date, Time, Secure Passwords', count: '5 Tools' },
    { id: 'currency', title: '💱 Global Currency Exchange', icon: '💱', desc: 'Real-time multi-currency conversion', count: 'Live Rates' }
  ];

  if (!token) {
    return <Auth onAuthSuccess={(t) => { localStorage.setItem('token', t); setToken(t); }} />;
  }

  const renderCalculator = () => {
    const props = { token, onNewCalculation: (c) => setHistory([c, ...history]) };
    switch (activeView) {
      case 'math': return <MathCalc {...props} />;
      case 'financial': return <FinancialCalc {...props} />;
      case 'health': return <HealthCalc {...props} />;
      case 'misc': return <MiscCalc {...props} />;
      case 'currency': return <CurrencyCalc {...props} />;
      default: return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {menu.filter(m => m.id !== 'dashboard').map(item => (
            <div 
              key={item.id} 
              onClick={() => setActiveView(item.id)}
              className="group relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-cyan-500/60 p-7 rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-cyan-500/15 backdrop-blur-md overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors"></div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl p-3 rounded-2xl bg-slate-800/80 border border-slate-700/50 shadow-inner group-hover:scale-110 transition-transform inline-block">
                    {item.icon}
                  </span>
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm">
                    {item.count}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400">
                <span>Launch Suite Workspace</span>
                <span className="transform transition-transform group-hover:translate-x-1.5">→</span>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Sleek Top Brand Header with Founder Attribution */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex justify-between items-center shadow-xl sticky top-0 z-50">
        <div className="flex items-center space-x-3.5 text-left">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-cyan-500/20">
            ⚡
          </div>
          <div>
            <h1 
              onClick={() => setActiveView('dashboard')}
              className="text-base md:text-xl font-black bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent tracking-wider cursor-pointer hover:opacity-90 transition-opacity"
            >
              DIGITAL CALCULATORS
            </h1>
            <p className="text-[10px] text-cyan-400 font-mono tracking-wider font-semibold">FOUNDED & MAINTAINED BY M DURGA PRASAD</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700/60 text-xs shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-medium">Cloud Cluster Live</span>
          </div>
          <button 
            onClick={handleLogout} 
            className="bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold border border-rose-500/20 transition-all shadow-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main 3-Column Magnified Side-by-Side Layout */}
      <div className="flex-1 max-w-[1700px] w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        
        {/* Column 1: Left Navigation Menu (3 Spans) */}
        <aside className="lg:col-span-3 bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-2xl sticky top-24 backdrop-blur-xl">
          <div className="text-[11px] uppercase font-bold tracking-wider text-slate-500 px-3 mb-4">
            Navigation Menu
          </div>
          <nav className="space-y-2">
            {menu.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs md:text-sm font-semibold transition-all text-left ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/10 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/5' 
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3.5 truncate">
                    <span className="text-lg">{item.icon}</span>
                    <span className="truncate">{item.title}</span>
                  </div>
                  {item.count && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-mono hidden xl:inline border border-slate-700/50">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Column 2: Active Tool Workspace (6 Spans) */}
        <main className="lg:col-span-6 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-xl min-h-[650px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-8">
            <h2 className="text-lg md:text-xl font-bold text-white capitalize flex items-center gap-3">
              <span className="text-2xl p-2 rounded-xl bg-slate-800/80 border border-slate-700/50">
                {menu.find(m => m.id === activeView)?.icon || '✨'}
              </span>
              <span>{activeView === 'dashboard' ? 'Platform Command Overview' : `${activeView} Calculator Suite`}</span>
            </h2>
            <span className="text-xs px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono shadow-sm">
              Engine Online
            </span>
          </div>

          {activeView === 'dashboard' ? (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-cyan-950/50 via-slate-900 to-indigo-950/50 border border-cyan-500/25 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
                <h3 className="text-2xl font-black text-white mb-3">Welcome back, M Durga Prasad! 👋</h3>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                  Your high-performance microservices architecture is live and fully synchronized at <a href="https://prassadhmulticloud.online" className="text-cyan-400 underline font-semibold">prassadhmulticloud.online</a>. Select any module from the navigation panel to launch your tools side-by-side.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 px-1">Quick Launch Shortcuts</h4>
                {renderCalculator()}
              </div>
            </div>
          ) : (
            renderCalculator()
          )}
        </main>

        {/* Column 3: Live Audit History Log (3 Spans) */}
        <aside className="lg:col-span-3 bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-2xl sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto custom-scrollbar backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold tracking-wider text-slate-300 uppercase flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Audit Trail Log
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono border border-slate-700/50">
              {history.length}
            </span>
          </div>
          
          <div className="space-y-3">
            {history.length === 0 ? (
              <div className="text-center py-16 px-4 border border-dashed border-slate-800 rounded-2xl bg-slate-950/40">
                <p className="text-xs text-slate-500 italic">No executions logged yet. Run calculations to see real-time state audits!</p>
              </div>
            ) : (
              history.map((item, index) => (
                <div key={index} className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-2xl shadow-sm hover:border-cyan-500/40 transition-colors">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] tracking-wider uppercase text-cyan-400 font-bold">
                      {item.type}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Just now</span>
                  </div>
                  <p className="text-xs font-medium text-slate-300 truncate">{item.expression}</p>
                  <p className="text-sm font-bold text-emerald-400 mt-1">= {item.result}</p>
                </div>
              ))
            )}
          </div>
        </aside>

      </div>

      {/* Footer Attribution */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-5 px-6 text-center text-xs text-slate-400 mt-auto">
        <span>Digital Calculators Platform &bull; Founded & Maintained by <strong className="text-cyan-400">M Durga Prasad</strong></span>
      </footer>
    </div>
  );
}
