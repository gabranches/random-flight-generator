import { AirportUtils } from '../AirportUtils';
import { Flight } from '../Flight';

describe('getDistance', () => {
	it('returns the correct distance between airports', () => {
		const departure = AirportUtils.getAirport('SDYM');
		const arrival = AirportUtils.getAirport('SDAA');
		const flight = new Flight(departure, arrival);
		const distance = flight.getDistance();
		expect(distance.toFixed(2)).toBe('16.16');
	});
});

describe('getBearing', () => {
	it('returns the correct bearing between airports', () => {
		const departure = AirportUtils.getAirport('SDYM');
		const arrival = AirportUtils.getAirport('SDAA');
		const flight = new Flight(departure, arrival);
		const distance = flight.getBearing();
		expect(distance.toFixed(2)).toBe('10.42');
	});
});

describe('isValid', () => {
	it('returns false when departure and arrival are the same', () => {
		const departure = AirportUtils.getAirport('SDYM');
		const arrival = AirportUtils.getAirport('SDYM');
		const flight = new Flight(departure, arrival);
		expect(flight.isValid()).toBe(false);
	});
});
describe('getElevationChange', () => {
	it('should return a positive number when flying up', () => {
		const departure = AirportUtils.getAirport('KMIA');
		const arrival = AirportUtils.getAirport('KDEN');
		const flight = new Flight(departure, arrival);
		expect(flight.getElevationChange()).toBeGreaterThan(0);
	});
});
