import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { FormControl, Input, InputAdornment, InputLabel, TextField, Typography } from '@material-ui/core';
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
  }),
);



export default function SimplePaper() {
  const classes = useStyles();
  const [xrpBal, setXrpBal] = useState("")


  return (
    <div className={classes.root} >
      <Paper elevation={3} >
        <Typography> XRP founds</Typography>
        <InputBase
          // className={classes.margin}
          defaultValue="Naked input"
          inputProps={{ 'aria-label': 'naked' }}
          style={{ marginTop: '12px' }}
        />


        <FormControl  >
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={xrpBal}
            onClick={() => {setXrpBal(AccountApi()); }}
            startAdornment={<InputAdornment position="start">XRP</InputAdornment>}
          />
        </FormControl>

        <Typography>Open trustlines</Typography>


        <InputBase
          // className={classes.margin}
          defaultValue="Naked input"
          inputProps={{ 'aria-label': 'naked' }}
          style={{ marginTop: '12px' }}
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
    </div>
  );
}


