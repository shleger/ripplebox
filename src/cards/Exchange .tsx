import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { FormControl, InputBase, MenuItem, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert'
import ExchangeApi from '../services/ExchangeApi ';
import { Alertable, currencies, directions } from '../services/LocalService';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { FormattedOrderSpecification } from 'ripple-lib/dist/npm/common/types/objects';
import { FormattedSubmitResponse } from 'ripple-lib/dist/npm/transaction/submit';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
      // display: 'flex',
      // flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        height: theme.spacing(50),
      }
    },
    inp: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
      },
    },
    curr: {
      marginTop: theme.spacing(5),
      width: theme.spacing(25),
    },
    button: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(5)
    },
    margin: {
      marginTop: '12px'
    },
    alerting:{
      fontSize:'13px'
    }
  }),
);

export default function Exchange() {
  const storageKey = window.location.pathname
  const initOpResult: Alertable = {level:"info", response:{resultCode:"",resultMessage:""}};



  const classes = useStyles();
  const [destValueIn, setDestValueIn] = useState(0)
  const [destValueOut, setDestValueOut] = useState(0)
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [isAlerted, setIsAlerted] = React.useState(false);
  const [currencyIn, setCurrencyIn] = React.useState('USD');
  const [currencyOut, setCurrencyOut] = React.useState('EUR');
  const [direction, setDirection] = React.useState('sell');
  const [opResult, setOpResult] = useState(initOpResult)


  const [state, setState] = React.useState({
    passive: false,
    fillOrKill: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };



  const placeOrder = () => {


    const order: FormattedOrderSpecification = {
      "direction": direction,
      "quantity": {
        "currency": currencyIn,
        // "counterparty": "rNnjjJvBmrkboPfUEaD459MrnMLUDgB67x", //TODO rm
        "value": String(destValueIn)
      },
      "totalPrice": {
        "currency": currencyOut,
        // "counterparty": "rNnjjJvBmrkboPfUEaD459MrnMLUDgB67x", //TODO rm
        "value": String(destValueOut)
      },
      "passive": state.passive,
      "fillOrKill": state.fillOrKill
    };


    setIsLoaded(false)

    ExchangeApi(storageKey, order)
    .then((res) => { setIsLoaded(true); setIsAlerted(true); setOpResult({level:"info", response: (res as FormattedSubmitResponse)}) })
    .catch((err) => {

      console.error(err)
      setIsLoaded(true); 
      setIsAlerted(true)
      setOpResult({level:"error", response:{resultCode:"System",resultMessage:String(err).substr(0,200)}})

    })


  }
  const handleChangeCurOut = (event: any) => {
    setCurrencyOut(event.target.value);
  };

  const handleChangeCurIn = (event: any) => {
    setCurrencyIn(event.target.value);
  };

  const handleChangeDir = (event: any) => {
    setDirection(event.target.value);
  };

  return (
    <div className={classes.root} >
      {isLoaded ? <Paper elevation={3} >
        {isAlerted  && opResult ? <Alert className={classes.alerting} severity={opResult.level}> [{opResult.response.resultCode}] {opResult.response.resultMessage}</Alert> : <Typography variant="h5">Exchange Asset</Typography>}

        <form noValidate autoComplete="off">

        <InputBase
            className={classes.margin}
            defaultValue="Taker Pays"
            inputProps={{ 'aria-label': 'naked' }}
          />

          <FormControl  >
            <TextField
              id="standard-dir-currency"
              select
              label="I want to"
              value={direction}
              onChange={handleChangeDir}
              className={classes.curr}
            // helperText="Please select your currency"
            >
              {directions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          <div className={classes.inp} >
            <TextField
              id="standard-select-currency"
              select
              label={"With"}
              value={currencyOut}
              onChange={handleChangeCurOut}
              className={classes.curr}
            // helperText="Please select your currency"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField id="standard-basic12" label="Amount of value" onChange={(e) => setDestValueOut(Number(e.target.value))} value={destValueOut} type='number' />

            <InputBase
            className={classes.margin}
            defaultValue="Taker Gets"
            inputProps={{ 'aria-label': 'naked' }}
            />

            <TextField
              id="standard-select2-currency"
              select
              label={"Currency"}
              value={currencyIn}
              onChange={handleChangeCurIn}
              className={classes.curr}
            // helperText="Please select your currency"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField id="standard-basic13" label="Amount of value" onChange={(e) => setDestValueIn(Number(e.target.value))} value={destValueIn} type='number' />

            <FormGroup row>
              <FormControlLabel
                control={<Switch
                  checked={state.fillOrKill}
                  onChange={handleChange}
                  color="primary"
                  name="fillOrKill" />}
                label="FillOrKill"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={state.passive}
                    onChange={handleChange}
                    name="passive"
                    color="primary"
                  />
                }
                label="Passive"
              />
            </FormGroup>


            <Button
              variant="contained"
              color="primary"
              size="large"
              //just for sure
              onClick={placeOrder}
              // className={classes.button}
              startIcon={<SupervisorAccountIcon />}
            >
              Place order
      </Button>
          </div>
        </form>

      </Paper>
        : <CircularProgress />}

    </div>
  );
}
