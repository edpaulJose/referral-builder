import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomDialog = ({
  id,
  open = false,
  title = "",
  onClose,
  actions,
  children,
}) => {
  return (
    <Dialog
      id={id}
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialogContent-root": {
          padding: "0px 24px 24px",
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

CustomDialog.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  actions: PropTypes.node,
  children: PropTypes.node,
};

export default CustomDialog;
