// FinancialCalc.jsx - Maintained by M Durga Prasad
import React, { useState } from 'react';

export default function FinancialCalc({ token, onNewCalculation }) {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMortgage = async () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12; // Monthly interest rate
    const n = parseFloat(years) * 12; // Total number of payments

    if (p && r && n) {
      // Mortgage Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ]
      const payment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const result = `$${payment.toFixed(2)}`;
      setMonthlyPayment(result);

      const expression = `Mortgage: $${p} at ${rate}% for ${years}yrs`;
      
      await fetch('http://localhost:8080/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ type: 'Financial', expression, result })
      });
      onNewCalculation({ type: 'Financial', expression, result });
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6 text-emerald-400">📈 Mortgage & Loan Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-slate-400">Loan Amount (Principal)</label>
          <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="w-full bg-slate-900 p-3 rounded-lg border border-slate-600 focus:border-emerald-400 focus:outline-none" />
        </div>
        <div>
          <label className="text-sm text-slate-400">Annual Interest Rate (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-slate-900 p-3 rounded-lg border border-slate-600 focus:border-emerald-400 focus:outline-none" />
        </div>
        <div>
          <label className="text-sm text-slate-400">Loan Term (Years)</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full bg-slate-900 p-3 rounded-lg border border-slate-600 focus:border-emerald-400 focus:outline-none" />
        </div>
        
        <button onClick={calculateMortgage} className="w-full bg-emerald-600 hover:bg-emerald-500 font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-colors mt-4">
          Calculate Monthly Payment
        </button>

        {monthlyPayment && (
          <div className="mt-6 text-center p-6 bg-slate-900 rounded-xl border border-emerald-500/30">
            <p className="text-slate-400">Estimated Monthly Payment</p>
            <p className="text-4xl font-black text-emerald-400 mt-2">{monthlyPayment}</p>
          </div>
        )}
      </div>
    </div>
  );
}