import React, { Component } from 'react';
import './DesktopMenu.css';
import {Link} from 'react-router-dom';
import AppContext from '../../Contexts/AppContext';

class DesktopMenu extends Component {

    static contextType = AppContext;

    render() {

        const {basePath} = this.context;
        
        return (
            <nav className='DesktopMenu'>
                <ul className='menu-list'>
                <li className='menu-item'>
                    <Link to={`${basePath}/dashboard`}>
                        Dashboard
                        </Link>
                </li>
                <li className='menu-item'>
                    <Link to={`${basePath}/loads`}>
                        Loads
                        </Link>
                </li>
                <li className='menu-item'>
                    <Link to={`${basePath}/equipments`}>
                        Equipments
                        </Link>
                </li>
                <li className='menu-item'>
                    <Link to={`${basePath}/drivers`}>
                        Drivers
                        </Link>
                </li>
            </ul>
            </nav>
        );
    }
}


export default DesktopMenu