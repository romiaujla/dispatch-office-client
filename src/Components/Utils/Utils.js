import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faEdit,
    faTrashAlt,
    faArrowLeft,
    faFilter,
    faArrowRight,
    faBoxes,
} from '@fortawesome/free-solid-svg-icons'
import './Utils.css';
import {Link} from 'react-router-dom';


export function GoBackButton({ className, ...props }) {
    return (
        <button type='button' className={['GoBack icon-button', className].join(' ')} {...props}>
            <FontAwesomeIcon icon={faArrowLeft} className='back-icon' />
            <span>Back</span>
        </button>
    )
}

export function EditButton({className, to, ...props}){
    return (
        <Link type='button' className={['EditButton icon-button', className].join(' ')} {...props} to={to}>
            <FontAwesomeIcon icon={faEdit} className='edit-icon' />
            <span>Edit</span>
        </Link>
    )
}

export function DeleteButton({className, to, ...props}){
    return (
        <button className={['DeleteButton icon-button', className].join(' ')} {...props} to={to}>
            <FontAwesomeIcon icon={faTrashAlt} className='delete-icon' />
            <span>Delete</span>
        </button>
    )
}

export function ViewLoadButton({className, to , ...props}){
    return (
        <Link type='button' className={['ViewLoadButton icon-button', className].join(' ')} {...props} to={to}>
            <span>View Load</span>
            <FontAwesomeIcon icon={faArrowRight} className='delete-icon' />
        </Link>
    )
}

export function FilterButton({className, ...props}){
    return (
        <button className={['FilterButton ', className].join(' ')} {...props}>
            <FontAwesomeIcon icon={faFilter} className='filter-icon' />
            <span>Fiilter</span>
        </button>
    )
}

export function UpdateViewButton({className, ...props}){
    return (
        <Link className={['UpdateViewButton', className].join(' ')} {...props}>
            <FontAwesomeIcon icon={faBoxes} className='boxes-icon' />
            <span>{props.status}</span>
        </Link>
    )
}