import React, {Component} from 'react';
import './LoadsPage.css';
import LoadListBox from '../../Components/LoadListBox/LoadListBox';

class LoadsPage extends Component {

    render(){
        return (
            <section className='LoadsPage width-wrapper'>
                <LoadListBox loadStatus='all' />
            </section>
        )
    }
}

export default LoadsPage;