import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HomePage from '../../Routes/HomePage/HomePage';
import AppContext from '../../Contexts/AppContext';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      basePath: '/app', 
      loggedIn: () => {},
      newUser: () => {},
    }
  }

  static componentDidMount = () => {
    // Do fetch requests here and initialize state
  }

  // this function will check if the user is logged in
  isLoggedIn = () => {
    return true;
  }

  // this function will check if the user is new
  isNewUser = () => {
    return true;
  }

  render() {

    const value = {
      basePath: this.state.basePath,
      loggedIn: this.isLoggedIn(),
      newUser: this.isNewUser(),
    }

    return (
      <AppContext.Provider value={value}>
        <div className='App'>
          
          <Header />
          <Switch>

            {/* Begin the app with the /app endpoint */}
            <Route exact path='/'>
              <Redirect to='/app' />
            </Route>  

            <Route 
              exact
              path={`${this.state.basePath}`}
              component={HomePage}
            />



          </Switch>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;