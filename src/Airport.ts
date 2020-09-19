import { AirportJson } from './AirportUtils';
import { FlightGeneratorOptions } from './FlightGenerator';

export class Airport {
	public icao: string = '';
	public iata: string = '';
	public lat: number = 0;
	public lon: number = 0;
	public name: string = '';
	public country: string = '';
	public state: string = '';
	public city: string = '';
	public elevation: number = 0;
	public randomlyGenerated = false;

	constructor(airport: AirportJson | undefined) {
		if (airport) {
			this.icao = airport.icao;
			this.iata = airport.iata;
			this.lat = airport.lat;
			this.lon = airport.lon;
			this.name = airport.name;
			this.country = airport.country;
			this.state = airport.state;
			this.city = airport.city;
			this.elevation = airport.elevation;
		} else {
			this.randomlyGenerated = true;
		}
	}

	public validate(options?: FlightGeneratorOptions): boolean {
		if (options?.majorAirportsOnly) {
			if (this.iata === '') return false;
		}

		if (options?.excludeCountries) {
			if (options.excludeCountries.indexOf(this.country) !== -1)
				return false;
		}

		return true;
	}
}
