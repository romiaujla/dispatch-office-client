import React, { Component } from 'react';
import './LoginForm.css';
import { validateUserName, validatePassword } from '../../HelperFunctions/HelperFunctions';
import TokenService from '../../Services/TokenService';
import AuthApiService from '../../Services/AuthApiService';

class LoginForm extends Component {

    state = {
        error: null
    }

    handleSubmitLoginForm = (e) => { 
        e.preventDefault();

        this.setState({
            error: null
        })

        const{username, password } = e.target;
        

        AuthApiService.postLogin({
            username: username.value,
            password: password.value
        })
            .then((res) => {
                username.value = '';
                password.value = '';
                TokenService.saveAuthToken(
                    TokenService.makeBasicAuthToken(username.value, password.value)
                );
            })
            .catch((res)=>{
                this.setState({
                    error: res.error
                })
            })
    }

    render() {
        return (
            <form className='LoginForm width-wrapper' onSubmit={(e) => {this.handleSubmitLoginForm(e)}}>
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
                            <span className='error'>Invalid Username</span>
                        </label>
                        <label htmlFor='password'>
                            <span className='input-title'>* Password:</span>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                required
                                onChange={(e) => { validatePassword(e) }} />
                            <span className='error'>Password Error</span>
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