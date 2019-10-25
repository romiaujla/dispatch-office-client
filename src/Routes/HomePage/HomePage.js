import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <section className='HomePage blue-text'>
                <div className='width-wrapper'>
                    <p>
                        Welcome !! to <span className='span-title red-text'>Dispatch Office</span>, a transportation management
                        system, which assists freight managers with workflow,
                        automation and shipment scheduling.
                    </p>
                    <Link to='/create-account' className='app-button'>
                        Create Account
                    </Link>
                    <Link to='/login' className='app-link'>
                        Login
                    </Link>
                </div>
            </section>
        );
    }
}

export default HomePage;