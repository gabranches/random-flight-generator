import { FlightGenerator } from './FlightGenerator';

const flight = new FlightGenerator({
	// departure: 'KMIA',
	// arrival: 'KMIA',
	minDistance: 15,
	maxDistance: 25,
	excludeCountries: ['US', 'AU', 'CA'],
});
