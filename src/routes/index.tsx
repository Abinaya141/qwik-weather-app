import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// components
import { Weather } from "~/components/weather-app";

export default component$(() => {
	return (
		<div>
			<Weather />
		</div>
	);
});

export const head: DocumentHead = {
	title: 'Qwik Weather App',
};