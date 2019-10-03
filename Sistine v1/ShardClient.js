if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.');
require('./preloader');

const Discord = require('discord.js');
const log = require('./src/lib/util/logger');
const settings = require('./settings.js');

const Manager = new Discord.ShardingManager('./Construct.js', {
	totalShards: 'auto',
	token: settings.token,
	respawn: true
});

Manager.on('shardCreate', (shard) => {
	log(`🐦  Shard ${shard.id + 1}/${Manager.totalShards} was launched.`);
});

Manager.spawn();
