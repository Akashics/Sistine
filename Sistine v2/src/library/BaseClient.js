const { Client } = require('klasa');
const Idiotic = require('idiotic-api');
const { StatsD } = require('node-dogstatsd');

const config = require('../../config');
const permissionLevels = require('./BasePermissions');
const MusicManager = require('./Music/MusicManager');

const defaultGuildSchema = require('./Schematics/Guild');
const defaultUserSchema = require('./Schematics/User');
const defaultClientSchema = require('./Schematics/Client');

const RawEventStore = require('./RawEvent/RawEventStore');

Client.use(require('klasa-member-gateway'));
Client.use(require('klasa-dashboard-hooks'));

require('./GuildExtension');


class Bot extends Client {

	constructor(options) {
		super({
			...options,
			permissionLevels,
			defaultGuildSchema,
			defaultUserSchema,
			defaultClientSchema
		});

		this.config = config;
		this.settings = config;

		this.methods = require('./ClientMethods');

		this.music = new MusicManager();
		this.stats = new StatsD();
		
		this.spotifyToken = '';
		this.idioticAPI = new Idiotic.Client(config.idioticapi, { dev: true });

		this.rawevents = new RawEventStore(this);
		this.registerStore(this.rawevents);

	        this.health = Object.seal({
        	    commands: {
                	temp: {
                    		count: 0,
                    		ran: {}
                	},
                	cmdCount: new Array(60).fill({
                    		count: 0,
                    		ran: {}
                		})
            		}
        	});
		this.dogstats = new StatsD('localhost', 8125);

		this.version = "4.0.0";
		this.userAgent = `Senko-san/${this.version}/${this.options.production ? "Prod" : "Dev"}`;
	}

}

Bot.token = config.token;
module.exports = Bot;
