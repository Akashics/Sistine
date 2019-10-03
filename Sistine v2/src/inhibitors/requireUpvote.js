const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {

	constructor(...args) {
		super(...args, { spamProtection: false });
	}

	async run(msg, cmd) {
		if (!cmd.upvoteOnly) return;
		if (this.client.methods.isUpvoter(msg.author) || this.client.config.main.patreon) return;
		throw `🔒 This command is limited to people who support Senko-san on\n   her many bot listings. You can vote for her using the link below to gain\n   access to many limited features that upvotes have access to. Like this one.\n\n• Vote: https://Senko-san.ml/upvote`;
	}

};
