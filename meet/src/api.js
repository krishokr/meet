
function extractLocations(events) {
    //creates new array with only locations
    let extractLocations = events.map(event => event.location);
    //the spread operator combined with Set() removes all duplicate locations
    let locations = [...new Set(extractLocations)]
    return locations;
}

function extractDetails(events) {
    let details = events.filter(event => event.description);
    return details;
}

export {extractLocations, extractDetails};