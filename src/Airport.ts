import { AirportJson } from './AirportUtils';

export class Airport {
	public iata: string = '';
	public lat: number = 0;
	public lon: number = 0;
	public iso: string = '';
	public name: string = '';

	constructor(airport: AirportJson | undefined) {
		if (airport) {
			this.iata = airport.iata;
			this.lat = Number(airport.lat);
			this.lon = Number(airport.lon);
			this.iso = airport.iso;
			this.name = airport.name;
		}
	}
}
