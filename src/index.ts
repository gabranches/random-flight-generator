import { FlightGenerator, FlightGeneratorOptions } from './FlightGenerator';

export default (options: FlightGeneratorOptions) => {
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
