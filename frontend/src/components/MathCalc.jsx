// MathCalc.jsx - Maintained by M Durga Prasad
import React, { useState } from 'react';

export default function MathCalc({ token, onNewCalculation }) {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');

  const handleCalculate = async () => {
    try {
      // Safe evaluation logic for advanced math
      const calcResult = Function(`'use strict'; return (${expression})`)();
      setResult(calcResult);

      // Save to Database History using relative path
      await fetch('/api/calculate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ type: 'Math', expression, result: calcResult })
      });
      onNewCalculation({ type: 'Math', expression, result: calcResult });
      setExpression('');
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
      <div className="bg-slate-800 p-4 rounded-lg text-right text-3xl font-mono text-cyan-400 mb-4 h-16 overflow-hidden">
        {expression || result}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','+'].map(btn => (
          <button 
            key={btn} onClick={() => setExpression(prev => prev + btn)}
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-lg text-xl"
          >
            {btn}
          </button>
        ))}
        <button 
          onClick={handleCalculate}
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-lg text-xl shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        >
          =
        </button>
        <button 
          onClick={() => { setExpression(''); setResult('0'); }}
          className="col-span-4 bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white font-bold py-3 rounded-lg mt-2 transition-colors"
        >
          CLEAR
        </button>
      </div>
    </div>
  );
}