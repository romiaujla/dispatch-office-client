import React, { Component } from 'react';
import './DriversPage.css';
import AppContext from '../../Contexts/AppContext';
import DriverCard from '../../Components/DriverCard/DriverCard';

class DriversPage extends Component {

    static contextType = AppContext


    renderDrivers = (drivers) => {
        
        return drivers.map((driver) => {
            if(driver.status === 'active'){
                return (
                    <li key={driver.id}>
                        <DriverCard driver={driver} />
                    </li>
                )
            }
            else{
                return ''
            }
        })
    }

    render() {

        const { drivers } = this.context
        
        // to change background color if viewing specific driver
        // const { id } = !objectIsEmpty(this.props.match.params) ? this.props.match.params : -1

        return (
            <section className='DriversPage width-wrapper'>
                <h4 className='blue-back white-text'>
                    Drivers List
                </h4>
                <ul className='drivers-list'>
                    {this.renderDrivers(drivers)}
                </ul>
            </section>
        )
    }
}


export default DriversPage;