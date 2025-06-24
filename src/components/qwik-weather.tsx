import { component$ } from '@builder.io/qwik';
import { WeatherSearch } from './weather-search';
import { ApiDocumentation } from './Api-documentation';

export const QwikWeather = component$(() => {
    return (
        <div class="min-h-screen flex flex-col lg:flex-row bg-white text-gray-900 font-sans">
            <WeatherSearch />
            <ApiDocumentation />
        </div>
    );
});
