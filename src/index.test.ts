import { FlightGeneratorOptions } from './FlightGenerator';
import RandomFlightGenerator from './index';

describe('RandomFlightGenerator', () => {
	it('should take FlightGeneratorOptions and return a flight when valid', () => {
		const options: FlightGeneratorOptions = {
			minDistance: 5,
			maxDistance: 100,
		};
		const result = RandomFlightGenerator(options);

		expect(result.isValid()).toBe(true);
	});
	it('should take FlightGeneratorOptions and return an erro when invalid', () => {
		const options: FlightGeneratorOptions = {
			minDistance: 500,
			maxDistance: 100,
		};
		const result = RandomFlightGenerator(options);

		expect(result.isValid()).toBe(false);
	});
});
