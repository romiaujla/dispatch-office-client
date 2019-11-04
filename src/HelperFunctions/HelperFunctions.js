// takes user back to the previous page in history
export function handleGoBack(history){
    return history.goBack();
}

// Returns true if the object is empty
export function objectIsEmpty(obj){
    return (Object.entries(obj).length === 0 && obj.constructor === Object);
}

// Returns true if array is empty
export function arrayIsEmpty(arr){
    return (arr.length === 0);
}

// Returns date in a formatted manner
export function formatDate(dbDate){
    const date = new Date(dbDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${month + 1}/${day}/${year}`;
};

export function sortShipments(shipments, property){
  return shipments.sort((a, b) => (a[property] < b[property] ? 1 : -1));
};