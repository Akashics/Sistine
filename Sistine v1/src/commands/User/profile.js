const { Command } = require('klasa');
const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const snek = require('snekfetch');

Canvas.registerFont('./src/assets/fonts/Roboto-Thin.ttf', 'RobotoThin');
Canvas.registerFont('./src/assets/fonts/Roboto-ThinItalic.ttf', 'RobotoThinItalic');
Canvas.registerFont('./src/assets/fonts/Roboto-Light.ttf', 'RobotoLight');
Canvas.registerFont('./src/assets/fonts/Roboto-Regular.ttf', 'RobotoRegular');
Canvas.registerFont('./src/assets/fonts/NotoEmoji.ttf', 'RobotoRegular');
Canvas.registerFont('./src/assets/fonts/NotoSans.ttf', 'RobotoRegular');
Canvas.registerFont('./src/assets/fonts/Corbert-Condensed.otf', 'Corbert');
Canvas.registerFont('./src/assets/fonts/Discord.ttf', 'Discord');

module.exports = class Profile extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['balance', 'bal', 'credits'],
			cooldown: 10,
			description: (msg) => msg.language.get('COMMAND_PROFILE_DESCRIPTION'),
			usage: '[User:user]'
		});
	}

	async run(msg, [user = msg.author]) {
		if (user.bot) return;
		const messg = await msg.send(msg.language.get('COMMAND_PROFILE_LOADING', user.username));
		const { balance, level, reputation, experience } = user.configs;
		const profile = await fsn.readFile('./src/assets/images/profile-card.png');
		const userAvatar = await snek.get(user.displayAvatarURL({ format: 'png', size: 256 }));
		const data = await this.client.providers.get('rethinkdb').getAll('users').then(res => res.sort((a, b) => b.balance - a.balance));
		const rank = data.findIndex(i => i.id === user.id);

		const title = { GLOBAL_RANK: 'Global Rank', CREDITS: 'Credits', REPUTATION: 'Reputation', EXPERIENCE: 'Experience', LEVEL: 'Level' };

		const canvas = await new Canvas(640, 391)
			// Images
			.save()
			.createBeveledClip(10, 10, 620, 371, 8)
			.restore()
			.addImage(profile, 0, 0, 640, 391)

			.setStrokeWidth(2)

			.setColor('rgb(232,232,232)')
			.addRect(45, 344, 300, 9)
			.setColor('purple')
			.addRect(47, 346, experience * 4, 5)

			// Name Title
			.setTextFont('35px RobotoRegular')
			.setColor('rgb(255, 255, 255)')
			.addStrokeText(user.username, 227, 73, 306)
			.addResponsiveText(user.username, 227, 73, 306)
			.setTextFont('25px RobotoLight')
			.addStrokeText(`#${user.discriminator}`, 227, 105)
			.addResponsiveText(`#${user.discriminator}`, 227, 105)

			// Stats
			.setColor('rgb(23, 23, 23)')
			.setTextFont('25px RobotoThin')
			.addText(title.REPUTATION, 45, 185)
			.addText(title.CREDITS, 45, 234)
			.addText(title.GLOBAL_RANK, 45, 280)

			// Experience Bar
			.setTextFont('20px RobotoThin')
			.setColor('rgb(23, 23, 23)')
			.addText(title.EXPERIENCE, 45, 340)

			// Stat Values
			.setTextAlign('right')
			.setColor('rgb(23, 23, 23)')
			.setTextFont('25px RobotoThin')
			.addText(reputation.toLocaleString(), 412, 185)
			.addText(balance.toLocaleString(), 412, 234)
			.addText(rank.toLocaleString(), 412, 280)
			.addText(experience.toLocaleString(), 412, 350)
			.setTextFont('16px RobotoThinItalic')
			.setColor('rgb(147,112,219)')
			.addText(msg.guild.name, 625, 375, 50)
			// Level
			.setTextAlign('center')
			.setColor('rgb(23, 23, 23)')
			.setTextFont('25px RobotoThin')
			.addText(title.LEVEL, 535, 190)
			.setTextFont('30px RobotoRegular')
			.addText(level.toLocaleString(), 535, 230)

			// Profile Picture
			.save()
			.addImage(userAvatar.body, 475, 23, 120, 120, { type: 'round', radius: 60 })
			.restore();

		msg.send({ files: [{ attachment: canvas.toBuffer(), name: `${user.tag}-profile.png` }] });
		messg.delete().catch((error) => this.client.emit('warn', error));
	}

};
