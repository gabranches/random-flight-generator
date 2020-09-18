import { AirportJson } from './AirportUtils';

export class Airport {
	public icao: string = '';
	public lat: number = 0;
	public lon: number = 0;
	public name: string = '';

	constructor(airport: AirportJson | undefined) {
		if (airport) {
			this.icao = airport.icao;
			this.lat = airport.lat || 0;
			this.lon = airport.lon || 0;
			this.name = airport.name || '';
		}
	}
}
