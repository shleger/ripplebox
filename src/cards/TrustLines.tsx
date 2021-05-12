import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

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

  return (
    <div className={classes.root} >
      <Paper elevation={3} >
      <Typography>Create trustline button</Typography>
      <Typography>List trustlines</Typography>
      </Paper>
    </div>
  );
}
