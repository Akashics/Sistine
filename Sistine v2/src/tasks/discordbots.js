const { Task } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Task {

        async run() {
            if (!this.client.ready) return;

            let [ guilds, vc, users ] = [ 0 , 0 , 0 ];
            let [guilds, vc, users] = [0, 0, 0];
            const results = await this.client.shard.broadcastEval(`[this.guilds.reduce((prev, val) => val.memberCount + prev, 0), this.guilds.size, this.music.filter(music => music.playing).size]`);
            for (const result of results) {
                users += result[0];
                guilds += result[1];
                vc += result[2];
            }

            const stats = { server_count: guilds, shard_count: this.client.shard.shardCount };

            return Promise.all([
                fetch(`https://discordbots.org/api/bots/${this.client.user.id}/stats`, { method: 'POST', body: JSON.stringify(stats), headers: { 'Content-Type': 'application/json', 'Authorization': this.client.config.discordbots }})
            ])
        }

	async init() {

		if (config.production && !this.client.settings.schedules.some(task => task.taskName === "stats")) {
            		await this.client.schedule.create("stats", "*/20 * * * *");
        	}
	}

}
