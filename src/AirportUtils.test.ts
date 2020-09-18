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
	test('should not return an airport in the country that is excluded', () => {
		const airport = AirportUtils.randomAirport(['US']);
		expect(airport.country).not.toEqual('US');
	});
});

describe('getAirport', () => {
	test('returns the correct airport', () => {
		const airport = AirportUtils.getAirport('SDYM');
		expect(airport.name).toBe('Limeira Airport');
	});
});
