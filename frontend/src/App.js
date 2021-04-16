import React, { useCallback, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'
import Navbar from './Components/Navigation/Navbar'
import UserPlaces from './places/pages/UserPlaces'
import 'bootstrap/dist/css/bootstrap.min.css'
import UpdatePlace from './places/pages/UpdatePlace'
import Auth from './user/pages/Auth'
import SignUp from './user/pages/SignUp'
import { AuthContext } from './context/authContext'

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
  }, [])

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      login: login,
      logout: logout
    }}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/auth" exact>
            <Auth />
          </Route>
          <Route path="/auth/signup" exact>
            <SignUp />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Route path="/places/:placeId" >
            <UpdatePlace />
          </Route>
          <Route path="/:userId/places">
            <UserPlaces />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
