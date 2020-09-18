import { FlightGenerator } from './FlightGenerator';

new FlightGenerator({
	// departure: 'KMIA',
	// arrival: 'KMIA',
	minDistance: 15,
	maxDistance: 50,
	excludeCountries: ['AU', 'CA'],
});
