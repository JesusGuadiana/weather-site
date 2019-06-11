const request = require("request");

const forecast = (lat, long, callback) =>{
    const url = "https://api.darksky.net/forecast/52e3e7bfdc53a23f59cae3a6cc8de735/"+ lat + ","+ long +"?units=si";

    request({url, json: true}, (error, { body }) =>{
        if(error){
            callback("Unable to connect to weather service", undefined);
        } else if(body.error){
            console.log("Unable to find location");
        } else {
        const temp = body.currently.temperature;
        const rain = body.currently.precipProbability;
        const forecast = body.daily.data[0].summary + "Its currently " + temp + " degrees out. There is " + rain + "% chances of rain";
            callback(undefined, forecast);
        }
    })
}

module.exports = forecast;
