import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'
import Navbar from './Components/Navigation/Navbar'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/places/new">
          <NewPlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
