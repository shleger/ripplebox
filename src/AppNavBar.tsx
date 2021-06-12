import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Menu, Fade, MenuItem } from '@material-ui/core';
import { MemoryRouter as Router, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';

import TrustLines from "./cards/TrustLines"
import Profile from './cards/Profile';
import Home from './cards/Home';
import TrustedAccounts from './cards/AccountLines';
import SendAssest from './cards/SendAsset';
import Exchange from './cards/Exchange ';
import Orders from './cards/Orders';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '540px',
      // width: '460px',
      marginLeft: "auto",
      marginRight: "auto"

    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    linkStyle: {
      textDecoration: 'none',
      color: 'black',
      display: 'block'
    }
  }),
);


export default function ButtonAppBar() {
  const classes = useStyles();
  const header = window.location.pathname.substr(1)
  window.document.title = header? header: "RippleBox"

  const [state, setState] = React.useState({ selectedItem: "Home" });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };



  const handleClose = (e: any) => {
    setAnchorEl(null);

    const value = e.currentTarget.outerText
    setState({
      selectedItem: value === header? "Profile" : value
    });
  };

  return (
    <div className={classes.root}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              id="fade-button"
              aria-controls="fade-menu"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              edge="start" className={classes.menuButton}
              color="inherit"
              aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Link to="/createTrustLine" className={classes.linkStyle}>
                <MenuItem onClick={handleClose}>Create TrustLine</MenuItem>
              </Link>
              <Link to="/accounts" className={classes.linkStyle}>
                <MenuItem onClick={handleClose}>Account Lines</MenuItem>
              </Link>
              <Link to="/send" className={classes.linkStyle}>
                <MenuItem onClick={handleClose}>Send </MenuItem>
              </Link>
              <Link to="/exchange" className={classes.linkStyle}>
                <MenuItem onClick={handleClose}>Exchange</MenuItem>
              </Link>
              <Link to="/orders" className={classes.linkStyle}>
                <MenuItem onClick={handleClose}>Exchange Orders</MenuItem>
              </Link>
              <Link to="/" className={classes.linkStyle}>
                <MenuItem onClick={handleClose}>Home</MenuItem>
              </Link>
            </Menu>
            <Typography variant="h6" className={classes.title}>
              {state.selectedItem}
            </Typography>
            <Link to="/profile" onClick={handleClose} className={classes.linkStyle} style={{ color: 'white' }}>
              {header}
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit">
                <AccountCircle />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/createTrustLine">
            <TrustLines />
          </Route>

          <Route path="/send">
            <SendAssest />
          </Route>

          <Route path="/accounts">
            <TrustedAccounts/>
           </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/exchange">
            <Exchange />
          </Route>

          <Route path="/orders">
            <Orders />
          </Route>

          <Route path="/">
            <Home />
          </Route>



        </Switch>
      </Router>
    </div>
  );
  
}
