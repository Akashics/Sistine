const snekfetch = require('snekfetch');
const imageUrlRegex = /.webp$/g;

/**
 * Client for Idiotic-api Wrapper
 */
class IdioticClient {

	/**
   * @param {string} token Idiotic API token
   */
	constructor(token) {
		if (!token) throw new Error('Unknown Token: Token Missing');
		if (typeof token !== 'string') throw new SyntaxError('Invalid Token: Token must be a String');

		/**
         * Idiotic API token
         * @type {String}
         */
		this.token = token;
		/**
         * Base URL for Idiot's Guide API
         * @type {String}
         */
		this.baseUrl = 'https://dev.anidiots.guide/';
	}

	/* Text based endpoints */

	/**
   * Blame endpoint
   * @param {string} name text to except back
   * @returns {Promise<Buffer>}
   */
	blame(name) {
		return this._get('generators/blame', { name }).then(body => Buffer.from(body));
	}

	/**
   * Pls endpoint
   * @param {string} name text to except back
   * @returns {Promise<Buffer>}
   */
	pls(name) {
		return this._get('generators/pls', { name }).then(body => Buffer.from(body));
	}

	/**
   * Snapchat endpoint
   * @param {string} text text to except back
   * @returns {Promise<Buffer>}
   */
	snapchat(text) {
		return this._get('generators/snapchat', { text }).then(body => Buffer.from(body));
	}

	/* Image and Text endpoints */

	/**
   * Achievement endpoint
   * @param {string} avatar Image you except to be used
   * @param {string} text text to except back
   * @returns {Promise<Buffer>}
   */
	achievement(avatar, text) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/achievement', { avatar, text }).then(body => Buffer.from(body));
	}

	/**
   * TheSearch endpoint
   * @param {string} avatar Image you except to be used
   * @param {string} text text to except back
   * @returns {Promise<Buffer>}
   */
	theSearch(avatar, text) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/thesearch', { avatar, text }).then(body => Buffer.from(body));
	}

	/**
   * Missing endpoint
   * @param {string} avatar Image you except to be used
   * @param {string} text text to except back
   * @returns {Promise<Buffer>}
   */
	missing(avatar, text) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/missing', { avatar, text }).then(body => Buffer.from(body));
	}

	/**
   * Steam endpoint
   * @param {string} avatar Image you except to be used
   * @param {string} text text to except back
   * @returns {Promise<Buffer>}
   */
	steam(avatar, text) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/steam', { avatar, text }).then(body => Buffer.from(body));
	}

	/**
   * Suggestion endpoint
   * @param {string} avatar Image you except to be used
   * @param {string} suggestion text to except back
   * @returns {Promise<Buffer>}
   */
	suggestion(avatar, suggestion) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/suggestion', { avatar, suggestion }).then(body => Buffer.from(body));
	}

	/* Single Image endpoints */

	/**
   * Beautiful endpoint
   * @param {string} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
	beautiful(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/beautiful', { avatar }).then(body => Buffer.from(body));
	}

	/**
   * Facepalm endpoint
   * @param {string} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
	facepalm(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/facepalm', { avatar }).then(body => Buffer.from(body));
	}

	/**
   * Respect endpoint
   * @param {string} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
	respect(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/respect', { avatar }).then(body => Buffer.from(body));
	}

	/**
   * Stepped endpoint
   * @param {string} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
	stepped(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/stepped', { avatar }).then(body => Buffer.from(body));
	}

	/**
   * Tattoo endpoint
   * @param {string} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
	tattoo(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/tattoo', { avatar }).then(body => Buffer.from(body));
	}

	/**
   * Triggered endpoint
   * @param {string} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
	triggered(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/triggered', { avatar }).then(body => Buffer.from(body));
	}

	/**
   * VaultBoy endpoint
   * @param {string} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
	vaultBoy(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/vault', { avatar }).then(body => Buffer.from(body));
	}

	/**
   * Wanted endpoint
   * @param {string} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
	wanted(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/wanted', { avatar }).then(body => Buffer.from(body));
	}

	/**
   * Karen endpoint
   * @param {string} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
	karen(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/karen', { avatar }).then(body => Buffer.from(body));
	}

	/**
   * Challenger endpoint
   * @param {string} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
	challenger(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/challenger', { avatar }).then(body => Buffer.from(body));
	}

	/**
   * Bobross endpoint
   * @param {string} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
	bobRoss(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/bobross', { avatar }).then(body => Buffer.from(body));
	}

	/**
   * WaifuInsult endpoint
   * @param {string} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
	waifuInsult(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/waifuinsult', { avatar }).then(body => Buffer.from(body));
	}

	/**
   * HeavyFear endpoint
   * @param {string} avatar Image you expect to be used
   * @returns {Promise<Buffer>}
   */
	heavyFear(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/heavyfear', { avatar }).then(body => Buffer.from(body));
	}

	/**
   * WreckIt endpoint
   * @param {string} avatar Image you expect to be used
   * @returns {Promise<Buffer>}
   */
	wreckIt(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/wreckit', { avatar }).then(body => Buffer.from(body));
	}

	/**
   * Painting endpoint
   * @param {string} avatar Image you expect to be used
   * @returns {Promise<Buffer>}
   */
	painting(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/painting', { avatar }).then(body => Buffer.from(body));
	}

	/**
   * Garbage endpoint
   * @param {string} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
	garbage(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('generators/garbage', { avatar }).then(body => Buffer.from(body));
	}

	/* Double Image endpoints */

	/**
   * BatSlap endpoint
   * @param {string} slapper Image you expect to be used
   * @param {string} slapped Image you expect to be used
   * @returns {Promise<Buffer>}
   */
	batSlap(slapper, slapped) {
		slapper = slapper.replace(imageUrlRegex, '.png');
		slapped = slapped.replace(imageUrlRegex, '.png');
		return this._get('generators/batslap', { slapper, slapped }).then(body => Buffer.from(body));
	}

	/**
   * FanSlap endpoint
   * @param {string} slapper Image you expect to be used
   * @param {string} slapped Image you expect to be used
   * @returns {Promise<Buffer>}
   */
	fanSlap(slapper, slapped) {
		slapper = slapper.replace(imageUrlRegex, '.png');
		slapped = slapped.replace(imageUrlRegex, '.png');
		return this._get('generators/fanslap', { slapper, slapped }).then(body => Buffer.from(body));
	}

	/**
   * SuperPunch endpoint
   * @param {string} puncher Image you expect to be used
   * @param {string} punched Image you expect to be used
   * @returns {Promise<Buffer>}
   */
	superPunch(puncher, punched) {
		puncher = puncher.replace(imageUrlRegex, '.png');
		punched = punched.replace(imageUrlRegex, '.png');
		return this._get('generators/superpunch', { puncher, punched }).then(body => Buffer.from(body));
	}

	/**
   * Crush endpoint
   * @param {string} crusher Image you expect to be used
   * @param {string} crush Image you expect to be used
   * @returns {Promise<Buffer>}
   */
	crush(crusher, crush) {
		crusher = crusher.replace(imageUrlRegex, '.png');
		crush = crush.replace(imageUrlRegex, '.png');
		return this._get('generators/crush', { crusher, crush }).then(body => Buffer.from(body));
	}

	/**
   * Confused endpoint
   * @param {string} avatar Image you expect to be used
   * @param {string} photo Image you expect to be used
   * @returns {Promise<Buffer>}
   */
	confused(avatar, photo) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		photo = photo.replace(imageUrlRegex, '.png');
		return this._get('generators/confused', { avatar, photo }).then(body => Buffer.from(body));
	}

	/**
   * SuperSpank endpoint
   * @param {string} spanker Image you expect to be used
   * @param {string} spanked Image you expect to be used
   * @returns {Promise<Buffer>}
   */
	superSpank(spanker, spanked) {
		spanker = spanker.replace(imageUrlRegex, '.png');
		spanked = spanked.replace(imageUrlRegex, '.png');
		return this._get('generators/superspank', { spanker, spanked }).then(body => Buffer.from(body));
	}

	/**
   * Tinder endpoint
   * @param {string} avatar Image you expect to be used
   * @param {string} match Image you expect to be used
   * @returns {Promise<Buffer>}
   */
	tinderMatch(avatar, match) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		match = match.replace(imageUrlRegex, '.png');
		return this._get('generators/tinder', { avatar, match }).then(body => Buffer.from(body));
	}

	/* Greetings endpoints */

	/**
   * @param {string} [version="gearz"] The type/version of greeting image you want to use
   * @param {boolean} [bot=false] A boolean saying if the user is a bot or not
   * @param {string} avatar Avatar url
   * @param {string} usertag User's tag, format: username#discrim
   * @param {string} guild guild name and guild member count seperated by #, format: guildname#memberCount
   * @returns {Promise<Buffer>}
   */
	welcome(version = 'gearz', bot = false, avatar, usertag, guild) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get(`greetings/${version}_welcome`, { bot, avatar, usertag, guild }).then(body => Buffer.from(body));
	}

	/* Farewell endpoints */

	/**
   * @param {string} [version="gearz"] The type/version of farewell image you want to use
   * @param {boolean} [bot=false] A boolean saying if the user is a bot or not
   * @param {string} avatar Avatar url
   * @param {string} usertag User's tag, format: username#discrim
   * @returns {Promise<Buffer>}
   */
	goodbye(version = 'gearz', bot = false, avatar, usertag) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get(`greetings/${version}_goodbye`, { bot, avatar, usertag }).then(body => Buffer.from(body));
	}

	/* Filter endpoints */

	brightness(avatar, brightness) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('effects/brightness', { avatar, brightness }).then(body => Buffer.from(body));
	}

	darkness(avatar, darkness) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('effects/darkness', { avatar, darkness }).then(body => Buffer.from(body));
	}

	greyscale(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('effects/greyscale', { avatar }).then(body => Buffer.from(body));
	}

	invert(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('effects/invert', { avatar }).then(body => Buffer.from(body));
	}

	iGrey(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('effects/invertGreyscale', { avatar }).then(body => Buffer.from(body));
	}

	iThreshold(avatar, threshold) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('effects/invertThreshold', { avatar, threshold }).then(body => Buffer.from(body));
	}

	sepia(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('effects/sepia', { avatar }).then(body => Buffer.from(body));
	}

	silhouette(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('effects/silhouette', { avatar }).then(body => Buffer.from(body));
	}

	threshold(avatar, threshold) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('effects/threshold', { avatar, threshold }).then(body => Buffer.from(body));
	}

	/* Overlays */

	rainbow(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('overlays/rainbow', { avatar }).then(body => Buffer.from(body));
	}

	approved(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('overlays/approved', { avatar }).then(body => Buffer.from(body));
	}

	rejected(avatar) {
		avatar = avatar.replace(imageUrlRegex, '.png');
		return this._get('overlays/rejected', { avatar }).then(body => Buffer.from(body));
	}

	/**
   * A private method used to get endpoints with querys
   * @param {string} endpoint endpoint string
   * @param {Object} [query={}] query object
   * @returns {Promise<any>}
   * @private
   */
	_get(endpoint, query = {}) {
		return new Promise((resolve, reject) => {
			snekfetch.get(`${this.baseUrl}${endpoint}`)
				.set('Authorization', this.token)
				.query(query)
				.then(res => {
					if (res.status !== 200) return reject(res);
					return resolve(res.body);
				}).catch(err => reject(err));
		});
	}

}

module.exports = IdioticClient;
