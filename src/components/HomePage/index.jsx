import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import AddExpense from "./AddExpense";
import ListView from "./ListView";

import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const HomePage = () => {
  const classes = useStyles();

  const [uid, setUid] = useState();
  const [currId, setCurrid] = useState();
  const [showLogin, setShowLogin] = useState(false);

  const [invites, setInvites] = useState([]);
  const [expenses, setExpense] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userToken"));
    if (data != null) {
      setUid(data.id);
      setCurrid(data.uid);
      setShowLogin(data.validity);
      getExpenses();
      getUsers();
    } else {
      setShowLogin(false);
    }
  }, []);

  const logOutUser = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/";
  };

  const logIn = () => {
    window.location.href = "/login";
  };

  const signUp = () => {
    window.location.href = "/signup";
  };

  const getExpenses = () => {
    Axios.get("http://localhost:4000/expense").then((res) => {
      console.log("EXPENSE GET", res);
      if (res.status === 200) {
        setExpense([...res.data]);
      }
    });
  };

  const getUsers = () => {
    Axios.get("http://localhost:4000/users").then((res) => {
      console.log("USERS GET", res);
      if (res.status === 200) {
        setUsers([...res.data]);
      }
    });
  };

  const getInvites = (uid, eid) => {
    Axios.post("http://localhost:4000/invites", { uid, eid }).then((res) => {
      console.log("INVITES GET", res);
      if (res.status === 200) {
        setInvites([...res.data]);
      }
    });
  };

  const addExpense = (data) => {
    Axios.post("http://localhost:4000/expense", data).then((res) => {
      console.log("EXPENSE POST", res);
      if (res.status === 200) {
        console.log("EXPENSE SUCCESS");
        getExpenses();
      }
    });
  };

  const addInvites = (data) => {
    Axios.post("http://localhost:4000/invite", data).then((res) => {
      console.log("Invite POST", res);
      if (res.status === 200) {
        console.log("EXPENSE SUCCESS");
        getInvites(currId, data.expenseId);
      }
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            SplitWise
          </Typography>
          {showLogin ? (
            <Button onClick={logOutUser} color="inherit">
              Logout
            </Button>
          ) : (
            <span>
              <Button onClick={logIn} color="inherit">
                Login
              </Button>{" "}
              /
              <Button onClick={signUp} color="inherit">
                Sign-Up
              </Button>
            </span>
          )}
        </Toolbar>
      </AppBar>
      <br />
      {showLogin ? (
        <div>
          <AddExpense emitData={(data) => addExpense(data)} />
          <ListView
            currId={currId}
            users={users}
            expenses={expenses}
            invites={invites}
            emitData={(data) => {
              addInvites(data);
            }}
            getInv={(uid, eid) => {
              getInvites(uid, eid);
            }}
          />
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default HomePage;
