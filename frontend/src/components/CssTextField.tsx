import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

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

export default CssTextField