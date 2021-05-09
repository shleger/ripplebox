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

import MyPaper from "./cards/MyPaper"


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
              <Link to="/about" style={{ textDecoration: 'none', display: 'block' }}>
                <MenuItem onClick={handleClose}>About</MenuItem>
              </Link>
              <Link to="/users" style={{ textDecoration: 'none', display: 'block' }}>
                <MenuItem onClick={handleClose}>Users</MenuItem>
              </Link>
              <Link to="/about" style={{ textDecoration: 'none', display: 'block' }}>
                <MenuItem onClick={handleClose}>News</MenuItem>
              </Link>
            </Menu>
            <Typography variant="h6" className={classes.title}>
              {name1}
            </Typography>
            <Button color="inherit">Login1</Button>
          </Toolbar>
        </AppBar>
        
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/news">
            <News />
          </Route>

          <Route path="/">
            <Home />
          </Route>

        </Switch>
      </Router>
    </div>
  );

  function News() {
    return <h2>News</h2>;
  }

  function Home() {
    return <h2>Home</h2>;
  }

  function About() {
    return <MyPaper />;
  }

  function Users() {
    return <h2>Users</h2>;
  }
}
