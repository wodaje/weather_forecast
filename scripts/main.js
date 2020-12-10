// forecast div for 5 card display (can be dynamically updated easily up to 7 via api input)

popForecast()
function popForecast(){

    $(".forecast").append('<div class ="card-deck" />')

    x = forecastDays
    for (x = 1 ; x<forecastDays+1 ; x++) {

    $(".card-deck").append(`<div class="card bg-primary text-white" id ="day${x}" />`)

    }                        
}

//City List 


var cityList = ["Newtown"]

popCity()
function popCity(){


    var headCity = $("<h5></h5>").text(">>> Search for City:")
    var btnCity = $(`<button class= 'btn btn-primary'></button>`)
    $(".city").prepend(headCity)
    btnCity.text("W")

    $(".city").append("<div class= 'inField'></div>")
    var inputEl = $("<input id= 'inputCity'></input>")
    $(".inField").append(inputEl).append(btnCity)
    $(".btn").on("click", function(event){
        event.preventDefault()
    var cityIn = inputEl.val()
    
    clearScreen()

    // $(".current").empty()
    
    // for (x = 1 ; x<forecastDays+1 ; x++) {
    // $(`#day${x}`).empty()


    //}
        apiCall(cityIn)
    })
    
}
