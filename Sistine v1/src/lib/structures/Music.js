const { showSeconds } = require('../util/Util');
/**
 * Used for easy access to infomation about a lavalink track.
 */
class Song {

	/**
     * @typedef {Object} LavalinkTrack
     * @property {string} track Base64 track string from Lavalink REST API
     * @property {LavalinkTrackInfo} info A bunch of info relating to the track
     */

	/**
      * @typedef {Object} LavalinkTrackInfo
      * @property {string} identifier The track identifier depending on the source
      * @property {boolean} isSeekable Whether the track is seekable or not
      * @property {string} author Author of the track
      * @property {number} length length aka duration of the track
      * @property {boolean} isStream Whether the track is a stream or not
      * @property {number} position Position of the track to start at
      * @property {string} title Title of the track
      * @property {string} uri Url of the track
      */

	/**
     * @typedef {Object} SongInfo
     * @property {string} track Base64 track string from Lavalink REST API
     * @property {string} title Song title
     * @property {string} url Song URL
     * @property {string} id Song id
     * @property {boolean} seekable Whether the song is seekable or not
     * @property {string} author Author of the song
     * @property {number} duration Length of the song
     * @property {string} friendlyDuration Friendly format of the song duration
     * @property {boolean} stream Whether the song is a stream or not
     * @property {number} position Position of the song to start at
     */

	/**
     * @param {LavalinkTrack} data Track data from Lavalink
     * @param {User} requester Person who requested the track
     */
	constructor(data, requester) {
		/**
         * The actual data object
         * @type {LavalinkTrack}
         * @private
         */
		Object.defineProperty(this, 'data', { value: data });
		/**
         * The member who requested the song
         * @type {User}
         */
		this.requester = requester;
		/**
         * Base64 track string from Lavalink REST API
         * @type {string}
         */
		this.track = data.track;

		/**
         * Song title
         * @type {string}
         */
		this.title = data.info.title;
		/**
         * Song url
         * @type {string}
         */
		this.url = data.info.uri;
		/**
         * Song id
         * @type {string}
         */
		this.id = data.info.identifier;
		/**
         * Whether the song is seekable or not
         * @type {boolean}
         */
		this.seekable = data.info.isSeekable;
		/**
         * Song channel name
         * @type {string}
         */
		this.author = data.info.author;
		/**
         * Song length aka duration
         * @type {number}
         */
		this.duration = data.info.isStream ? 0 : data.info.length;
		/**
         * Whether the song is a stream or not
         * @type {boolean}
         */
		this.stream = data.info.isStream;
		/**
         * The position the song will start at
         * @type {number}
         */
		this.position = data.info.position;
		/**
         * The amount of skips for the song
         * @type {Set}
         */
		this.skips = new Set();
	}

	/**
     * Friendly format of the song duration
     * @type {string}
     * @readonly
     */
	get friendlyDuration() {
		return showSeconds(this.duration);
	}

	/**
     * Really? Well its just a function incase someone uses this in a string okay!!!
     * @returns {string}
     */
	toString() {
		return `${this.title} (${this.url})`;
	}

	/**
     * Used for the point if someone tried to JSON.stringify this class
     * @returns {SongInfo}
     */
	toJSON() {
		return {
			requester: this.requester ? this.requester.toJSON() : null,
			track: this.track,
			title: this.title,
			url: this.url,
			id: this.id,
			seekable: this.seekable,
			author: this.author,
			duration: this.duration,
			friendlyDuration: this.friendlyDuration,
			stream: this.stream,
			position: this.position
		};
	}

}

module.exports = Song;
