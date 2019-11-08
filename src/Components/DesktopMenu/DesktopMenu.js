import React, { Component } from 'react';
import './DesktopMenu.css';
import { Link } from 'react-router-dom';
import config from '../../config';

class DesktopMenu extends Component {

    render() {

        const basePath = config.BASEPATH;

        return (
            <nav
                aria-label="Main Navigation"
                className='DesktopMenu'>
                <ul>
                    <li>
                        <Link to={basePath}>
                            Dashboard
                        </Link>
                    </li>
                    <li className="has-submenu" tabIndex="0">
                        <span>
                            Loads
                        </span>
                        <ul>
                            <li>
                                <Link to={`${basePath}/load/new`}>Add Load</Link>
                            </li>
                            <li tabIndex="0">
                                <Link to={`${basePath}/loads`}>View Loads</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="has-submenu" tabIndex="0">
                        <span>
                            Equipments
                        </span>
                        <ul>
                            <li tabIndex="0">
                                <Link to={`${basePath}/equipment/new`}>Add Equipment</Link>
                            </li>
                            <li tabIndex="0">
                                <Link to={`${basePath}/equipments`}>View Equipments</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="has-submenu" tabIndex="0">
                        <span>
                            Drivers
                        </span>
                        <ul>
                            <li tabIndex="0">
                                <Link to={`${basePath}/driver/new`}>Add Driver</Link>
                            </li>
                            <li tabIndex="0">
                                <Link to={`${basePath}/drivers`}>View Drivers</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        );
    }
}


export default DesktopMenu