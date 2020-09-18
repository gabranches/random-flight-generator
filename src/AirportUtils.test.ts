import { Airport } from './Airport';
import { AirportUtils } from './AirportUtils';
import { FlightMath } from './FlightMath';

describe('totalAirports', () => {
	test('returns a number', () => {
		expect(AirportUtils.totalAirports()).toBeGreaterThan(0);
	});
});

describe('randomAirport', () => {
	test('returns an Airport with a valid latitude', () => {
		const airport = AirportUtils.randomAirport();
		expect(typeof airport.lat).toEqual('number');
	});
	test('returns an Airport with a valid longitude', () => {
		const airport = AirportUtils.randomAirport();
		expect(typeof airport.lon).toEqual('number');
	});
});

describe('getAirport', () => {
	test('returns the correct airport', () => {
		const airport = AirportUtils.getAirport('SDYM');
		expect(airport.name).toBe('Limeira Airport');
	});
});

describe('getAirportDistance', () => {
	test('returns the correct distance between airports', () => {
		const departure = AirportUtils.getAirport('SDYM');
		const arrival = AirportUtils.getAirport('SDAA');
		const distance = AirportUtils.getAirportDistance(departure, arrival);
		expect(distance.toFixed(2)).toBe('16.16');
	});
});
