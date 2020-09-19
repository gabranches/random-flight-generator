import { AirportUtils } from './AirportUtils';
import { Flight } from './Flight';
import { FlightGenerator } from './FlightGenerator';

let flightGenerator: FlightGenerator;

describe('generateFlight', () => {
	describe('when given both departure and arrival', () => {
		it('should return two non-random generated flights', () => {
			flightGenerator = new FlightGenerator({
				departure: '92VA',
				arrival: 'KMIA',
			});
			const flight = flightGenerator.generateFlight();
			expect(flight.departure.randomlyGenerated).toBe(false);
			expect(flight.arrival.randomlyGenerated).toBe(false);
		});
	});
	describe('when given a departure', () => {
		it('should return a random arrival', () => {
			flightGenerator = new FlightGenerator({
				departure: 'KMIA',
				minDistance: 15,
				maxDistance: 200,
				excludeCountries: ['AU', 'CA'],
			});
			const flight = flightGenerator.generateFlight();
			expect(flight.departure.randomlyGenerated).toBe(false);
			expect(flight.arrival.randomlyGenerated).toBe(true);
		});
	});
	describe('when given an arrival', () => {
		it('should return a random departure', () => {
			flightGenerator = new FlightGenerator({
				arrival: 'KMIA',
				minDistance: 15,
				maxDistance: 200,
				excludeCountries: ['AU', 'CA'],
			});
			const flight = flightGenerator.generateFlight();
			expect(flight.departure.randomlyGenerated).toBe(true);
			expect(flight.arrival.randomlyGenerated).toBe(false);
		});
	});
	describe('when given no parameters', () => {
		it('should return a random departure and arrival', () => {
			flightGenerator = new FlightGenerator();
			const flight = flightGenerator.generateFlight();
			expect(flight.departure.randomlyGenerated).toBe(true);
			expect(flight.arrival.randomlyGenerated).toBe(true);
		});
	});
});

describe('findMatchingAirport', () => {
	beforeAll(() => {
		flightGenerator = new FlightGenerator({
			minDistance: 15,
			maxDistance: 200,
			excludeCountries: ['AU', 'CA'],
		});
	});

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
	it('should return the same airport if no match is found', () => {
		flightGenerator = new FlightGenerator({
			minDistance: 15,
			maxDistance: 15,
		});
		const inputAirport = AirportUtils.getAirport('KMIA');
		const outputAirport = flightGenerator.findMatchingAirport(inputAirport);
		const flight = new Flight(inputAirport, outputAirport);
		expect(flight.departure).toBe(flight.arrival);
		expect(flight.isValid()).toBe(false);
	});
});
