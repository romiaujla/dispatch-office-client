import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import AppContext from '../../Contexts/AppContext';

class Header extends Component {

    static contextType = AppContext;

    render() {

        const {loggedIn, basePath} = this.context;

        return (
            <header className='Header blue-back white-text'>
                <div className='width-wrapper'>
                    <Link to='/'>
                        <div className='logo'>
                            <span>Dispatch</span>
                            <span>Office</span>
                        </div>
                    </Link>
                    <div className='menu'>

                        {/* Display Nav Button Only When User is setup */}
                        <nav className='nav open'>
                            <button className='mobile-nav-button open blue-back'>
                                <div className='l1 white-back'></div>
                                <div className='l2 white-back'></div>
                                <div className='l3 white-back'></div>
                            </button>
                            <div className='menu-list'>
                                <Link 
                                    to={`${basePath}/dashboard`}
                                    className='menu-item'>
                                    Dashboard
                                </Link>
                                <Link 
                                    to={`${basePath}/loads`}
                                    className='menu-item'>
                                    Loads
                                </Link>
                                <Link 
                                    to={`${basePath}/equipments`}
                                    className='menu-item'>
                                    Equipments
                                </Link>
                                <Link 
                                    to={`${basePath}/drivers`}
                                    className='menu-item'>
                                    Drivers
                                </Link>
                            </div>
                        </nav>

                    </div>
                </div>
            </header>
        );
    }
}

export default Header;