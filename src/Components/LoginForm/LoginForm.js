import React, { Component } from 'react';
import './LoginForm.css';
import { validateUserName, validatePassword } from '../../HelperFunctions/HelperFunctions';

class LoginForm extends Component {

    render() {
        return (
            <form className='LoginForm width-wrapper'>
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