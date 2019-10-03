const MusicCommand = require('../../library/Music/MusicCommand');
const { RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			cooldown: 10,
			aliases: ['stopmusic', 'leave'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
			description: language => language.get('COMMAND_QUEUE_DESCRIPTION'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		const { music } = msg.guild;
		const { queue } = music;
		if (!music.playing) return msg.sendMessage(`｢ **Error** ｣ ${msg.language.get('MUSICIF_SONG_NOT_FOUND')}***`);

		const pages = new RichDisplay(new MessageEmbed()
			.setTitle(`${msg.language.get('MUSICIF_QUEUE_TITLE')}`)
			.setAuthor(`Music Queue`)
			.setDescription(`"${msg.language.get('MUSICIF_QUEUE_HINT')}`)
			.setColor('#428bca')
		);

		for (let i = 0; i < queue.length; i += 12) {
			const curr = queue.slice(i, i + 12);
			pages.addPage(tab => tab.setDescription(curr.map(song => `\`-\` [${song.title.replace(/\*/g, '\\*')}](${song.url}) (${song.friendlyDuration})`).join('\n')));
		}
		return pages.run(await msg.sendMessage(`${msg.language.get('MUSICIF_QUEUE_LOADING')}`), {
			time: 120000,
			filter: (reaction, user) => user === msg.author
		});
	}

};
