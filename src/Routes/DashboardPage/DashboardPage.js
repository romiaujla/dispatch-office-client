import React, { Component } from 'react';
import './DashboardPage.css';
import UnAssignedLoads from '../../Components/UnAssignedLoads/UnAssignedLoads';
import {Link} from 'react-router-dom';

class DashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return (  
            <section className='DashboardPage width-wrapper'>
                <div className='AddLoadSection'>
                    <Link className='add-load app-button'>
                        Add Load
                    </Link>
                </div>
                <UnAssignedLoads />
            </section>
        );
    }
}
 
export default DashboardPage;