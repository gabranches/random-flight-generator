import { FlightMath } from './FlightMath';
import { MapCoordinate } from './MapCoordinate';

describe('getDistance', () => {
	test('returns the correct distance', () => {
		const point1 = new MapCoordinate(10, 20);
		const point2 = new MapCoordinate(30, 40);

		const distanceKm = Math.round(
			FlightMath.getDistance(point1, point2) / 1000
		);

		expect(distanceKm).toBe(3041);
	});
});

describe('metersToNauticalMiles', () => {
	test('converts correctly', () => {
		expect(FlightMath.metersToNauticalMiles(1852)).toBe(1);
	});
});
