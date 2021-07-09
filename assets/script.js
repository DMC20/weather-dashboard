var searchBtn = document.getElementById('searchBtn');
var currentDiv = document.getElementById("current")
var future = document.getElementById('futureWeather');


// openweather api key
var apiKey = 'e79c76975ad2637930a749ca25f1b0f0';

var getCurrentWeather = function(input) {

    document.getElementById('current').style.display = 'block';

    var input = document.getElementById("searchCity").value;

    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=" + apiKey + "&units=imperial";
    
    fetch(url)
    .then(
        (response ) => {
            return response.json()}
        ).then((data) => {
            // console.log(data);

            //creating card container
            var card = document.createElement("div");
            card.classList.add("currentWeather");

            var title = document.createElement("h3");
            title.classList.add("cityName");
            title.textContent = input;

            var temp = document.createElement("p");
            temp.textContent = "Temp: " + data.main.temp + " F";

            var wind = document.createElement("p");
            wind.textContent = "Wind: " + data.wind.speed + " Mph";

            var humidity = document.createElement("p");
            humidity.textContent = "Humidity: " + data.main.humidity + " %";

            var todayDate = document.createElement('h2');
            card.append(todayDate);
            todayDate.innerHTML =  moment().format('MMMM Do YYYY');

            card.append(title, temp, wind, humidity);
            currentDiv.append(card);

            var lat = data.coord.lat;
            var long = data.coord.lon;

            var uvIndex = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + apiKey;

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

    function weeklyForecast () {
    var forecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=" + apiKey + "&units=imperial";


    fetch(forecast)
    .then((response) => {
            return response.json()}
        ).then((data) => {
        var dailyWeather = data.list;

        for (let i = 0; i < dailyWeather.length; i++) {

            if(dailyWeather[i].dt_txt.indexOf('15:00:00') !== -1){

                console.log(dailyWeather[i])

                var card = document.createElement("div");
                card.classList.add("forecast");
                card.classList.add("col-sm-2");

                var tempEl = document.createElement("p");
                tempEl.textContent = "Temp: " + dailyWeather[i].main.temp;

                var todayDate = document.createElement('h4');
                todayDate.innerHTML =  new Date(dailyWeather[i].dt_txt).toLocaleDateString();

                var windEl = document.createElement("p");
                windEl.textContent = "Wind: " + dailyWeather[i].wind.speed + ' Mph'

                var humidEl = document.createElement("p");
                humidEl.innerHTML = "Humidity: " + dailyWeather[i].main.humidity + "%";

                card.append(todayDate, tempEl, windEl, humidEl);
                future.append(card)

            };
        }
        });
    }
    weeklyForecast()
};

function makeRow(city){
 
    //check to see if current search value exists in history 
    if(historyArr.indexOf(city) === -1){
        historyArr.push(city);
        localStorage.setItem('history', JSON.stringify(historyArr))
    }
    // if it dosent push into history array
    if(historyArr.length > 0){
        for (let i = 0; i < historyArr.length; i++) {
            console.log(historyArr[i])
            
        }
    }
}

function getSearch(){

    var city = document.getElementById("searchCity").value;

    getCurrentWeather(city);
    makeRow(city);
};

var historyArr = localStorage.getItem('history') || [];

searchBtn.addEventListener('click', getSearch)