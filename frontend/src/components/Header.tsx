import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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

export default Header;