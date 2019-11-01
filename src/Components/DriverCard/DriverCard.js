import React, {Component} from 'react';
import './DriverCard.css';
import {Link} from 'react-router-dom';
import AppContext from '../../Contexts/AppContext';


class DriverCard extends Component{
    
    static defaultProps = {
        driver: ''
    }

    static contextType = AppContext;
    
    render(){

        const {driver} = this.props;
        const {basePath} = this.context;

        return(
            <div className='DriverCard grey-back'>
                <div className='flex-wrapper'>
                    <div className='card-div'>
                        <h6>Driver</h6>
                        <p>{driver.full_name}</p>
                    </div>
                    <div className='card-div'>
                        <h6>Pay Rate</h6>
                        <p>${driver.pay_rate}</p>
                    </div>
                    <div className='card-div'>
                        <h6 className='small-header'>Equipment #</h6>
                        <p>{driver.equipment.unit_num ? driver.equipment.unit_num : 'No Equipment'}</p>
                    </div>
                </div>
                <div className='view-button'>
                    <Link to={`${basePath}/driver/${driver.id}`} className='app-button'>
                        View
                    </Link>
                </div>
            </div>
        )
    }
}

export default DriverCard;