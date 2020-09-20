import source from '../data/source.json';
import _ from 'lodash';
import fs from 'fs';

const airports: any = [];

_.each(source, (airport) => {
	airports.push(airport);
});

fs.writeFile('src/data/airports.json', JSON.stringify(airports), function (
	err
) {
	if (err) throw err;
	console.log('complete');
});
