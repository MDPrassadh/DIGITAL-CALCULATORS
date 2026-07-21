import React, { useState } from 'react';
import './styles.css';
import './App.css';

export default function App() {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState([]);

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
    } else {
      setDisplay(display === "0" ? value : display + value);
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>🧮 Digital Calculator</h2>
        <button id="theme-toggle">🌙 Toggle Dark Mode</button>

        {/* Auth Forms */}
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
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Calculator */}
      <main className="main-content">
        <div className="calculator-card math animate-fadeIn">
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
          </div>
        </div>
      </main>
    </div>
  );
}
