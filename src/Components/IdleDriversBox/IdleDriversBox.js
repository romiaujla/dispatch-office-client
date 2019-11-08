import React, { Component } from 'react';
import './IdleDriversBox.css';
import AppContext from '../../Contexts/AppContext';
import DriverCard from '../DriverCard/DriverCard';

class IdleDriversBox extends Component {
    
    static contextType = AppContext;

    renderIdleDriversList = () => {
        let {idleDrivers} = this.context
        idleDrivers = idleDrivers.filter(idleDriver => idleDriver.status === 'active');
        return idleDrivers.map((iDriver) => {
            return <li key={iDriver.id}><DriverCard driver={iDriver} /></li>
        })
    }

    render() { 
        return (
            <div className='IdleDriversBox'>
                <h3 className='blue-back white-text'>Idle Drivers</h3>
                <ul>
                    {this.renderIdleDriversList()}
                </ul>
            </div>
        );
    }
}
 
export default IdleDriversBox;