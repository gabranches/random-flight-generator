import { Airport } from './Airport';
import { AirportJson } from './AirportUtils';
import { FlightMath } from './FlightMath';
import { MapCoordinate } from './MapCoordinate';

interface FlightJson {
	departure: AirportJson;
	arrival: AirportJson;
	bearing: number;
	distance: number;
	isValid: boolean;
}

export class Flight {
	public departure: Airport;
	public arrival: Airport;

	public constructor(departure: Airport, arrival: Airport) {
		this.departure = departure;
		this.arrival = arrival;
	}

	public getDistance(): number {
		const point1 = new MapCoordinate(
			this.departure.lat,
			this.departure.lon
		);
		const point2 = new MapCoordinate(this.arrival.lat, this.arrival.lon);
		const distance = FlightMath.getDistance(point1, point2);
		return FlightMath.metersToNauticalMiles(distance);
	}

	public getBearing(): number {
		const point1 = new MapCoordinate(
			this.departure.lat,
			this.departure.lon
		);
		const point2 = new MapCoordinate(this.arrival.lat, this.arrival.lon);
		return FlightMath.getBearing(point1, point2);
	}

	public isValid(): boolean {
		return (
			this.departure && this.arrival && this.departure !== this.arrival
		);
	}

	public toJson(): FlightJson {
		return {
			departure: this.departure.toJson(),
			arrival: this.arrival.toJson(),
			bearing: this.getBearing(),
			distance: this.getDistance(),
			isValid: this.isValid(),
		};
	}

	public print(): void {
		if (this.departure && this.arrival) {
			console.log('');
			console.log('Departure');
			console.log('-----------------------------------');
			this.departure.print();
			console.log('');
			console.log('');
			console.log('Arrival');
			console.log('-----------------------------------');
			this.arrival.print();
			console.log('');
			console.log('');
			console.log('Flight Details');
			console.log('-----------------------------------');
			console.log(
				`Flight distance: ${this.getDistance().toFixed(
					2
				)} nautical miles`
			);
			console.log(`Bearing: ${this.getBearing().toFixed(0)} degrees`);
			console.log(
				`Elevation change: ${
					this.arrival.elevation - this.departure.elevation
				} feet`
			);
		}
	}
}
