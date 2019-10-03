/* eslint-disable consistent-return */
const { Monitor } = require('klasa');
const inviteRegex = /(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/;

module.exports = class extends Monitor {

	constructor(...args) {
		super(...args, {
			ignoreBots: false,
			ignoreSelf: true,
			ignoreOthers: false });
	}

	async run(msg) {
		if (!msg.guild || !msg.guild.settings.automod.invites) return;
		if (await msg.hasAtLeastPermissionLevel(4)) return;
		if (!inviteRegex.test(msg.content)) return;
		if (!msg.deletable) return;
		return msg.delete().catch(err => this.client.emit('log', err, 'error'));
	}

};
