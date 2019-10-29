import React from 'react';

export default React.createContext({
    basePath: '',
    loggedIn: () => {},
    newUser: () => {},
    setLoggedIn: () => {},
    setNewUser: () => {},
    setCarrier: () => {},
});