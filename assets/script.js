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

    
    var forecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=" + apiKey + "&units=imperial";

    fetch(forecast)
    .then((response) => {
            return response.json()}
        ).then((data) => {
            // console.log(data);

    var dailyWeather = [{
            temp: data.list[3].main.temp,
            wind: data.list[3].wind.speed,
            humid: data.list[3].main.humidity
        },
        {
            temp: data.list[11].main.temp,
            wind: data.list[11].wind.speed,
            humid: data.list[11].main.humidity
        },
        {
            temp: data.list[19].main.temp,
            wind: data.list[19].wind.speed,
            humid: data.list[19].main.humidity
        },
        {
            temp: data.list[27].main.temp,
            wind: data.list[27].wind.speed,
            humid: data.list[27].main.humidity
        },
        {
            temp: data.list[35].main.temp,
            wind: data.list[35].wind.speed,
            humid: data.list[35].main.humidity
        }
    ];
    


    for (let i = 0; i < dailyWeather.length; i++) {
        console.log(dailyWeather.length);






        // card.append(dailyTemp);
        // future.append(card);
        }









            });
}



searchBtn.addEventListener('click', getCurrentWeather)