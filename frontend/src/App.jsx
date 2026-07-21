import React, { useState, useEffect } from 'react';
import './styles.css';
import './App.css';

export default function App() {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState(null);
  const [category, setCategory] = useState("math");

  const handleClick = (value) => {
    if (value === "C") setDisplay("0");
    else if (value === "=") {
      try {
        const result = eval(display).toString();
        setDisplay(result);
        setHistory([...history, display + " = " + result]);
      } catch { setDisplay("Error"); }
    }
    else if (value === "√") { try { const result = Math.sqrt(eval(display)).toString(); setDisplay(result); setHistory([...history, "√(" + display + ") = " + result]); } catch { setDisplay("Error"); } }
    else if (value === "%") { try { const result = (eval(display) / 100).toString(); setDisplay(result); setHistory([...history, display + "% = " + result]); } catch { setDisplay("Error"); } }
    else if (value === "^2") { try { const result = Math.pow(eval(display), 2).toString(); setDisplay(result); setHistory([...history, display + "² = " + result]); } catch { setDisplay("Error"); } }
    else if (value === "BMI") { try { const [w, h] = display.split(",").map(Number); const bmi = (w / (h * h)).toFixed(2); setDisplay(bmi); setHistory([...history, `BMI(${w},${h}) = ${bmi}`]); } catch { setDisplay("Error"); } }
    else if (value === "EMI") { try { const [P, R, N] = display.split(",").map(Number); const monthlyRate = R / 12 / 100; const emi = (P * monthlyRate * Math.pow(1 + monthlyRate, N)) / (Math.pow(1 + monthlyRate, N) - 1); setDisplay(emi.toFixed(2)); setHistory([...history, `EMI(${P},${R},${N}) = ${emi.toFixed(2)}`]); } catch { setDisplay("Error"); } }
    else if (value === "M+") { try { const current = eval(display); setMemory(memory ? memory + current : current); setHistory([...history, "M+ " + current]); } catch { setDisplay("Error"); } }
    else if (value === "M-") { try { const current = eval(display); setMemory(memory ? memory - current : -current); setHistory([...history, "M- " + current]); } catch { setDisplay("Error"); } }
    else if (value === "MR") { if (memory !== null) { setDisplay(memory.toString()); setHistory([...history, "MR = " + memory]); } }
    else if (value === "MC") { setMemory(null); setHistory([...history, "MC (Memory Cleared)"]); }
    else setDisplay(display === "0" ? value : display + value);
  };

  const clearHistory = () => setHistory([]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
      if (!isNaN(key)) handleClick(key);
      else if (["+", "-", "*", "/"].includes(key)) handleClick(key);
      else if (key === "Enter") handleClick("=");
      else if (key === "Backspace") setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
      else if (key.toLowerCase() === "c") handleClick("C");
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [display]);

  return (
    <div className="app-container dark-blue-bg">
      {/* Top Bar */}
      <header className="topbar">
        <h2>🧮 Digital Calculator</h2>
        {/* Small Sign In form top-right */}
        <form id="signin-form" className="auth-form-inline">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign In</button>
        </form>
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
        <button id="theme-toggle">🌙 Toggle Dark Mode</button>
        <div className="category-selector">
          <button onClick={() => setCategory("math")}>📘 Math</button>
          <button onClick={() => setCategory("finance")}>💰 Finance</button>
          <button onClick={() => setCategory("health")}>💊 Health</button>
        </div>
        <div className="history custom-scrollbar">
          <h3>📝 History</h3>
          <button className="clear-history" onClick={clearHistory}>🗑️ Clear</button>
          <ul>{history.map((item, index) => <li key={index}>{item}</li>)}</ul>
        </div>
      </aside>

      {/* Main Calculator */}
      <main className="main-content">
        <div className={`calculator-card ${category} animate-fadeIn`}>
          <div className="display">{display}</div>
          <div className="buttons grid grid-cols-4 gap-3">
            {/* Common Buttons */}
            {"789/456*123-C0=+" .split("").map((val, idx) => (
              <button key={idx} onClick={() => handleClick(val)}>{val}</button>
            ))}

            {/* Category-Specific */}
            {category === "math" && (
              <>
                <button onClick={() => handleClick("√")}>√</button>
                <button onClick={() => handleClick("^2")}>x²</button>
                <button onClick={() => handleClick("%")}>%</button>
              </>
            )}
            {category === "finance" && (
              <>
                <button onClick={() => handleClick("EMI")}>EMI</button>
                <button onClick={() => setDisplay("Interest Calc Coming Soon")}>Interest</button>
              </>
            )}
            {category === "health" && (
              <>
                <button onClick={() => handleClick("BMI")}>BMI</button>
                <button onClick={() => setDisplay("Calories Calc Coming Soon")}>Calories</button>
              </>
            )}

            {/* Memory */}
            <button onClick={() => handleClick("M+")}>M+</button>
            <button onClick={() => handleClick("M-")}>M-</button>
            <button onClick={() => handleClick("MR")}>MR</button>
            <button onClick={() => handleClick("MC")}>MC</button>
          </div>
        </div>
      </main>
    </div>
  );
}
