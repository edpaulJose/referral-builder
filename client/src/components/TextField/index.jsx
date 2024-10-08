import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { InputBase, FormControl, InputLabel, Box, FormHelperText } from "@mui/material";

const StyledTextFiled = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const TextField = forwardRef(
  ({ id, label = "", fullWidth = false, helperText = "", error = false, ...rest }, ref) => {
    return (
      <Box id={id} sx={fullWidth && { width: "100%" }}>
        <FormControl variant="standard" fullWidth error={error}>
          <InputLabel shrink>{label}</InputLabel>
          <StyledTextFiled ref={ref} fullWidth {...rest} />
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      </Box>
    );
  }
);

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  error: PropTypes.bool,
};

export default memo(TextField);
