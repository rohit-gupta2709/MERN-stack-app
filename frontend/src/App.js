import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// import Users from './user/pages/Users'
// import NewPlace from './places/pages/NewPlace'
import Navbar from './Components/Navigation/Navbar'
// import UserPlaces from './places/pages/UserPlaces'
import 'bootstrap/dist/css/bootstrap.min.css'
// import UpdatePlace from './places/pages/UpdatePlace'
// import Auth from './user/pages/Auth'
// import SignUp from './user/pages/SignUp'
import { AuthContext } from './context/authContext'
import { useAuth } from './Components/Hooks/auth-hook'
import Loader from './Components/UIElements/Loader'

const Users = React.lazy(() => import('./user/pages/Users'))
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'))
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'))
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'))
const Auth = React.lazy(() => import('./user/pages/Auth'))
const SignUp = React.lazy(() => import('./user/pages/SignUp'))

const App = () => {

  const { token, login, logout, userId } = useAuth();
  console.log(process.env)

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
        <Suspense fallback={
          <div className="center">
            <Loader />
          </div>
        }>
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
        </Suspense>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
