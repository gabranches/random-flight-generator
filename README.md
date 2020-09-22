### Installation

`npm install --save random-flight-generator`


### Example Usage

#### JS
```
var flightGenerator = require('random-flight-generator');

var options = { minDistance: 5, maxDistance: 100 }
var flight = flightGenerator(options);

console.log(flight.departure);
console.log(flight.arrival);

flight.print(); // Logs all the flight information
```

#### TS
```
import flightGenerator from 'random-flight-generator';

const options = { minDistance: 5, maxDistance: 100 }
const flight = flightGenerator(options);

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

### API
```https://us-central1-flight-generator.cloudfunctions.net/flightGenerator```

Receives all options above as params. For `includeCountries` and `excludeCountries`, use a string instead of an array. E.g. `'US,BR,IT'`
