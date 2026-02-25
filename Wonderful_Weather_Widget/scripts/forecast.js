const apiKey = 'c18c6b7175445d12de60c37e89b320b3';

function getForecast() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) return alert("Please enter a city");

    localStorage.setItem("lastCity", city);

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
    .then(response => {
        if (!response.ok) throw new Error("City Not Found");
        return response.json();
    })
    .then(data => {
        console.log(data);

        const forecastTitle = document.getElementById('forecastTitle');
        forecastTitle.textContent = city.toUpperCase();

        const forecastDiv = document.getElementById('forecastResult');
        forecastDiv.innerHTML = '';

        const filtered = data.list.filter(item => item.dt_txt.includes("12:00:00"));

        // Limits to 5 days for a forecast
        filtered.slice(0,5).forEach(day => {
            const weekday = new Date(day.dt_txt).toLocaleDateString("en-US", {weekday: "short"});
            const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

            const forecastHTML = `
                <div class="forecast-day">
                    <h3>${weekday}</h3>
                    <img src="${icon}" alt="${day.weather[0].description}">
                    <p>${day.weather[0].main}</p>
                    <p>${Math.round(day.main.temp)} °F</p>
                </div>
            `;
            forecastDiv.innerHTML += forecastHTML;
        });
    })
    .catch(error => {
        alert("Error fetching forecast: " + error.message);
        console.error(error);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("cityInput");
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
        cityInput.value = lastCity;
        getForecast();
    }

    cityInput.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            getForecast();
        }
    });
});