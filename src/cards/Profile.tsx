import React, { useEffect, useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(160),
        height: theme.spacing(50),
      },
    },
    inp: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
      },
    },
    button: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(10)
    },
  }),
);

export default function SimplePaper() {
  const classes = useStyles();

  const [address, setAddress] = useState("")
  const [secret, setSecret] = useState("")
  const [user, setUser] = useState("")


  useEffect(() => {

    setUser(localStorage.getItem("accUser") + "")
    setAddress(localStorage.getItem("accAddress") + "")
    setSecret(localStorage.getItem("accSecret") + "")

  }, []); // [] --call only one time



  const saveData = () => {
    // TODO === JSON.stringify with user key or prefix !!!

    localStorage.setItem('accAddress', address)
    localStorage.setItem('accSecret', secret)
    localStorage.setItem('accUser', user)

  }

  return (
    <div className={classes.root} >
      <Paper elevation={3} >
        <Typography variant="h5" gutterBottom>Testnet credentials</Typography>
        <form className={classes.inp} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Name" onChange={(e) => setUser(e.target.value)} value={user ? user : ""} />
          <TextField id="standard-basic" label="Account address" onChange={(e) => setAddress(e.target.value)} value={address ? address : ""} />
          <TextField id="filled-basic" label="Account secret" type="password" variant="filled" onChange={(e) => setSecret(e.target.value)} value={secret ? secret : ""} />
          <Button
            variant="contained"
            color="primary"
            size="large"
            //just for sure
            onClick={saveData}
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Save
      </Button>
        </form>
      </Paper>
    </div>
  );
}
