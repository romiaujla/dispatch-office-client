import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HomePage from '../../Routes/HomePage/HomePage';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      // Initialize the default state
    }
  }

  static componentDidMount = () => {

    // Do fetch requests here and initialize state

  }

  render() {
    const basePath = '/app';

    return (
      <div className='App'>
        
        <Header />
        <Switch>

          {/* Begin the app with the /app endpoint */}
          <Route exact path='/'>
            <Redirect to='/app' />
          </Route>  

          <Route 
            exact
            path={`${basePath}`}
            component={HomePage}
          />

          

        </Switch>
        <Footer />
      </div>

    );
  }
}

export default App;