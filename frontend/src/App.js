import React, { useCallback, useEffect, useState } from 'react'
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
import { useAuth } from './Components/Hooks/auth-hook'

let logoutTimer

const App = () => {

  const [token, settoken] = useState()
  const [userId, setUserId] = useState()
  const [tokenExpiration, settokenExpiration] = useState()


  const login = useCallback((uid, token, expirationDate) => {
    settoken(token)
    setUserId(uid)
    const tokenExpiration = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
    settokenExpiration(tokenExpiration)
    localStorage.setItem('userData', JSON.stringify({
      userid: uid,
      token: token,
      expiration: tokenExpiration.toISOString()
    }), [])
  }, [])

  const logout = useCallback(() => {
    settoken(null)
    setUserId(null)
    settokenExpiration(null)
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    if (token) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, logout, tokenExpiration])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration))
    }
  }, [login])

  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      login: login,
      logout: logout
    }}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/auth" exact component={Auth} />
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
