import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faEdit,
    faTrashAlt,
    faArrowLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import './Utils.css';
import {Link} from 'react-router-dom';


export function GoBackButton({ className, ...props }) {
    return (
        <button type='button' className={['GoBack', className].join(' ')} {...props}>
            <FontAwesomeIcon icon={faArrowLeft} className='back-icon' />
        </button>
    )
}

export function EditButton({className, to, ...props}){
    return (
        <Link type='button' className={['EditButton', className].join(' ')} {...props} to={to}>
            <FontAwesomeIcon icon={faEdit} className='edit-icon' />
            Edit
        </Link>
    )
}