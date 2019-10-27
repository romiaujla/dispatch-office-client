import React, { Component } from 'react';
import './MobileMenu.css';
import MenuItems from '../MenuItems/MenuItems';
import AppContext from '../../Contexts/AppContext';
import { Link } from 'react-router-dom';

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
        window.addEventListener('resize', this.closeMenuWhenLargerScreen)
    }


    render() {

        const {basePath } = this.context;

        return (
            <nav className='MobileMenu'>
                <button className='menu-button' onClick={this.changeMenuOpenState}>
                    <div></div>
                    <div></div>
                    <div></div>
                </button>
                {
                    this.state.menuOpen &&
                    <ul className='menu-list'>
                        <button 
                            className='close-button'
                            onClick={this.changeMenuOpenState}>
                            X
                        </button>
                        <li className='menu-item'>
                            <Link 
                                to={`${basePath}/dashboard`} 
                                onClick={this.changeMenuOpenState}>
                                Dashboard
                            </Link>
                        </li>
                        <li className='menu-item'>
                            <Link 
                                to={`${basePath}/loads`}
                                onClick={this.changeMenuOpenState}>
                                Loads
                            </Link>
                        </li>
                        <li className='menu-item'>
                            <Link 
                                to={`${basePath}/equipments`}
                                onClick={this.changeMenuOpenState}>
                                Equipments
                            </Link>
                        </li>
                        <li className='menu-item'>
                            <Link 
                                to={`${basePath}/drivers`}
                                onClick={this.changeMenuOpenState}>
                                Drivers
                            </Link>
                        </li>
                    </ul>
                }
            </nav>
        );
    }
}

export default MobileMenu;