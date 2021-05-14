import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CreateTrustLineApi } from '../services/LinesApi ';

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
  const [trustAccount, setTrustAccount] = useState("")
  const storageKey = window.location.pathname

  const createTrustLine = () => {
    
    CreateTrustLineApi(storageKey, trustAccount)

  }

  return (
    <div className={classes.root} >
      <Paper elevation={3} >
        <Typography>Create trustline button</Typography>
        <Typography>List trustlines</Typography>
        <form className={classes.inp} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Trusted accunt" onChange={(e) => setTrustAccount(e.target.value)} value={trustAccount} />

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
    </div>
  );
}
