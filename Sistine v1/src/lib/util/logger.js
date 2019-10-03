const { Timestamp } = require('klasa');
const ts = new Timestamp('MM-DD-YYYY hh:mm:ss A');

module.exports = (msg) => {
	console.log(`\x1b[44m[${ts.display(Date.now())}]\x1b[30m\x1b[46m[SHARD]\x1b[0m ${msg}`);
};
