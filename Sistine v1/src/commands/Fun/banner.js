const { Command } = require('klasa');
const figletAsync = require('util').promisify(require('figlet'));

module.exports = class Banner extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ascii'],
			description: (msg) => msg.language.get('COMMAND_BANNER_DESCRIPTION'),
			usage: '<BannerText:str{1,10}>'
		});
	}

	async run(msg, [banner]) {
		const data = await figletAsync(banner);
		return msg.sendCode('', data);
	}

};
