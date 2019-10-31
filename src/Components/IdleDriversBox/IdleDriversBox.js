import React, { Component } from 'react';
import './IdleDriversBox.css';
import AppContext from '../../Contexts/AppContext';

class IdleDriversBox extends Component {
    
    constructor(props) {
        super(props);
        this.state = {  }
    }

    static contextType = AppContext;

    getIdleDrivers = () => {
        const {driversData, shipments} = this.context
        
    }

    render() { 
        return (
            <div className='IdleDriversBox'>
                Idle Drivers Box
                {this.getIdleDrivers()}
            </div>
        );
    }
}
 
export default IdleDriversBox;