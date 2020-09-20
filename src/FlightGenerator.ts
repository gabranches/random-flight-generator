import { Airport } from './Airport';
import { AirportUtils } from './AirportUtils';
import { Flight } from './Flight';

export interface FlightGeneratorOptions {
	departure?: string;
	arrival?: string;
	minDistance?: number;
	maxDistance?: number;
	excludeCountries?: string[];
	majorAirportsOnly?: boolean;
}

export class FlightGenerator {
	private options: FlightGeneratorOptions;
	public tries = 0;
	public maxTries = 10;

	public constructor(options?: FlightGeneratorOptions) {
		this.options = options || {};
	}

	public generateFlight(): Flight {
		let departure;
		let arrival;

		if (this.options.departure && this.options.arrival) {
			// Both airports specified
			departure = AirportUtils.getAirport(this.options.departure);
			arrival = AirportUtils.getAirport(this.options.arrival);
		} else if (this.options.departure) {
			// Departure specified
			departure = AirportUtils.getAirport(this.options.departure);
			arrival = this.findMatchingAirport(departure);
		} else if (this.options.arrival) {
			// Arrival specified
			arrival = AirportUtils.getAirport(this.options.arrival);
			departure = this.findMatchingAirport(arrival);
		} else {
			// None specified
			departure = AirportUtils.randomAirport(this.options);
			arrival = this.findMatchingAirport(departure);
		}

		if (departure === arrival) {
			// If departure and arrival are the same, no valid flights were found
			this.tries++;
			console.log(
				`No flights found. Trying again. Attempts: ${this.tries}`
			);
			if (this.tries < this.maxTries) {
				return this.generateFlight();
			}
		}
		return new Flight(departure, arrival);
	}

	/**
	 * Finds an airport that satisfies the FlightGenerator options.
	 * Returns the same airport if no match is found.
	 */
	public findMatchingAirport(inputAirport?: Airport): Airport {
		if (!inputAirport) {
			inputAirport = AirportUtils.randomAirport(this.options);
		}

		const possibleAirports = AirportUtils.getAllPossibleAirports(
			inputAirport,
			this.options
		);

		if (possibleAirports.length > 0) {
			const outputAirport =
				possibleAirports[
					Math.floor(Math.random() * possibleAirports.length)
				];
			outputAirport.randomlyGenerated = true;
			return outputAirport;
		} else {
			return inputAirport;
		}
	}
}
