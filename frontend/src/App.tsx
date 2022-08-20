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
import abi from "./abi.json";

let priceData;
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

// Contractアドレス
const dexAddr = "0xA0D7221Ae415Fc97911DEEb562b135839Df4Dc8e";
const daiAddr = "0x69e6Bb3Ea957Ef5e8050CaC8042eb663A04A0748";
const compAddr = "0x3C17F760095C40F7E836174DEF5D1B2249e7Ea58";
const linkAddr = "0xAF5537A619a75C41908BbdaA136c8502dd29D7F6";
let dex;
let tokenAddr;
// 選択したトークンを保存〜〜
// let selectedToken = undefined

const Header = ({ currentAccount, connectWallet }) => {
  return (
    <Box component="header">
      <Box component="h3" className="header-title">
        TOKEN SWAP
      </Box>
      {currentAccount ? (
        <Button className="connect-wallet" variant="contained" disabled>
          Connected!!
        </Button>
      ) : (
        <Button
          className="connect-wallet"
          variant="contained"
          onClick={connectWallet}
        >
          Connect Wallet
        </Button>
      )}
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
      {/* <Box component="h5">{selectedToken}</Box> */}
    </Box>
  );
};

const CustomizedInputs = ({
  currentAccount,
  connectWallet,
  priceData,
  getApiPrice,
  buyToken,
}) => {
  const [token, setToken] = useState(true);
  const handleToken = () => {
    setToken(!token);
  };
  const [currency, setCurrency] = useState("");
  const handleCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };
  const [inputEthPrice, setInputEthPrice] = useState(0);
  const [inputTokenPrice, setInputTokenPrice] = useState(0);
  // トークンをレンダーする
  const TokenRender = () => {
    switch (currency) {
      case "DAI":
        return (
          <Box
            component="h5"
            sx={{ marginTop: "0", fontSize: "20px", color: "red" }}
          >
            {Math.floor(
              (inputEthPrice / Number(getApiPrice["daiETH"])) * 1000
            ) / 1000}
          </Box>
        );
      case "LINK":
        return (
          <Box
            component="h5"
            sx={{ marginTop: "0", fontSize: "20px", color: "red" }}
          >
            {Math.floor(
              (inputEthPrice / Number(getApiPrice["linkETH"])) * 1000
            ) / 1000}
          </Box>
        );
      case "COMP":
        return (
          <Box
            component="h5"
            sx={{ marginTop: "0", fontSize: "20px", color: "red" }}
          >
            {Math.floor(
              (inputEthPrice / Number(getApiPrice["compETH"])) * 1000
            ) / 1000}
          </Box>
        );
      default:
        return <Box component="div"></Box>;
    }
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
          label="Input Price"
          id="custom-css-outlined-input"
          defaultValue={inputEthPrice}
          onChange={(event) => setInputEthPrice(Number(event.target.value))}
          sx={{ minWidth: "24vw" }}
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
          disabled={true}
          label="Input Price"
          id="custom-css-outlined-input"
          sx={{ minWidth: "24vw" }}
          defaultValue={inputTokenPrice}
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
      {inputEthPrice !== 0 && currency && (
        <Box
          component="div"
          className="rate"
          sx={{ height: "30px", marginTop: "30px", marginBottom: "0" }}
        >
          <Typography variant="h6" component="div">
            Exchange Rate
          </Typography>
          <Box component="div">
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: "20px",
                display: "flex",
                flexDirection: "row",
                letterSpacing: "4px",
              }}
            >
              <Box component="div" sx={{ color: "red" }}>
                {inputEthPrice.toFixed(7)}
              </Box>
              ETH=
              <TokenRender />
              {currency}
            </Typography>
          </Box>
        </Box>
      )}
      {currentAccount ? (
        <Button
          variant="contained"
          sx={{
            width: "200px",
            height: "200px",
            marginTop: "0",
          }}
          onClick={buyToken}
        >
          Enter Amount
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{
            width: "200px",
            height: "200px",
            marginTop: "0",
          }}
          onClick={connectWallet}
        >
          Connect Wallet
        </Button>
      )}
      {/* <Box component="ul">
        {Object.keys(getApiPrice).map((key) => (
          <Box component="li" key={key}>
            {key} :{Number(getApiPrice[key])}
          </Box>
        ))}
      </Box> */}
    </Box>
  );
};

const Footer = ({ currentAccount }) => {
  return (
    <Box component="footer" sx={{ marginTop: "3em" }}>
      <Box component="h5" className="wallet">
        LOGIN ADDRESS :<br /> {currentAccount}
      </Box>
    </Box>
  );
};

// ロード時にAPIの値段取得
const GetPrice = async () => {
  const daiData = await (
    await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=eth"
    )
  ).json();
  const linkData = await (
    await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=chainlink&vs_currencies=eth"
    )
  ).json();
  const compData = await (
    await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=compound-governance-token&vs_currencies=eth"
    )
  ).json();
  return {
    daiETH: daiData.dai.eth,
    linkETH: linkData.chainlink.eth,
    compETH: compData["compound-governance-token"].eth,
  };
};

const App = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  // APIで取得したオブジェクトを格納
  const [getApiPrice, setGetApiPrice] = useState({});
  const RenderPrice = async () => {
    priceData = await GetPrice();
    setGetApiPrice(priceData);
  };
  // ユーザがWalletを所有しているか確認
  const CheckUserOwnWallet = async () => {
    try {
      // userがmetaMaskを繋げるとEthereumAPIが利用可能になる
      const { ethereum } = window;
      if (!ethereum) {
        console.log("MetaMaskをインストールして下さい。");
        return;
      }
      // ユーザのWalletへのアクセスが許可されているか確認
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("認証済みのアカウントが確認されました。:", account);
        setCurrentAccount(account);
      } else {
        console.log("認証済みのアカウントが確認されません。");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // MetaMaskに接続する関数
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("MetaMaskをインストールして下さい。");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("MetaMaskに接続されました。: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  // contractとの連携
  const DaiBalanceOf = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const DexContract = new ethers.Contract(dexAddr, abi.dex, signer);
    const DaiContract = new ethers.Contract(daiAddr, abi.token, signer);
    let daiBalanceOf = await DaiContract.balanceOf(currentAccount);

    console.log("daiBalanceOf");
    console.log(daiBalanceOf);
  };
  const buyToken = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const myAddress = await signer.getAddress();
    const myBalance = await signer.getBalance();
    console.log("myAddress");
    console.log(myAddress);
    console.log("myBalance");
    console.log(ethers.utils.formatEther(myBalance));
    const DexContract = new ethers.Contract(daiAddr, abi.dex, signer);
    let count = await DexContract.buyToken(
      dexAddr,
      ethers.utils.parseEther("1.0"),
      ethers.utils.parseEther("1.0")
    );
    console.log(count);
    const tx = signer.sendTransaction({
      to: daiAddr,
      value: ethers.utils.parseEther("1.0"),
    });
    console.log(tx);
  };
  useEffect(() => {
    RenderPrice();
    CheckUserOwnWallet();
  }, []);
  return (
    <Box component="div" className="content">
      <Header connectWallet={connectWallet} currentAccount={currentAccount} />
      <CustomizedInputs
        currentAccount={currentAccount}
        connectWallet={connectWallet}
        priceData={priceData}
        getApiPrice={getApiPrice}
        buyToken={buyToken}
      />
      <Footer currentAccount={currentAccount} />
      <button onClick={DaiBalanceOf}>CLICK</button>
    </Box>
  );
};

export default App;
