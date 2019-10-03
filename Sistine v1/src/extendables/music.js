const { Extendable } = require('klasa');
const { Guild } = require('discord.js');

module.exports = class extends Extendable {

	constructor(...args) {
		super(...args, { appliesTo: [Guild] });
	}

	get music() {
		return this.client.music.get(this.id) || this.client.music.add(this);
	}

};
