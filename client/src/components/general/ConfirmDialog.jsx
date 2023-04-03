import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ConfirmDialog = ({
  open,
  closeCallback,
  title,
  text,
  cancelText,
  acceptText,
  acceptCallback,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={closeCallback}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCallback}>{cancelText}</Button>
          <Button
            onClick={() => {
              closeCallback();
              acceptCallback();
            }}
            autoFocus
          >
            {acceptText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
