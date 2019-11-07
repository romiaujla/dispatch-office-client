import React, { Component } from 'react';
import './CreateAccount.css';
import { emptySpaces } from '../../HelperFunctions/InputFieldValidations';


class CreateAccount extends Component {

    constructor(props){
        super(props);
        this.state = {
            usernameError: '',
            passwordError: '',
            companyNameError: '',
            mcNumError: '',
            fullNameError: '',            
        }
    }

    validateUserName = (username) => {
        if(emptySpaces(username)){
            this.setState({usernameError: `Username is required`})
        } else if(username.trim().length < 6 || username.trim().length > 20){
            this.setState({usernameError: `Username must be between 6 to 20 characters`})
        } else {
            this.setState({usernameError: ``})
        }
    }

    validatePassword = (password) => {
        if(emptySpaces(password)){
            this.setState({passwordError: `Username is required`})
        } else if(password.trim().length < 6 || password.trim().length > 72){
            this.setState({passwordError: `Password must be between 6 to 72 characters`})
        } else {
            this.setState({passwordError: ``})
        }
    }

    validateFullName = (full_name) => {
        if(emptySpaces(full_name)){
            this.setState({fullNameError: `Full Name is required`})
        } else if(full_name.trim().length < 6 || full_name.trim().length > 40){
            this.setState({fullNameError: `Full Name must be between 6 to 40 characters`})
        } else {
            this.setState({fullNameError: ``})
        }
    }

    checkErrors = (errInState) => {
        // if()
    }

    handleFormSubmit = (e) => {
        this.checkErrors(this.state);
        e.preventDefault();
        const { username, password, full_name, company_name, mc_num } = e.target
        const user = {
            username: username.value,
            password: password.value,
            company_name: company_name.value,
            mc_num: mc_num.value,
            full_name: full_name.value
        }

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
                                onChange={(e) => {this.validateUserName(e.target.value)}}
                            />
                            {
                                this.state.usernameError &&
                                <span className='error'>{this.state.usernameError}</span>
                            }
                        </label>
                        <label htmlFor='password'>
                            <span className='input-title'>* Password:</span>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                required
                                onChange={(e) => {this.validatePassword(e.target.value)}}
                            />
                            {
                                this.state.passwordError &&
                                <span className='error'>{this.state.passwordError}</span>
                            }
                        </label>
                        <label htmlFor='full_name'>
                            <span className='input-title'>* Full Name:</span>
                            <input type='text' id='full_name' name='full_name' required />
                            {
                                this.state.fullNameError &&
                                <span className='error'>{this.state.fullNameError}</span>
                            }
                        </label>
                        <label htmlFor='company_name'>
                            <span className='input-title'>Company Name:</span>
                            <input type='text' id='company_name' name='company_name' />
                            {
                                this.state.companyNameError &&
                                <span className='error'>{this.state.companyNameError}</span>
                            }
                        </label>
                        <label htmlFor='mc_num'>
                            <span className='input-title'>MC Number:</span>
                            <input type='text' id='mc_num' name='mc_num' />
                            {
                                this.state.mcNumError &&
                                <span className='error'>{this.state.mcNumError}</span>
                            }
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