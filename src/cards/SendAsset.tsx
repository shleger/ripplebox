import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { MenuItem, Typography } from '@material-ui/core';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Alert from '@material-ui/lab/Alert'
import SendApi from '../services/SendApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(160),
        height: theme.spacing(50),
      }
    },
    inp: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
      },
    },
    curr: {
      marginTop: theme.spacing(5),
      width: theme.spacing(25),
    },
    button: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(5)
    },
  }),
);

const currencies = [
  {
    value: 'XRP',
    label: 'XRP',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'GBP',
    label: '£',
  },
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];
export default function SendAssest() {
  const classes = useStyles();
  const [destAccount, setDestAccount] = useState("")
  const [issuerAccount, setIssuerAccount] = useState("")
  const [destValue, setDestValue] = useState(0)
  const storageKey = window.location.pathname
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [currency, setCurrency] = React.useState('EUR');


  const sendValue = () => {
    setIsLoaded(false)

    if(currency != 'XRP'){
      SendApi(storageKey,destAccount,currency,destValue,issuerAccount)
      .then(()=> setIsLoaded(true))
    }

  }
  const handleChange = (event: any) => {
    setCurrency(event.target.value);
  };

  return (
    <div className={classes.root} >
      {isLoaded ? <Paper elevation={3} >
        <Typography variant="h5">Send  Asset</Typography>
        <Alert severity="info">This is an info|error alert — check it out!</Alert>

        <form className={classes.inp} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Destination account" onChange={(e) => setDestAccount(e.target.value)} value={destAccount} />
          <TextField id="standard-basic" label="Issuer account" onChange={(e) => setIssuerAccount(e.target.value)} value={issuerAccount} />
          <TextField
            id="standard-select-currency"
            select
            label="Please currency to send"
            value={currency}
            onChange={handleChange}
            className={classes.curr}
          // helperText="Please select your currency"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField id="standard-basic" label="Amount of value" onChange={(e) => setDestValue(Number(e.target.value))} value={destValue} type='number' />

          <Button
            variant="contained"
            color="primary"
            size="large"
            //just for sure
            onClick={sendValue}
            className={classes.button}
            startIcon={<AccountBalanceWalletIcon />}
          >
            Send Asset
      </Button>
        </form>

      </Paper>
        : <CircularProgress />}

    </div>
  );
}
