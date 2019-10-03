const MusicCommand = require('../../library/Music/MusicCommand');
const snekfetch = require('snekfetch');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			requireMusic: true,
			patronOnly: true,
			cooldown: 8,
			aliases: ['dumpplaylist', 'savesongs', 'save'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
			description: language => language.get('COMMAND_DUMP_DESCRIPTION'),
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg) {
		const { music } = msg.guild;
		const { queue } = music;
		if (!music.playing) return msg.sendMessage(`｢ **Error** ｣ There's currently no music playing.`);

		const raw = { info: 'This file was created by Senko-san.', songs: [] };
		for (const song of queue) {
			raw.songs.push(song.url);
		}

		const paste = await this.upload(raw);
		return msg.sendMessage(`｢ **Playlist Created** ｣ A playlist of the current queue has been created.\nHere is your link: ${paste}\n**Tip:** Save this URL to use with the \`play\` command to instantly load a queue.`);
	}

	async upload(data) {
		const req = await snekfetch.post('https://paste.randomsh.moe/documents').send(data);
		return `https://paste.randomsh.moe/${req.body.key}`;
	}

};
