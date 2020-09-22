import _ from 'lodash';
import * as AirportsJson from './data/airports.json';
import { Airport } from './Airport';
import { FlightGenerator } from './FlightGenerator';
import { Flight } from './Flight';

export interface AirportJson {
	icao: string;
	iata: string;
	lon: number;
	name: string;
	lat: number;
	country: string;
	state: string;
	city: string;
	elevation: number;
	randomlyGenerated?: boolean;
}

const AIRPORTS: Airport[] = _.filter(
	AirportsJson as AirportJson[],
	(airport: AirportJson) => {
		return airport.lat && airport.lon && airport.icao;
	}
).map((airport) => new Airport(airport as AirportJson));

export class AirportUtils {
	public static randomAirport(flightGenerator?: FlightGenerator): Airport {
		let airports = AIRPORTS;

		if (flightGenerator) {
			airports = flightGenerator.airports;
		}
		const index = Math.floor(Math.random() * airports.length);
		const airport = airports[index];

		airport.randomlyGenerated = true;
		return airport;
	}

	public static totalAirports(): number {
		return AIRPORTS.length;
	}

	public static getAirport(icao: string): Airport {
		const airport = _.find(AIRPORTS, (airport) => {
			return airport.icao.toLowerCase() == icao.toLowerCase();
		});
		if (!airport) {
			throw Error('Airport not found.');
		}
		return airport;
	}

	public static getAllPossibleAirports(
		target: Airport,
		flightGenerator: FlightGenerator
	): Airport[] {
		const results: Airport[] = [];
		const minDistance = flightGenerator.options.minDistance || 0;
		const maxDistance = flightGenerator.options.maxDistance || 9999;

		flightGenerator.airports.forEach((airport) => {
			const flight = new Flight(target, airport);
			const targetDistance = flight.getDistance();

			if (
				target !== airport &&
				targetDistance >= minDistance &&
				targetDistance <= maxDistance
			) {
				results.push(airport);
			}
		});
		return results;
	}
}
