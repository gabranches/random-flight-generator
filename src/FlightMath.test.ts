import { FlightMath, Point } from './FlightMath';

describe('getDistance', () => {
	test('returns the correct distance', () => {
		const point1: Point = {
			lat: 10,
			lon: 20,
		};

		const point2: Point = {
			lat: 30,
			lon: 40,
		};

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
