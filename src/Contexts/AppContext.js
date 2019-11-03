import React from 'react';

export default React.createContext({
    basePath: '',
    loggedIn: () => {},
    newUser: () => {},
    setLoggedIn: () => {},
    setNewUser: () => {},
    setShipments: () => {},
    setEquipments: () => {},
    getAllData: () => {},
    loggedInCarrier: {},
    shipments: [],
    setLoggedInCarrier: () => {},
    idleDrivers: [],
    equipments: [],
    drivers: [],
});