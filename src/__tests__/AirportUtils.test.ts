import { AirportUtils } from '../AirportUtils';
import { FlightGenerator } from '../FlightGenerator';

describe('totalAirports', () => {
	it('returns a number', () => {
		expect(AirportUtils.totalAirports()).toBeGreaterThan(0);
	});
});

describe('randomAirport', () => {
	it('returns an Airport with a valid latitude', () => {
		const airport = AirportUtils.randomAirport();
		expect(typeof airport.lat).toEqual('number');
	});
	it('returns an Airport with a valid longitude', () => {
		const airport = AirportUtils.randomAirport();
		expect(typeof airport.lon).toEqual('number');
	});
	it('should not return an airport in the country that is excluded', () => {
		const flightGenerator = new FlightGenerator({
			excludeCountries: ['US'],
		});
		const airport = AirportUtils.randomAirport(flightGenerator);
		expect(airport.country).not.toEqual('US');
	});
});

describe('getAirport', () => {
	it('returns the correct airport given an ICAO code', () => {
		const airport = AirportUtils.getAirport('SDYM');
		expect(airport.name).toBe('Limeira Airport');
	});
	it('returns the correct airport given an IATA code', () => {
		const airport = AirportUtils.getAirport('MIA');
		expect(airport.name).toBe('Miami International Airport');
	});
});
