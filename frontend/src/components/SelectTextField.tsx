import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import currencies from "../data/currenciesData";
import CssTextField from "./CssTextField";

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

export default SelectTextFields