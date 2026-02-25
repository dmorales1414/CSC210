const apiKey = 'c18c6b7175445d12de60c37e89b320b3';

function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) return alert("Please enter a city");

    localStorage.setItem("lastCity", city); // Extra

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(response => {
        if (!response.ok) throw new Error("City Not Found");
        return response.json();
    })
    .then(data => {
        console.log(data);

        const weatherDiv = document.getElementById('weatherResult');
        const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        
        document.getElementById("cityTitle").textContent = `Today's Weather In ${data.name}`;
        
        weatherDiv.innerHTML = `
        <div class="forecast-day">
            <img src="${icon}" alt="weather_icon"></img>
            <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp} °F</p>
            <a href="forecast.html">See 5-Day Forecast</a>
        </div>
        `;
    })
    .catch(error => {
        alert("Error: " + error.message);
        console.error(error);
    });
}

// Load The City
window.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("cityInput");
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
        cityInput.value = lastCity;
        getWeather();
    }

    // Allow pressing Enter to submit
    cityInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            getWeather();
        }
    });
});
