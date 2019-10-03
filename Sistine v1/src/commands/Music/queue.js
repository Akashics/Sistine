const { Command } = require('klasa');
const { MessageEmbed, RichDisplay } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['USE_EXTERNAL_EMOJIS', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
			description: 'Check the queue list.',
			usage: '[page:integer]'
		});
		this.requireMusic = true;
	}

	async run(msg) {
		const { music } = msg.guild;
		const { queue } = music;
		if (!music.playing) return msg.sendMessage("***There's currently no music playing!***");

		const pages = new RichDisplay(new MessageEmbed()
			.setTitle('Use the reactions to change pages, select a page, or stop viewing the queue')
			.setAuthor('Queue - Sistine', this.client.user.displayAvatarURL())
			.setDescription('Scroll between pages to see the song queue.')
			.setColor('PURPLE')
		);

		for (let i = 0, temp = queue.length; i < temp; i += 5) {
			const curr = queue.slice(i, i + 5);
			pages.addPage(text => text.setDescription(curr.map(ynot => `\`-\` [${ynot.trackTitle.replace(/\*/g, '\\*')}](${ynot.trackURL}) (${ynot.friendlyDuration})`)));
		}
		pages.run(await msg.sendMessage('Loading Queue...'), {
			time: 120000,
			filter: (reaction, user) => user === msg.author
		});
	}

};
