import React, { Component } from "react";
import "./LoginPage.css";
import AppContext from "../../Contexts/AppContext";
import LoginForm from "../../Components/LoginForm/LoginForm";
import { Redirect } from "react-router-dom";

class LoginPage extends Component {
  static contextType = AppContext;

  // using async await so app proceeds only once complete data for carrier is received
  onLoginSuccess = async () => {
    this.props.history.push("/");
    this.context.setLoggedIn(true);
    this.context.getShipments();
    this.context.getIdleDrivers();
    
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
