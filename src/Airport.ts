import { AirportJson } from './AirportUtils';
import { Country } from './Country';
import { FlightGeneratorOptions } from './FlightGenerator';

export class Airport {
	public icao = '';
	public iata = '';
	public lat = 0;
	public lon = 0;
	public name = '';
	public country = '';
	public state = '';
	public city = '';
	public elevation = 0;
	public randomlyGenerated = false;

	public constructor(airport?: AirportJson) {
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

	public getCountryName(): string {
		return new Country(this.country).getName();
	}

	public getState(): string {
		return this.state.replace('-', ' ');
	}

	public satisfiesFlightGeneratorOptions(
		options?: FlightGeneratorOptions
	): boolean {
		const hasLatitude = !!this.lat;
		const hasLongitude = !!this.lon;
		const hasIcao = !!this.icao;
		let includeCountries = true;
		let excludeCountries = true;
		let majorAirportsOnly = true;

		if (options?.includeCountries) {
			includeCountries = options.includeCountries.includes(this.country);
		}

		if (options?.excludeCountries) {
			excludeCountries = !options.excludeCountries.includes(this.country);
		}

		if (options?.majorAirportsOnly) {
			majorAirportsOnly = !!this.iata;
		}

		return (
			hasLatitude &&
			hasLongitude &&
			hasIcao &&
			includeCountries &&
			excludeCountries &&
			majorAirportsOnly
		);
	}

	public print(): void {
		console.log(`Name: ${this.name}`);
		console.log(`ICAO: ${this.icao}`);
		console.log(`IATA: ${this.iata}`);
		console.log(`Country: ${this.getCountryName()} - ${this.country}`);
		console.log(`State: ${this.getState()}`);
		console.log(`City: ${this.city}`);
		console.log(`Elevation: ${this.elevation} feet`);
	}
}
