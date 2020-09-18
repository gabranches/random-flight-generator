import { FlightMath } from './FlightMath';
import { MapCoordinate } from './MapCoordinate';

describe('getDistance', () => {
	test('returns the correct distance', () => {
		const start = new MapCoordinate(10, 20);
		const end = new MapCoordinate(30, 40);

		const distanceKm = Math.round(
			FlightMath.getDistance(start, end) / 1000
		);

		expect(distanceKm).toBe(3041);
	});
});

describe('getBearing', () => {
	test('returns the correct bearing', () => {
		const start = new MapCoordinate(10, 20);
		const end = new MapCoordinate(30, 40);

		expect(FlightMath.getBearing(start, end)).toBe(40.152801973757676);
	});
});

describe('metersToNauticalMiles', () => {
	test('converts correctly', () => {
		expect(FlightMath.metersToNauticalMiles(1852)).toBe(1);
	});
});
