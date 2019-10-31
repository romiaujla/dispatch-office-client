import React, { Component } from 'react';
import './LoadListBox.css';
import AppContext from '../../Contexts/AppContext';
import PropType from 'prop-types';

class LoadListBox extends Component {
    
    static contextType = AppContext;

    static defaultProps = {
        loadStatus: ''
    }

    constructor(props){
        super(props);
    }

    formatDate = (dbDate) => {
        const date = new Date(dbDate);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getYear();

        return(`${month+1}/${day}/${year+1900}`);
    }

    getLoadsWithStatus = (status) => {
        const shipments = this.context.carrier.filter(shipment => shipment.status === status);
        // to test empty lists
        // const shipments = [];
        if(shipments.length === 0){
            return (
                <li className='empty-list'>
                    No {status} Loads
                </li>
            )
        }        
        return shipments.map(shipment => {
            console.log(shipment);
            return (
                <li 
                    className='load'
                    key={shipment.id}
                >
                    <div className='pick-up'>
                        <h6>Pick-up</h6><br />
                        <span className='red-bold'>
                        {shipment.pickup_warehouse.city}, {shipment.pickup_warehouse.state}<br />
                        Date: {this.formatDate(shipment.pickup_date)}</span>
                    </div>
                    <div className='status-line-wrapper'>
                        <div className='miles'>
                            <h6>Loaded Miles</h6><br />
                            {shipment.miles}
                        </div>
                        <div className='status-line'>
                            <div className='circle left'></div>
                            <div className='line'></div>
                            <div className='circle right'></div>
                        </div>
                        <div className='rate-broker'>
                            <div className='rate'>
                                <h6>Rate</h6><br />
                                <span className='rate-amount red-bold'>${shipment.rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> 
                            </div>
                            <div className='broker'>
                                <h6>Broker</h6><br />
                                {shipment.broker}
                            </div>
                        </div>
                    </div>
                    
                    <div className='delivery'>
                        <h6>Delivery</h6><br />
                        <span className='red-bold'>
                        {shipment.delivery_warehouse.city}, {shipment.delivery_warehouse.state} <br />
                        Date: {this.formatDate(shipment.delivery_date)}</span>
                    </div>
                </li>
            )
        })
    }

    render() { 
        return (  
            <div className='LoadListBox blue-text'>
                <h3 className='blue-back white-text'>{this.props.loadStatus} Loads</h3>
                <ul className='un-assigned-loads'>
                    {this.getLoadsWithStatus(this.props.loadStatus)}
                </ul>
            </div>
        );
    }
}
 
export default LoadListBox;