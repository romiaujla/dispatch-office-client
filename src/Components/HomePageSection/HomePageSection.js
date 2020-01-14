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
                {/* Make descrtiption so that audience gets involved */}
                <p>
                    Welcome to <span className='span-title red-text'>Dispatch Office</span>. 
                    This transportation management system will have everything right 
                    at your fingertips. The one stop app that 
                    assists in driver assignment, while also keeping track 
                    of all shipments and equipment. 
                </p>
                <p className='user-info'>
                    Dummy User Info <br />
                    Username: <span>dundermifflin</span>
                </p>
                <p className='user-info'>
                    Password: <span>password</span>
                </p>
                <Link to={`${basePath}/login`} className='app-link'>
                    Login
                </Link>
            </div>
        );
    }
}

export default HomePageSection;