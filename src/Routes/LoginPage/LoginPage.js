import React, { Component } from 'react';
import './LoginPage.css';
import AppContext from '../../Contexts/AppContext';
import LoginForm from '../../Components/LoginForm/LoginForm';
import {Redirect} from 'react-router-dom';

class LoginPage extends Component {
    
    static contextType = AppContext;

    render() {

        const { basePath, loggedIn, newUser } = this.context;

        return (
            !loggedIn
                ? <section className='LoginPage'>
                    <LoginForm />
                </section>
                : !newUser
                    ? <Redirect to={`${basePath}/dashboard`} />
                    : <Redirect to={`${basePath}/newuser`} />
        );
    }
}
 
export default LoginPage;