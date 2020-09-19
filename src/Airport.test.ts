import { AirportUtils } from './AirportUtils';

describe('validate', () => {
	it('majorAirportsOnly filter only returns airports with iata', () => {
		const airport = AirportUtils.getAirport('VYLY');
		expect(airport.validate({ majorAirportsOnly: true })).toBe(false);
	});

	it('excludeCountries filter excludes correct countries', () => {
		const airport = AirportUtils.getAirport('KMIA');
		expect(airport.validate({ excludeCountries: ['US'] })).toBe(false);
	});
});
