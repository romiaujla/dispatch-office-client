import React, { Component } from "react";
import "./LoginPage.css";
import AppContext from "../../Contexts/AppContext";
import LoginForm from "../../Components/LoginForm/LoginForm";
import { Redirect } from "react-router-dom";
import CarrierService from '../../Services/CarrierServices';

class LoginPage extends Component {
  static contextType = AppContext;

  // using async await so app proceeds only once complete data for carrier is received
  onLoginSuccess = async () => {
    this.props.history.push("/");
    this.context.setLoggedIn(true);
    const carrierData = await CarrierService.getCarrierData()
      .then(res => res)
      .catch(err => console.log(err))
    this.context.setCarrier(carrierData);
  };

  render() {
    const { basePath, loggedIn, newUser } = this.context;

    return !loggedIn ? (
      <section className="LoginPage">
        <LoginForm
          onLoginSuccess={() => {
            this.onLoginSuccess();
          }}
        />
      </section>
    ) : !newUser ? (
      <Redirect to={`${basePath}/dashboard`} />
    ) : (
      <Redirect to={`${basePath}/newuser`} />
    );
  }
}

export default LoginPage;
