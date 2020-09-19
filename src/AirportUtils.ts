import _ from 'lodash';
import * as AirportsJson from './data/airports.json';
import { Airport } from './Airport';
import { MapCoordinate } from './MapCoordinate';
import { FlightMath } from './FlightMath';
import { FlightGeneratorOptions } from './FlightGenerator';
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
}

const AIRPORTS: Airport[] = _.filter(
	AirportsJson as AirportJson[],
	(airport: AirportJson) => {
		return airport.lat && airport.lon && airport.icao;
	}
).map((airport) => new Airport(airport as AirportJson));

export class AirportUtils {
	static randomAirport(excludeCountries?: string[]): Airport {
		excludeCountries = excludeCountries || [];
		const index = Math.floor(Math.random() * AirportUtils.totalAirports());
		const airport = AIRPORTS[index];
		if (excludeCountries.includes(airport.country)) {
			return AirportUtils.randomAirport(excludeCountries);
		} else {
			airport.randomlyGenerated = true;
			return airport;
		}
	}

	static totalAirports() {
		return AIRPORTS.length;
	}

	static getAirport(icao: string): Airport {
		const airport = _.find(AIRPORTS, (airport) => {
			return airport.icao.toLowerCase() == icao.toLowerCase();
		});
		if (!airport) {
			throw Error('Airport not found.');
		}
		return airport;
	}

	static getAllPossibleAirports(
		target: Airport,
		options: FlightGeneratorOptions
	): Airport[] {
		const results: Airport[] = [];
		const minDistance = options.minDistance || 0;
		const maxDistance = options.maxDistance || 9999;
		const distanceTolerance = options.distanceTolerance || 0;

		AIRPORTS.forEach((airport) => {
			const flight = new Flight(target, airport);
			const targetDistance = flight.getDistance();
			if (
				target !== airport &&
				targetDistance >= minDistance &&
				targetDistance <= maxDistance + distanceTolerance &&
				options.excludeCountries?.indexOf(airport.country) === -1
			) {
				results.push(airport);
			}
		});
		return results;
	}
}
