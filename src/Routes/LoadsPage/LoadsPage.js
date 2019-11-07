import React, {Component} from 'react';
import './LoadsPage.css';
import LoadListBox from '../../Components/LoadListBox/LoadListBox';

class LoadsPage extends Component {

    static defaultProps = {
        shipments: [],
        boxHeader: 'Loads'
    }

    render(){

        const {shipments} = this.props;

        return (
            <section className='LoadsPage width-wrapper'>
                <div className='filters-div'>
                    {/* Add filters and then change the loads page accordingly */}
                </div>
                <LoadListBox 
                    shipments={shipments} 
                    boxHeader={this.props.boxHeader}
                />
            </section>
        )
    }
}

export default LoadsPage;