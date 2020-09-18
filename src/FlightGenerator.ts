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
	public departure: Airport | null = null;
	public arrival: Airport | null = null;
	public tries = 0;
	public maxTries = 10;

	constructor(options: FlightGeneratorOptions) {
		this.options = options;
		this.generateFlight();
		this.printFlightPlan();
	}

	public generateFlight() {
		this.departure = null;
		this.arrival = null;

		if (this.options.departure) {
			this.departure = AirportUtils.getAirport(this.options.departure);
		}

		if (this.options.arrival) {
			this.arrival = AirportUtils.getAirport(this.options.arrival);
		}

		if (this.departure && this.arrival) {
			return;
		}

		if (!this.arrival) {
			this.departure =
				this.departure ||
				AirportUtils.randomAirport(this.options.excludeCountries);
			const possibleAirports = AirportUtils.getAllPossibleAirports(
				this.departure,
				this.options
			);
			this.arrival = this.findMatchingAirport(this.departure);
		}

		if (!this.departure) {
			this.arrival =
				this.arrival ||
				AirportUtils.randomAirport(this.options.excludeCountries);
			const possibleAirports = AirportUtils.getAllPossibleAirports(
				this.arrival,
				this.options
			);
			this.departure = this.findMatchingAirport(this.arrival);
		}
	}

	private findMatchingAirport(inputAirport?: Airport): Airport | null {
		inputAirport =
			inputAirport ||
			AirportUtils.randomAirport(this.options.excludeCountries);

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
			console.log('No flights found. Trying again.');
			this.tries++;
			if (this.tries < this.maxTries) {
				return this.findMatchingAirport(inputAirport);
			} else {
				return null;
			}
		}
	}

	public printFlightPlan() {
		if (this.departure && this.arrival) {
			const flight = new Flight(this.departure, this.arrival);
			const distance = flight.getDistance();
			const bearing = flight.getBearing();

			console.log('Departure');
			console.log(this.departure);
			console.log('');
			console.log('Arrival');
			console.log(this.arrival);
			console.log('');
			console.log(
				`Flight distance: ${distance.toFixed(2)} nautical miles`
			);
			console.log(`Bearing: ${bearing.toFixed(0)} degrees`);
		} else {
			console.log(
				'No flights found! Check your flight configuration and try again.'
			);
		}
	}
}
