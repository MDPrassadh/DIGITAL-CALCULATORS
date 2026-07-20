// HealthCalc.jsx - Maintained by M Durga Prasad
import React, { useState } from 'react';

export default function HealthCalc({ token, onNewCalculation }) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);
  const [status, setStatus] = useState('');

  const calculateBMI = async () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // Convert cm to meters

    if (w && h) {
      const bmi = (w / (h * h)).toFixed(1);
      let healthStatus = '';
      if (bmi < 18.5) healthStatus = 'Underweight';
      else if (bmi >= 18.5 && bmi < 24.9) healthStatus = 'Normal Weight';
      else if (bmi >= 25 && bmi < 29.9) healthStatus = 'Overweight';
      else healthStatus = 'Obese';

      setBmiResult(bmi);
      setStatus(healthStatus);

      const expression = `BMI: ${weight}kg / ${height}cm`;
      const result = `${bmi} (${healthStatus})`;

      await fetch('http://localhost:8080/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ type: 'Health', expression, result })
      });
      onNewCalculation({ type: 'Health', expression, result });
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6 text-rose-400">🍏 BMI & Health Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-slate-400">Weight (kg)</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full bg-slate-900 p-3 rounded-lg border border-slate-600 focus:border-rose-400 focus:outline-none" />
        </div>
        <div>
          <label className="text-sm text-slate-400">Height (cm)</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full bg-slate-900 p-3 rounded-lg border border-slate-600 focus:border-rose-400 focus:outline-none" />
        </div>
        
        <button onClick={calculateBMI} className="w-full bg-rose-600 hover:bg-rose-500 font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(225,29,72,0.4)] transition-colors mt-4">
          Calculate BMI
        </button>

        {bmiResult && (
          <div className="mt-6 text-center p-6 bg-slate-900 rounded-xl border border-rose-500/30">
            <p className="text-slate-400">Your Body Mass Index</p>
            <p className="text-4xl font-black text-rose-400 mt-2">{bmiResult}</p>
            <p className={`mt-2 font-bold ${status === 'Normal Weight' ? 'text-emerald-400' : 'text-amber-400'}`}>{status}</p>
          </div>
        )}
      </div>
    </div>
  );
}