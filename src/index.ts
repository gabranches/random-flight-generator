import { FlightGenerator } from './FlightGenerator';

const flight = new FlightGenerator({
	departure: 'FPO',
	arrival: 'FLL',
	minDistance: 5,
	maxDistance: 20,
});
