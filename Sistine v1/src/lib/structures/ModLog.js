/*
https://github.com/kyranet/Posrednik
MIT License

Copyright (c) 2017-2018 kyraNET

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
const { KlasaGuild, Client, KlasaUser, KlasaMessage, Provider } = require("klasa"); // eslint-disable-line
const { MessageEmbed } = require("discord.js"); // eslint-disable-line

/**
 * The ModLog class for handling moderation.
 */
class ModLog {

	/**
     * Starts a new ModLog action
     * @param {KlasaGuild} - The guild the ModLog action happened in.
     */

	constructor(guild) {
		/**
         * The guild class for this ModLog Action
         * @type {KlasaGuild}
         */
		this.guild = guild;
		/**
         * The Client for this ModLog action
         * @type {Client}
         */
		this.client = guild.client;

		/**
         * The type of action
         * @type {string}
         */
		this.type = null;
		/**
         * The user the action is taken on
         * @type {?Object}
         */
		this.user = null;
		/**
         * The moderator for this ModLog action
         * @type {?Object}
         */
		this.moderator = null;
		/**
         * The reason for this ModLog action
         * @type {string}
         */
		this.reason = null;
		/**
         * The case number for this ModLog action
         * @type {number}
         */
		this.case = null;
	}
	/**
     * Sets the type of action for this ModLog action
     * @param {string} type - The type of action
     * @returns {ModLog}
     */
	setType(type) {
		this.type = type;
		return this;
	}
	/**
     * Sets the user that the ModLog action will be done on.
     * @param {KlasaUser} user - The user for the ModLog action.
     * @returns {ModLog}
     */
	setUser(user) {
		this.user = {
			id: user.id,
			tag: user.tag
		};

		return this;
	}
	/**
     * sets the moderator for this ModLog action
     * @param {KlasaUser} user - A Discord.js#User class
     * @returns {ModLog}
     */
	setModerator(user) {
		this.moderator = {
			id: user.id,
			tag: user.tag,
			avatar: user.displayAvatarURL()
		};
		return this;
	}
	/**
     * Sets the reason for this ModLog action
     * @param {string|Array<SString>} reason - The reason for this ModLog action can be a String or Array
     * @returns {ModLog}
     */
	setReason(reason = null) {
		if (Array.isArray(reason)) reason = reason.join(' ');
		this.reason = reason;
		return this;
	}
	/**
     * Sends the ModLog#embed to the modlog channel
     * @returns {KlasaMessage}
     */
	async send() {
		const channel = this.guild.channels.get(this.guild.configs.channels.modlogs);
		if (!channel) throw 'The modlog channel does not exist, did it get deleted?';
		this.case = await this.getCase();
		return channel.send({ embed: this.embed });
	}
	/**
     * Embed object
     * @readonly
     * @type {MessageEmbed}
     */
	get embed() {
		const embed = new MessageEmbed()
			.setAuthor(this.moderator.tag, this.moderator.avatar)
			.setColor(ModLog.colour(this.type))
			.setDescription(`
**Type**: ${this.type}
**User**: ${this.user.tag} (${this.user.id})
**Reason**: ${this.reason || `Use \`${this.guild.configs.prefix}reason ${this.case} to claim this log.\``}
`)
			.setFooter(`Case ${this.case}`)
			.setTimestamp();
		return embed;
	}
	/**
     * Gets the case number for the ModLog action
     * @returns {Promise<number>}
     */
	async getCase() {
		const modlogs = await this.provider.get('modlogs', this.guild.id);
		if (!modlogs) return this.provider.create('modlogs', this.guild.id, { logs: [this.pack] }).then(() => 0);
		this.case = modlogs.logs.length - 1;
		modlogs.logs.push(this.pack);
		await this.provider.replace('modlogs', this.guild.id, modlogs);
		return modlogs.logs.length - 1;
	}
	/**
     * Pack object
     * @readonly
     * @type {Object}
     * @returns {Object}
     */
	get pack() {
		return {
			type: this.type,
			user: {
				id: this.user.id,
				tag: this.user.tag
			},
			moderator: this.moderator,
			reason: this.reason,
			case: this.case || 0
		};
	}
	/**
     * JSON provider
     * @readonly
     * @type {Provider}
     * @returns {Provider}
     */
	get provider() {
		return this.client.providers.get('rethinkdb');
	}
	/**
     * Returns the hex color code according the the type provided
     * @param {string} type - The type of action
     * @returns {number}
     */
	static colour(type) {
		switch (type) {
			case 'ban': return 16724253;
			case 'unban': return 1822618;
			case 'warn': return 16564545;
			case 'kick': return 16573465;
			case 'softban': return 15014476;
			default: return 16777215;
		}
	}

}

module.exports = ModLog;
