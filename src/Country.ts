import countries from './data/countries.json';

export class Country {
	public code: string;
	constructor(code: string) {
		this.code = code;
	}
	public getName() {
		return (countries as { [key: string]: string })[this.code];
	}
}
