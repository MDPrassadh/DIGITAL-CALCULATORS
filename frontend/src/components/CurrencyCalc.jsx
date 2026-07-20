// CurrencyCalc.jsx - Maintained by M Durga Prasad
import React, { useState } from 'react';

export default function CurrencyCalc({ token, onNewCalculation }) {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [result, setResult] = useState(null);

  const handleConvert = async () => {
    // Note: Mock rate used for baseline. Replace with actual free currency API in production.
    const mockRate = 83.5; 
    const calcResult = (parseFloat(amount) * mockRate).toFixed(2);
    setResult(calcResult);
    
    const expression = `${amount} ${from} to ${to}`;
    
    // Save to Database History using relative path
    await fetch('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ type: 'Currency', expression, result: calcResult })
    });
    onNewCalculation({ type: 'Currency', expression, result: calcResult });
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 text-white">
      <h2 className="text-xl font-bold mb-4 text-cyan-400">Live Exchange</h2>
      <div className="space-y-4">
        <input 
          type="number" placeholder="Enter Amount" value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-slate-800 p-3 rounded-lg border border-slate-600 focus:outline-none focus:border-cyan-400"
        />
        <div className="flex space-x-4">
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="flex-1 bg-slate-800 p-3 rounded-lg border border-slate-600 text-white">
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
          </select>
          <span className="text-2xl mt-2 text-slate-500">→</span>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="flex-1 bg-slate-800 p-3 rounded-lg border border-slate-600 text-white">
            <option value="INR">INR - Indian Rupee</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
          </select>
        </div>
        <button 
          onClick={handleConvert}
          className="w-full bg-indigo-600 hover:bg-indigo-500 font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-colors"
        >
          Convert Currency
        </button>
        
        {result && (
          <div className="mt-6 text-center p-4 bg-slate-800 rounded-lg border border-indigo-500/30">
            <p className="text-sm text-slate-400">Converted Amount</p>
            <p className="text-3xl font-black text-indigo-400">{result} {to}</p>
          </div>
        )}
      </div>
    </div>
  );
}