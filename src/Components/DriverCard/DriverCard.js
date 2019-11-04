import React, {Component} from 'react';
import './DriverCard.css';
import {Link} from 'react-router-dom';
import config from '../../config';


class DriverCard extends Component{
    
    static defaultProps = {
        driver: ''
    }

    render(){

        const {driver} = this.props;

        return(
            <div className='DriverCard grey-back blue-text'>
                <div className='flex-row'>
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
                <div className='driver-buttons'>
                    <Link to={`${config.BASEPATH}/driver/edit/${driver.id}`} className='app-button'>
                        Edit
                    </Link>
                    <button className='app-button'>
                        Delete
                    </button>
                </div>
            </div>
        )
    }
}

export default DriverCard;