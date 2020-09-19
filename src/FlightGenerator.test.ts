import { AirportUtils } from './AirportUtils';
import { Flight } from './Flight';
import { FlightGenerator } from './FlightGenerator';

let flightGenerator = new FlightGenerator({
	minDistance: 15,
	maxDistance: 200,
	excludeCountries: ['AU', 'CA'],
});

beforeAll(() => {});

describe('findMatchingAirport', () => {
	it('should a randomly selected airport', () => {
		const outputAirport = flightGenerator.findMatchingAirport();
		expect(outputAirport.randomlyGenerated).toBe(true);
	});
	it('should return an airport within the min max distance', () => {
		const inputAirport = AirportUtils.getAirport('KMIA');
		const outputAirport = flightGenerator.findMatchingAirport(inputAirport);
		const flight = new Flight(inputAirport, outputAirport);
		expect(flight.getDistance()).toBeGreaterThan(15);
		expect(flight.getDistance()).toBeLessThan(200);
	});
});
