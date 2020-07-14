import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function FriendsList({ amount, inviteList }) {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="button">Your Contribution : </Typography>
      <Typography variant="button" color="primary">
        &#8377;
        {inviteList.length > 0
          ? (amount / (inviteList.length + 1)).toFixed(2)
          : amount}
      </Typography>
      <br />
      <hr /> &nbsp;&nbsp;
      <Typography variant="heading">FRIEND'S CONTRIBUTIONS</Typography>
      <hr />
      <br />
      {inviteList.length > 0 ? (
        <List className={classes.root}>
          {inviteList.map((obj, index) => (
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography variant="button">
                      {obj.User.username}
                    </Typography>
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
                      <em>Expense Amount</em> : &#8377;
                      {(amount / (inviteList.length + 1)).toFixed(2)}
                      <br />
                      <em>Date of Creation</em> :{" "}
                      {new Date(obj.createdAt).toLocaleDateString()}
                    </Typography>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2">&nbsp;--NO CONTACTS ADDED YET--</Typography>
      )}
    </div>
  );
}
