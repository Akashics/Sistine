const { Command } = require('klasa');
const { RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'USE_EXTERNAL_EMOJIS', 'MANAGE_ROLES'],
			aliases: ['selfrole', 'iam'],
			cooldown: 5,
			permissionLevel: 0,
			description: language => language.get('COMMAND_SELFROLES'),
			extendedHelp: 'No extended help available.',
			usage: '<add|remove|list> [role:rolename]',
			usageDelim: ' ',
			subcommands: true
		});
	}

	async list(msg) {
		const { roles } = msg.guild.settings.selfroles;
		if (!roles.length) return msg.send(msg.language.get('MANAGEROLE_NOSELFROLES'));
		const pages = new RichDisplay(new MessageEmbed()
			.setTitle(msg.language.get('MUSICIF_QUEUE_TITLE'))
			.setAuthor(msg.language.get('SELF_ROLES'), msg.author.displayAvatarURL())
			.setDescription(msg.language.get('MUSICIF_QUEUE_HINT'))
			.setColor('#2C2F33')
		);
		pages.addPage(tab => tab.setDescription(roles.map(role => `\`-\` ${msg.guild.roles.get(role) || msg.language.get('ROLEREMOVED')}`).join('\n')));

		return pages.run(await msg.send(msg.language.get('LOADINGROLES')), {
			time: 120000,
			filter: (reaction, user) => user === msg.author
		});
	}

	async add(msg, [role]) {
		const { roles } = msg.guild.settings.selfroles;
		if (!roles) return msg.send(msg.language.get('MANAGEROLE_NOSELFROLES'));
		if (!role || !roles.includes(role.id)) return msg.send(msg.language.get('ROLEME_NOROLES'));

		const myRole = msg.guild.me.roles.highest;
		if (role.position > myRole.position) return msg.send(msg.language.get('ROLEME_SETUPERROR'));
		if (msg.member.roles.has(role)) return msg.send(msg.language.get('ROLEME_ALREADYHAS', msg.guildSettings.prefix, role.name, true));

		const assigned = await msg.member.roles.add(role, 'Self Assigned').catch(() => null);
		if (!assigned) return msg.send(msg.language.get('GENERIC_DISCORD_ERROR'));
		return msg.send(msg.language.get('ROLEME_ASSIGNED', true));
	}

	async remove(msg, [role]) {
		const { roles } = msg.guild.settings.selfroles;
		if (!roles) return msg.send(msg.language.get('MANAGEROLE_NOSELFROLES'));
		if (!role || !roles.includes(role.id)) return msg.send(msg.language.get('ROLEME_NOROLES'));
		if (!roles.includes(role.id)) return msg.send(`｢ **Error** ｣ That given role is not self assignable do \`${msg.guildSettings.prefix}roleme list\` to know all the self assignable roles.`);

		const myRole = msg.guild.me.roles.highest;
		if (role.position > myRole.position) return msg.send(msg.language.get('ROLEME_SETUPERROR'));
		if (msg.member.roles.has(role)) return msg.send(msg.language.get('ROLEME_ALREADYHAS', msg.guildSettings.prefix, role.name, false));

		const assigned = await msg.member.roles.remove(role, 'Self Deassigned').catch(() => null);
		if (!assigned) return msg.send(msg.language.get('GENERIC_DISCORD_ERROR'));
		return msg.send(msg.language.get('ROLEME_ASSIGNED', false));
	}

};
