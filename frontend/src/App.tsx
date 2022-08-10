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
      borderColor: "whitesmoke",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

const Header = () => {
  return (
    <Box component="header">
      <Box component="h3" className="header-title">
        TOKEN SWAP
      </Box>
      <Button className="connect-wallet">Connect Wallet</Button>
    </Box>
  );
};

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
        <CssTextField
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
        </CssTextField>
      </div>
    </Box>
  );
};

const CustomizedInputs = () => {
  return (
    <Box
      component="form"
      noValidate
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gridTemplateColumns: { sm: "1fr 1fr" },
        gap: 2,
        width: "30vw",
        height: "40vh",
        backgroundColor: "rgba(51, 29, 29, 0.1)",
        margin: "3em auto",
        padding: "2em",
        borderRadius: "2em",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: "8em",
        }}
      >
        <CssTextField label="ETH" id="custom-css-outlined-input" />
        <SelectTextFields />
      </Box>
      <Button>↓</Button>
      <Box component="div" sx={{ display: "flex", flexDirection: "row" }}>
        <CssTextField label="SELECT TOKEN" id="custom-css-outlined-input" />
        <SelectTextFields />
      </Box>
      <Box component="div" className="rate">
        <Box component="h6">Exchange Rate :</Box>
        <Box component="h5">1 ETH = 3000DAI</Box>
      </Box>
      <Button>Connect Wallet</Button>
    </Box>
  );
};

const Footer = () => {
  return (
    <Box component="footer" sx={{ marginTop: "3em" }}>
      <Box component="h5" className="wallet">
        LOGIN ADDRESS : 0x0000
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <Box component="div" className="content">
      <Header />
      <CustomizedInputs />
      <Footer />
    </Box>
  );
};

export default App;
