import React, { Component } from 'react';
import './DriversDropDown.css'

class DriversDropDown extends Component {
    
    static defaultProps = {
        drivers: [],
        defaultValue: -1,
        className: 'select-css'
    }

    renderDriverOptions = (drivers, defaultValue) => {
        if(drivers !== []){
            return drivers.map(driver => {
                console.log(`currentDriver`, defaultValue);
                console.log(`driver.id`, driver.id)
                if(defaultValue === driver.id){
                    return (
                        <option 
                            value={driver.id}
                            key={driver.id}
                            defaultValue
                        >
                            {driver.full_name}
                        </option>
                    )
                }else{
                    return (
                        <option 
                            value={driver.id}
                            key={driver.id}
                        >
                            {driver.full_name}
                        </option>
                    )
                }
            })
        }
        
    }

    render() {

        const { className = 'select-css', drivers = [], defaultValue = -1} = this.props;
        
        return (
            <div className='DriversDropDown'>
                <select className={className}>
                    {
                        defaultValue !== -1 
                        ?
                            <option value='no-driver'>No Driver</option>
                        : 
                            <option value='no-driver' defaultValue>No Driver</option>
                    }
                    {this.renderDriverOptions(drivers, defaultValue)}    
                </select>
            </div>
        );
    }
}

export default DriversDropDown;