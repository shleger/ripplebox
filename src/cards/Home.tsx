import React, { useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { CircularProgress, FormControl, Input, InputAdornment, InputLabel, TextField, Typography } from '@material-ui/core';
import { InputBase } from '@material-ui/core';
import AccountApi from '../services/AccountApi';


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



export default function SimplePaper() {
  const classes = useStyles();
  const [xrpBal, setXrpBal] = useState("")
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    try {
      AccountApi(window.location.pathname).then((val) => { setXrpBal(String(val)); setIsLoaded(true); })
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
            defaultValue="Naked input"
            inputProps={{ 'aria-label': 'naked' }}
          />


          <FormControl  >
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input
              id="standard-adornment-amount"
              value={xrpBal}
              startAdornment={<InputAdornment position="start">XRP</InputAdornment>}
            />
          </FormControl>

          <Typography variant="h5" className={classes.margin}>Lines</Typography>
          <InputBase
            className={classes.margin}
            defaultValue="Naked input"
            inputProps={{ 'aria-label': 'naked' }}
          />
          <FormControl  >
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input
              id="standard-adornment-amount"
              value={xrpBal}
              // onChange={handleChange('amount')}
              startAdornment={<InputAdornment position="start">€</InputAdornment>}
            />
          </FormControl>
        </Paper>
        : <CircularProgress />}
    </div>
  );
}


