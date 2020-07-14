import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

import FriendsList from "./FriendsList";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  papers: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ListView({
  currId,
  users,
  expenses,
  invites,
  emitData,
  getInv,
}) {
  const classes = useStyles();

  const [addOpen, setAddOpen] = useState(false);
  const [addOpenz, setAddOpenz] = useState(false);

  const [amount, setAmount] = useState(0);
  const [expenseId, setExpenseId] = useState();
  const [expenseName, setExpenseName] = useState("");
  const [to, setTo] = useState("");
  const [inviteList, setInviteList] = useState([]);

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    let newArr = [];
    users.map((obj) => {
      if (obj.id != currId) {
        newArr.push(obj);
      }
    });
    console.log(newArr);
    setFriends(newArr);
  }, [users]);

  const handleClickOpen = (amt, eid) => {
    setAmount(amt);
    getInv(currId, eid);
    setAddOpen(true);
  };

  const handleClickOpenz = (id, expName) => {
    setExpenseId(id);
    setExpenseName(expName);
    setAddOpenz(true);
  };

  const handleClose = () => {
    setAddOpen(false);
    clearFields();
  };

  const handleClosez = () => {
    setAddOpenz(false);
    clearFields();
  };

  const clearFields = () => {
    setAmount(0);
    setExpenseId(undefined);
    setExpenseName(undefined);
    setTo(undefined);
    setInviteList([]);
  };

  const handleDelete = (chipToDelete) => () => {
    setInviteList((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleUser = (event) => {
    setInviteList((tags) => [
      ...tags,
      {
        key: event.target.value,
        label:
          users[users.findIndex((obj) => obj.id === event.target.value)]
            .username,
      },
    ]);
    setTo("");
  };

  const inviteFriends = () => {
    let data = {
      inviteList,
      currId,
      expenseId,
    };

    emitData(data);
    handleClosez();
  };

  return (
    <div>
      &nbsp;&nbsp;
      <Typography variant="heading">EXPENSES</Typography>
      <List className={classes.root}>
        {expenses.map((obj, index) => (
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography variant="button">{obj.caegory}</Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <br />
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    <em>Expense Amount</em> : &#8377;{obj.amount}
                    <br />
                    <em>Date of Creation</em> :{" "}
                    {new Date(obj.createdAt).toLocaleDateString()}
                  </Typography>
                  <Button
                    onClick={(e) => handleClickOpen(obj.amount, obj.id)}
                    color="primary"
                  >
                    View Due
                  </Button>
                  <Button
                    onClick={(e) => handleClickOpenz(obj.id, obj.caegory)}
                    color="primary"
                  >
                    Invite Friends
                  </Button>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
      <Dialog
        open={addOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Contributions</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You and your friends currently have to contribute...
          </DialogContentText>
          <FriendsList amount={amount} inviteList={invites} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={addOpenz}
        onClose={handleClosez}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Invite Friends</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Invite friends to share this expense...
          </DialogContentText>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Select Friend</InputLabel>
            <Select labelId="to-label" id="to" value={to} onChange={handleUser}>
              {friends.map((obj) => (
                <MenuItem key={obj.id} value={obj.id}>
                  {obj.username} - {obj.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />
          <Paper component="ul" className={classes.papers}>
            {inviteList.map((data) => {
              return (
                <li key={data.key}>
                  <Chip
                    label={data.label}
                    onDelete={handleDelete(data)}
                    className={classes.chip}
                  />
                </li>
              );
            })}
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosez} color="secondary">
            Cancel
          </Button>
          <Button onClick={inviteFriends} color="primary">
            Send Invites
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
