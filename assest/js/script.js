let search = document.querySelector("#search")
let searchButton = document.querySelector("#searchButton")
let currentWeather = document.querySelector("#currentWeather")
let forecast = document.querySelector("#forecast")
let recentSearch = document.querySelector("#recent-search") 
let APIkey = "cbb3a4b3432ba3d87f62dfcadd5cff54"
let cityArray= []
function displayCityList(){
    if(localStorage.getItem("city")){
        cityArray=JSON.parse(localStorage.getItem("city"))
    }
    recentSearch.innerHTML=""
    for (let i = 0; i < cityArray.length; i++) {
        recentSearch.innerHTML=recentSearch.innerHTML+`
        <li class="list-group-item">${cityArray[i]}</li>
        `;
        
    }
}

displayCityList()
searchButton.addEventListener("click" ,function(){
    let cityName = search.value
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}&units=metric`
    fetch(url)
    .then(function(response){
        return response.json()
    
    })
    .then(function(currentData){
        console.log(currentData)
        let fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&exclude={part}&appid=${APIkey}&units=metric`
        fetch(fiveDayUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(fiveDayData){
            cityArray.push(currentData.name)
            localStorage.setItem("city",JSON.stringify(cityArray))
            displayCityList()
            console.log(fiveDayData)
            currentWeather.innerHTML=`<h2 class="display-5 fw-bold">${currentData.name} (${moment(currentData.dt,"X").format("DD/MM/YYYY")})</h2>
            <img src=" http://openweathermap.org/img/wn/04d@2x.png" alt="">
            <h3>Temp: ${currentData.main.temp}</h3>
            <h3>Wind: ${currentData.wind.speed}</h3>
            <h3>Humidity: ${currentData.main.humidity}</h3>
            <h3 class="bg-success w-10"> UV index: ${fiveDayData.current.uvi}</h3>`
            console.log(fiveDayData)

            forecast.innerHTML=`<div class="col-sm-2">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${moment(fiveDayData.daily[1].dt,"X").format("DD/MM/YYYY")}</h5>
                <img src="http://openweathermap.org/img/wn/${fiveDayData.daily[1].weather[0].icon}@2x.png" alt="">
                <p class="card-text"> Temp: ${fiveDayData.daily[1].temp.day}</p>
                <p> Wind: ${fiveDayData.daily[1].wind_speed}</p>
                <p>Humidity: ${fiveDayData.daily[1].humidity}</p>
                
              </div>
            </div>
          </div>
          <div class="col-sm-2">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${moment(fiveDayData.daily[2].dt,"X").format("DD/MM/YYYY")}</h5>
                <img src=" http://openweathermap.org/img/wn/${fiveDayData.daily[2].weather[0].icon}@2x.png" alt="">
                <p class="card-text"> Temp: ${fiveDayData.daily[2].temp.day}  F</p>
                <p> Wind: ${fiveDayData.daily[2].wind_speed}</p>
                <p>Humidity: ${fiveDayData.daily[2].humidity}</p>
                
              </div>
            </div>
          </div>
          <div class="col-sm-2">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${moment(fiveDayData.daily[3].dt,"X").format("DD/MM/YYYY")}</h5>
                  <img src=" http://openweathermap.org/img/wn/${fiveDayData.daily[3].weather[0].icon}@2x.png" alt="">
                  <p class="card-text"> Temp: ${fiveDayData.daily[3].temp.day}</p>
                  <p> Wind: ${fiveDayData.daily[3].wind_speed}</p>
                  <p>Humidity: ${fiveDayData.daily[3].humidity}</p>
                  
                </div>
              </div>
            </div>
            <div class="col-sm-2">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${moment(fiveDayData.daily[4].dt,"X").format("DD/MM/YYYY")}</h5>
                  <img src=" http://openweathermap.org/img/wn/${fiveDayData.daily[4].weather[0].icon}@2x.png" alt="">
                  <p class="card-text">temp: ${fiveDayData.daily[4].temp.day}</p> 
                  <p> wind: ${fiveDayData.daily[4].wind_speed} </p>
                  <p>Humidity: ${fiveDayData.daily[4].humidity} </p>
                  
                  
                </div>
              </div>
            </div>
            <div class="col-sm-2">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${moment(fiveDayData.daily[5].dt,"X").format("DD/MM/YYYY")}</h5>
                  <img src=" http://openweathermap.org/img/wn/${fiveDayData.daily[5].weather[0].icon}@2x.png" alt="">
                  <p class="card-text">Temp: ${fiveDayData.daily[5].temp.day}</p>
                  <p> Wind: ${fiveDayData.daily[5].wind_speed}mph</p>
                  <p>Humidity: ${fiveDayData.daily[5].humidity}</p>
                  
                </div>
              </div>
            </div>`
        })
    })
})