// Dummy list of cities for suggestions (replace with API later)
const cities = [
    "London", "New York", "Paris", "Tokyo", "Sydney",
    "Mumbai", "Beijing", "Moscow", "Cairo", "Rio de Janeiro"
];

const cityInput = document.getElementById('city-input');
const suggestions = document.getElementById('suggestions');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherResult = document.getElementById('weather-result');

cityInput.addEventListener('input', function() {
    const value = this.value.toLowerCase();
    suggestions.innerHTML = '';
    if (value) {
        const filtered = cities.filter(city => city.toLowerCase().startsWith(value));
        if (filtered.length > 0) {
            suggestions.style.display = 'block';
            filtered.forEach(city => {
                const li = document.createElement('li');
                li.textContent = city;
                li.addEventListener('click', function() {
                    cityInput.value = city;
                    suggestions.innerHTML = '';
                    suggestions.style.display = 'none';
                });
                suggestions.appendChild(li);
            });
        } else {
            suggestions.style.display = 'none';
        }
    } else {
        suggestions.style.display = 'none';
    }
});

cityInput.addEventListener('focus', function() {
    if (suggestions.children.length > 0) {
        suggestions.style.display = 'block';
    }
});

document.addEventListener('click', function(e) {
    if (e.target !== cityInput && e.target.parentNode !== suggestions) {
        suggestions.innerHTML = '';
        suggestions.style.display = 'none';
    }
});

// ...existing code...

getWeatherBtn.addEventListener('click', async function() {
    const city = cityInput.value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    weatherResult.innerHTML = "Loading...";
    weatherResult.classList.remove('hidden');

    try {
        // 1. Get coordinates for the city
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
        const geoData = await geoRes.json();
        if (!geoData.results || geoData.results.length === 0) {
            weatherResult.innerHTML = `<div class="weather-detail">City not found.</div>`;
            return;
        }
        const { latitude, longitude, name, country } = geoData.results[0];

        // 2. Get weather for those coordinates
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherRes.json();
        const weather = weatherData.current_weather;

        weatherResult.innerHTML = `
            <div class="weather-detail"><span>City:</span><span>${name}, ${country}</span></div>
            <div class="weather-detail"><span>Temperature:</span><span>${weather.temperature} °C</span></div>
            <div class="weather-detail"><span>Wind Speed:</span><span>${weather.windspeed} km/h</span></div>
            <div class="weather-detail"><span>Weather Code:</span><span>${weather.weathercode}</span></div>
        `;
    } catch (err) {
        weatherResult.innerHTML = `<div class="weather-detail">Error fetching weather data.</div>`;
    }
});
// ...existing code...