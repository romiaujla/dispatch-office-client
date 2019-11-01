import React, { Component } from 'react';
import './DashboardPage.css';
import {Link} from 'react-router-dom';
import AppContext from '../../Contexts/AppContext';
import LoadListBox from '../../Components/LoadListBox/LoadListBox';
import IdleDriversBox from '../../Components/IdleDriversBox/IdleDriversBox';

class DashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {  }
    }

    static contextType = AppContext;

    render() { 

        const {basePath} = this.context;

        return (  
            <section className='DashboardPage width-wrapper'>
                <div className='add-links'>
                    <Link className='add-load app-button' to={`${basePath}/load/new`}>
                        Add Load
                    </Link>
                    <Link className='add-load app-button' to={`${basePath}/driver/new`}>
                        Add Driver
                    </Link>
                    <Link className='add-load app-button' to={`${basePath}/equipment/new`}>
                        Add Equipment
                    </Link>
                </div>
                <LoadListBox loadStatus='un-assigned' />
                <LoadListBox loadStatus='in transit' />
                <IdleDriversBox />

            </section>
        );
    }
}
 
export default DashboardPage;