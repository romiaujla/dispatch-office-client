import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../Contexts/AppContext';

class HomePageSection extends Component {

    static contextType = AppContext;

    render() {

        const { basePath } = this.context;

        return (
            <div className='HomePageSection width-wrapper'>
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
        );
    }
}

export default HomePageSection;