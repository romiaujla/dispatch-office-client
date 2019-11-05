import React, { Component } from 'react';
import './DriversDropDown.css'

class DriversDropDown extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            optionsValue: props.defaultValue
        }
    }
    
    static defaultProps = {
        drivers: [],
        defaultValue: 0,
        className: 'select-css',
        name: 'driver',
        id: 'driver'
    }

    handleChange = (e) => {
        this.setState({
            optionsValue: e.target.value
        }, () => {
            if(this.props.hasOwnProperty('handleChange')){
                this.props.handleChange(this.state.optionsValue)
            }
        })
    }

    renderDriverOptions = (drivers) => {
        if(drivers !== []){
            return drivers.map((driver, i) => {
                return (
                    <option 
                        value={driver.id}
                        key={i}
                        defaultValue={true}
                    >
                        {driver.full_name}
                    </option>
                )
            })
        }   
    }

    render() {

        const { 
            className = 'select-css', 
            drivers = [], 
            name='driver', 
            id='driver'
        } = this.props;


        return (
            <div className='DriversDropDown'>
                <select className={className}
                    name={name}
                    id={id} 
                    value={this.state.optionsValue} 
                    onChange={(e) => {this.handleChange(e)}}>
                    <option value='-1'>No Driver</option>
                    {this.renderDriverOptions(drivers)}    
                </select>
            </div>
        );
    }
}

export default DriversDropDown;