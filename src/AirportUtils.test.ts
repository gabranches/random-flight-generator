import { Airport } from './Airport';
import { AirportUtils } from './AirportUtils';

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
	test('return the correct airport', () => {
		const airport = AirportUtils.getAirport('MKC');
		expect(airport.name).toBe('Charles B. Wheeler Downtown Airport');
	});
});
