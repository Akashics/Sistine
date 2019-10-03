const { Collection } = require('discord.js');
/**
 * The afk class used to handle afk users
 */
class Afk {

	/**
     * @param {Client} client Client that initilized the Class
     */
	constructor(client) {
		/**
         * The client that initilized the class
         * @type {Client}
         * @private
         */
		Object.defineProperty(this, 'client', { value: client });
		/**
         * Collection of Afk users
         * @type {Collection<string, Object>}
         */
		this.users = new Collection();
	}
	/**
     * gets the user from cache
     * @param {string} user user id
     * @returns {Promise<any>}
     */
	async get(user) {
		const has = await this.has(user);
		if (!has) return null;
		if (this.users.has(user)) return this.users.get(user);
		return this.provider.get('afks', user).catch(() => null);
	}

	/**
     * Used to set a user to afk status
     * @param {string} user user id
     * @param {string} message afk message
     * @returns {Promise<boolean>}
     */
	async set(user, message) {
		if (this.users.has(user)) return false;
		this.users.set(user, { message, time: Date.now() });
		const afk = await this.provider.get('afks', user);
		if (afk) return false;
		if (!afk) return this.provider.create('afks', user, { message, time: Date.now() }).then(() => true);
		return false;
	}

	/**
     * deletes a user from cache and the db
     * @param {string} user user id
     * @returns {Promise<boolean>}
     */
	async delete(user) {
		const has = await this.has(user);
		if (!has) return false;
		if (this.users.has(user)) this.users.delete(user);
		await this.provider.delete('afks', user);
		return true;
	}

	/**
     * checks if the user is afk or not
     * @param {string} user user id
     * @returns {Promise<boolean>}
     */
	async has(user) {
		const cache = this.users.has(user);
		const db = await this.provider.has('afks', user);

		if (cache && db) return true;
		if (!cache && db) return true;
		if (cache && !db) return false;
		return false;
	}

	/**
     * Provider used for handling afk users
     * @type {Provider}
     * @readonly
     */
	get provider() {
		return this.client.providers.get('rethinkdb');
	}

}

module.exports = Afk;
