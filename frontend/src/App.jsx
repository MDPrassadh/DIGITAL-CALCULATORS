import React, { useState, useEffect } from 'react';
import './styles.css';
import './App.css';

export default function App() {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState(null);
  const [category, setCategory] = useState("math"); // category state

  const handleClick = (value) => {
    if (value === "C") {
      setDisplay("0");
    } else if (value === "=") {
      try {
        const result = eval(display).toString();
        setDisplay(result);
        setHistory([...history, display + " = " + result]);
      } catch {
        setDisplay("Error");
      }
    } else if (value === "√") {
      try {
        const result = Math.sqrt(eval(display)).toString();
        setDisplay(result);
        setHistory([...history, "√(" + display + ") = " + result]);
      } catch {
        setDisplay("Error");
      }
    } else if (value === "%") {
      try {
        const result = (eval(display) / 100).toString();
        setDisplay(result);
        setHistory([...history, display + "% = " + result]);
      } catch {
        setDisplay("Error");
      }
    } else if (value === "^2") {
      try {
        const result = Math.pow(eval(display), 2).toString();
        setDisplay(result);
        setHistory([...history, display + "² = " + result]);
      } catch {
        setDisplay("Error");
      }
    } else if (value === "M+") {
      try {
        const current = eval(display);
        setMemory(memory ? memory + current : current);
        setHistory([...history, "M+ " + current]);
      } catch {
        setDisplay("Error");
      }
    } else if (value === "M-") {
      try {
        const current = eval(display);
        setMemory(memory ? memory - current : -current);
        setHistory([...history, "M- " + current]);
      } catch {
        setDisplay("Error");
      }
    } else if (value === "MR") {
      if (memory !== null) {
        setDisplay(memory.toString());
        setHistory([...history, "MR = " + memory]);
      }
    } else if (value === "MC") {
      setMemory(null);
      setHistory([...history, "MC (Memory Cleared)"]);
    } else {
      setDisplay(display === "0" ? value : display + value);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  // ✅ Keyboard support
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      if (!isNaN(key)) {
        handleClick(key);
      } else if (["+", "-", "*", "/"].includes(key)) {
        handleClick(key);
      } else if (key === "Enter") {
        handleClick("=");
      } else if (key === "Backspace") {
        setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
      } else if (key.toLowerCase() === "c") {
        handleClick("C");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [display]);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>🧮 Digital Calculator</h2>
        <button id="theme-toggle">🌙 Toggle Dark Mode</button>

        {/* Category Selector */}
        <div className="category-selector">
          <button onClick={() => setCategory("math")}>📘 Math</button>
          <button onClick={() => setCategory("finance")}>💰 Finance</button>
          <button onClick={() => setCategory("health")}>💊 Health</button>
        </div>

        {/* Auth Forms (only once) */}
        <div className="auth-container">
          <div className="auth-toggle">
            <button id="show-signin" className="active">Sign In</button>
            <button id="show-signup">Sign Up</button>
          </div>
          <form id="signin-form" className="auth-form">
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Sign In</button>
          </form>
          <form id="signup-form" className="auth-form hidden">
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* History Panel */}
        <div className="history custom-scrollbar">
          <h3>📝 History</h3>
          <button className="clear-history" onClick={clearHistory}>🗑️ Clear History</button>
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Calculator */}
      <main className="main-content">
        <div className={`calculator-card ${category} animate-fadeIn`}>
          <div className="display">{display}</div>
          <div className="buttons grid grid-cols-4 gap-3">
            {/* Numbers */}
            <button className="number" onClick={() => handleClick("7")}>7</button>
            <button className="number" onClick={() => handleClick("8")}>8</button>
            <button className="number" onClick={() => handleClick("9")}>9</button>
            <button className="operator" onClick={() => handleClick("/")}>÷</button>

            <button className="number" onClick={() => handleClick("4")}>4</button>
            <button className="number" onClick={() => handleClick("5")}>5</button>
            <button className="number" onClick={() => handleClick("6")}>6</button>
            <button className="operator" onClick={() => handleClick("*")}>×</button>

            <button className="number" onClick={() => handleClick("1")}>1</button>
            <button className="number" onClick={() => handleClick("2")}>2</button>
            <button className="number" onClick={() => handleClick("3")}>3</button>
            <button className="operator" onClick={() => handleClick("-")}>−</button>

            <button className="clear" onClick={() => handleClick("C")}>C</button>
            <button className="number" onClick={() => handleClick("0")}>0</button>
            <button className="equals" onClick={() => handleClick("=")}>=</button>
            <button className="operator" onClick={() => handleClick("+")}>+</button>

            {/* Scientific Functions */}
            <button className="operator" onClick={() => handleClick("√")}>√</button>
            <button className="operator" onClick={() => handleClick("^2")}>x²</button>
            <button className="operator" onClick={() => handleClick("%")}>%</button>

            {/* Memory Functions */}
            <button className="operator" onClick={() => handleClick("M+")}>M+</button>
            <button className="operator" onClick={() => handleClick("M-")}>M-</button>
            <button className="operator" onClick={() => handleClick("MR")}>MR</button>
            <button className="operator" onClick={() => handleClick("MC")}>MC</button>
          </div>
        </div>
      </main>
    </div>
  );
}
