const { Event } = require('klasa');

const MusicClient = require('../lib/structures/LavalinkClient');
const LavalinkPlayer = require('../lib/structures/LavalinkPlayer');
const DashboardHooks = require('../lib/structures/DashboardHook');

/* eslint-disable no-new */
module.exports = class Ready extends Event {

	async run() {
		this.client.setMaxListeners(50);
		this.client.lavalink = new MusicClient(this.client, this.client.settings.lavalink.nodes, {
			user: this.client.user.id,
			shards: this.client.shard ? this.client.shard.count : 1,
			rest: this.client.settings.lavalink.restnode,
			player: LavalinkPlayer
		});
		this.client.emit('log', '[MUSIC] Manager hook has been enabled.');

		if (this.client.shard.id === 0) new DashboardHooks(this.client, { port: 6565 });


		setInterval(async () => {
			const serverCount = await this.client.shard.fetchClientValues('guilds.size').then(number => number.reduce((prev, val) => prev + val, 0));
			this.client.user.setPresence({ activity: { application: '353929487018229762', name: `${serverCount.toLocaleString()} guilds | https://sistine.ml/`, type: 3 } })
				.catch((err) => {
					this.client.emit('log', err, 'error');
				});
		}, 900000);
	}

};

