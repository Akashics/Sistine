const { Command: KlasaCommand } = require('klasa');

class Command extends KlasaCommand {

	constructor(client, store, file, core, { upvote = false, patron = false, ...options }) {
		super(client, store, file, core, options);
		this.upvote = upvote;
		this.patron = patron;
	}

}

module.exports = Command;
