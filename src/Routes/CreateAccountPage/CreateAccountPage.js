import React, { Component } from 'react';
import './CreateAccountPage.css';
import AppContext from '../../Contexts/AppContext';
import { Redirect } from 'react-router-dom';
import CreateAccount from '../../Components/CreateAccount/CreateAccount';

class CreateAccountPage extends Component {

    static contextType = AppContext;

    render() {

        const { basePath, loggedIn, newUser } = this.context;

        return (
            !loggedIn
                ? <div className='CreateAccountPage'>
                    <CreateAccount />
                </div>
                : !newUser
                    ? <Redirect to={`${basePath}/dashboard`} />
                    : <Redirect to={`${basePath}/newuser`} />
        );
    }
}

export default CreateAccountPage;