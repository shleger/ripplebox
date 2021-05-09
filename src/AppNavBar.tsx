import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Menu, Fade, MenuItem } from '@material-ui/core';
import { MemoryRouter as Router, Route, Switch } from 'react-router';
import { Link, Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';

import TrustLines from "./cards/TrustLines"


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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
  const name1 = "Profile1"

  //TODO my
  const [state, setState] = React.useState({ name1: "init" });



  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);

    setState({ //TODO my
      name1: "profile"
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
              <Link to="/send" className={classes.linkStyle}>
                <MenuItem onClick={handleClose}>Send </MenuItem>
              </Link>
              <Link to="/accounts" className={classes.linkStyle}>
                <MenuItem onClick={handleClose}>Accounts</MenuItem>
              </Link>
            </Menu>
            <Typography variant="h6" className={classes.title}>
              {name1}
            </Typography>
            <Link to="/profile" className={classes.linkStyle} style={{ color: 'white' }}>
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
            <Users />
          </Route>

          <Route path="/accounts">
            <News />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/">
            <Home />
          </Route>

        </Switch>
      </Router>
    </div>
  );

  function News() {
    return <h2>Accounts</h2>;
  }

  function Home() {
    return <h2>Home</h2>;
  }

  function Users() {
    return <h2>Send</h2>;
  }

  function Profile() {
    return <h2>Profile</h2>;
  }
}
