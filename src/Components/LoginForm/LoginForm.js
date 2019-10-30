import React, { Component } from 'react';
import './LoginForm.css';
import { validateUserName, validatePassword } from '../../HelperFunctions/HelperFunctions';
import TokenService from '../../Services/TokenService';
import AuthApiService from '../../Services/AuthApiService';
import AppContext from '../../Contexts/AppContext';

class LoginForm extends Component {

    state = {
        error: null,
        incorrectUsername: false,
        incorrectPassword: false,
    }

    static contextType = AppContext;

    static defaultProps = {
        onLoginSuccess: () => {},
    }

    handleSubmitLoginForm = (e) => {
        e.preventDefault();

        this.setState({
            error: null,
            incorrectUsername: false,
            incorrectPassword: false,
        })

        const { username, password } = e.target;

        AuthApiService.postLogin({
            username: username.value,
            password: password.value
        })
            .then((res) => {
                if(res.message === 'Incorrect Username'){
                    this.setState({
                        incorrectUsername: true,
                        error: res.message
                    })
                    username.value = '';
                    password.value = '';
                    username.focus();
                }
                if(res.message === 'Incorrect Password'){
                    this.setState({
                        incorrectPassword: true,
                        error: res.message
                    })
                    password.value = '';
                }
                
                if(!this.state.incorrectPassword && !this.state.incorrectUsername){
                    TokenService.saveAuthToken(res.authToken);
                    this.context.setLoggedInCarrier(res.loggedInUser);
                    this.props.onLoginSuccess();
                    username.value = '';
                    password.value = '';
                }
            })
            .catch((res) => {
                this.setState({
                    error: res.error
                })
            })
    }

    render() {


        const { incorrectPassword, incorrectUsername, error } = this.state;


        return (

            <form className='LoginForm width-wrapper' onSubmit={(e) => { this.handleSubmitLoginForm(e) }}>
                <fieldset>
                    <legend className='blue-back white-text'>
                        Login
                        </legend>
                    <div className='flex'>
                        <label htmlFor='username'>
                            <span className='input-title'>* Username:</span>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                required
                                onChange={(e) => { validateUserName(e) }}
                            />
                            {
                                incorrectUsername &&
                                <span className='error'>{error}</span>
                            }
                        </label>
                        
                        <label htmlFor='password'>
                            <span className='input-title'>* Password:</span>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                required
                                onChange={(e) => { validatePassword(e) }} 
                            />
                            {
                                incorrectPassword &&
                                <span className='error'>{error}</span>
                            }
                        </label>
                        <button
                            className='app-button'
                            type='submit'
                        >
                            Login
                            </button>
                    </div>
                </fieldset>
            </form>
        );
    }
}

export default LoginForm;