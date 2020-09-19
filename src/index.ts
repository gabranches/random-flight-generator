import { FlightGenerator } from './FlightGenerator';
import { config } from './config';

const flightGenerator = new FlightGenerator(config);
const flight = flightGenerator.generateFlight();

if (flight) {
	flight.print();
} else {
	console.log(
		'No flights found! Check your flight configuration and try again.'
	);
}
