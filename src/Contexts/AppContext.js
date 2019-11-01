import React from 'react';

export default React.createContext({
    basePath: '',
    loggedIn: () => {},
    newUser: () => {},
    setLoggedIn: () => {},
    setNewUser: () => {},
    setShipments: () => {},
    getShipments: () => {},
    getIdleDrivers: () => {},
    loggedInCarrier: {},
    shipments: [],
    setLoggedInCarrier: () => {},
    idleDrivers: [],
    equipments: [],
    geEquipments: () => {},
});