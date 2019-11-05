export function emptySpaces(word){
    if(word.trim() === '')
        return true;

    return false;
}

export function notValidState(state){
    if(state.trim().length < 2)
        return `Invalid state code, Eg. TX`
}

export function notValidDate(date){
    const date_regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(15|18|17|16|19|20|21|23|24|25)\d{2}$/ ;
    return date.length < 8 || !date_regex.test(date);
}

export function isNotValidDriverName(name){
    if(name.trim() === ''){
        return `Driver is required and cannot be just empty spaces`
    }

    return false;
}

export function isNotValidPay(pay){
    if(pay.trim() === ''){
        return `Pay cannot be empty spaces`
    }

    if(isNaN(pay)){
        return `Pay can only be numeric, cannot contain characters other than 0-9 and only one '.'`;
    }
    return false;
}