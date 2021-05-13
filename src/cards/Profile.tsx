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

  const [profileData, setProfileData] = useState({
    accUser: "",
    accAddress: "",
    accSecret: "",
    server:"wss://s.altnet.rippletest.net:51233"
  })


  useEffect(() => {

    const parsed = localStorage.getItem('profileData')
    if (parsed?.length != 0) {
      setProfileData(JSON.parse(String(parsed)))
    }

  }, []); // [] --call only one time



  const saveData = () => {
    localStorage.setItem('profileData', JSON.stringify(profileData))
  }

  return (
    <div className={classes.root} >
      <Paper elevation={3} >
        <Typography variant="h5" gutterBottom>Testnet credentials</Typography>
        <form className={classes.inp} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Name" onChange={(e) => setProfileData({ ...profileData, accUser: e.target.value })} value={profileData?.accUser} />
          <TextField id="standard-basic" label="Account address" onChange={(e) => setProfileData({ ...profileData, accAddress: e.target.value })} value={profileData?.accAddress} />
          <TextField id="filled-basic" label="Account secret" type="password" variant="filled" onChange={(e) => setProfileData({ ...profileData, accSecret: e.target.value })} value={profileData?.accSecret} />
          <TextField id="standard-basic" label="Server" onChange={(e) => setProfileData({ ...profileData, server: e.target.value })} value={profileData?.server} />

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
