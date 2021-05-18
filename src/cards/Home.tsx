import React, { useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { CircularProgress, FormControl, Input, InputAdornment, InputLabel, TextField, Typography } from '@material-ui/core';
import { InputBase } from '@material-ui/core';
import AccountApi from '../services/AccountApi';
import LinesApi from '../services/LinesApi ';
import { GetBalanceSheet } from 'ripple-lib/dist/npm/ledger/balance-sheet';
import { CurrencyLabel } from '../services/LocalService';


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
    margin: {
      marginTop: '12px'
    }
  }),
);



export default function HomePaper() {
  const classes = useStyles();
  const [xrpBal, setXrpBal] = useState("")
  const initBalsheet: GetBalanceSheet = {}
  const [curBal, setCurBal] = useState(initBalsheet)
  const [isLoaded, setIsLoaded] = React.useState(false);
  const storKey = window.location.pathname

  useEffect(() => {
    try {
      AccountApi(storKey).then((val) => { setXrpBal(String(val)); setIsLoaded(true); })
      LinesApi(storKey).then((val) => {



        if (val as GetBalanceSheet) {
          console.log("getBalanceSheet: " + JSON.stringify(val))

          setCurBal(val as GetBalanceSheet)
          setIsLoaded(true);
          console.log("initCurBall: " + JSON.stringify(val))

        }

      })

    } catch (error) {
      console.log(error)
      setIsLoaded(true)

    }
  }, []);


  return (
    <div className={classes.root} >
      { isLoaded ?
        <Paper elevation={3} onLoadedData={() => isLoaded} >
          <Typography variant="h5" > XRP founds</Typography>
          <InputBase
            className={classes.margin}
            defaultValue="Crypto"
            inputProps={{ 'aria-label': 'naked' }}
          />



          <FormControl  >
            <InputLabel htmlFor="standard-xrp-amount">Amount</InputLabel>
            <Input
              id="standard-xrp-amount"
              value={xrpBal}
              disabled={true}
              startAdornment={<InputAdornment position="start">XRP</InputAdornment>}
            />
          </FormControl>


          <Typography variant="h5" className={classes.margin}>Lines</Typography>
          {
            curBal?.assets?.map((sheet, i) => (
              <div>
                <InputBase
                  className={classes.margin}
                  defaultValue="Counterparty/Asset"
                  inputProps={{ 'aria-label': 'naked' }}
                />
                <FormControl  >
                  <InputLabel htmlFor={"standard-asset-amount" + i}>{sheet.counterparty}</InputLabel>
                  <Input
                    id={"standard-asset-amount" + i}
                    value={sheet.value}
                    disabled={true}
                    startAdornment={<InputAdornment position="start">{CurrencyLabel.get(sheet.currency)}</InputAdornment>}
                  />
                </FormControl>
              </div>
            ))
          }


          {

            curBal?.obligations?.map((sheet, i) => (
              <div>

                <InputBase
                  className={classes.margin}
                  defaultValue="Obligation"
                  inputProps={{ 'aria-label': 'naked' }}
                />
                <FormControl  >
                  <InputLabel htmlFor={"standard-obligations-amount" + i}>Amount</InputLabel>
                  <Input
                    id={"standard-obligations-amount" + i}
                    value={sheet.value}
                    disabled={true}
                    startAdornment={<InputAdornment position="start">{CurrencyLabel.get(sheet.currency)}</InputAdornment>}
                  />
                </FormControl>
              </div>
            ))
          }

        </Paper>
        : <CircularProgress />}
    </div>
  );
}


