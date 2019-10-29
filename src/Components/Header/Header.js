import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import AppContext from '../../Contexts/AppContext';
import DesktopMenu from '../DesktopMenu/DesktopMenu';
import MobileMenu from '../MobileMenu/MobileMenu';

class Header extends Component {

    static contextType = AppContext;

    render() {

        const {loggedIn} = this.context;

        return (
            <header className='Header blue-back white-text'>
                <div className='width-wrapper'>
                    <Link to='/'>
                        <div className='logo'>
                            <span>Dispatch</span>
                            <span>Office</span>
                        </div>
                    </Link>
                    {
                        loggedIn &&
                        <>
                            <DesktopMenu />
                            <MobileMenu />
                        </>
                    }
                </div>
            </header>
        );
    }
}

export default Header;