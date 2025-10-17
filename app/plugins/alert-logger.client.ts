export default defineNuxtPlugin(() => {
	if (process.client) {
		const originalAlert = window.alert;

		window.alert = (message: string) => {
			console.trace('Alert:', message); // stack trace ile göster
			console.log('Alert message:', message);
			originalAlert(message); // orijinal alert çalışır
		};
	}
});
