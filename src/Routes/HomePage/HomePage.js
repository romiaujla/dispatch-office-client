import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './HomePage.css';
import AppContext from '../../Contexts/AppContext';
import HomePageSection from '../../Components/HomePageSection/HomePageSection';

class HomePage extends Component {

    static contextType = AppContext;

    render() {
        const { basePath, loggedIn, newUser } = this.context;
        return (
            !loggedIn
                ?   <section className='HomePage blue-text'>
                        <HomePageSection />
                    </section>
                :   !newUser
                    ? <Redirect to={`${basePath}/dashboard`} />
                    : <Redirect to={`${basePath}/newuser`} />
        );
    }
}

export default HomePage;