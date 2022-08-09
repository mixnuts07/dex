import React from "react";
import "./App.css";

function App() {
  return (
    <div className="content">
      <header>
        <h3 className="header-title">TOKEN SWAP</h3>
        <button className="connect-wallet">Connect Wallet</button>
      </header>
      <div className="form-input">
        <div>
          <input type="text" />
          <button>ETH</button>
        </div>
        <button>↓</button>
        <div>
          <input type="text" />
          <button>SELECT TOKEN</button>
        </div>
        <div className="rate">
          <h6>Exchange Rate</h6>
          <h5>1 ETH = 3000DAI</h5>
        </div>
        <button>Connect Wallet</button>
      </div>
      <h5 className="wallet">0x0000</h5>
    </div>
  );
}

export default App;
