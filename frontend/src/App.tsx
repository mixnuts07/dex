import React from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
// --
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
//--
const FormPropsTextFields = () => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-number"
        label="ETH"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        defaultValue="0"
        color="success"
      />
      <TextField
        disabled
        id="standard-number"
        label="SELECT TOKEN"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
      />
    </Box>
  );
};
// --

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "whitesmoke",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

const CustomizedInputs = () => {
  return (
    <Box
      component="form"
      noValidate
      sx={{
        display: "grid",
        gridTemplateColumns: { sm: "1fr 1fr" },
        gap: 2,
      }}
    >
      <CssTextField label="ETH" id="custom-css-outlined-input" />
    </Box>
  );
};

const App = () => {
  return (
    <Box component="div" className="content">
      <Box component="header">
        <Box component="h3" className="header-title">
          TOKEN SWAP
        </Box>
        <Button className="connect-wallet">Connect Wallet</Button>
      </Box>
      {/* <Box component="div" className="form-input">
        <Box component="div" className="input-first">
          <input type="text" />
          <SelectTextFields />
        </Box>
        <Button>↓</Button>
        <Box component="div" className="input-to">
          <input type="text" />
          <SelectTextFields />
        </Box>
        <Box component="div" className="rate">
          <Box component="h6">Exchange Rate :</Box>
          <Box component="h5">1 ETH = 3000DAI</Box>
        </Box>
        <Button>Connect Wallet</Button>
      </Box> */}
      <CustomizedInputs />
      {/* <SelectTextFields /> */}
      <FormPropsTextFields />
      <Box component="footer">
        <Box component="h5" className="wallet">
          0x0000
        </Box>
      </Box>
    </Box>
  );
};

export default App;
