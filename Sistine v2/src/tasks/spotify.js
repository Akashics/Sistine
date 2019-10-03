/* eslint-disable camelcase */
const { Task } = require('klasa');
const { post } = require('snekfetch');
const fetch = require('node-fetch');

module.exports = class extends Task {

	constructor(...args) {
		super(...args, { name: 'spotify' });
	}

	async run() {
		const res = await post(`https://accounts.spotify.com/api/token`, {
			data: {
				grant_type: 'client_credentials'
			},
			headers: {
				Authorization: `Basic ${Buffer.from(`${this.client.config.spotify.id}:${this.client.config.spotify.secret}`).toString('base64')}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});

		if (res.status !== 200) return;
		this.client.config.spotify.token = res.body.access_token;
	}

	async init() {
		if (!this.client.settings.schedules.some(schedule => schedule.taskName === this.name)) {
			await this.client.schedule.create(this.name, '*/45 * * * *');
		}
	}

};
