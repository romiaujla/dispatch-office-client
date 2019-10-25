import React, { Component } from 'react';
import './CreateAccount.css';
import {
    validateUserName,
    validatePassword
} from '../../HelperFunctions/HelperFunctions';

class CreateAccount extends Component {

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { username, password, full_name, company_name, mc_num } = e.target
        const user = {
            username: username.value,
            password: password.value,
            company_name: company_name.value,
            mc_num: mc_num.value,
            full_name: full_name.value
        }
        console.log(user);
    }

    render() {
        return (
            <form className='CreateAccount width-wrapper' onSubmit={(e) => { this.handleFormSubmit(e) }}>
                <fieldset>
                    <legend className='blue-back white-text'>
                        Create Account
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
                        <label htmlFor='full_name'>
                            <span className='input-title'>* Full Name:</span>
                            <input type='text' id='full_name' name='full_name' required />
                            <span className='error'>Invalid Username</span>
                        </label>
                        <label htmlFor='company_name'>
                            <span className='input-title'>Company Name:</span>
                            <input type='text' id='company_name' name='company_name' required />
                            <span className='error'>Company Name Error</span>
                        </label>
                        <label htmlFor='mc_num'>
                            <span className='input-title'>MC Number:</span>
                            <input type='text' id='mc_num' name='mc_num' />
                            <span className='error'>MC Number Error</span>
                        </label>
                        <button
                            className='app-button'
                            type='submit'
                        >
                            Create Account
                        </button>
                    </div>
                </fieldset>
            </form>
        );
    }
}

export default CreateAccount;