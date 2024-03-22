document.querySelector('.search-btn').addEventListener('click', async (e) => {
    e.preventDefault();
    const inputVal = document.querySelector('.city-input').value;
    const apiKey = '13c74f044d797f03f3846930bbb6f9df';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 404) {
            throw new Error('City not found');
        }

        const cityName = document.querySelector('.city h2');
        cityName.textContent = data.name;

        const date = document.querySelector('.city p b');
        date.textContent = new Date().toLocaleDateString();

        const desc = document.querySelector('.desc .desctext');
        desc.textContent = data.weather[0].description;

        const temp = document.querySelector('.temp');
        temp.textContent = `${Math.round(data.main.temp)}°C`;

        const windSpeed = document.querySelector('.windinfo .speed');
        windSpeed.textContent = `${data.wind.speed} km/h`;

        const humidity = document.querySelector('.humidityinfo .humidity');
        humidity.textContent = `${data.main.humidity}%`;

        const visibility = document.querySelector('.visibilityinfo .visibility');
        const formattedVisibility = (data.visibility / 1000).toFixed(1);
        visibility.textContent = `${formattedVisibility} km`;
    } catch (error) {
        console.error(error);
        alert('Error fetching weather data');
    }
});