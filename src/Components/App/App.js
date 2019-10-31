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
import DriversService from '../../Services/DriversService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basePath: "/dispatch-office-client",
      loggedIn: false,
      newUser: false,
      shipments: [],
      driverData: [],
      loggedInCarrier: {
        full_name: '',
        company_name: '',
        mc_num: ''
      },
    };
  }

  // gets all the carrierData
  getShipments = async () => {
    const shipments = await CarrierService.getCarrierData()
      .then(data => data)
      .catch(err => console.log(err))
    this.setState({
      shipments
    });
  }

  // gets all driversData
  getDrivers = async () => {
    const driverData = await DriversService.getDriversData()
      .then(data => data)
      .catch(err => console.log(err));
    this.setState({
      driverData
    });
  }

  componentDidMount = async () => {
    this.setState({
      loggedIn: TokenService.hasAuthToken()
    });
    if(TokenService.hasAuthToken()){
      this.getShipments();
      this.getDrivers();
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
      shipments: this.state.shipments,
      driversData: this.state.driverData,
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
