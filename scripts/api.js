// API key access free account
var apiKey = "6baec66594d536d831469149c42d3d07"

// Set to variable for easy changing of days to display or loop if expanded
var forecastDays = 5

//function to make API Call
async function apiCall(cityIn){

    try {
        const r = await $.ajax({url: `https://api.openweathermap.org/data/2.5/weather?q=${cityIn}&units=imperial&appid=${apiKey}`, method: "GET"});
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
        cityArray.shift()
        return alert("Something went wrong with your Lookup -pls check city name?")
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

        //localStoreW(cW,dW,uvI)

}


function localStoreW(cW,dW,uvI){

    let cWel = JSON.stringify(cW)
    let dWel = JSON.stringify(dW)
    let uvIel= JSON.stringify(uvI)

    localStorage.setItem("cW",cWel) 
    localStorage.setItem("dW",dWel) 
    localStorage.setItem("uvI",uvIel) 
    
}


function localReStoreW(){

    let cWel = localStorage.getItem("cW") 
    let dWel = localStorage.getItem("dW")
    let uvIel = localStorage.getItem("uvI")
    
    cW = JSON.parse(cWel)
    dW = JSON.parse(dWel)
    uvI = JSON.parse(uvIel)

    populateScreen(cW,dW,uvI)
}



//  ***NOTES***

// conversion moment.unix(yourUnixEpochTime).format('dddd, MMMM Do, YYYY h:mm:ss A')






