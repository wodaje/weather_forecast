
$(".forecast").append('<div class ="card-deck" />')

x = forecastDays
for (x = 1 ; x<forecastDays+1 ; x++) {

    $(".card-deck").append(`<div class="card bg-primary text-white" id ="day${x}" />`)
}                        
