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
    { id: 'math', title: '📐 Math & Scientific', desc: 'Scientific, Fractions, Percentages, GPA', color: 'from-blue-500 to-cyan-500' },
    { id: 'financial', title: '📈 Financial', desc: 'Mortgage, Loan, Retirement, Interest', color: 'from-emerald-500 to-teal-500' },
    { id: 'health', title: '🍏 Health & Fitness', desc: 'BMI, Calories, Body Fat, Pace', color: 'from-rose-500 to-pink-500' },
    { id: 'misc', title: '⚙️ Utilities', desc: 'Age, Date, Time, Passwords', color: 'from-amber-500 to-orange-500' },
    { id: 'currency', title: '💱 Currency Exchange', desc: 'Live Global Exchange Rates', color: 'from-indigo-500 to-purple-500' }
  ];

  if (!token) return <Auth onAuthSuccess={(t) => { localStorage.setItem('token', t); setToken(t); }} />;

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
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <h1 
            onClick={() => setActiveView('dashboard')}
            className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent tracking-wider cursor-pointer hover:opacity-80 transition-opacity"
          >
            DIGITAL CALCULATORS
          </h1>
          {activeView !== 'dashboard' && (
            <button onClick={() => setActiveView('dashboard')} className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-md transition-colors">
              ← Back to Hub
            </button>
          )}
        </div>
        <button onClick={handleLogout} className="bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
          Logout
        </button>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {activeView === 'dashboard' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menu.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => setActiveView(item.id)}
                  className={`bg-gradient-to-br ${item.color} p-[1px] rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform shadow-lg`}
                >
                  <div className="bg-slate-800 h-full w-full rounded-2xl p-6 flex flex-col justify-center text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">{item.title}</h2>
                    <p className="text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              {renderCalculator()}
            </div>
          )}
        </div>

        {/* Universal Audit History Sidebar */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl max-h-[calc(100vh-8rem)] overflow-y-auto sticky top-24">
          <h3 className="text-lg font-bold text-slate-200 mb-4 border-b border-slate-700 pb-2">Platform History Log</h3>
          <div className="space-y-3">
            {history.length === 0 ? <p className="text-sm text-slate-500 italic">No recent executions recorded.</p> : 
              history.map((item, index) => (
                <div key={index} className="bg-slate-900/50 border border-slate-700/30 p-3 rounded-xl">
                  <span className="text-xs text-cyan-500 block font-bold">{item.type.toUpperCase()}</span>
                  <p className="text-sm font-semibold text-slate-300 mt-1">{item.expression}</p>
                  <p className="text-md font-bold text-emerald-400 mt-0.5">= {item.result}</p>
                </div>
              ))
            }
          </div>
        </div>
      </main>
    </div>
  );
}