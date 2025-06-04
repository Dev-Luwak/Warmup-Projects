// Dummy list of cities for suggestions (replace with API later)
const cities = [
    "London", "New York", "Paris", "Tokyo", "Sydney",
    "Mumbai", "Beijing", "Moscow", "Cairo", "Rio de Janeiro"
];

const cityInput = document.getElementById('city-input');
const suggestions = document.getElementById('suggestions');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherResult = document.getElementById('weather-result');

// ...existing code...

let selectedSuggestionIndex = -1;

cityInput.addEventListener('input', function() {
    const value = this.value.toLowerCase();
    suggestions.innerHTML = '';
    selectedSuggestionIndex = -1;
    if (value) {
        const filtered = cities.filter(city => city.toLowerCase().startsWith(value));
        if (filtered.length > 0) {
            suggestions.style.display = 'block';
            filtered.forEach((city, idx) => {
                const li = document.createElement('li');
                li.textContent = city;
                li.tabIndex = 0;
                li.addEventListener('click', function() {
                    cityInput.value = city;
                    suggestions.innerHTML = '';
                    suggestions.style.display = 'none';
                    selectedSuggestionIndex = -1;
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

cityInput.addEventListener('keydown', function(e) {
    const items = suggestions.querySelectorAll('li');
    if (suggestions.style.display === 'block' && items.length > 0) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedSuggestionIndex = (selectedSuggestionIndex + 1) % items.length;
            updateSuggestionHighlight(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedSuggestionIndex = (selectedSuggestionIndex - 1 + items.length) % items.length;
            updateSuggestionHighlight(items);
        } else if (e.key === 'Enter') {
            if (selectedSuggestionIndex >= 0) {
                e.preventDefault();
                cityInput.value = items[selectedSuggestionIndex].textContent;
                suggestions.innerHTML = '';
                suggestions.style.display = 'none';
                selectedSuggestionIndex = -1;
            }
            getWeatherBtn.click();
        }
    } else if (e.key === 'Enter') {
        getWeatherBtn.click();
    }
});

function updateSuggestionHighlight(items) {
    items.forEach((item, idx) => {
        if (idx === selectedSuggestionIndex) {
            item.classList.add('highlighted');
        } else {
            item.classList.remove('highlighted');
        }
    });
}


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