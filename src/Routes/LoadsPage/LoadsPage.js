import React, {Component} from 'react';
import './LoadsPage.css';
import LoadListBox from '../../Components/LoadListBox/LoadListBox';
import AppContext from '../../Contexts/AppContext';
import {
    renderAllDriverOptions, getShipmentsWithDriverId,
} from '../../HelperFunctions/LoadsPageHelperFunctions';
import Backdrop from '../../Components/Backdrop/Backdrop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

class LoadsPage extends Component {

    static defaultProps = {
        shipments: [],
        boxHeader: 'Loads'
    }

    constructor(props){
        super(props);

        this.state = {
            shipments: props.shipments,
            boxHeader: props.boxHeader,
            filterMenu: false,
            selectedDriver: -1
        }
    }

    static contextType = AppContext

    handleOpeningFilterMenu = () => {
        this.setState({
            filterMenu: !this.state.filterMenu
        })
    }

    render(){

        const {shipments} = this.props;
        const {drivers} = this.context;
        
        return (
            <section className='LoadsPage width-wrapper'>
                <div className='filters-div'>
                    <button className='app-button' onClick={() => {this.handleOpeningFilterMenu()}}>
                        <FontAwesomeIcon icon={faFilter} className='filter-icon' />
                        Filters
                    </button>
                    {
                        this.state.filterMenu &&
                        <>
                            <Backdrop />
                            <div className='filter-menu'>
                                <div className='filter'>
                                    <span className='field-label'>Driver</span>
                                    <select 
                                        className='select-css'
                                        value={this.state.selectedDriver}
                                        onChange={(e) => {
                                            const i = parseInt(e.target.value, 10)+1;
                                            const selectedOption = Array.from(e.target.getElementsByTagName('option'))[i];
                                            const driverId = parseInt(selectedOption.getAttribute('data-id'),10);
                                            this.setState({
                                                shipments: getShipmentsWithDriverId(shipments, driverId),
                                                filterMenu: false,
                                                boxHeader: `${selectedOption.getAttribute('data-name')} Loads`,
                                                selectedDriver: e.target.value
                                            })
                                        }}
                                    >
                                        <option value='-1' data-id='-1' data-name='All'>All Drivers</option>
                                        {renderAllDriverOptions(drivers)}
                                    </select>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <LoadListBox 
                    shipments={this.state.shipments} 
                    boxHeader={this.state.boxHeader}
                />
            </section>
        )
    }
}

export default LoadsPage;