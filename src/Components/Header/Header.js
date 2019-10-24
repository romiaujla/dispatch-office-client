import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

    render() {
        return (
            <header className='Header'>
                <div className='width-wrapper'>
                    <div className='logo'>
                        <span>Dispatch</span>
                        <span>Office</span>
                    </div>
                    <div className='menu'>
                        
                        {/* Display Nav Button Only When User is setup */}
                        <nav className=''>
                            <button className='mobile-nav-button'>
                                <div className='l1'></div>
                                <div className='l2'></div>
                                <div className='l3'></div>
                            </button>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;