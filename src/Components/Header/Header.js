import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

    render() {
        return (
            <header className='Header blue-back white-text'>
                <div className='width-wrapper'>
                    <div className='logo'>
                        <span>Dispatch</span>
                        <span>Office</span>
                    </div>
                    <div className='menu'>
                        
                        {/* Display Nav Button Only When User is setup */}
                        <nav className=''>
                            <button className='mobile-nav-button blue-back'>
                                <div className='l1 white-back'></div>
                                <div className='l2 white-back'></div>
                                <div className='l3 white-back'></div>
                            </button>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;