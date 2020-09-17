export interface Point {
	lat: number;
	lon: number;
}

export class FlightMath {
	/**
	 * Returns the distance in meters between two Points
	 * Source: https://www.movable-type.co.uk/scripts/latlong.html
	 **/
	static getDistance(point1: Point, point2: Point) {
		const lat1 = point1.lat;
		const lat2 = point2.lat;

		const lon1 = point1.lon;
		const lon2 = point2.lon;

		const R = 6371e3; // metres
		const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
		const φ2 = (lat2 * Math.PI) / 180;
		const Δφ = ((lat2 - lat1) * Math.PI) / 180;
		const Δλ = ((lon2 - lon1) * Math.PI) / 180;

		const a =
			Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
			Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		const d = R * c; // in metres
		return d;
	}

	static metersToNauticalMiles(distance: number) {
		return distance / 1852;
	}
}
