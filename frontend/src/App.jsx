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
    { 
      id: 'math', 
      title: '📐 Math & Scientific', 
      desc: 'Scientific, Fractions, Percentages, GPA', 
      gradient: 'from-blue-600 to-cyan-500',
      borderGlow: 'hover:shadow-blue-500/20'
    },
    { 
      id: 'financial', 
      title: '📈 Financial', 
      desc: 'Mortgage, Loan, Retirement, Interest', 
      gradient: 'from-emerald-600 to-teal-500',
      borderGlow: 'hover:shadow-emerald-500/20'
    },
    { 
      id: 'health', 
      title: '🍏 Health & Fitness', 
      desc: 'BMI, Calories, Body Fat, Pace', 
      gradient: 'from-rose-600 to-pink-500',
      borderGlow: 'hover:shadow-rose-500/20'
    },
    { 
      id: 'misc', 
      title: '⚙️ Utilities', 
      desc: 'Age, Date, Time, Passwords', 
      gradient: 'from-amber-500 to-orange-600',
      borderGlow: 'hover:shadow-amber-500/20'
    },
    { 
      id: 'currency', 
      title: '💱 Currency Exchange', 
      desc: 'Live Global Exchange Rates', 
      gradient: 'from-indigo-600 to-purple-600',
      borderGlow: 'hover:shadow-indigo-500/20'
    }
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
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Sleek Glassmorphism Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex justify-between items-center shadow-xl sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <h1 
            onClick={() => setActiveView('dashboard')}
            className="text-xl md:text-2xl font-black bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent tracking-wider cursor-pointer hover:opacity-90 transition-opacity"
          >
            DIGITAL CALCULATORS
          </h1>
          {activeView !== 'dashboard' && (
            <button 
              onClick={() => setActiveView('dashboard')} 
              className="text-xs md:text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700/60 transition-all shadow-sm flex items-center gap-1.5 font-medium"
            >
              <span>←</span> Back to Hub
            </button>
          )}
        </div>
        <button 
          onClick={handleLogout} 
          className="bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white px-4 py-2 rounded-xl text-xs md:text-sm font-semibold border border-rose-500/20 transition-all shadow-sm"
        >
          Logout
        </button>
      </header>

      {/* Main Layout Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Central Workspace */}
        <div className="lg:col-span-3">
          {activeView === 'dashboard' ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-slate-900 to-slate-900/40 border border-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Welcome back, Creator! 👋</h2>
                <p className="text-sm text-slate-400">Select a category below to launch a professional multi-tier calculation tool.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {menu.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => setActiveView(item.id)}
                    className={`group bg-gradient-to-br ${item.gradient} p-[1px] rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg ${item.borderGlow}`}
                  >
                    <div className="bg-slate-900/90 h-full w-full rounded-2xl p-6 flex flex-col justify-between group-hover:bg-slate-900 transition-colors">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="mt-6 flex items-center text-xs font-semibold text-cyan-400 opacity-80 group-hover:opacity-100">
                        Launch Tool <span className="ml-1.5 transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md animate-fadeIn">
              {renderCalculator()}
            </div>
          )}
        </div>

        {/* Universal Audit History Sidebar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl max-h-[calc(100vh-7rem)] overflow-y-auto sticky top-24 custom-scrollbar">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold tracking-wider text-slate-200 uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Platform History Log
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
              {history.length}
            </span>
          </div>
          
          <div className="space-y-3">
            {history.length === 0 ? (
              <div className="text-center py-8 px-4 border border-dashed border-slate-800 rounded-xl">
                <p className="text-xs text-slate-500 italic">No recent executions recorded yet. Run a calculation to see audit trails here!</p>
              </div>
            ) : (
              history.map((item, index) => (
                <div key={index} className="bg-slate-950/60 border border-slate-800/60 p-3.5 rounded-xl hover:border-slate-700 transition-colors shadow-sm">
                  <span className="text-[10px] tracking-wider uppercase text-cyan-400 font-bold block mb-1">
                    {item.type}
                  </span>
                  <p className="text-xs md:text-sm font-medium text-slate-300 truncate">{item.expression}</p>
                  <p className="text-sm md:text-base font-bold text-emerald-400 mt-1">= {item.result}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
