export function validateUserName(e){
    // const username = e.target.value;
    
    // write code for validating username
}

export function validatePassword(e){
    // const password = e.target.value;
    
    // Write code for validating Password
}

export function validateDate(date){
    const date_regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
    return date.length < 8 || !date_regex.test(date);
}

// takes user back to the previous page in history
export function handleGoBack(history){
    return history.goBack();
}

// Returns true if the object is empty
export function objectIsEmpty(obj){
    return (Object.entries(obj).length === 0 && obj.constructor === Object)
}

// Returns date in a formatted manner
export function formatDate(dbDate){
    const date = new Date(dbDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${month + 1}/${day}/${year}`;
};