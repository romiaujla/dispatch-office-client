import React, { Component } from "react";
import "./App.css";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "../Header/Header";
import HomePage from "../../Routes/HomePage/HomePage";
import AppContext from "../../Contexts/AppContext";
import CreateAccountPage from "../../Routes/CreateAccountPage/CreateAccountPage";
import LoginPage from "../../Routes/LoginPage/LoginPage";
import TokenService from "../../Services/TokenService";
import DashboardPage from "../../Routes/DashboardPage/DashboardPage";
import Logout from "../Logout/Logout";
import CarrierService from '../../Services/CarrierServices';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basePath: "/dispatch-office-client",
      loggedIn: false,
      newUser: false,
      carrier: [],
      loggedInCarrier: {
        full_name: '',
        company_name: '',
        mc_num: ''
      },
    };
  }

  componentDidMount = async () => {
    this.setState({
      loggedIn: TokenService.hasAuthToken()
    });
    if(TokenService.hasAuthToken()){
      const carrierData = await CarrierService.getCarrierData()
        .then(res => res)
        .catch(err => console.log(err))
      this.setState({
        carrier: carrierData
      });
    }
  };

  setLoggedIn = loggedIn => {
    this.setState({
      loggedIn
    });
  };

  setLoggedInCarrier = loggedInCarrier => {
    this.setState({
      loggedInCarrier
    });
  };

  setCarrier = (carrier) => {
    this.setState({
      carrier
    });
  };

  setNewUser = newUser => {
    this.setState({
      newUser
    });
  };

  render() {
    const value = {
      basePath: this.state.basePath,
      loggedIn: this.state.loggedIn,
      newUser: this.state.newUser,
      setLoggedIn: this.setLoggedIn,
      setNewUser: this.setNewUser,
      setCarrier: this.setCarrier,
      setLoggedInCarrier: this.setLoggedInCarrier,
      loggedInCarrier: this.state.loggedInCarrier,
      carrier: this.state.carrier,
    };

    return (
      <AppContext.Provider value={value}>
        <div className="App">
          <Header />
          {
            this.state.loggedIn && <Route path="/" component={Logout} />
          }
          <Switch>
            {/* Begin the app with the /app endpoint */}

            <Route exact path="/">
              <Redirect to={value.basePath} />
            </Route>

            <Route exact path={value.basePath} component={HomePage} />

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

            <Route
              exact
              path={`${value.basePath}/dashboard`}
              component={DashboardPage}
            />
          </Switch>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
