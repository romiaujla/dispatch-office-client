import React, { Component } from 'react';
import './MobileMenu.css';
import AppContext from '../../Contexts/AppContext';
import { Link } from 'react-router-dom';
import Backdrop from '../Backdrop/Backdrop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

class MobileMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        }
    }

    static contextType = AppContext;

    changeMenuOpenState = () => {
        this.setState({
            menuOpen: !this.state.menuOpen
        })
    }

    closeMenuIfOpen = (e) => {
        console.log(`backdrop clicked`);
        if (this.state.menuOpen) {
            this.setState({
                menuOpen: false
            })
        }
    }

    // closes menu 
    // When it is open on mobile and resized to larger screen
    // and the menu for larger screen pops up and this closes
    closeMenuWhenLargerScreen = (e) => {
        if (window.innerWidth > 1050) {
            this.setState({
                menuOpen: false
            })
        }
    }

    componentDidMount = () => {
        window.addEventListener('resize', this.closeMenuWhenLargerScreen);
    }

    componentWillUnMount = () => {
        window.removeEventListener('resize', this.closeMenuWhenLargerScreen);
    }


    render() {

        const { basePath } = this.context;

        return (
            <nav className='MobileMenu'>
                <button className='menu-button' onClick={this.changeMenuOpenState}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                {
                    this.state.menuOpen &&
                    <>
                        <Backdrop />
                        <ul className='menu-list'>
                            <button
                                className='close-button'
                                onClick={this.changeMenuOpenState}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                            <li className='menu-item'>
                                <Link
                                    to={`${basePath}/dashboard`}
                                    onClick={this.changeMenuOpenState}>
                                    Dashboard
                                </Link>
                            </li>
                            <li className='menu-item'>
                                <hr />
                                <Link 
                                    to={`${basePath}/load/new`}
                                    onClick={this.changeMenuOpenState}>
                                    Add Load
                                </Link>
                            </li>
                            <li className='menu-item'>
                                <Link 
                                    to={`${basePath}/loads`}
                                    onClick={this.changeMenuOpenState}>
                                    View Loads
                                </Link>
                            </li>

                            <li className='menu-item'>
                                <hr />
                                <Link 
                                    to={`${basePath}/equipment/new`}
                                    onClick={this.changeMenuOpenState}>
                                    Add Equipments
                                </Link>
                            </li>
                            <li className='menu-item'>
                                <Link
                                    to={`${basePath}/equipments`}
                                    onClick={this.changeMenuOpenState}>
                                    View Equipments
                                </Link>
                            </li>
                            <li className='menu-item'>
                                <hr />
                                <Link 
                                    to={`${basePath}/driver/new`}
                                    onClick={this.changeMenuOpenState}>
                                    Add Driver
                                </Link>
                            </li>
                            <li className='menu-item'>
                                <Link 
                                    to={`${basePath}/drivers`}
                                    onClick={this.changeMenuOpenState}>
                                    View Drivers
                                </Link>
                            </li>
                        </ul>
                    </>
                }
            </nav>
        );
    }
}

export default MobileMenu;