<template>
	<div class="container mx-auto p-8">
		<h1 class="text-3xl font-bold mb-8">Tailwind Renk Testi</h1>

		<div>
			<h1>Counter: {{ counter || '-' }}</h1>
			<button @click="counter = null">reset</button>
			<button @click="counter--">-</button>
			<button @click="counter++">+</button>
		</div>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
			<!-- Red Colors -->
			<div class="space-y-2">
				<h3 class="font-semibold">Red</h3>
				<div class="bg-red-500 text-white p-4 rounded">bg-red-500</div>
				<div class="bg-red-600 text-white p-4 rounded">bg-red-600</div>
				<div class="bg-red-700 text-white p-4 rounded">bg-red-700</div>
				<div class="bg-red-800 text-white p-4 rounded">bg-red-800</div>
				<div class="bg-red-900 text-white p-4 rounded">bg-red-900</div>
			</div>

			<!-- Blue Colors -->
			<div class="space-y-2">
				<h3 class="font-semibold">Blue</h3>
				<div class="bg-blue-500 text-white p-4 rounded">bg-blue-500</div>
				<div class="bg-blue-600 text-white p-4 rounded">bg-blue-600</div>
				<div class="bg-blue-700 text-white p-4 rounded">bg-blue-700</div>
				<div class="bg-blue-800 text-white p-4 rounded">bg-blue-800</div>
				<div class="bg-blue-900 text-white p-4 rounded">bg-blue-900</div>
			</div>

			<!-- Green Colors -->
			<div class="space-y-2">
				<h3 class="font-semibold">Green</h3>
				<div class="bg-deneme-500 text-white p-4 rounded">bg-deneme-500</div>
				<div class="bg-green-600 text-white p-4 rounded">bg-green-600</div>
				<div class="bg-green-700 text-white p-4 rounded">bg-green-700</div>
				<div class="bg-green-900 text-white p-4 rounded">bg-green-900</div>
				<div class="bg-deneme-900 text-white p-4 rounded">bg-deneme-900</div>
			</div>

			<!-- Primary Colors -->
			<div class="space-y-2">
				<h3 class="font-semibold">Primary</h3>
				<div class="bg-primary/75 text-white p-4 rounded">bg-primary/75</div>
				<div class="bg-primary-600 text-white p-4 rounded">bg-primary-600</div>
				<div class="bg-primary-700 text-white p-4 rounded">bg-primary-700</div>
				<div class="bg-primary-800 text-white p-4 rounded">bg-primary-800</div>
				<div class="bg-primary-900 text-white p-4 rounded">bg-primary-900</div>
			</div>

			<!-- Purple Colors -->
			<div class="space-y-2">
				<h3 class="font-semibold">Purple</h3>
				<div class="bg-purple-500 text-white p-4 rounded">bg-purple-500</div>
				<div class="bg-purple-600 text-white p-4 rounded">bg-purple-600</div>
				<div class="bg-purple-700 text-white p-4 rounded">bg-purple-700</div>
				<div class="bg-purple-800 text-white p-4 rounded">bg-purple-800</div>
				<div class="bg-purple-900 text-white p-4 rounded">bg-purple-900</div>
			</div>
			<div class="space-y-2">
				<div class="border border-default">Default</div>
				<div class="border border-muted">Muted</div>
				<div class="border border-accented">Accented</div>
				<div class="border border-inverted">Inverted</div>
				<div class="bg-gray-500 rounded-xs">xs</div>
				<div class="bg-gray-500 rounded-sm">sm</div>
				<div class="bg-gray-500 rounded-md">md</div>
				<div class="bg-gray-500 rounded-lg">lg</div>
				<div class="bg-gray-500 rounded-xl">xl</div>
				<div class="bg-gray-500 rounded-2xl">2xl</div>
				<div class="bg-gray-500 rounded-3xl">3xl</div>
			</div>
		</div>

		<!-- Essential colors test -->
		<div class="space-y-4">
			<h2 class="text-2xl font-bold mb-6">Essential Colors Test</h2>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				<div class="bg-white text-black p-6 rounded-lg border border-gray-300">
					<code>bg-white</code>
					- White Background
				</div>
				<div class="bg-black text-white p-6 rounded-lg">
					<code>bg-black</code>
					- Black Background
				</div>
				<div class="bg-gray-500 text-white p-6 rounded-lg">
					<code>bg-gray-500</code>
					- Gray Background
				</div>
			</div>
		</div>

		<!-- Test the specific classes mentioned -->
		<div class="space-y-4">
			<h2 class="text-2xl font-bold">Özel Test Sınıfları</h2>
			<div class="flex gap-4">
				<div class="bg-red-500 text-white p-6 rounded-lg">
					<code>bg-red-500</code>
					- Artık çalışıyor! ✅
				</div>
				<div class="bg-blue-900 text-white p-6 rounded-lg">
					<code>bg-blue-900</code>
					- Artık çalışıyor! ✅
				</div>
			</div>
		</div>

		<!-- Existing custom colors still work -->
		<div class="mt-8 space-y-4">
			<h2 class="text-2xl font-bold">Özel Renk Sistemi (Hala Çalışıyor)</h2>
			<div class="flex gap-4">
				<div class="bg-primary-400 text-white p-6 rounded-lg">
					<code>bg-primary-400</code>
					- Primary 400
				</div>
				<div class="w-24 h-24 bg-primary"></div>
				<UButton>LOREM</UButton>

				<span class="text-dimmed">Dimmed</span>
				<span class="text-muted">Muted</span>
				<span class="text-toned">Toned</span>
				<span class="text-default">Text</span>
				<span class="text-highlighted">Highlighted</span>
				<span class="text-inverted bg-inverted">Inverted</span>

				<div class="bg-primary-500 text-white p-6 rounded-lg">
					<code>bg-primary-500</code>
					- Violet
				</div>
				<div class="bg-success-500 text-white p-6 rounded-lg">
					<code>bg-success-500</code>
					- Success
				</div>
				<div class="bg-warning-500 text-white p-6 rounded-lg">
					<code>bg-warning-500</code>
					- Warning
				</div>
				<div class="bg-danger-500 text-white p-6 rounded-lg">
					<code>bg-danger-500</code>
					- Danger
				</div>
				<div class="bg-deneme-500 text-white p-6 rounded-lg">
					<code>bg-deneme-500</code>
					- Deneme 500
				</div>
				<div class="bg-deneme-400 text-white p-6 rounded-lg">
					<code>bg-deneme-400</code>
					- Deneme 400
				</div>
			</div>
		</div>

		<pre>{{ posts }}</pre>

		<div class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
		</div>
		<div class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
		</div>

		<div class="!text-xl sm:!text-2xl md:!text-3xl lg:!text-4xl xl:!text-5xl">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
		</div>
		<div class="!text-6xl sm:!text-7xl md:!text-8xl lg:!text-9xl xl:!text-10xl">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
		</div>
	</div>
</template>

<script setup>
// Test page for Tailwind colors
definePageMeta({
	title: 'Tailwind Renk Testi',
});

const appConfig = useAppConfig();

const open = ref(true);
const page = ref(() => Math.random() * 10);
const counter = useCookie('counter');

counter.value = counter.value || Math.round(Math.random() * 1000);
const { data: posts } = await useAsyncData('posts', () =>
	$fetch('https://jsonplaceholder.typicode.com/posts/', {
		params: {
			page: page.value,
		},
	}),
);

const error = useError();

if (error.value) {
	console.error('Nuxt error:', error.value);
}
</script>
