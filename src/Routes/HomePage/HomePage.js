import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './HomePage.css';
import AppContext from '../../Contexts/AppContext';

class HomePage extends Component {

    static contextType = AppContext;

    render() {
        const { basePath, loggedIn, newUser } = this.context;
        console.log(!newUser);
        return (
            !loggedIn ? 
            ( <section className='HomePage blue-text'>
                <div className='width-wrapper'>
                    <p>
                        Welcome !! to <span className='span-title red-text'>Dispatch Office</span>, a transportation management
                        system, which assists freight managers with workflow,
                        automation and shipment scheduling.
                    </p>
                    <Link to={`${basePath}/create-account`} className='app-button'>
                        Create Account
                    </Link>
                    <Link to={`${basePath}/login`} className='app-link'>
                        Login
                    </Link>
                </div>
            </section> )
            : ( !newUser ? <Redirect to={`${basePath}/dashboard`} /> : <Redirect to={`${basePath}/newuser`} />) 
        );
    }
}

export default HomePage;