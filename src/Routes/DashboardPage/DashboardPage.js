import React, { Component } from 'react';
import './DashboardPage.css';
import LoadListBox from '../../Components/LoadListBox/LoadListBox';
import IdleDriversBox from '../../Components/IdleDriversBox/IdleDriversBox';
import AppContext from '../../Contexts/AppContext';
import { getShipmentWithStatus, getAllShipmentsInProgress } from '../../HelperFunctions/HelperFunctions';

class DashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {  }
    }

    static contextType = AppContext

    

    render() { 

        const {shipments} = this.context;
        const unAssignedShipments = getShipmentWithStatus(shipments, 'un-assigned');
        const shipmentsInProgress = getAllShipmentsInProgress(shipments);

        return (  
            <section className='DashboardPage width-wrapper'>
                <LoadListBox 
                    oldLoadStatus='un-assigned' 
                    shipments={unAssignedShipments}
                    boxHeader='Un Assigned Loads'
                />
                <LoadListBox 
                    oldLoadStatus='dispatched' 
                    shipments={shipmentsInProgress}
                    boxHeader='Loads in progress'
                />
                <IdleDriversBox />

            </section>
        );
    }
}
 
export default DashboardPage;