import React from 'react';

export default React.createContext({
    basePath: '',
    loggedIn: () => {},
    newUser: () => {},
    setLoggedIn: () => {},
    setNewUser: () => {},
    setShipments: () => {},
    setEquipments: () => {},
    setIdleDrivers: () => {},
    setDrivers: () => {},
    getAllData: () => {},
    loggedInCarrier: {},
    shipments: [],
    setLoggedInCarrier: () => {},
    idleDrivers: [],
    equipments: [],
    drivers: [],
    loadStatus: [
        'un-assigned',
        'dispatched',
        'loading',
        'in transit',
        'unloading',
        'completed'
    ]
});