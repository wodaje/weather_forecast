// Current Weather Data 

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// api key for above 6baec66594d536d831469149c42d3d07

//q = city name  units = imperial

//*********************************************

// Call 5 day / 3 hour forecast data 

//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

// http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}  uv index = requrires lat and lon

// woda api key access free account
var apiKey = "6baec66594d536d831469149c42d3d07"

/// Current Weather Var for Object
var cW = Object
// 5day Weather Var
var dW = Object
// UvIndex Var
var uvI = Object



//function to make API Call
async function apiCallcW(urlCall){

let r = await $.ajax({url: urlCall, method: "GET"});

console.log(r)
cW= (r)
lat = r.coord.lat
lon = r.coord.lon

let r2 = await $.ajax({url: `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`, method: "GET"});
console.log(r2)
uvI = (r2)

//populateScreen()

}

async function apiCalluV(urlCall){
    
    console.log(lat)
    console.log(lon)


    let response = await $.ajax({url: urlCall, method: "GET"});
    
    console.log(response)
    uvI= (response)
      
    
    populateScreen()
    
    }


apiCallcW(`https://api.openweathermap.org/data/2.5/weather?q=Boston&units=imperial&appid=${apiKey}`)
//apiCalluV(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`)


function populateScreen(){

//let br = document.createElement("br")

$(".container").append("Name: " + cW.name).append('<br />')

$(".container").append("Humidity: " + cW.main.humidity).append('<br />')

$(".container").append("Temperature: " + cW.main.temp).append('<br />')

 // Creating an element to hold the image
 var image = $("<img>").attr("src", `http://openweathermap.org/img/wn/${cW.weather[0].icon}@2x.png`);
 $(".container").append(image).append('<br />')

//console.log(iconPic)

$(".container").append("Wind Speed: " + cW.wind.speed).append('<br />')

$(".container").append("Date?: " + cW.dt_iso).append('<br />')
    
}





