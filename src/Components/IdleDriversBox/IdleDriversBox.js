import React, { Component } from 'react';
import './IdleDriversBox.css';
import AppContext from '../../Contexts/AppContext';
import DriverCard from '../DriverCard/DriverCard';
import { arrayIsEmpty } from '../../HelperFunctions/HelperFunctions';

class IdleDriversBox extends Component {
    
    static contextType = AppContext;

    renderIdleDriversList = () => {
        let {idleDrivers} = this.context
        idleDrivers = idleDrivers.filter(idleDriver => idleDriver.status === 'active');
        if(!arrayIsEmpty(idleDrivers)){
            return idleDrivers.map((iDriver) => {
                return <li key={iDriver.id}><DriverCard driver={iDriver} /></li>
            })
        }else{
            return (
                <li className='no-idle-drivers'>
                    No drivers idle at this time
                </li>
            )
        }

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