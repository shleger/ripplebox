import React, { useEffect, useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { initProfileData, ProfileData } from '../services/LocalService'

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
  const [profileData, setProfileData] = useState(initProfileData)
  const storageKey = window.location.pathname
  // const storageKey = 'profileData'


  useEffect(() => {


    const parsed = localStorage.getItem(storageKey)
    if (parsed?.length != 0) {
      // setProfileData(JSON.parse(String(parsed))) --works too
      //https://stackoverflow.com/a/62413684
      const pdParsed: ProfileData = JSON.parse(String(parsed))
      setProfileData(pdParsed)
    }

  }, []); // [] --call only one time when onLoad react component



  const saveData = () => {
    localStorage.setItem(storageKey, JSON.stringify(profileData))
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
