import Box from "@mui/material/Box";

const Footer = ({ currentAccount }) => {
    return (
      <Box component="footer" sx={{ marginTop: "3em" }}>
        <Box component="h5" className="wallet">
          LOGIN ADDRESS :<br /> {currentAccount}
        </Box>
      </Box>
    );
  };

export default Footer