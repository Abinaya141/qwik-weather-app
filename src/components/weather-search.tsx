import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import * as v from 'valibot';
import { safeParse } from 'valibot';

// Schema definition
export const WeatherSearchSchema = v.object({
    city: v.pipe(
        v.string('City name is required'),
        v.trim(),
        v.minLength(2, 'Please enter at least 2 characters'),
        v.maxLength(100, 'City name should not exceed 100 characters'),
        v.regex(/^[a-zA-Z\s\-']+$/, 'Invalid city name — only letters, spaces and hyphens are allowed')
    ),
});

export const WeatherSearch = component$(() => {
    const city = useSignal('');
    const weather = useSignal<any>(null);
    const loading = useSignal(false);
    const error = useSignal('');
    const now = useSignal(new Date());

    useVisibleTask$(() => {
        const interval = setInterval(() => (now.value = new Date()), 1000);
        return () => clearInterval(interval);
    });

    const fetchWeather = $(async () => {
        const result = safeParse(WeatherSearchSchema, { city: city.value });

        if (!result.success) {
            error.value = result.issues[0]?.message || 'Validation error';
            return;
        }

        loading.value = true;
        error.value = '';
        weather.value = null;

        try {
            const apiKey = import.meta.env.PUBLIC_WEATHER_API;
            const res = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city.value}&days=3&aqi=no&alerts=no`
            );
            if (!res.ok) throw new Error('City not found');
            weather.value = await res.json();
        } catch (err: any) {
            error.value = err.message || 'Error fetching data';
        } finally {
            loading.value = false;
        }
    });

    return (
        <div class="w-full lg:w-1/2 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto">
            {/* Top Right Logos */}
            <div class="flex justify-end gap-2">
                <a href="https://qwik.builder.io" target="_blank">
                    <img src="/logo/qwik-logo.png" alt="Qwik" class="h-12" />
                </a>
                <a href="https://tailwindcss.com" target="_blank">
                    <img src="/logo/tailwindcss-logo.png" alt="Tailwind CSS" class="h-8 mt-1" />
                </a>
                <a href="https://www.weatherapi.com" target="_blank">
                    <img src="/logo/weatherapi-logo.jpeg" alt="WeatherAPI" class="h-10" />
                </a>
            </div>

            <div class="max-w-3xl mx-auto space-y-8">
                {/* Title */}
                <div class="space-y-2 mt-6 text-center">
                    <h1 class="text-4xl md:text-5xl font-bold">Qwik Weather App</h1>
                    <p class="text-gray-600 text-base">
                        Built using demo technologies including{' '}
                        <a href="https://qwik.builder.io" target="_blank" class="underline">Qwik</a>,{' '}
                        <a href="https://tailwindcss.com" target="_blank" class="underline">Tailwind CSS</a>, and{' '}
                        <a href="https://www.weatherapi.com" target="_blank" class="underline">WeatherAPI</a>.
                    </p>
                    <p class="text-gray-700 text-base font-medium">
                        {now.value.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </p>
                </div>

                {/* Search Form */}
                <form preventdefault:submit onSubmit$={fetchWeather} class="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Enter city"
                        class="w-full px-6 py-3 border border-gray-400 rounded text-lg"
                        bind:value={city}
                    />
                    <button
                        type="submit"
                        class="bg-black text-white px-6 py-4 text-lg hover:bg-gray-800 rounded"
                    >
                        Search
                    </button>
                </form>

                {/* Feedback */}
                {loading.value && <p class="text-center text-gray-600">Loading...</p>}
                {error.value && <p class="text-center text-red-600">{error.value}</p>}

                {/* Weather Output */}
                {weather.value && (
                    <div class="space-y-6 text-center">
                        <div class="space-y-4">
                            <h2 class="text-3xl font-bold text-gray-800">
                                {weather.value.location.name}, {weather.value.location.country}
                            </h2>
                            <img
                                src={weather.value.current.condition.icon}
                                alt="Weather icon"
                                class="mx-auto w-28 h-28 md:w-32 md:h-32"
                            />
                            <p class="text-5xl font-extrabold text-gray-900">
                                {weather.value.current.temp_c}°C
                            </p>
                            <p class="text-xl text-gray-700 font-medium">
                                {weather.value.current.condition.text}
                            </p>
                            <div class="flex justify-center gap-8 text-lg text-gray-600 font-medium">
                                <div>💧 {weather.value.current.humidity}%</div>
                                <div>🌬 {weather.value.current.wind_kph} kph</div>
                            </div>
                        </div>

                        {/* 3-Day Forecast */}
                        <div class="space-y-3">
                            <h3 class="text-xl font-semibold">3-Day Forecast</h3>
                            {weather.value.forecast.forecastday.map((day: any) => (
                                <div
                                    key={day.date}
                                    class="flex justify-between items-center border border-gray-300 p-3 rounded"
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
                                    />
                                    <div class="w-1/4 text-center">{day.day.avgtemp_c}°C</div>
                                    <div class="w-1/3 text-right text-sm">{day.day.condition.text}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});
