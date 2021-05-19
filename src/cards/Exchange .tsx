import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { FormControl, Input, InputAdornment, InputBase, InputLabel, MenuItem, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Alert from '@material-ui/lab/Alert'
import SendApi from '../services/SendApi';
import ExchangeApi from '../services/ExchangeApi ';
import { CurrencyLabel } from '../services/LocalService';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ImportExportIcon from '@material-ui/icons/ImportExport';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(160),
        height: theme.spacing(56),
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
    margin: {
      marginTop: '12px'
    }
  }),
);

const directions = [
  {
    value: 'SELL',
    label: 'SELL',
  },
  {
    value: 'BUY',
    label: 'BUY',
  }]

const currencies = [
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
export default function Exchange() {
  const classes = useStyles();
  const [destAccount, setDestAccount] = useState("")
  const [issuerAccount, setIssuerAccount] = useState("")
  const [destValue, setDestValue] = useState(0)
  const storageKey = window.location.pathname
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [currency, setCurrency] = React.useState('EUR');
  const [direction, setDirection] = React.useState('SELL');


  const sendValue = () => {
    // setIsLoaded(false)

    //   ExchangeApi(storageKey,destAccount,currency,destValue,issuerAccount)
    //   .then(()=> setIsLoaded(true))


  }
  const handleChangeCur = (event: any) => {
    setCurrency(event.target.value);
  };

  const handleChangeDir = (event: any) => {
    setDirection(event.target.value);
  };

  return (
    <div className={classes.root} >
      {isLoaded ? <Paper elevation={3} >
        <Typography variant="h5">Exchange Asset</Typography>
        <Alert severity="info">This is an info|error alert — check it out!</Alert>

        <Typography variant="h5" > Place order</Typography>
        <form noValidate autoComplete="off">

          <InputBase
            className={classes.margin}
            defaultValue="Direction"
            inputProps={{ 'aria-label': 'naked' }}
          />

          <FormControl  >
            <TextField
              id="standard-dir-currency"
              select
              label="I want to"
              value={direction}
              onChange={handleChangeDir}
              className={classes.curr}
            // helperText="Please select your currency"
            >
              {directions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          <div className={classes.inp} >
            <TextField
              id="standard-select-currency"
              select
              label={"Currency to " + direction}
              value={currency}
              onChange={handleChangeCur}
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

            <Typography variant="h5" > With</Typography>

            <TextField
              id="standard-select2-currency"
              select
              label={"Currency"}
              value={currency}
              onChange={handleChangeCur}
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
              startIcon={<SupervisorAccountIcon />}
            >
              Place order
      </Button>
          </div>
        </form>

      </Paper>
        : <CircularProgress />}

    </div>
  );
}
