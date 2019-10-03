const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Assign the blame to another user thru a canvas based api',
			usage: '[Blamed:username]',
			extendedHelp: 'Uses the idiotic api to assign the blame to someone else'
		});
	}

	async run(msg, [blamed = msg.author]) {
		const image = await this.client.idioticApi.blame(blamed.username);
		return msg.channel.sendFile(image, 'blame.png');
	}

};
