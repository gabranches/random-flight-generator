### Installation

`npm install --save random-flight-generator`


### Example Usage

```
var flightGenerator = require("random-flight-generator");

var options = { minDistance: 5, maxDistance: 100 }
var flight = flightGenerator(options);

console.log(flight.departure);
console.log(flight.arrival);

flight.print(); // Logs all the flight information
```


### Options

| Key  | Type | Example Value |  Description |
| ------------- | ------------- | ------------- | ------------- |
| minDistance  | number | 5  | The minimum distance (in nautical miles) that the generated flight must have  |
| maxDistance  | number | 100  | The maximum distance (in nautical miles) that the generated flight must have  |
| departure  | string | 'KMIA'  | The ICAO code of the desired departure airport  |
| arrival  | string | 'KMIA'  | The ICAO code of the desired arrival airport  |
| includeCountries  | string[ ] | ['US', 'BR']  | Restrict results to only these countries |
| excludeCountries  | string[ ] | ['US', 'BR']  | Restrict results to all countries except these |
| majorAirportsOnly  | boolean | true  | (Recommended) Restrict results to only major airports with IATA codes |
