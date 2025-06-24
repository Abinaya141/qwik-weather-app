import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// components
import { QwikWeather } from "~/components/qwik-weather";

export default component$(() => {
	return (
		<div>
			<QwikWeather />
		</div>
	);
});

export const head: DocumentHead = {
	title: 'Qwik Weather App',
};