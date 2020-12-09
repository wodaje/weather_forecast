// API key access free account
var apiKey = "6baec66594d536d831469149c42d3d07"

/// Current Weather Var for Object
var cW = Object
// 5day Weather Var
var dW = Object
// UvIndex Var
var uvI = Object

apiCall(`https://api.openweathermap.org/data/2.5/weather?q=Boston&units=imperial&appid=${apiKey}`)

//function to make API Call
async function apiCall(urlCall){

    try {
        const r = await $.ajax({url: urlCall, method: "GET"});
        // populate var for function ref
        cW= (r)
        // pull lattitude and longitude for following API calls
        let lat = r.coord.lat
        let lon = r.coord.lon

    if (r) {
        const r2 = await $.ajax({url: `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`, method: "GET"});
        // populate var for function ref
        uvI = (r2)

        const r3 = await $.ajax({url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${apiKey}`, method: "GET"});
        // populate var for function ref
        dW = (r3)
    }
    }catch(error){
        console.log(error)
    }
  
    populateScreen()   

}


function populateScreen(){

//let br = document.createElement("br")

$(".container").append('<br />')
$(".container").append("Name: " + cW.name).append('<br />')

$(".container").append("Humidity: " + cW.main.humidity).append('<br />')

$(".container").append("Temperature: " + cW.main.temp).append('<br />')

 // Creating an element to hold the image
 var image = $("<img>").attr("src", `http://openweathermap.org/img/wn/${cW.weather[0].icon}@2x.png`);
 $(".container").append(image).append('<br />')

//console.log(iconPic)

$(".container").append("Wind Speed: " + cW.wind.speed).append('<br />')

let dateEl = cW.dt
console.log(dateEl)
dateEl = moment.unix(dateEl).format('(MM/DD/YYYY)')

$(".container").append("Date: " + dateEl).append('<br />')
    
}



//  ***NOTES***

//let dateConvEl = (dW.daily[0].dt) 
//dateConvEl = moment.unix(dateConvEl).format('(MM/DD/YYYY)')




// conversion moment.unix(yourUnixEpochTime).format('dddd, MMMM Do, YYYY h:mm:ss A')


//async function getData() {
//  try {
//    const firstCall = await ajax()

// check for data from first call
//    if (firstCall) {
//      const secondCall = await ajax(`/url/${firstCall}`)
//    }
//  } catch (err) {
//    console.log(err)
//  }
//}  



