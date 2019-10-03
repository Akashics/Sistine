const { Command } = require('klasa');
const { Pickuplines } = require('../../lib/util/Constants');

module.exports = class PickupLinesCommand extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pickupline'],
			description: 'Want some cheezy pickup lines? I got you fam.'
		});
	}

	async run(msg) {
		return msg.send(`Here is the pickup line that you requested: ${Pickuplines[Math.floor(Math.random() * Pickuplines.length)]}`);
	}

};
