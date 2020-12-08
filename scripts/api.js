// Current Weather Data 

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// api key for above 6baec66594d536d831469149c42d3d07

//q = city name  units = imperial

//*********************************************

// Call 5 day / 3 hour forecast data 

//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

// http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}  uv index = requrires lat and lon

var apiKey = "6baec66594d536d831469149c42d3d07"

//function to make API Call
async function apiCall(urlCall){

let response = await $.ajax({url: urlCall, method: "GET"});

console.log(response)

$(".container").append(response)

}

apiCall(`https://api.openweathermap.org/data/2.5/weather?q=Boston&units=imperial&appid=${apiKey}`)

 