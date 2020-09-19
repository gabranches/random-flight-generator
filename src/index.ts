import { FlightGenerator } from './FlightGenerator';
import { options } from './options';

const flightGenerator = new FlightGenerator(options);
const flight = flightGenerator.generateFlight();

if (flight.isValid()) {
	flight.print();
} else {
	console.log(
		'No flights found! Check your flight configuration and try again.'
	);
}
