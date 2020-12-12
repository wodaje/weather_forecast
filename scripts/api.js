    // API key access free account
var apiKey = "6baec66594d536d831469149c42d3d07"

    // Set to variable for easy changing of days to display or loop if expanded
var forecastDays = 5

// FUNCTION: ** API CALL** \\
async function apiCall(cityIn){

    try {
        const r = await $.ajax({url: `https://api.openweathermap.org/data/2.5/weather?q=${cityIn}&units=imperial&appid=${apiKey}`, method: "GET"});
            // populate var to pass on for scren population
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
        cityArray.shift()
        return alert("Something went wrong with your Lookup -pls check city name?")
    }
        // using output from the three API calls to pass on to below 
    return populateScreen(cW,dW,uvI)
}

// FUNCTION: ** This is main control for all API variables placing ** \\
function populateScreen(cW,dW,uvI){

        //Load Daily Forecast could create elements to hold... discussion point would be slighlty cleaner but longer
    let dateEl = cW.dt
    dateEl = moment.unix(dateEl).format('dddd, MM.DD.YYYY')
    let image = $("<img>").attr("src", `http://openweathermap.org/img/wn/${cW.weather[0].icon}@2x.png`)  
    $(".current").append('<hr />')
    $(".current").append(`<h2>${cW.name} ${dateEl}</h2>`).append(image).append("<br />")
    $(".current").append(`Temperature:  ${cW.main.temp} &#176;F`).append('<br />')
    $(".current").append("Humidity: " + cW.main.humidity).append('<br />')
    $(".current").append("Wind Speed: " + cW.wind.speed).append('<br />')

        // Adding Color coordination and warning for UV index
    let uvIndex = uvI.value
    $(".current").append("<div id= 'uvIndex'></div>")
    if (uvIndex <3.51){$("#uvIndex").addClass("favorable")}
    else if (uvIndex >3.5 && uvIndex <7.01){$("#uvIndex").addClass("moderate")}
    else if (uvIndex >7){$("#uvIndex").addClass("severe")}
    $("#uvIndex").append("UV Index: " + uvIndex)
    $(".current").append('<hr />')

        //LOOP Load 5-day Forecast forecastDays global variable allows for dynamic code updating via variable
    for (x = 1 ; x < forecastDays+1 ; x++) {
        dateEl = dW.daily[x].dt
        dateEl = moment.unix(dateEl).format('MM.DD.YYYY (ddd)')
        $(`#day${x}`).append(`<h6>${dateEl}</h6>`)
        image = $("<img>").attr("src", `http://openweathermap.org/img/wn/${dW.daily[x].weather[0].icon}@2x.png`)
        image.addClass("smallImg")
        $(`#day${x}`).append(image).append('<br />')
        $(`#day${x}`).append(`Temp low:  ${dW.daily[x].temp.min} &#176;F`).append('<br />')
        $(`#day${x}`).append(`Temp high:  ${dW.daily[x].temp.max} &#176;F`).append('<br />')
        $(`#day${x}`).append('<br />')
        $(`#day${x}`).append(`Humidity:  ${dW.daily[x].humidity} %`)
    }
}



