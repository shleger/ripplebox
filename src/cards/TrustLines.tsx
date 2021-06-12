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
    qualityInOut: {
      width: theme.spacing(26),
    },
    button: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(5)
    },
  }),
);

export default function TrustLines() {
  const classes = useStyles();
  const [trustAccount, setTrustAccount] = useState("")
  const [limit, setLimit] = useState("100")
  const [qualityIn, setQualityIn] = useState(0.91)
  const [qualityOut, setQualityOut] = useState(0.17)
  const [trustCurrency, setTrustCurrency] = React.useState('EUR');

  const storageKey = window.location.pathname
  const [isLoaded, setIsLoaded] = React.useState(true);

  const createTrustLine = () => {
    setIsLoaded(false)
    CreateTrustLineApi(storageKey, trustAccount,trustCurrency,limit,qualityIn,qualityOut).then(() => setIsLoaded(true))
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
          
          <TextField id="standard-basic1" label="Limit" onChange={(e) => setLimit(e.target.value)} value={limit} />
          <TextField id="standard-basic2" className= {classes.qualityInOut} label="Quality In" onChange={(e) => setQualityIn(Number(e.target.value))} value={qualityIn} />
          <TextField id="standard-basic3"  className= {classes.qualityInOut} label="Quality Out" onChange={(e) => setQualityOut(Number(e.target.value))} value={qualityOut} />

          
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
