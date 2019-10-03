const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {

	constructor(...args) {
		super(...args, { spamProtection: true });
	}

	async run(msg, cmd) {
		if (!msg.guildSettings.disabledCommandsGroup.includes(cmd.category)) return;
		throw 'This command has been disabled by your Guild Moderators.';
	}

};
