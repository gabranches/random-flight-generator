import { Airport } from './Airport';
import { AirportUtils } from './AirportUtils';

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
			this.departure = this.departure || AirportUtils.randomAirport();
			const possibleAirports = AirportUtils.getAllPossibleAirports(
				this.departure,
				this.options
			);
			if (possibleAirports.length > 0) {
				this.arrival =
					possibleAirports[
						Math.floor(Math.random() * possibleAirports.length)
					];
			} else {
				console.log('No flights found. Trying again.');
				this.tries++;
				if (this.tries < this.maxTries) {
					this.generateFlight();
				}
			}
		}

		if (!this.departure) {
			this.arrival = this.arrival || AirportUtils.randomAirport();
			const possibleAirports = AirportUtils.getAllPossibleAirports(
				this.arrival,
				this.options
			);
			if (possibleAirports.length > 0) {
				this.departure =
					possibleAirports[
						Math.floor(Math.random() * possibleAirports.length)
					];
			} else {
				console.log('No flights found. Trying again.');
				this.tries++;
				if (this.tries < this.maxTries) {
					this.generateFlight();
				}
			}
		}
	}

	public printFlightPlan() {
		if (this.departure && this.arrival) {
			const distance = AirportUtils.getAirportDistance(
				this.departure,
				this.arrival
			);
			console.log('Departure');
			console.log(this.departure);
			console.log('');
			console.log('Arrival');
			console.log(this.arrival);
			console.log('');
			console.log(
				`Flight distance: ${distance.toFixed(2)} nautical miles`
			);
		} else {
			console.log('No flights found! Try again.');
		}
	}
}
