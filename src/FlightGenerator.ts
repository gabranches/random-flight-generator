import { Airport } from './Airport';
import { AirportUtils, AirportJson } from './AirportUtils';
import * as AirportsJson from './data/airports.json';
import { Flight } from './Flight';
import _ from 'lodash';

export interface FlightGeneratorOptions {
	departure?: string;
	arrival?: string;
	minDistance?: number;
	maxDistance?: number;
	includeCountries?: string[];
	excludeCountries?: string[];
	majorAirportsOnly?: boolean;
}

export class FlightGenerator {
	public options: FlightGeneratorOptions;
	public tries = 0;
	public maxTries = 10;
	public airports: Airport[] = [];

	public constructor(options?: FlightGeneratorOptions) {
		this.options = options || {};
		this.setupAirports();
	}

	public setupAirports(): void {
		this.airports = _.filter(
			AirportsJson as AirportJson[],
			(airport: AirportJson) => {
				return this.filterAirport(airport);
			}
		).map((airport) => new Airport(airport as AirportJson));
	}

	public filterAirport(airport: AirportJson): boolean {
		const hasLatitude = !!airport.lat;
		const hasLongitude = !!airport.lon;
		const hasIcao = !!airport.icao;
		let includeCountries = true;
		let excludeCountries = true;

		if (this.options.includeCountries) {
			includeCountries = this.options.includeCountries.includes(
				airport.country
			);
		}

		if (this.options.excludeCountries) {
			excludeCountries = !this.options.excludeCountries.includes(
				airport.country
			);
		}

		return (
			hasLatitude &&
			hasLongitude &&
			hasIcao &&
			includeCountries &&
			excludeCountries
		);
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
			departure = AirportUtils.randomAirport(this);
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
			inputAirport = AirportUtils.randomAirport(this);
		}

		const possibleAirports = AirportUtils.getAllPossibleAirports(
			inputAirport,
			this
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
