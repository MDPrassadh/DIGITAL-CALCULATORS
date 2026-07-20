// MiscCalc.jsx - Maintained by M Durga Prasad
import React, { useState } from 'react';

export default function MiscCalc({ token, onNewCalculation }) {
  const [dob, setDob] = useState('');
  const [ageResult, setAgeResult] = useState(null);

  const calculateAge = async () => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      const result = `${age} years old`;
      setAgeResult(result);

      const expression = `Age from: ${dob}`;

      await fetch('http://localhost:8080/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ type: 'Utility', expression, result })
      });
      onNewCalculation({ type: 'Utility', expression, result });
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6 text-amber-400">⚙️ Age & Utility Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-slate-400">Date of Birth</label>
          <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full bg-slate-900 p-3 rounded-lg border border-slate-600 focus:border-amber-400 focus:outline-none text-white" />
        </div>
        
        <button onClick={calculateAge} className="w-full bg-amber-600 hover:bg-amber-500 font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(217,119,6,0.4)] transition-colors mt-4">
          Calculate Precise Age
        </button>

        {ageResult && (
          <div className="mt-6 text-center p-6 bg-slate-900 rounded-xl border border-amber-500/30">
            <p className="text-slate-400">Calculated Age</p>
            <p className="text-4xl font-black text-amber-400 mt-2">{ageResult}</p>
          </div>
        )}
      </div>
    </div>
  );
}