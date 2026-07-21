// Main Application Orchestrator - Maintained by M Durga Prasad
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
    { id: 'math', title: '📐 Math & Scientific', icon: '🔢', desc: 'Scientific, Fractions, GPA' },
    { id: 'financial', title: '📈 Financial', icon: '💰', desc: 'Mortgage, Loan, Interest' },
    { id: 'health', title: '🍏 Health & Fitness', icon: '❤️', desc: 'BMI, Calories, Body Fat' },
    { id: 'misc', title: '⚙️ Utilities', icon: '🛠️', desc: 'Age, Date, Passwords' },
    { id: 'currency', title: '💱 Currency Exchange', icon: '💱', desc: 'Global Exchange Rates' }
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {menu.filter(m => m.id !== 'dashboard').map(item => (
            <div 
              key={item.id} 
              onClick={() => setActiveView(item.id)}
              className="group bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/10 backdrop-blur-sm"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
              <p className="text-xs text-slate-400 mb-4">{item.desc}</p>
              <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Launch Workspace →
              </span>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Sleek Top Brand Header with Founder Attribution */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-3.5 flex justify-between items-center shadow-xl sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20">
            ⚡
          </div>
          <div>
            <h1 
              onClick={() => setActiveView('dashboard')}
              className="text-base md:text-xl font-black bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent tracking-wider cursor-pointer"
            >
              DIGITAL CALCULATORS
            </h1>
            <p className="text-[10px] text-cyan-400 font-mono tracking-wider font-semibold">FOUNDED & MAINTAINED BY M DURGA PRASAD</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300">Creator Hub</span>
          </div>
          <button 
            onClick={handleLogout} 
            className="bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-rose-500/20 transition-all shadow-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main 3-Column Side-by-Side Layout */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Column 1: Side Navigation Bar (3 Spans) */}
        <aside className="lg:col-span-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl sticky top-20 backdrop-blur-md">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 mb-3">
            Navigation Menu
          </div>
          <nav className="space-y-1.5">
            {menu.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all text-left ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm' 
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="truncate">{item.title}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Column 2: Active Tool / Feature Workspace (6 Spans) */}
        <main className="lg:col-span-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-md min-h-[600px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <h2 className="text-base md:text-lg font-bold text-white capitalize flex items-center gap-2">
              <span>{menu.find(m => m.id === activeView)?.icon || '✨'}</span>
              {activeView === 'dashboard' ? 'Platform Command Overview' : `${activeView} Calculator Suite`}
            </h2>
            <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
              Live Engine Active
            </span>
          </div>

          {activeView === 'dashboard' ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/20 p-6 rounded-2xl shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
                <h3 className="text-xl font-bold text-white mb-2">Welcome back, M Durga Prasad! 👋</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Your enterprise microservices platform is live and fully synchronized at <a href="https://prassadhmulticloud.online" className="text-cyan-400 underline">prassadhmulticloud.online</a>. Select any module from the left menu to launch your tools side-by-side.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Quick Launch Shortcuts</h4>
                {renderCalculator()}
              </div>
            </div>
          ) : (
            renderCalculator()
          )}
        </main>

        {/* Column 3: Live Audit History Log (3 Spans) */}
        <aside className="lg:col-span-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl sticky top-20 max-h-[calc(100vh-7rem)] overflow-y-auto custom-scrollbar backdrop-blur-md">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold tracking-wider text-slate-300 uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Audit Trail Log
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
              {history.length}
            </span>
          </div>
          
          <div className="space-y-2.5">
            {history.length === 0 ? (
              <div className="text-center py-12 px-4 border border-dashed border-slate-800 rounded-xl">
                <p className="text-xs text-slate-500 italic">No executions logged yet. Run calculations to see real-time state audits!</p>
              </div>
            ) : (
              history.map((item, index) => (
                <div key={index} className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl shadow-sm">
                  <div className="flex justify-between items-center mb-1">
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
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-4 px-6 text-center text-xs text-slate-400 mt-auto">
        <span>Digital Calculators Platform &bull; Founded & Maintained by <strong className="text-cyan-400">M Durga Prasad</strong></span>
      </footer>
    </div>
  );
}
