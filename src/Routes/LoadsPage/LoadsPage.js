import React, {Component} from 'react';
import './LoadsPage.css';
import LoadListBox from '../../Components/LoadListBox/LoadListBox';

class LoadsPage extends Component {

    render(){
        return (
            <section className='LoadsPage width-wrapper'>
                <div className='filters-div'>
                    {/* Add filters and then change the loads page accordingly */}
                </div>
                <LoadListBox loadStatus='all' />
            </section>
        )
    }
}

export default LoadsPage;