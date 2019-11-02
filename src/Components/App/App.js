import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../Header/Header";
import HomePage from "../../Routes/HomePage/HomePage";
import AppContext from "../../Contexts/AppContext";
import CreateAccountPage from "../../Routes/CreateAccountPage/CreateAccountPage";
import LoginPage from "../../Routes/LoginPage/LoginPage";
import TokenService from "../../Services/TokenService";
import DashboardPage from "../../Routes/DashboardPage/DashboardPage";
import Logout from "../Logout/Logout";
import CarrierService from "../../Services/CarrierServices";
import DriversService from "../../Services/DriversService";
import EquipmentService from "../../Services/EquipmentsService";
import LoadsPage from "../../Routes/LoadsPage/LoadsPage";
import EquipmentsPage from "../../Routes/EquipmentsPage/EquipmentsPage";
import DriversPage from "../../Routes/DriversPage/DriversPage";
import EquipmentEditPage from "../../Routes/EquipmentEditPaage/EquipmentEditPage";
import AddLoadPage from "../../Routes/AddLoadPage/AddLoadPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basePath: "/dispatch-office-client",
      loggedIn: false,
      newUser: false,
      shipments: [],
      idleDrivers: [],
      equipments: [],
      loggedInCarrier: {
        full_name: "",
        company_name: "",
        mc_num: ""
      }
    };
  }

  // gets all the shipments
  getShipments = async () => {
    const shipments = await CarrierService.getCarrierData()
      .then(data => data)
      .catch(err => console.log(err));
    this.setState({
      shipments
    });
  };

  // gets all idleDrivers for dashboard
  getIdleDrivers = async () => {
    const idleDrivers = await DriversService.getIdleDrivers()
      .then(data => data)
      .catch(err => console.log(err));
    this.setState({
      idleDrivers
    });
  };

  getEquipments = async () => {
    const equipments = await EquipmentService.getEquipments()
      .then(data => data)
      .catch(err => console.log(err));
    this.setState({
      equipments
    })
  }

  componentDidMount = () => {
    this.setState({
      loggedIn: TokenService.hasAuthToken()
    });
    if (TokenService.hasAuthToken()) {
      this.getShipments();
      this.getIdleDrivers();
      this.getEquipments();
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

  setShipments = shipments => {
    this.setState({
      shipments
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
      setShipments: this.setShipments,
      setLoggedInCarrier: this.setLoggedInCarrier,
      loggedInCarrier: this.state.loggedInCarrier,
      shipments: this.state.shipments,
      idleDrivers: this.state.idleDrivers,
      getShipments: this.getShipments,
      getIdleDrivers: this.getIdleDrivers,
      equipments: this.state.equipments,
      getEquipments: this.getEquipments,
    };

    return (
      <AppContext.Provider value={value}>
        <div className="App">
          <Header />
          {this.state.loggedIn && <Route path="/" component={Logout} />}
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

            <Route
              exact
              path={`${value.basePath}/loads`}
              component={LoadsPage}
            />

            <Route
              exact
              path={`${value.basePath}/equipments`}
              component={EquipmentsPage}
            />

            <Route
              exact
              path={`${value.basePath}/drivers`}
              component={DriversPage}
            />

            <Route
              exact
              path={`${value.basePath}/equipments/edit/:id`}
              component={(rprops) => {return <EquipmentEditPage 
                  rprops={rprops} 
                  equipments={this.state.equipments}
                  idleDrivers={this.state.idleDrivers}/>}}
            />

            <Route
              exact
              path={`${value.basePath}/load/new`}
              component={AddLoadPage}
            />

          </Switch>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
