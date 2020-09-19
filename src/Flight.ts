import { Airport } from './Airport';
import { FlightMath } from './FlightMath';
import { MapCoordinate } from './MapCoordinate';

export class Flight {
	public departure: Airport;
	public arrival: Airport;

	constructor(departure: Airport, arrival: Airport) {
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

	public print() {
		if (this.departure && this.arrival) {
			console.log('Departure');
			console.log(this.departure);
			console.log('');
			console.log('Arrival');
			console.log(this.arrival);
			console.log('');
			console.log(
				`Flight distance: ${this.getDistance().toFixed(
					2
				)} nautical miles`
			);
			console.log(`Bearing: ${this.getBearing().toFixed(0)} degrees`);
		}
	}
}
