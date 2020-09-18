import { AirportJson } from './AirportUtils';

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
		}
	}
}
