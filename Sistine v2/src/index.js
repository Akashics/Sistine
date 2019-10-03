const { ShardingManager } = require('kurasuta');
const { join } = require('path');

const settings = require('../config.js');
const BaseClient = require('./library/BaseClient');

const Sharder = new ShardingManager(join(__dirname, 'Client'), {
	token: settings.token,
	client: BaseClient,
	clientOptions: {
		disableEveryone: true,
		commandEditing: true,
		commandLogging: true,
		regexPrefix: /^((?:Hey |Ok )?Senko-san(?:,|!| ))/i,
		console: { useColor: true, timestamps: 'MM-DD-YYYY hh:mm:ss A', utc: false },
		prefixCaseInsensitive: true,
		noPrefixDM: true,
		prefix: 's>',
		pieceDefaults: {
			commands: { deletable: true, cooldown: 3, quotedStringSupport: true, bucket: 2 }
		},
		readyMessage: (client) => `[ ✔ ] Shard ${client.shard.id + 1} out of ${client.shard.shardCount} is ready. ${client.guilds.size.toLocaleString()} guilds & ${client.users.size.toLocaleString()} users loaded.`,
		disabledEvents: [
			'CHANNEL_PINS_UPDATE',
			'USER_NOTE_UPDATE',
			'RELATIONSHIP_ADD',
			'RELATIONSHIP_REMOVE',
			'USER_SETTINGS_UPDATE',
			'VOICE_SERVER_UPDATE',
			'TYPING_START',
			'PRESENCE_UPDATE'
		],
		aliasFunctions: { returnRun: true, enabled: true, prefix: 'funcs' },
		dashboardHooks: { apiPrefix: '/', port: 7575 },
		typing: true,
		production: true,
		providers: { default: 'rethinkdb', rethinkdb: { db: 'sistine' }}
	},
	development: false
});

Sharder.on('debug', (log) => console.log(log));

Sharder.spawn();
