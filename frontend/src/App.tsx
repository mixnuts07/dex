import React from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const currencies = [
  {
    value: "dai",
    label: "DAI",
  },
  {
    value: "link",
    label: "LINK",
  },
  {
    value: "comp",
    label: "COMP",
  },
];

const SelectTextFields = () => {
  const [currency, setCurrency] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "5em" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={currency}
          onChange={handleChange}
          helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
};

function App() {
  return (
    <div className="content">
      <header>
        <h3 className="header-title">TOKEN SWAP</h3>
        <button className="connect-wallet">Connect Wallet</button>
      </header>
      <div className="form-input">
        <div className="input-first">
          <input type="text" />
          <SelectTextFields />
        </div>
        <button>↓</button>
        <div className="input-to">
          <input type="text" />
          <SelectTextFields />
        </div>
        <div className="rate">
          <h6>Exchange Rate :</h6>
          <h5>1 ETH = 3000DAI</h5>
        </div>
        <button>Connect Wallet</button>
      </div>
      <footer>
        <h5 className="wallet">0x0000</h5>
      </footer>
    </div>
  );
}

export default App;
