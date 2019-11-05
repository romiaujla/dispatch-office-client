import React from 'react';

// takes user back to the previous page in history
export function handleGoBack(history) {
    return history.goBack();
}

export function routeUserTo(history, route) {
    return history.push(route);
}

// Returns true if the object is empty
export function objectIsEmpty(obj) {
    return (Object.entries(obj).length === 0 && obj.constructor === Object);
}

// Return true is value passed in not undefined
export function isNotUndefined(value){
    return value !== undefined;
}

// Returns true if array is empty
export function arrayIsEmpty(arr) {
    return (arr.length === 0);
}

export function formatCurrency(amount) {
    return `$${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

// Returns date in a formatted manner
export function formatDate(dbDate) {
    const date = new Date(dbDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${month + 1}/${day}/${year}`;
};

export function sortShipments(shipments, property) {
    return shipments.sort((a, b) => (a[property] < b[property] ? 1 : -1));
};

export function renderLoadStatusOptions(statusArray) {
    return statusArray.map((status, i) => {
        return (
            <option
                key={i}
                value={status}
            >
                {status}
            </option>
        )
    })
}

export function renderEquipmentOptions(equipments) {
    return equipments.map((equipment) => {
        return (
            <option
                key={equipment.id}
                value={equipment.id}
            >
                {equipment.unit_num}
            </option>
        )
    })
}

// to populate the drivers drop down list
// with only those drivers that are idle and 
// have an equipment avialable to be assigned
export function getAvailableDrivers(idleDrivers) {
    const availableDrivers = idleDrivers.filter((driver) => !(Object.entries(driver.equipment).length === 0 && driver.equipment.constructor === Object));
    return availableDrivers;
}