import React, { useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { AccountObjects } from '../services/AccountApi';
import { Amount, OfferLedgerEntry, RippledAmount } from 'ripple-lib/dist/npm/common/types/objects';
import { AccountObjectsResponse } from 'ripple-lib';
import { CurrencyLabel } from '../services/LocalService';

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
  { field: 'id', headerName: 'id', width: 50, hide: false },
  { field: 'type', headerName: 'Type', description: 'LedgerEntryType', type: 'number', width: 70 },
  { field: 'takerGets', headerName: 'Gets', description: 'TakerGets', width: 90 },
  { field: 'takerPays', description: 'TakerPays', headerName: 'Pays',  width: 90 },
  { field: 'sequence', headerName: 'Sequence', description:"Sequence", width: 100 },
  { field: 'issuerGets', description: 'IssuerGets', headerName: 'IssuerGets',width: 130 },
  { field: 'issuerPays', description: 'IssuerPays', headerName: 'IssuerPays',width: 130 },
  { field: 'previousTxnID', description: 'PreviousTxnID', headerName: 'PreviousTxnID', width: 600 },
];


interface AccountObjectsTable {
  id: number,
  sequence: number,
  type: string,
  takerGets: string,
  takerPays: string,
  issuerGets?:string,
  issuerPays?:string,
  previousTxnID: string,
}

const rowsInit : Array<AccountObjectsTable> = []



export default function Orders() {
  const classes = useStyles();
  const storageKey = window.location.pathname
  const [isLoading, setIsLoading] = React.useState(true);
  const [rows, setRows] = React.useState(rowsInit)

  useEffect(() => {



    AccountObjects(storageKey).then((accObj) => {

      if (accObj as AccountObjectsResponse) {
        let i = 0;
        let rowsAct : Array<AccountObjectsTable> = [];

        (accObj as AccountObjectsResponse).account_objects.forEach(p => {

          if ((p as OfferLedgerEntry).TakerGets) {

            let f: OfferLedgerEntry = (p as OfferLedgerEntry)

            let a: AccountObjectsTable = {
                id: -1,
                sequence: -1,
                type: "",
                takerGets: "",
                takerPays: "",
                issuerGets:"",
                issuerPays:"",
                previousTxnID: "",
              };

            a.id = i++
            a.sequence = f.Sequence
            a.type = f.LedgerEntryType
           
            const amountGet = ((f.TakerGets as RippledAmount) as Amount)
            const amountPays = ((f.TakerPays as RippledAmount) as Amount)
           
            a.takerGets = CurrencyLabel.get(amountGet.currency) +  amountGet.value 
            a.takerPays = CurrencyLabel.get(amountPays.currency) + amountPays.value
           
            a.issuerGets = amountGet.issuer
            a.issuerPays = amountPays.issuer

            a.previousTxnID = f.PreviousTxnID

            rowsAct.push(a)
          }

          console.log("rowsAct pushed: " + JSON.stringify((rowsAct)))




        });

        setRows(rowsAct)
        setIsLoading(false)
      }


    })



  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // [] --call only one time when onLoad react component



  return (
    <div className={classes.root} >
      <Paper elevation={3} >
        <Typography variant="h5" >Exchange Orders</Typography>
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
