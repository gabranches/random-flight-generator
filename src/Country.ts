import countries from './data/countries.json';

export class Country {
	public code: string;
	public constructor(code: string) {
		this.code = code;
	}
	public getName(): string {
		return (countries as { [key: string]: string })[this.code];
	}
}
