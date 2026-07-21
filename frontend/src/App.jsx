import React, { useState } from 'react';

export default function App() {
  const [display, setDisplay] = useState("0");

  const handleClick = (value) => {
    if (value === "C") {
      setDisplay("0");
    } else if (value === "=") {
      try {
        setDisplay(eval(display).toString());
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
      </aside>

      {/* Main Calculator */}
      <main className="main-content">
        <div className="calculator">
          <div className="display">{display}</div>
          <div className="buttons">
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
          </div>
        </div>
      </main>
    </div>
  );
}
