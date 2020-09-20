import { Airport } from './Airport';
import { AirportUtils } from './AirportUtils';

let airport: Airport;

beforeEach(() => {
	airport = AirportUtils.getAirport('KMIA');
});

describe('satisfiesFlightGeneratorOptions', () => {
	it('should return true with no options', () => {
		expect(airport.satisfiesFlightGeneratorOptions()).toBe(true);
	});
	it('should return true for a large airport with majorAirportsOnly', () => {
		expect(
			airport.satisfiesFlightGeneratorOptions({ majorAirportsOnly: true })
		).toBe(true);
	});
	it('should return false for a small airport with majorAirportsOnly', () => {
		airport = AirportUtils.getAirport('SDZX');
		expect(
			airport.satisfiesFlightGeneratorOptions({ majorAirportsOnly: true })
		).toBe(false);
	});
	it('should return true with includeCountries', () => {
		expect(
			airport.satisfiesFlightGeneratorOptions({
				includeCountries: ['US'],
			})
		).toBe(true);
	});
	it('should return false with empty includeCountries', () => {
		expect(
			airport.satisfiesFlightGeneratorOptions({
				includeCountries: [],
			})
		).toBe(true);
	});
	it('should return false with excludeCountries', () => {
		expect(
			airport.satisfiesFlightGeneratorOptions({
				excludeCountries: ['US'],
			})
		).toBe(false);
	});
	it('should return true with empty excludeCountries', () => {
		expect(
			airport.satisfiesFlightGeneratorOptions({
				excludeCountries: [],
			})
		).toBe(true);
	});
});
