let search = document.querySelector("#search")
let searchButton = document.querySelector("#searchButton")
let currentWeather = document.querySelector("#currentWeather")
let forcast = document.querySelector("#forecast")
let APIkey = "cbb3a4b3432ba3d87f62dfcadd5cff54"

searchButton.addEventListener("click" ,function(){
    let cityName = search.value
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`
    fetch(url)
    .then(function(response){
        return response.json()
    
    })
    .then(function(currentData){
        console.log(currentData)
        let fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&exclude={part}&appid=${APIkey}`
        fetch(fiveDayUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(fiveDayData){
            currentWeather.innerHTML=`<h2 class="display-5 fw-bold">${currentData.name} (${moment(currentData.dt,"X").format("DD/MM/YYYY")})</h2>
            <img src=" http://openweathermap.org/img/wn/04d@2x.png" alt="">
            <h3>Temp: ${}</h3>
            <h3>Wind: 9.57mph</h3>
            <h3>Humidity: 66%</h3>
            <h3 class="bg-success w-10"> UV index: 0.47</h3>`
            console.log(fiveDayData)
        })
    })
})