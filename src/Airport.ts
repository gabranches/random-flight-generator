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

	public constructor(airport: AirportJson | undefined) {
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

	public getCountryName(): string {
		return new Country(this.country).getName();
	}

	public getState(): string {
		return this.state.replace('-', ' ');
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
