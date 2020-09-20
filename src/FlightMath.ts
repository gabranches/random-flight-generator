import { MapCoordinate } from './MapCoordinate';

export class FlightMath {
	/**
	 * Returns the distance in meters between two MapCoordinates
	 * Source: https://www.movable-type.co.uk/scripts/latlong.html
	 **/
	public static getDistance(start: MapCoordinate, end: MapCoordinate) {
		const R = 6371e3; // metres
		const φ1 = (start.lat * Math.PI) / 180; // φ, λ in radians
		const φ2 = (end.lat * Math.PI) / 180;
		const Δφ = ((end.lat - start.lat) * Math.PI) / 180;
		const Δλ = ((end.lon - start.lon) * Math.PI) / 180;
		const a =
			Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
			Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const d = R * c; // in metres
		return d;
	}

	/**
	 * Returns the bearing in degrees between two MapCoordinates
	 * Source: https://www.movable-type.co.uk/scripts/latlong.html
	 **/
	public static getBearing(start: MapCoordinate, end: MapCoordinate) {
		const φ1 = (start.lat * Math.PI) / 180; // φ, λ in radians
		const φ2 = (end.lat * Math.PI) / 180;
		const λ1 = (start.lon * Math.PI) / 180; // φ, λ in radians
		const λ2 = (end.lon * Math.PI) / 180;
		const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
		const x =
			Math.cos(φ1) * Math.sin(φ2) -
			Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);
		const θ = Math.atan2(y, x);
		return ((θ * 180) / Math.PI + 360) % 360; // in degrees
	}

	public static metersToNauticalMiles(distance: number) {
		return distance / 1852;
	}
}
