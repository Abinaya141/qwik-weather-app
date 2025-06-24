import { component$ } from '@builder.io/qwik';

export const ApiDocumentation = component$(() => {
    return (
        <div class="w-full lg:w-1/2 p-6 md:p-8 overflow-y-auto space-y-8 bg-gray-50 border-t lg:border-t-0 border-gray-200">
            <h2 class="text-3xl md:text-4xl font-bold border-b pb-4 text-gray-800">Qwik Weather API</h2>

            {/* Introduction Section */}
            <section class="space-y-3 text-base text-gray-700 leading-relaxed">
                <p>
                    This application utilizes a modern frontend stack built with{' '}
                    <a
                        href="https://qwik.builder.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="underline font-semibold text-gray-800 hover:text-gray-900 transition-colors duration-200"
                    >
                        Qwik
                    </a>{' '}
                    for lightning-fast interactivity, styled using{' '}
                    <a
                        href="https://tailwindcss.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="underline font-semibold text-gray-800 hover:text-gray-900 transition-colors duration-200"
                    >
                        Tailwind CSS
                    </a>, and validated with{' '}
                    <a
                        href="https://valibot.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="underline font-semibold text-gray-800 hover:text-gray-900 transition-colors duration-200"
                    >
                        Valibot
                    </a>. Weather data is fetched in real-time from the reliable{' '}
                    <a
                        href="https://www.weatherapi.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="underline font-semibold text-gray-800 hover:text-gray-900 transition-colors duration-200"
                    >
                        WeatherAPI
                    </a>.
                </p>
            </section>

            {/* Endpoint Overview */}
            <section>
                <h3 class="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">Endpoint Overview</h3>
                <div class="bg-white border border-gray-200 rounded-lg p-4 text-base text-gray-700">
                    <p><code>GET https://api.weatherapi.com/v1/forecast.json</code></p>
                    <p class="mt-2">
                        Query Parameters:{' '}
                        <code class="bg-gray-100 p-1 rounded">?key=YOUR_API_KEY&q=City&days=3</code>
                    </p>
                </div>
            </section>

            {/* Key Parameters */}
            <section>
                <h3 class="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">Query Parameters</h3>
                <ul class="list-disc pl-6 text-base text-gray-700 space-y-2">
                    <li><code>key</code>: Your personal API key from WeatherAPI.</li>
                    <li><code>q</code>: Location to search (city name, ZIP code, IP address, or lat/lon).</li>
                    <li><code>days</code>: Number of forecast days (up to 3 for free plan).</li>
                </ul>
            </section>

            {/* Rate Limits */}
            <section>
                <h3 class="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">Rate Limits</h3>
                <ul class="list-disc pl-6 text-base text-gray-700 space-y-2">
                    <li><strong>Free Tier:</strong> 1,000,000 requests/month</li>
                    <li><strong>Max Throughput:</strong> 20 requests/sec</li>
                    <li><strong>Format:</strong> JSON only</li>
                    <li><strong>Additional Features:</strong> Air Quality Index, Alerts (available in paid plans)</li>
                </ul>
            </section>

            {/* Sample Request */}
            <section>
                <h3 class="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">Sample API Request</h3>
                <pre class="bg-gray-100 p-4 mb-4 text-sm border border-gray-200 rounded-lg overflow-x-auto text-gray-800">
                    {`GET https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=London&days=3`}
                </pre>
            </section>

            {/* Sample Response */}
            <section>
                <h3 class="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">Sample API Response</h3>
                <pre class="bg-gray-100 p-4 text-sm border border-gray-200 rounded-lg overflow-x-auto text-gray-800">
                    {`{
  "location": {
    "name": "London",
    "country": "United Kingdom",
    "localtime": "2025-06-21 14:00"
  },
  "current": {
    "temp_c": 22.4,
    "condition": {
      "text": "Cloudy",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/119.png"
    },
    "humidity": 65,
    "wind_kph": 10.2
  }
}`}
                </pre>
            </section>

            {/* Footer */}
            <footer class="text-sm text-gray-500 border-t pt-5 mt-8 text-center space-y-2">
                <p>
                    Built with{' '}
                    <a href="https://qwik.builder.io" target="_blank" class="underline font-semibold">Qwik</a>,{' '}
                    <a href="https://tailwindcss.com" target="_blank" class="underline font-semibold">Tailwind CSS</a>, and{' '}
                    <a href="https://valibot.dev" target="_blank" class="underline font-semibold">Valibot</a>. Powered by the{' '}
                    <a href="https://www.weatherapi.com/" target="_blank" class="underline font-semibold">WeatherAPI</a>.
                </p>
                <p>
                    Developed by{' '}
                    <a href="https://github.com/Abinaya141" target="_blank" class="underline font-semibold">
                        Abinaya ↗
                    </a>
                </p>
            </footer>
        </div>
    );
});
