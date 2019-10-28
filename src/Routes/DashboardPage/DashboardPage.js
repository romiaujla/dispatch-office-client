import React, { Component } from 'react';
import './DashboardPage.css';
import UnAssignedLoads from '../../Components/UnAssignedLoads/UnAssignedLoads';
import {Link} from 'react-router-dom';
import AppContext from '../../Contexts/AppContext';

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
                <div className='AddLoadSection'>
                    <Link className='add-load app-button' to={`${basePath}/new/load`}>
                        Add Load
                    </Link>
                </div>
                <UnAssignedLoads />
            </section>
        );
    }
}
 
export default DashboardPage;