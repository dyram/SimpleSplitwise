import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddExpense = ({ emitData }) => {
  const classes = useStyles();

  const [addOpen, setAddOpen] = useState(false);

  const [caegory, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleClickOpen = () => {
    setAddOpen(true);
  };

  const handleClose = () => {
    clearFields();
    setAddOpen(false);
  };

  const clearFields = () => {
    setCategory(undefined);
    setAmount(undefined);
  };

  const addPayment = () => {
    const data = {
      caegory,
      amount,
    };

    emitData(data);
    handleClose();
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Add New Expense
      </Button>
      <Dialog
        open={addOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Expense</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new expense and manage the bill with your friends
          </DialogContentText>
          <TextField
            margin="dense"
            type="text"
            id="name"
            label="Category"
            fullWidth
            value={caegory}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <br />
          <TextField
            margin="dense"
            type="number"
            id="amount"
            label="Amount"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">&#8377;</InputAdornment>
              ),
            }}
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <br />
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={addPayment} color="primary">
            Add Expense
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddExpense;
