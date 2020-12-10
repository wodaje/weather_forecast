// API key access free account
var apiKey = "6baec66594d536d831469149c42d3d07"

var currentChoice = "Danbury"

apiCall(`https://api.openweathermap.org/data/2.5/weather?q=${currentChoice}&units=imperial&appid=${apiKey}`)

//function to make API Call
async function apiCall(urlCall){

    try {
        const r = await $.ajax({url: urlCall, method: "GET"});
        // populate var for function ref
        var cW = (r)
        // pull lattitude and longitude for following API calls
        let lat = r.coord.lat
        let lon = r.coord.lon

    if (r) {
        const r2 = await $.ajax({url: `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`, method: "GET"});
        var uvI = (r2)

        const r3 = await $.ajax({url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${apiKey}`, method: "GET"});
        var dW = (r3)

    }
    }catch(error){
        console.log(error)
        return alert("You may have misspelled City")
    }
  
    //populateScreen()   
    return populateScreen(cW,dW,uvI)
    
}




function populateScreen(cW,dW,uvI){


//load & format date 
    let dateEl = cW.dt
    dateEl = moment.unix(dateEl).format('dddd, MM.DD.YYYY')
    
    let image = $("<img>").attr("src", `http://openweathermap.org/img/wn/${cW.weather[0].icon}@2x.png`)
   // image.addClass("smallImg")
   // let imageEl = image[0].html
   // console.log(typeof imageEl)

    
$(".current").append('<hr />')
$(".current").append(`<h2>${cW.name} ${dateEl}</h2>`).append(image).append("<br />")
$(".current").append(`Temperature:  ${cW.main.temp} &#176;F`).append('<br />')
$(".current").append("Humidity: " + cW.main.humidity).append('<br />')
$(".current").append("Wind Speed: " + cW.wind.speed).append('<br />')
$(".current").append("UV Index: " + uvI.value).append('<hr />')

}

//populateScreen()

//  ***NOTES***

//let dateConvEl = (dW.daily[0].dt) 
//dateConvEl = moment.unix(dateConvEl).format('(MM/DD/YYYY)')


//let image = $("<img>").attr("src", `http://openweathermap.org/img/wn/${cW.weather[0].icon}@2x.png`);

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



