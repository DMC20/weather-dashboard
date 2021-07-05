var searchBtn = document.getElementById('searchBtn');
var currentDiv = document.getElementById("current")
var future = document.getElementById('futureWeather');

// openweather api key
var apiKey = 'e79c76975ad2637930a749ca25f1b0f0';

var getCurrentWeather = function() {

    var input = document.getElementById("searchCity").value;

    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=" + apiKey + "&units=imperial";
    
    fetch(url)
    .then(
        (response ) => {
            return response.json()}
        ).then((data) => {
            // console.log(data)

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

            var humidity = document.createElement("p");
            humidity.textContent = "Humidity: " + data.main.humidity + " %";

            card.append(title, temp, wind, humidity);
            currentDiv.append(card);

            var lat = data.coord.lat;
            var long = data.coord.lon;

            var uvIndex = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + apiKey + "&units=imperial";

            fetch(uvIndex)
            .then((response) => {
                return response.json()
            }).then((data1) => {

            var card = document.createElement("div");
            card.classList.add("currentWeather");

            var index = document.createElement("p");
            index.textContent = "UV Index: " + data1.current.uvi;

            card.append(index);
            currentDiv.append(card);
                
            })

        });
    // create elements (parent: card , child elements: wind, temp, humid, uv)

    var forecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=" + apiKey + "&units=imperial";




    fetch(forecast)
    .then((response) => {
            return response.json()}
        ).then((data) => {
            console.log(data);

        // var dailyTemp = [1, 2, 3, 4, 5];

        // for (let i = 0; i < dailyTemp.length; i++) {
        //     // var date = response.list[((i + 1) * 8) -1 ].data.list;
        //     console.log(date);
            
        // }









            });
}



searchBtn.addEventListener('click', getCurrentWeather)