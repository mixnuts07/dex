import React from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const NestedModal = (buttonName) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>{buttonName}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Button>DAI</Button>
          <Button>LINK</Button>
          <Button>COMP</Button>
        </Box>
      </Modal>
    </div>
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
          {/* <NestedModal buttonName="ETH" /> */}
        </div>
        <button>↓</button>
        <div className="input-to">
          <input type="text" />
          {/* <NestedModal buttonName="SELECT TOKEN" /> */}
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
