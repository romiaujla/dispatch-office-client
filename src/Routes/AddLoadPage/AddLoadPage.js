import React, { Component } from 'react';
import './AddLoadPage.css';
import {
    handleGoBack
} from '../../HelperFunctions/HelperFunctions';
import DriversDropDown from '../../Components/DriversDropDown/DriversDropDown';

class AddLoadPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    handleAddLoad = (e) => {
        e.preventDefault();
        console.log(`Add Load Submitted`);
    }

    render() { 

        let driver = {};

        return (
            <section className='AddLoadPage width-wrapper'>
                <form className='add-load-form'>
                    <fieldset>
                        <legend className='blue-back white-text'>
                            <button type='button' className='app-button go-back' onClick={(e) => {handleGoBack(this.props.history)}}>
                                Go Back
                            </button>
                            <span>Add Load</span>
                            </legend>
                        <div className='flex'>
                            <label htmlFor='unit-num'>
                                <span className='input-title'>Pick Up City</span>
                                <input
                                    type='text'
                                    id='unit-num'
                                    name='unit-num'
                                    required
                                />
                                {
                                    // this.state.unitNumError &&
                                    // <span className='error'>{this.state.error}</span>
                                }
                            </label>
                            
                            <label htmlFor='password'>
                                <span className='input-title'>Available Drivers</span>
                                <DriversDropDown equipDriver={driver} className={'select-css'}/>
                                {
                                    // incorrectPassword &&
                                    // <span className='error'>{error}</span>
                                }
                            </label>
                            <button
                                className='app-button'
                                type='submit'
                            >
                                Save Changes
                                </button>
                        </div>
                    </fieldset>
                </form>
            </section>
        );
    }
}
 
export default AddLoadPage;