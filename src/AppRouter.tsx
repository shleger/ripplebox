import React from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router';
import { Link, Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Omit } from '@material-ui/types';
import App2 from "./App2"
import App3 from "./App3"
import AppDrawer from "./AppDrawer"

const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((props, ref) => (
  <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
));

export default function ButtonRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Button href="/" variant="contained" color="primary">Home</Button>
            </li>
            <li>
              <Button href="/about" variant="contained" color="primary">about</Button>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users" color="primary" >Users</Link>
            </li>
            <li>
              <Link to="/drawer" color="primary" >Drawer</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
            <App2 />
          </Route>
          <Route path="/users">
            <Users />
            <App3 />
          </Route>
          <Route path="/drawer">
            <AppDrawer />
          </Route>
          <Route path="/">
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
  function Home() {
    return <h2>Home</h2>;
  }

  function About() {
    return <h2>About</h2>;
  }

  function Users() {
    return <h2>Users</h2>;
  }
}
