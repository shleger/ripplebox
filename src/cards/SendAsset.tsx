import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { MenuItem, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Alert, { Color } from '@material-ui/lab/Alert'
import SendApi from '../services/SendApi';
import { FormattedSubmitResponse } from 'ripple-lib/dist/npm/transaction/submit';
import { Alertable } from '../services/LocalService';

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
      marginTop: theme.spacing(1)
    },
    alerting:{
      fontSize:'13px'
    }
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

const initOpResult: Alertable = {level:"info", response:{resultCode:"",resultMessage:""}};
export default function SendAssest() {
  const classes = useStyles();
  const [destAccount, setDestAccount] = useState("")
  const [opResult, setOpResult] = useState(initOpResult)
  const [issuerAccount, setIssuerAccount] = useState("")
  const [destValue, setDestValue] = useState(0)
  const storageKey = window.location.pathname
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [isAlerted, setIsAlerted] = React.useState(false);
  const [isXrpSelected, setIsXrpSelected] = React.useState(false);
  const [currency, setCurrency] = React.useState('EUR');


  const sendValue = () => {
    setIsLoaded(false)

    SendApi(storageKey, destAccount, currency, destValue, issuerAccount)
      .then((res) => { setIsLoaded(true); setIsAlerted(true); setOpResult({level:"info", response: (res as FormattedSubmitResponse)}) })
      .catch((err) => {

        console.error(err)
        setIsLoaded(true); 
        setIsAlerted(true)
        setOpResult({level:"error", response:{resultCode:"System",resultMessage:String(err).substr(0,200)}})

      })
      


  }
  const handleChange = (event: any) => {
    const curr = event.target.value
    setCurrency(curr);
    curr === 'XRP' ? setIsXrpSelected(true) : setIsXrpSelected(false)

  };

  return (
    <div className={classes.root} >
      {isLoaded ? <Paper elevation={3} >
        {isAlerted  && opResult ? <Alert className={classes.alerting} severity={opResult.level}> [{opResult.response.resultCode}] {opResult.response.resultMessage}</Alert> : <Typography variant="h5">Send Asset</Typography>}

        <form className={classes.inp} noValidate autoComplete="off">
          <TextField id="standard-basic17" label="Destination account" onChange={(e) => setDestAccount(e.target.value)} 
          value={destAccount} />
          <TextField id="standard-basic18" label={ isXrpSelected ? " " : "Issuer account"} onChange={(e) => setIssuerAccount(e.target.value)} 
          value={issuerAccount} disabled={isXrpSelected}/>
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

          <TextField id="standard-basic19" label="Amount of value" onChange={(e) => setDestValue(Number(e.target.value))} value={destValue} type='number' />

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
