const request = require("request");

const geocode = (address, callback) =>{
    const weatherUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiamlzdXMxMzAiLCJhIjoiY2p3a3p5MTBuMG0xYTQ4b2ViZnkxMDIyYyJ9.d0KwHzN9EPtj8W0fdsjb3w&limit=1";
    request({ url: weatherUrl, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to service", undefined);
        } else if(!body.features[0]){
            callback("The address you provided does not exists", undefined);
        } else {
            callback(undefined,{
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })

}

module.exports = geocode;