var searchBtn = document.getElementById('searchBtn');
var currentDiv = document.getElementById("current")

// openweather api key
var apiKey = 'e79c76975ad2637930a749ca25f1b0f0';

var getCurrentWeather = function() {

    //grab value from input
    var input = document.getElementById("searchCity").value;
//    console.log(input)
    //create url
    //make the api call (fetch)
    // var lat = geolocationCoordinatesinstance.latitude;
    // var long = geolocationCoordinatesinstance.longitude;
    // console.log(lat, long);


    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=" + apiKey + "&units=imperial";
    var uvIndex = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + 40.730610 + "&lon=" + -73.935242 + "&appid=" + apiKey);

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
            temp.textContent = "Temperature: " + data.main.temp + " F";

            var wind = document.createElement("p");
            wind.textContent = "Wind: " + data.wind.speed + " MPH";
            // console.log(wind);

            var humidity = document.createElement("p");
            humidity.textContent = "Humidity: " + data.main.humidity + " %";

            card.append(title, temp, wind, humidity);
            currentDiv.append(card);
        });
    // create elements (parent: card , child elements: wind, temp, humid, uv)

    fetch(uvIndex)
    .then((response) => {
        return response.json()}
        ).then((data) => {
            console.log(data);

            var card = document.createElement("div");
            card.classList.add("currentWeather");

            var index = document.createElement("p");
            index.textContent = "UV Index: " + data.current.uvi;

            card.append(index);
            currentDiv.append(card);



            
        });
}


searchBtn.addEventListener('click', getCurrentWeather)