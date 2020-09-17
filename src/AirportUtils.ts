import { Airport } from './Airport';
import * as AirportsJson from './data/airports.json';
import _ from 'lodash';

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

const AIRPORTS: AirportJson[] = _.filter(AirportsJson as any, (airport) => {
	return airport.lat && airport.lon;
});

export class AirportUtils {
	static randomAirport() {
		const index = Math.floor(Math.random() * AirportUtils.totalAirports());
		return new Airport(AIRPORTS[index]);
	}

	static totalAirports() {
		return AIRPORTS.length;
	}

	static getAirport(iata: string): Airport {
		const airportJson = _.find(AIRPORTS, (airport) => {
			return airport.iata.toLowerCase() === iata.toLowerCase();
		});
		return new Airport(airportJson);
	}
}
