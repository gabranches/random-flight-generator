import { Airport } from './Airport';
import { AirportUtils } from './AirportUtils';
import { Flight } from './Flight';

export interface FlightGeneratorOptions {
	departure?: string;
	arrival?: string;
	minDistance?: number;
	maxDistance?: number;
	distanceTolerance?: number;
	excludeCountries: string[];
}

export class FlightGenerator {
	private options: FlightGeneratorOptions;
	public tries = 0;
	public maxTries = 10;

	constructor(options: FlightGeneratorOptions) {
		this.options = options;
	}

	public generateFlight(): Flight | null {
		let departure = null;
		let arrival = null;

		if (this.options.departure) {
			departure = AirportUtils.getAirport(this.options.departure);
		}

		if (this.options.arrival) {
			arrival = AirportUtils.getAirport(this.options.arrival);
		}

		if (!arrival) {
			arrival = this.findMatchingAirport(departure);
		}

		if (!departure) {
			departure = this.findMatchingAirport(arrival);
		}

		if (!departure || !arrival) {
			console.log('No flights found. Trying again.');
			this.tries++;
			if (this.tries < this.maxTries) {
				return this.generateFlight();
			} else {
				return null;
			}
		}

		return new Flight(departure, arrival);
	}

	private findMatchingAirport(inputAirport: Airport | null): Airport | null {
		if (!inputAirport) {
			inputAirport = AirportUtils.randomAirport(
				this.options.excludeCountries
			);
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
			return null;
		}
	}
}
