import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import HomePage from '../../Routes/HomePage/HomePage';
import AppContext from '../../Contexts/AppContext';
import CreateAccountPage from '../../Routes/CreateAccountPage/CreateAccountPage';
import LoginPage from '../../Routes/LoginPage/LoginPage';
import TokenService from '../../Services/TokenService';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      basePath: '/dispatch-office-client', 
      loggedIn: false,
      newUser: false,
      setLoggedIn: () => {},
      setNewUser: () => {},
    }
  }

  componentDidMount = () => {
    // Do fetch requests here and initialize state
    this.setState({
      loggedIn: TokenService.hasAuthToken()
    })
  }

  setLoggedIn = (loggedIn) => {
    console.log(`Logged In: ${loggedIn}`);
    this.setState({
      loggedIn
    })
  }

  setNewUser = (newUser) => {
    this.setState({
      newUser
    })
  }

  render() {

    const value = {
      basePath: this.state.basePath,
      loggedIn: this.state.loggedIn,
      newUser: this.state.newUser,
      setLoggedIn: this.setLoggedIn,
      setNewUser: this.setNewUser,
    }

    return (
      <AppContext.Provider value={value}>
        <div className='App'>
          
          <Header />
          <Switch>

            {/* Begin the app with the /app endpoint */}
            <Route exact path='/'>
              <Redirect to={value.basePath} />
            </Route>  

            <Route 
              exact
              path={value.basePath}
              component={HomePage}
            />

            <Route
              exact
              path={`${value.basePath}/create-account`}
              component={CreateAccountPage}
            />

            <Route
              exact
              path={`${value.basePath}/login`}
              component={LoginPage}
            />

          </Switch>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;