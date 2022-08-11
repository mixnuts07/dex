import React, { useState, useEffect } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import imageEth from "./Images/ETH.png";
import imageDai from "./Images/DAI.png";
import imageLink from "./Images/link.png";
import imageComp from "./Images/comp.png";
import { ethers } from "ethers";

// --
const currencies = [
  {
    value: "DAI",
    label: "DAI",
  },
  {
    value: "LINK",
    label: "LINK",
  },
  {
    value: "COMP",
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
      <Button className="connect-wallet" variant="contained">
        Connect Wallet
      </Button>
    </Box>
  );
};
const ImageCrypto = () => {
  return (
    <Avatar alt="ETH Image" src={imageEth} sx={{ width: 56, height: 56 }} />
  );
};
const EthToken = () => {
  return (
    <Box
      component="div"
      sx={{
        m: 1,
        width: "8vw",
        height: "5vh",
        marginLeft: "1em",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        color: "whitesmoke",
        borderRadius: "8px",
        top: "100",
      }}
    >
      <ImageCrypto />
      <Typography variant="h5">ETH</Typography>
    </Box>
  );
};
const SelectTextFields = ({ currency, handleCurrency }) => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": {
          m: 1,
          width: "8vw",
          height: "3vh",
          bottom: "8px",
          marginLeft: "1em",
        },
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
          onChange={handleCurrency}
          // helperText="Please select your currency"
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
  const [token, setToken] = useState(true);
  const handleToken = () => {
    setToken(!token);
  };
  const [currency, setCurrency] = useState("");
  const handleCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };
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
        margin: "3em auto 0em auto",
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
          marginTop: "3em",
        }}
      >
        <CssTextField
          label="0.00"
          id="custom-css-outlined-input"
          sx={{ minWidth: "24vw", backgroundColor: "rgb(256,00,00)" }}
        />
        {token ? (
          <EthToken />
        ) : (
          <SelectTextFields
            currency={currency}
            handleCurrency={handleCurrency}
          />
        )}
      </Box>
      <Button
        variant="contained"
        sx={{
          marginTop: "0vh",
          backgroundColor: "white",
          color: "black",
          fontWeight: "bold",
        }}
        onClick={handleToken}
      >
        ⇅
      </Button>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <CssTextField
          label="0.00"
          id="custom-css-outlined-input"
          sx={{ minWidth: "24vw" }}
        />
        {token ? (
          <SelectTextFields
            currency={currency}
            handleCurrency={handleCurrency}
          />
        ) : (
          <EthToken />
        )}
      </Box>
      <Box component="div" className="rate" sx={{ height: "30px" }}>
        <Typography variant="h6" component="div">
          Exchange Rate :
        </Typography>
        <Typography variant="h5" component="div" sx={{ fontSize: "20px" }}>
          1 ETH = 3000{currency}
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          width: "200px",
          height: "200px",
          marginTop: "0",
        }}
      >
        Connect Wallet
      </Button>
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

const Ethers = () => {
  // const [currentAccount, setCurrentAccount] = useState("");
  // const checkIfWalletIsConnected = async () => {
  //   console.log("currentAccount: ", currentAccount);
  //   try {
  //     const { ethereum } = window;
  //     if (!ethereum) {
  //       console.log("Make sure you have MetaMask!");
  //       return;
  //     } else {
  //       console.log("We have the ethereum object", ethereum);
  //     }
  //     // ユーザーのウォレットへのアクセスが許可されているかどうかを確認します。
  //     const accounts = await ethereum.request({ method: "eth_accounts" });
  //     if (accounts.length !== 0) {
  //       const account = accounts[0];
  //       console.log("Found an authorized account:", account);
  //       setCurrentAccount(account);
  //     } else {
  //       console.log("No authorized account found");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // // connectWalletメソッドを実装
  // const connectWallet = async () => {
  //   try {
  //     const { ethereum } = window;
  //     if (!ethereum) {
  //       alert("Get MetaMask!");
  //       return;
  //     }
  //     const accounts = await ethereum.request({
  //       method: "eth_requestAccounts",
  //     });
  //     console.log("Connected: ", accounts[0]);
  //     setCurrentAccount(accounts[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
};
const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const checkIfWalletIsConnected = async () => {
    console.log("currentAccount: ", currentAccount);
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      // ユーザーのウォレットへのアクセスが許可されているかどうかを確認します。
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // connectWalletメソッドを実装
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <Box component="div" className="content">
      <Header />
      <CustomizedInputs />
      <Footer />
    </Box>
  );
};

export default App;
