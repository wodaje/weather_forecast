// API key access free account
var apiKey = "6baec66594d536d831469149c42d3d07"

var cityChoice = "Danbury"


// Set to variable for easy changing of days to display or loop if expanded
var forecastDays = 5


apiCall(`https://api.openweathermap.org/data/2.5/weather?q=${cityChoice}&units=imperial&appid=${apiKey}`)


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
    
    return populateScreen(cW,dW,uvI)
    
}



function populateScreen(cW,dW,uvI){

//Load Daily Forecast
    let dateEl = cW.dt
    dateEl = moment.unix(dateEl).format('dddd, MM.DD.YYYY')
    let image = $("<img>").attr("src", `http://openweathermap.org/img/wn/${cW.weather[0].icon}@2x.png`)  
    $(".current").append('<hr />')
    $(".current").append(`<h2>${cW.name} ${dateEl}</h2>`).append(image).append("<br />")
    $(".current").append(`Temperature:  ${cW.main.temp} &#176;F`).append('<br />')
    $(".current").append("Humidity: " + cW.main.humidity).append('<br />')
    $(".current").append("Wind Speed: " + cW.wind.speed).append('<br />')
    $(".current").append("UV Index: " + uvI.value).append('<hr />')

//Load 5-day Forecast via-loop = forecastDays allows easy adjustment of day range dependant on API
    x = forecastDays
    for (x = 1 ; x<forecastDays+1 ; x++) {
        dateEl = dW.daily[x].dt
        dateEl = moment.unix(dateEl).format('MM.DD.YYYY (ddd)')
        $(`#day${x}`).append(`<h6>${dateEl}</h6>`)
        image = $("<img>").attr("src", `http://openweathermap.org/img/wn/${dW.daily[x].weather[0].icon}@2x.png`)
        image.addClass("smallImg")
        $(`#day${x}`).append(image).append('<br />')
        $(`#day${x}`).append(`Temp  low:  ${dW.daily[x].temp.min} &#176;F`).append('<br />')
        $(`#day${x}`).append(`Temp high:  ${dW.daily[x].temp.max} &#176;F`).append('<br />')
        $(`#day${x}`).append('<br />')
        $(`#day${x}`).append(`Humidity:  ${dW.daily[x].humidity} %`)
    }
}


//  ***NOTES***

// conversion moment.unix(yourUnixEpochTime).format('dddd, MMMM Do, YYYY h:mm:ss A')






