import React, { Component } from 'react';
import './DashboardPage.css';
import {Link} from 'react-router-dom';
import config from '../../config';
import LoadListBox from '../../Components/LoadListBox/LoadListBox';
import IdleDriversBox from '../../Components/IdleDriversBox/IdleDriversBox';

class DashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 

        const secondBoxLoadStatus = [
            'in transit',
            'loading',
            'dispatched',
            'unloading',
        ]

        return (  
            <section className='DashboardPage width-wrapper'>
                <LoadListBox 
                    oldLoadStatus='un-assigned' 
                    loadStatus={['un-assigned']}
                    boxHeader='Un Assigned Loads'
                />
                <LoadListBox 
                    oldLoadStatus='dispatched' 
                    loadStatus={secondBoxLoadStatus} 
                    boxHeader='Loads in progress'
                />
                <IdleDriversBox />

            </section>
        );
    }
}
 
export default DashboardPage;