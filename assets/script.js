

var searchBtn = document.getElementById('searchBtn');
var currentDiv = document.getElementById("current")

// openweather api key
var apiKey = 'e79c76975ad2637930a749ca25f1b0f0';


var getCurrentWeather = function() {


    //grab value from input
    var input = document.getElementById("searchCity").value;
   console.log(input)
    //create url
    //make the api call (fetch)
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=" + apiKey + "&units=imperial";
    fetch(url)
    .then(
        (response ) => {
            return response.json()}
        ).then((data) => {
            console.log(data)

            //creating card container
            var card = document.createElement("div");
            card.classList.add("currentWeather");

            var title = document.createElement("h3");
            title.classList.add("cityName");
            title.textContent = input;

            var temp = document.createElement("p");
            temp.textContent = "Temperature: " + data.main.temp;

            card.append(title, temp);
            currentDiv.append(card);


        });
    //console data
    // create elements (parent: card , child elements: wind, temp, humid, uv)

}


searchBtn.addEventListener('click', getCurrentWeather)