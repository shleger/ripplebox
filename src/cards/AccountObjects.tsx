import React, { useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { CreateTrustLineApi, RpcJsonAccountLines } from '../services/LinesApi ';
import CircularProgress from '@material-ui/core/CircularProgress';

import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(160),
        height: theme.spacing(60),
      },
    },
    inp: {
      '& > *': {
        marginBottom: theme.spacing(3),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
    }
  }),
);

const columns: GridColDef[] = [
  { field: 'id', headerName: 'id', width: 50, hide: true },
  { field: 'account', headerName: 'Account', width: 130 },
  { field: 'balance', headerName: 'Bal', description: 'Balance', width: 60 },
  { field: 'currency', headerName: '¥€$', description: 'Currency', width: 60 },
  { field: 'no_ripple', description: 'Flag: no_ripple', headerName: 'no_ripple', type: 'boolean', width: 90 },
  { field: 'no_ripple_peer', description: 'Flag: no_ripple_peer', headerName: 'no_ripple_peer', type: 'boolean', width: 130 },
  { field: 'limit', description: 'Limit', headerName: 'lim', type: 'number', width: 60 },
  { field: 'limit_peer', description: 'Flag: limit_peer', headerName: 'lim_peer', type: 'number', width: 90 },
  { field: 'quality_in', headerName: 'quality_in', type: 'number', width: 90 },
  { field: 'quality_out', headerName: 'quality_out', type: 'number', width: 90 },
];

const rowsInit = [
  {
    id: 1,
    account: "",
    balance: "",
    currency: "",
    limit: "",
    limit_peer: "",
    no_ripple: true,
    no_ripple_peer: true,
    quality_in: 0,
    quality_out: 0
  }
]

export default function SimplePaper() {
  const classes = useStyles();
  const storageKey = window.location.pathname
  const [isLoading, setIsLoading] = React.useState(true);
  const [rows, setRows] = React.useState(rowsInit)

  useEffect(() => {


    RpcJsonAccountLines(storageKey).then((accObj) => {

      if (accObj?.lines) {
        let i = 0
        const lines = accObj.lines;
        lines.map((item: any) => item.id = i++)
        console.log("account_lines promise: " + JSON.stringify(lines))


        setRows(lines)
        setIsLoading(false)



      }

    })



  }, []); // [] --call only one time when onLoad react component



  return (
    <div className={classes.root} >
      <Paper elevation={3} >
        <Typography variant="h5" >Account objects</Typography>
        <DataGrid
          loading={isLoading}
          disableColumnMenu={true}
          autoPageSize={true}
          checkboxSelection={false}
          className={classes.inp}
          rows={rows}
          columns={columns}
          pageSize={5} />
      </Paper>
    </div>
  );
}
