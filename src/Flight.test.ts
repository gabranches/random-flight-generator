import { AirportUtils } from './AirportUtils';
import { Flight } from './Flight';

describe('getDistance', () => {
	test('returns the correct distance between airports', () => {
		const departure = AirportUtils.getAirport('SDYM');
		const arrival = AirportUtils.getAirport('SDAA');
		const flight = new Flight(departure, arrival);
		const distance = flight.getDistance();
		expect(distance.toFixed(2)).toBe('16.16');
	});
});

describe('getBearing', () => {
	test('returns the correct bearing between airports', () => {
		const departure = AirportUtils.getAirport('SDYM');
		const arrival = AirportUtils.getAirport('SDAA');
		const flight = new Flight(departure, arrival);
		const distance = flight.getBearing();
		expect(distance.toFixed(2)).toBe('10.42');
	});
});
