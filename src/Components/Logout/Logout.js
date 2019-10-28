import React, {Component} from 'react';
import AppContext from '../../Contexts/AppContext';
import './Logout.css';
import TokenService from '../../Services/TokenService';

class Logout extends Component {

    static contextType = AppContext;

    handleLogout = () => {
        this.context.setLoggedIn(false);
        TokenService.clearAuthToken();
        this.props.history.push('/');
    }

    render(){
        return (
            <div className='Logout width-wrapper'>
                Welcome, <span class='carrier-name red-text'>
                    Username
                </span>!! <button className='app-link' onClick={() => {this.handleLogout()}}>Logout</button>
            </div>
        )
    }
}

export default Logout;