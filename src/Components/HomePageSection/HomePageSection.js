import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../Contexts/AppContext';
import './HomePageSection.css';

class HomePageSection extends Component {

    static contextType = AppContext;

    render() {

        const { basePath } = this.context;

        return (
            <div className='HomePageSection width-wrapper'>
                <p>
                    Welcome !! to <span className='span-title red-text'>Dispatch Office</span>, a transportation management
                    system, which assists in keeping track of shipments, equipments and drivers. It also also carrier on assigning 
                    drivers to shipments and equipments.
                </p>
                <p className='user-info'>
                    Dummy User Info <br />
                    Username: <span>dundermifflin</span>
                </p>
                <p className='user-info'>
                    Password: <span>password</span>
                </p>
                <Link to={`${basePath}/create-account`} className='app-button'>
                    Create Account
                </Link>
                <Link to={`${basePath}/login`} className='app-link'>
                    Login
                </Link>
            </div>
        );
    }
}

export default HomePageSection;