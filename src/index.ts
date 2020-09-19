import { FlightGenerator } from './FlightGenerator';

const flightGenerator = new FlightGenerator({
	// departure: 'KMIA',
	// arrival: 'KMIA',
	minDistance: 15,
	maxDistance: 20,
	excludeCountries: ['AU', 'CA'],
});

const flight = flightGenerator.generateFlight();

if (flight) {
	flight.print();
} else {
	console.log(
		'No flights found! Check your flight configuration and try again.'
	);
}
