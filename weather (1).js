const cities = ["Delhi","Varanasi","Mumbai"]

const container = document.getElementById("weather-container")
const loader = document.getElementById("loader")
const errorBox = document.getElementById("error")


function weatherEmoji(code){

    if(code === 0) return "☀️"
    if(code <= 3) return "⛅"
    if(code <= 48) return "☁️"
    if(code <= 67) return "🌧"
    if(code <= 77) return "❄️"
    if(code <= 99) return "⛈"

    return "🌡"
}


async function getCoordinates(city){

    const geoUrl =
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`

    const response = await fetch(geoUrl)
    const data = await response.json()

    if(!data.results) throw new Error("City not found")

    return {
        city: city,
        lat: data.results[0].latitude,
        lon: data.results[0].longitude
    }
}


async function getWeather(city){

    const location = await getCoordinates(city)

    const weatherUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`

    const res = await fetch(weatherUrl)
    const data = await res.json()

    return {
        city: location.city,
        temperature: data.current_weather.temperature,
        code: data.current_weather.weathercode
    }
}


function createCard(weather){

    const card = document.createElement("div")
    card.className = "card"

    card.innerHTML = `
        <div class="city">${weather.city}</div>
        <div class="emoji">${weatherEmoji(weather.code)}</div>
        <div class="temp">${weather.temperature}°C</div>
    `

    container.appendChild(card)
}


async function loadWeather(){

    try{

        loader.style.display = "block"

        const promises = cities.map(city => getWeather(city))

        const results = await Promise.all(promises)

        loader.style.display = "none"

        results.forEach(createCard)

    }
    catch(err){

        loader.style.display = "none"
        errorBox.textContent = "⚠️ Failed to load weather data"

    }

}

loadWeather()