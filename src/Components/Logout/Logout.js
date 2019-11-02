import React, {Component} from 'react';
import AppContext from '../../Contexts/AppContext';
import './Logout.css';
import TokenService from '../../Services/TokenService';
import CarrierServices from '../../Services/CarrierServices';

class Logout extends Component {

    static contextType = AppContext;

    getCarrierInfoInComponent = async () => {
        const carrier = await CarrierServices.getCarrierInfo()
            .then(res => {
                this.context.setLoggedInCarrier(res);
                return res;
            })
            .catch(error => error);
        this.setState({
            carrier: carrier[0]
        })
    }

    constructor(props){
        super(props);
        this.state = {
            carrier: {}
        }
        this.getCarrierInfoInComponent()
    }

    state = {
        carrier: {}
    }

    handleLogout = () => {
        this.context.setLoggedIn(false);
        TokenService.clearAuthToken();
        this.props.history.push('/');
    }

    

    render(){
        return (
            <div className='Logout width-wrapper'>
                Welcome, <span className='carrier-name red-text'>
                    {this.state.carrier.full_name}
                </span>, <button className='app-link' onClick={() => {this.handleLogout()}}>Logout</button>
            </div>
        )
    }
}

export default Logout;