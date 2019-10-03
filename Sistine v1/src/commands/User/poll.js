const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class Ping extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
			description: (msg) => msg.language.get('COMMAND_PING_DESCRIPTION'),
			usage: '<poll:string>'
		});
	}

	async run(msg, [poll]) {
		const embed = new MessageEmbed()
			.setColor('PURPLE')
			.setFooter(msg.author.name, msg.author.displayAvatarURL())
			.addField(':inbox_tray: Poll', poll);
		msg.delete();
		return msg.send('', { embed }).then((message) => {
			message.react('373304949234204682');
			message.react('373305832793833483');
		});
	}


};
