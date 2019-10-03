const { Command, Extendable } = require('klasa');
const snekfetch = require('snekfetch');

module.exports = class extends Extendable {

	constructor(...args) {
		super(...args, { appliesTo: [Command] });
	}

	fetchURL(url, { method = 'get', headers = {}, query = {} } = {}) {
		return new Promise((resolve, reject) => snekfetch[method](url).set(headers).query(query)
			.then(res => {
				if (res.status !== 200) return reject(res);
				return resolve(res);
			})
			.catch(error => {
				Error.captureStackTrace(error);
				return reject(error);
			}));
	}

};
