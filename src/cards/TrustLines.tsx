import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CreateTrustLineApi } from '../services/LinesApi ';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import { currencies } from '../services/LocalService';

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

export default function TrustLines() {
  const classes = useStyles();
  const [trustAccount, setTrustAccount] = useState("")
  const [trustCurrency, setTrustCurrency] = React.useState('EUR');

  const storageKey = window.location.pathname
  const [isLoaded, setIsLoaded] = React.useState(true);

  const createTrustLine = () => {
    setIsLoaded(false)
    CreateTrustLineApi(storageKey, trustAccount,trustCurrency).then(() => setIsLoaded(true))
  }

  const handleTrustCurrency= (event: any) => {
    setTrustCurrency(event.target.value);
  };


  return (
    <div className={classes.root} >
      {isLoaded ? <Paper elevation={3} >
        <Typography variant="h5">Create TrustLine</Typography>
        <form className={classes.inp} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Trusted account" onChange={(e) => setTrustAccount(e.target.value)} value={trustAccount} />
          
          <TextField
              id="standard-select-currency"
              select
              label={"Currency for TrustLine "}
              value={trustCurrency}
              onChange={handleTrustCurrency}
              
            // helperText="Please select your currency"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          
          <Button
            variant="contained"
            color="primary"
            size="large"
            //just for sure
            onClick={createTrustLine}
            className={classes.button}
            startIcon={<CallSplitIcon />}
          >
            Create trustline
      </Button>
        </form>
      </Paper>
        : <CircularProgress />}
    </div>
  );
}
