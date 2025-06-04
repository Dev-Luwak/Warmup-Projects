# Weather Finder App

This project is a simple web application that demonstrates how to use APIs in JavaScript to fetch and display real-time weather data for cities around the world.

## How the Code Works

### City Suggestions Dropdown

- As you type in the input box, the code filters a list of cities and shows matching suggestions in a dropdown.
- Clicking a suggestion fills the input box and hides the dropdown.

### Fetching Weather Data (API Integration)

- When you click the **"Get Weather"** button:
  - The code first uses the [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) to convert the city name into latitude and longitude.
  - If the city is found, it then uses the [Open-Meteo Weather API](https://open-meteo.com/en/docs) to fetch the current weather for those coordinates.
  - The weather data (temperature, wind speed, etc.) is displayed in a styled section on the page.
  - If the city is not found or there’s an error, an appropriate message is shown.

## How API Functionality is Integrated

- **API Calls:**  
  The code uses JavaScript’s `fetch()` function to make HTTP requests to external APIs.

- **Asynchronous Handling:**  
  The `async/await` syntax is used to handle these requests without blocking the UI.

- **Data Handling:**  
  The responses from the APIs are parsed as JSON, and relevant data is extracted and displayed to the user.

---

**In summary:**  
The JavaScript code connects your UI to real-world data by making API requests, processing the results, and updating the webpage dynamically.