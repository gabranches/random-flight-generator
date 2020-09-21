import { Flight } from './Flight';
import { FlightGenerator, FlightGeneratorOptions } from './FlightGenerator';

interface FlightGeneratorError {
	isValid: () => boolean;
	log: () => string;
}

export default (
	options: FlightGeneratorOptions
): Flight | FlightGeneratorError => {
	const flightGenerator = new FlightGenerator(options);
	const flight = flightGenerator.generateFlight();

	if (flight.isValid()) {
		return flight;
	} else {
		return {
			isValid: () => false,
			log: () =>
				'No flights found! Check your flight configuration and try again.',
		};
	}
};
