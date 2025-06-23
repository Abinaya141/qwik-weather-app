import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import { safeParse } from 'valibot';

// Import schema for validating city input
import { WeatherSearchSchema } from '~/routes/validation';

export const Weather = component$(() => {
    // Signals to manage city input, fetched data, loading, errors, and time
    const city = useSignal('');
    const weather = useSignal<any>(null);
    const loading = useSignal(false);
    const error = useSignal('');
    const now = useSignal(new Date());

    // Realtime clock updater using useVisibleTask$
    useVisibleTask$(() => {
        const interval = setInterval(() => {
            now.value = new Date();
        }, 1000);
        return () => clearInterval(interval);
    });

    // Weather data fetcher with validation
    const fetchWeather = $(async () => {
        // Validate city input using valibot
        const result = safeParse(WeatherSearchSchema, { city: city.value });

        if (!result.success) {
            error.value = result.issues[0]?.message || 'Validation error';
            return;
        }

        loading.value = true;
        error.value = '';
        weather.value = null;

        try {
            // Make API request to WeatherAPI
            const apiKey = import.meta.env.PUBLIC_WEATHER_API;
            const res = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city.value}&days=3&aqi=no&alerts=no`
            );
            if (!res.ok) throw new Error('City not found');
            const data = await res.json();
            weather.value = data;
        } catch (err: any) {
            error.value = err.message || 'Error fetching data';
        } finally {
            loading.value = false;
        }
    });

    return (
        // Split layout: Weather App (left) | Documentation (right)
        <div class="min-h-screen flex flex-col md:flex-row bg-white text-black">

            {/* LEFT: Weather App Section */}
            <div class="w-full md:w-1/2 p-8 border-r border-gray-200 overflow-y-auto flex flex-col items-center justify-start">
                <div class="w-full max-w-xl space-y-8">

                    {/* App Title & Description */}
                    <div class="text-center space-y-2">
                        <h1 class="text-5xl font-bold tracking-tight">Qwik Weather App</h1>
                        <p class="text-lg text-gray-600">Live forecasts for your favorite cities.</p>
                    </div>

                    {/* Current Date Display */}
                    <div class="text-center text-base text-gray-700 font-medium">
                        {now.value.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </div>

                    {/* City Search Form with Enter/Submit Support */}
                    <form preventdefault:submit onSubmit$={fetchWeather} class="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Enter city"
                            class="flex-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none text-base"
                            bind:value={city}
                        />
                        <button
                            type="submit"
                            class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 text-base"
                        >
                            Search
                        </button>
                    </form>

                    {/* Show loading or error messages */}
                    {loading.value && <p class="text-center text-gray-600">Loading...</p>}
                    {error.value && <p class="text-center text-red-600">{error.value}</p>}

                    {/* Weather Output Display */}
                    {weather.value && (
                        <div class="space-y-6">
                            <div class="text-center space-y-4">
                                <h2 class="text-3xl md:text-4xl font-bold text-gray-800">
                                    {weather.value.location.name}, {weather.value.location.country}
                                </h2>
                                <img
                                    src={weather.value.current.condition.icon}
                                    alt="Weather icon"
                                    class="mx-auto w-28 h-28 md:w-32 md:h-32"
                                    width="128"
                                    height="128"
                                />
                                <p class="text-5xl md:text-6xl font-extrabold text-gray-900">
                                    {weather.value.current.temp_c}°C
                                </p>
                                <p class="text-xl md:text-2xl text-gray-700 font-medium">
                                    {weather.value.current.condition.text}
                                </p>
                                <div class="flex justify-center gap-8 text-lg font-medium text-gray-600 mt-2">
                                    <div>💧 Humidity: {weather.value.current.humidity}%</div>
                                    <div>🌬 Wind: {weather.value.current.wind_kph} kph</div>
                                </div>
                            </div>

                            {/* 3-Day Forecast Display */}
                            <div>
                                <h3 class="text-xl font-semibold text-center mb-3">3-Day Forecast</h3>
                                <div class="space-y-3">
                                    {weather.value?.forecast?.forecastday?.map((day: any) => (
                                        <div
                                            key={day.date}
                                            class="flex justify-between items-center border border-gray-300 p-3 rounded-md"
                                        >
                                            <div class="w-1/4 font-medium">
                                                {new Date(day.date).toLocaleDateString('en-US', {
                                                    weekday: 'short',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </div>
                                            <img
                                                src={day.day.condition.icon}
                                                alt={day.day.condition.text}
                                                class="w-12 h-12"
                                                width="48"
                                                height="48"
                                            />
                                            <div class="w-1/4 text-center">{day.day.avgtemp_c}°C</div>
                                            <div class="w-1/3 text-right text-sm">{day.day.condition.text}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT: Weather API Documentation */}
            <div class="w-full md:w-1/2 p-8 overflow-y-auto space-y-8">
                <h2 class="text-3xl font-bold border-b pb-3">WeatherAPI Integration</h2>

                {/* API Overview Section */}
                <section class="space-y-4 text-base leading-relaxed">
                    <p>
                        This app fetches real-time weather and forecasts using
                        <a
                            href="https://www.weatherapi.com/"
                            target="_blank"
                            class="underline font-semibold ml-1"
                        >
                            WeatherAPI
                        </a>.
                    </p>
                </section>

                {/* API Endpoints Section */}
                <section class="space-y-3 text-base">
                    <h3 class="text-xl font-semibold border-b pb-1">API Endpoint Overview</h3>
                    <ul class="list-disc pl-6">
                        <li>
                            Base URL:
                            <code class="bg-gray-100 px-1 py-0.5 rounded">
                                https://api.weatherapi.com/v1/
                            </code>
                        </li>
                        <li>
                            Endpoint:
                            <code class="bg-gray-100 px-1 py-0.5 rounded">forecast.json</code>
                        </li>
                        <li>
                            Query:
                            <code class="bg-gray-100 px-1 py-0.5 rounded">?key=YOUR_KEY&q=City&days=3</code>
                        </li>
                    </ul>
                </section>

                {/* API Parameters Section */}
                <section class="space-y-3 text-base">
                    <h3 class="text-xl font-semibold border-b pb-1">Query Parameters</h3>
                    <ul class="list-disc pl-6">
                        <li><code>key</code>: Your API key</li>
                        <li><code>q</code>: City name, ZIP, IP, or coordinates</li>
                        <li><code>days</code>: Up to 3 (on free plan)</li>
                    </ul>
                </section>

                {/* API Limitations and Plans Section */}
                <section class="space-y-3 text-base">
                    <h3 class="text-xl font-semibold border-b pb-1">Rate Limits & Features</h3>
                    <ul class="list-disc pl-6">
                        <li>Free: 1M requests/month</li>
                        <li>Max: 20 req/sec</li>
                        <li>JSON only</li>
                        <li>Air quality & alerts (paid)</li>
                    </ul>
                </section>

                {/* Sample JSON Response */}
                <section class="space-y-3 text-base">
                    <h3 class="text-xl font-semibold border-b pb-1">Example API Response</h3>
                    <pre class="bg-gray-100 p-4 text-sm border rounded overflow-x-auto">
                        {`{
                               "location": {
                                              "name": "Lagos",
                                              "country": "Nigeria",
                                              "localtime": "2025-06-21 14:00"
                                            },
                                "current": {
                                              "temp_c": 31.2,
                                              "condition": {
                                              "text": "Partly cloudy",
                                              "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png"
                                            },
                                                "humidity": 70,
                                                "wind_kph": 15.8
                                     }
                         }`}
                    </pre>
                </section>

                {/* Footer Note */}
                <footer class="text-sm text-gray-500 border-t pt-4">
                    Built using Qwik + WeatherAPI.
                </footer>
            </div>
        </div>
    );
});
