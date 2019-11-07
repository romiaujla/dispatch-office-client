import React, { Component } from 'react';
import './DesktopMenu.css';
import { Link } from 'react-router-dom';
import AppContext from '../../Contexts/AppContext';

class DesktopMenu extends Component {

    static contextType = AppContext;

    componentDidMount = () => {
        this.driverAnchor.addEventListener('click', this.handleKeyboardSelect);
        this.equipmentAnchor.addEventListener('click', this.handleKeyboardSelect);
        this.loadAnchor.addEventListener('click', this.handleKeyboardSelect);
        this.hasSubMenu.addEventListener('blur', this.obBlurLi);
    }

    componentWillUnmount = () => {
        this.driverAnchor.removeEventListener('click', this.handleKeyboardSelect);
        this.equipmentAnchor.removeEventListener('click', this.handleKeyboardSelect);
        this.loadAnchor.removeEventListener('click', this.handleKeyboardSelect);
        this.hasSubMenu.addEventListener('blur', this.obBlurLi);
    }

    obBlurLi = (e) => {
        e.toElement.className = 'has-submenu';
        console.log(`li blured`);
    }

    handleKeyboardSelect = (e) => {
        e.preventDefault();
        
        if(e.toElement.outerHTML === this.driverAnchor.outerHTML){
            if(this.driverAnchor.parentElement.className === 'has-submenu'){
                this.driverAnchor.parentElement.className = 'has-submenu open'
                this.equipmentAnchor.parentElement.className = 'has-submenu';
                this.loadAnchor.parentElement.className = 'has-submenu';
            }else{
                this.driverAnchor.parentElement.className = 'has-submenu'
            }
        }
        
        if(e.toElement.outerHTML === this.equipmentAnchor.outerHTML){
            if(this.equipmentAnchor.parentElement.className === 'has-submenu'){
                this.driverAnchor.parentElement.className = 'has-submenu'
                this.equipmentAnchor.parentElement.className = 'has-submenu open';
                this.loadAnchor.parentElement.className = 'has-submenu';
            }else{
                this.equipmentAnchor.parentElement.className = 'has-submenu'
            }
        }

        if(e.toElement.outerHTML === this.loadAnchor.outerHTML){
            if(this.loadAnchor.parentElement.className === 'has-submenu'){
                this.driverAnchor.parentElement.className = 'has-submenu'
                this.equipmentAnchor.parentElement.className = 'has-submenu';
                this.loadAnchor.parentElement.className = 'has-submenu open';
            }else{
                this.loadAnchor.parentElement.className = 'has-submenu'
            }
        } 

    }

    render() {

        const { basePath } = this.context;



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
                    <li className="has-submenu" ref={litag => this.hasSubMenu = litag}>
                        <a
                            href='...'
                            ref={(loadAnchor) => this.loadAnchor = loadAnchor}
                            aria-haspopup="true"
                            aria-expanded="false">
                            Loads
                            </a>
                        <ul>
                            <li>
                                <Link to={`${basePath}/load/new`}>Add Load</Link>
                            </li>
                            <li>
                                <Link to={`${basePath}/loads`}>View Loads</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="has-submenu">
                        <a
                            href='...'
                            ref={equipmentAnchor => this.equipmentAnchor = equipmentAnchor}
                            aria-haspopup="true"
                            aria-expanded="false">
                            Equipments
                            </a>
                        <ul>
                            <li>
                                <Link to={`${basePath}/load/new`}>Add Equipment</Link>
                            </li>
                            <li>
                                <Link to={`${basePath}/loads`}>View Equipments</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="has-submenu">
                        <a
                            href='...'
                            ref={driverAnchor => this.driverAnchor = driverAnchor}
                            aria-haspopup="true"
                            aria-expanded="false">
                            Drivers
                            </a>
                        <ul>
                            <li>
                                <Link to={`${basePath}/load/new`}>Add Driver</Link>
                            </li>
                            <li>
                                <Link to={`${basePath}/loads`}>View Drivers</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        );
    }
}


export default DesktopMenu