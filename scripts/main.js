// Place Holder City Array for User City Choice List 
var cityArray = []
// CityArray max allowed stored value
var maxCity = 8


// set all initial values and function to populate screen load etc
init()

function init(){

    popCity()    
    popForecast()    
    clearScreen()
    cityListStored()

    //Adds event listener for prior history click execute 
    $(".inField").on("click","li",citylistExecute)      
}

// build deck structure for population by forecast
function popForecast(){

    $(".forecast").append('<div class ="card-deck" />')

    x = forecastDays
    for (x = 1 ; x<forecastDays+1 ; x++) {

    $(".card-deck").append(`<div class="card bg-primary text-white" id ="day${x}" />`)

    }                        
}

//City List 

function popCity(){
    
    // create header and button on City list
    //var headCity = $("<h5></h5>").text(">>> Search for City:")
    $(".city").append("<div class= 'text-center'></div>")
    var btnCity = $(`<button class= 'btn btn-primary'></button>`)
    btnCity.text("Search for City:")  
    $(".text-center").append(btnCity).append("<br />")
    
    // Add input Box
    var inputEl = $(`<input id= 'inputCity' placeholder= 'City Name' onfocus= 'this.value=""'></input>`)
    $(".text-center").append(inputEl)

    // create Div for city value display management
    $(".city").append("<div class= 'inField'></div>")

    //add event listener to button passing new City value 
    $(".btn").on("click", function(){
        var cityIn = inputEl.val()
        if (cityIn === ""){ return}
        cityListHandler(cityIn)
    })  
}

function cityListHandler(cityIn){   
   
    // Clear old list Item
    $(".inField").empty()
    
    // handles initial start up conlfict by adding first user input value to empty array
    if (cityArray === null){cityArray = [cityIn]}
   
    // Controls max size of city fields
    if (cityArray.length === maxCity){
        cityArray.pop()}

    // add lastest choice to array - prevents immediate dupes    
    if (cityArray[0] !== cityIn){
        cityArray.unshift(cityIn)
    }

    // checks for dupes and kicks out such
    //for (y = 0;  y < cityArray.length; y++) {
        
    //}
    
    // populate new city List
    for (y = 0;  y < cityArray.length; y++) {
        $(".inField").append(`<li>${cityArray[y]}</li>`)
    }

    // Store New List Values     
    let cityList= JSON.stringify(cityArray)
    localStorage.setItem("City List",cityList)    

    clearScreen()
    apiCall(cityIn)

}

function citylistExecute(){

// on focus click returns city value from li
 let cityIn = $(this).text()
 
 // reset dynamic layout
 clearScreen()
 
 // execute api call 
 apiCall(cityIn)

}

function cityListStored(){

    let cityList = localStorage.getItem("City List")   
    cityArray = JSON.parse(cityList)   

    if (cityArray === null){
    alert("No history to load start using the tool to populate")
    return
    }

    $(".inField").empty()

    for (y = 0;  y < cityArray.length; y++) {
        $(".inField").append(`<li>${cityArray[y]}</li>`)
    }

    let cityIn = cityArray[0]
    return apiCall(cityIn)
}

function clearScreen(){
 
    $(".current").empty()

    for (x = 1 ; x<forecastDays+1 ; x++) {
    $(`#day${x}`).empty()
   }
}


