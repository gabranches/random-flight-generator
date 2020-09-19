import countries from './data/countries.json';

export class Country {
	public code: string;
	constructor(code: string) {
		this.code = code;
	}
	getName() {
		return (countries as any)[this.code];
	}
}
