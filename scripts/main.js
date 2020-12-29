    // Place Holder City Array for User City Choice List 
var cityArray = []
    // CityArray max allowed stored value
var maxCity = 12
    // kick off initialinzing function compilation
init()


// FUNCTION: ** Set all initial values and function to populate screen load etc **\\
function init(){
        // populates/set formats city div for the city choice values 
    popCity()
        // populates/sets formats forecast cards to be filled dynamically    
    popForecast()  
        // clears out any old values to start with empty screen - needs to run to avoid dupes 
    clearScreen()
        // Load default last city queried with updated API call
    cityListStored()
        //Adds event listener for city list array 
    $(".inField").on("click","li",citylistExecute)  

    // $(".inField").on("keypress","li",function(e){
    //     if (e.key === "Enter"){
    //     citylistExecute}
    // })      
}


// FUNCTION: ** build deck card bones for population by forecast **\\
function popForecast(){

    $(".forecast").append('<div class ="card-deck" />')

    x = forecastDays
    for (x = 1 ; x<forecastDays+1 ; x++) {

    $(".card-deck").append(`<div class="card bg-primary text-white" id ="day${x}" />`)
    }                        
}

 
// FUNCTION: ** Build City Field Bones with event listener to pass execution to cityListHandler below** \\
function popCity(){  
        // create header and button on City list
    $(".city").append("<div class= 'text-center'></div>")
    var btnCity = $(`<button class= 'btn btn-primary'></button>`)
    btnCity.text("Search for City:")  
    $(".text-center").append(btnCity).append("<br />")    
        // Add input Box
    var inputEl = $(`<input id= 'inputCity' placeholder= 'City Name' onfocus= 'this.value=""'></input>`)
    $(".text-center").append(inputEl)
        // create Div for city value display management
    $(".city").append("<div class= 'inField' style= 'list-style-type: none'></div>")
        //add event listener to button passing new City value 
    $(".btn").on("click", function(){
        var cityIn = inputEl.val()
        if (cityIn === ""){ return}
        cityListHandler(cityIn) 
    })  
        //add hit enter capability for above 
    $("#inputCity").on("keypress", function(enter){
        if (enter.key === "Enter") {
            var cityIn = inputEl.val()
            if (cityIn === ""){ return}
            cityListHandler(cityIn) 
        }       
    })
}


// FUNCTION: ** City List Manager clearing repopulation and execution for API call on <<button click>> from above** \\
function cityListHandler(cityIn){    
        // Clear old list Item
    $(".inField").empty()
    
        //<IF> handles initial start up conlfict by adding first user input value to empty array
    if (cityArray === null){cityArray = [cityIn]}   
        // Controls max size of city fields
    if (cityArray.length === maxCity){
        cityArray.pop()}
        // add lastest choice to array - prevents immediate dupes    
    if (cityArray[0] !== cityIn){
        cityArray.unshift(cityIn)
    }

        // checks for dupes to clear @@@ future upgrade
        //for (y = 0;  y < cityArray.length; y++) {
        
        //}
    
        //<LOOP> - populate new city List
    for (y = 0;  y < cityArray.length; y++) {
        $(".inField").append(`<li>${cityArray[y]}</li>`)
    }

        // Store New List Values     
    let cityList= JSON.stringify(cityArray)
    localStorage.setItem("City List",cityList)    
        //Pass value (clearing necessary for clean slate) to API call function
    clearScreen()
    apiCall(cityIn)
}


// FUNCTION: ** City History List execution to execute API Call - event listener set in init function** \\
function citylistExecute(){
        // on focus click returns city value from li
    let cityIn = $(this).text()
        // reset dynamic layout
    clearScreen()
        // execute api call 
     apiCall(cityIn)
}


// FUNCTION: ** City List Reload for refresh local storage application and API call for update** \\
function cityListStored(){
        //grabs last history for list population
    let cityList = localStorage.getItem("City List")   
    cityArray = JSON.parse(cityList)      
        //if first time using MUST have this error catch or it will fail
    if (cityArray === null){
    alert("No history to load enter the first City reference to start!")
    return
    }
        
    $(".inField").empty()

        //<LOOP> fill city values
    for (y = 0;  y < cityArray.length; y++) {
        $(".inField").append(`<li>${cityArray[y]}</li>`)
    }

        //PIck up entry to pass to API call execution (first on list)
    let cityIn = cityArray[0]
    return apiCall(cityIn)
}

// FUNCTION: ** Clearing old values to avoid run up screen ** \\
function clearScreen(){
 
    $(".current").empty()

    for (x = 1 ; x<forecastDays+1 ; x++) {
    $(`#day${x}`).empty()
   }
}


