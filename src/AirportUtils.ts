import _ from 'lodash';
import * as AirportsJson from './data/airports.json';
import { Airport } from './Airport';
import { MapCoordinate } from './MapCoordinate';
import { FlightMath } from './FlightMath';
import { FlightGeneratorOptions } from './FlightGenerator';

export interface AirportJson {
	iata: string;
	lon?: string;
	iso: string;
	status: number;
	name: string;
	continent: string;
	type: string;
	lat?: string;
	size: string | null;
}

const AIRPORTS: Airport[] = _.filter(AirportsJson, (airport) => {
	return airport.lat && airport.lon && airport.name;
}).map((airport) => new Airport(airport as AirportJson));

export class AirportUtils {
	static randomAirport(): Airport {
		const index = Math.floor(Math.random() * AirportUtils.totalAirports());
		return AIRPORTS[index];
	}

	static totalAirports() {
		return AIRPORTS.length;
	}

	static getAirport(iata: string): Airport {
		const airport = _.find(AIRPORTS, (airport) => {
			return airport.iata.toLowerCase() == iata.toLowerCase();
		});
		if (!airport) {
			throw Error('Airport not found.');
		}
		return airport;
	}

	static getAirportDistance(departure: Airport, arrival: Airport): number {
		const point1 = new MapCoordinate(departure.lat, departure.lon);
		const point2 = new MapCoordinate(arrival.lat, arrival.lon);
		const distance = FlightMath.getDistance(point1, point2);
		return FlightMath.metersToNauticalMiles(distance);
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
			const targetDistance = AirportUtils.getAirportDistance(
				target,
				airport
			);
			if (
				targetDistance >= minDistance &&
				targetDistance <= maxDistance + distanceTolerance &&
				target !== airport
			) {
				results.push(airport);
			}
		});
		return results;
	}
}
