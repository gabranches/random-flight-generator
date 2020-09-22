import { FlightJson } from './Flight';
import { FlightGenerator, FlightGeneratorOptions } from './FlightGenerator';

export = (options: FlightGeneratorOptions): FlightJson => {
	const flightGenerator = new FlightGenerator(options);
	const flight = flightGenerator.generateFlight();

	if (flight.isValid()) {
		return flight.toJson();
	} else {
		throw Error(
			'No flights found! Check your flight configuration and try again.'
		);
	}
};
