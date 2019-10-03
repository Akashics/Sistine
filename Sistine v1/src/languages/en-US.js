const { Language, Duration, util } = require('klasa');

/* eslint-disable max-len */

const EIGHT_BALL = [
	'Maybe.',
	'Certainly not.',
	'I hope so.',
	'Not in your wildest dreams.',
	'There is a good chance.',
	'Quite likely.',
	'I think so.',
	'I hope not.',
	'I hope so.',
	'Never!',
	'Fuhgeddaboudit.',
	'Ahaha! Really?!?',
	'Pfft.',
	'Sorry, bucko.',
	'Hell, yes.',
	'Hell to the no.',
	'The future is bleak.',
	'The future is uncertain.',
	'I would rather not say.',
	'Who cares?',
	'Possibly.',
	'Never, ever, ever.',
	'There is a small chance.',
	'Yes!'
];

const COMPLIMENTS = [
	'Your smile is contagious.',
	'You look great today.',
	"You're a smart cookie.",
	'I bet you make babies smile.',
	'You have impeccable manners.',
	'I like your style.',
	'You have the best laugh.',
	'I appreciate you.',
	'You are the most perfect you there is.',
	'You are enough.',
	"You're strong.",
	'Your perspective is refreshing.',
	"You're an awesome friend.",
	'You light up the room.',
	'You shine brighter than a shooting star.',
	'You deserve a hug right now.',
	'You should be proud of yourself.',
	"You're more helpful than you realize.",
	'You have a great sense of humor.',
	"You've got all the right moves!",
	"Is that your picture next to 'charming' in the dictionary?",
	'Your kindness is a balm to all who encounter it.',
	"You're all that and a super-size bag of chips.",
	"On a scale from 1 to 10, you're an 11.",
	'You are brave.',
	"You're even more beautiful on the inside than you are on the outside.",
	'You have the courage of your convictions.',
	'Your eyes are breathtaking.',
	'If cartoon bluebirds were real, a bunch of them would be sitting on your shoulders singing right now.',
	'You are making a difference.',
	"You're like sunshine on a rainy day.",
	'You bring out the best in other people.',
	'Your ability to recall random factoids at just the right time is impressive.',
	"You're a great listener.",
	'How is it that you always look great, even in sweatpants?',
	'Everything would be better if more people were like you!',
	'I bet you sweat glitter.',
	'You were cool way before hipsters were cool.',
	'That color is perfect on you.',
	'Hanging out with you is always a blast.',
	'You always know -- and say -- exactly what I need to hear when I need to hear it.',
	'You smell really good.',
	"You may dance like no one's watching, but everyone's watching because you're an amazing dancer!",
	'Being around you makes everything better!',
	"When you say, 'I meant to do that,' I totally believe you.",
	"When you're not afraid to be yourself is when you're most incredible.",
	"Colors seem brighter when you're around.",
	"You're more fun than a ball pit filled with candy. (And seriously, what could be more fun than that?)",
	"That thing you don't like about yourself is what makes you so interesting.",
	"You're wonderful.",
	'You have cute elbows. For reals!',
	'Jokes are funnier when you tell them.',
	"You're better than a triple-scoop ice cream cone. With sprinkles.",
	'Your bellybutton is kind of adorable.',
	'Your hair looks stunning.',
	"You're one of a kind!",
	"You're inspiring.",
	"If you were a box of crayons, you'd be the giant name-brand one with the built-in sharpener.",
	'You should be thanked more often. So thank you!!',
	"Our community is better because you're in it.",
	"Someone is getting through something hard right now because you've got their back.",
	'You have the best ideas.',
	'You always know how to find that silver lining.',
	'Everyone gets knocked down sometimes, but you always get back up and keep going.',
	"You're a candle in the darkness.",
	"You're a great example to others.",
	'Being around you is like being on a happy little vacation.',
	'You always know just what to say.',
	"You're always learning new things and trying to better yourself, which is awesome.",
	'If someone based an Internet meme on you, it would have impeccable grammar.',
	'You could survive a Zombie apocalypse.',
	"You're more fun than bubble wrap.",
	'When you make a mistake, you fix it.',
	'Who raised you? They deserve a medal for a job well done.',
	"You're great at figuring stuff out.",
	'Your voice is magnificent.',
	'The people you love are lucky to have you in their lives.',
	"You're like a breath of fresh air.",
	"You're gorgeous -- and that's the least interesting thing about you, too.",
	"You're so thoughtful.",
	'Your creative potential seems limitless.',
	'Your name suits you to a T.',
	"You're irresistible when you blush.",
	'Actions speak louder than words, and yours tell an incredible story.',
	'Somehow you make time stop and fly at the same time.',
	'When you make up your mind about something, nothing stands in your way.',
	'You seem to really know who you are.',
	'Any team would be lucky to have you on it.',
	"In high school, I bet you were voted 'most likely to keep being awesome.'",
	'I bet you do the crossword puzzle in ink.',
	'Babies and small animals probably love you.',
	"If you were a scented candle they'd call it Perfectly Imperfect (and it would smell like summer).",
	"There's ordinary, and then there's you.",
	"You're someone's reason to smile.",
	"You're even better than a unicorn, because you're real.",
	'How do you keep being so funny and making everyone laugh?',
	'You have a good head on your shoulders.',
	'Has anyone ever told you that you have great posture?',
	'The way you treasure your loved ones is incredible.',
	"You're really something special.",
	"You're a gift to those around you.",
	'You must be the new Mary Poppins!',
	"Google doesn't seem to find an answer for you, so mysterious."
];

const ROASTS = [
	'*puts you in the oven*',
	"You're so stupid.",
	"Sorry, I can't hear you over how annoying you are.",
	"I've got better things to do.",
	"You're as dumb as Cleverbot.",
	'Your IQ is lower than the Mariana Trench.',
	"You're so annoying even the flies stay away from your stench.",
	'Go away, please.',
	"I'd give you a nasty look but you've already got one.",
	"If you think nobody cares if you're alive, try missing a couple of car payments.",
	'It looks like your face caught fire and someone tried to put it out with a hammer.',
	'Your family tree must be a cactus because everyone on it is a prick.',
	'Someday you will go far, and I hope you stay there.',
	"The zoo called. They're wondering how you got out of your cage.",
	'I was hoping for a battle of wits, but you appear to be unarmed.',
	'You are proof that evolution can go in reverse.',
	"Brains aren't everything, in your case, they're nothing.",
	"Sorry I didn't get that, I don't speak idiot.",
	'Why is it acceptable for you to be an idiot, but not for me to point it out?',
	'We all sprang from apes, but you did not spring far enough.',
	"You're an unknown command.",
	"If you could go anywhere I chose, I'd choose dead.",
	'Even monkeys can go to space, so clearly you lack some potential.',
	"It's brains over brawn, yet you have neither.",
	'You look like a monkey, and you smell like one too.',
	"Even among idiots you're lacking.",
	"You fail even when you're doing absolutely nothing.",
	"If there was a vote for 'least likely to succeed' you'd win first prize.",
	"I'm surrounded by idiots... Or, wait, that's just you.",
	"I wanna go home. Well, really I just want to get away from the awful aroma you've got going there.",
	'Every time you touch me I have to go home and wash all my clothes nine times just to get a normal smell back.',
	"If I had a dollar for every brain you don't have, I'd have one dollar.",
	"I'd help you succeed but you're incapable.",
	'Your hairline is built like a graph chart, positive and negative forces attract but the clippers and your hair repel',
	'I know a good joke! You!',
	'I bet your shower head gets a lot more action than you.',
	'You look like you travel by a shipping container.',
	'Your face says 16 and pregnant, but your outfit says middle-aged divorcee on eharmony',
	'You look like the failed first draft of a Final Fantasy character.',
	"Your mom puts 'folded flag' on her Christmas list.",
	"You might as well be an extra from 'Orange Is The New Black'",
	'What happened to your face, it looks like it was beaten with a used chalkboard eraser.',
	"You look like the textures on your face haven't finished loading yet.",
	"I'm not really looking for any roasting right now. Let's just be friends.",
	'Party-size is the closest you will ever be to a party.',
	'You look like a rich kid pretending to be homeless.',
	"Are you sure you're in the right place? Roast does not mean we give you a roast.",
	'You earned a freebie. Roast free, for now...',
	'Not even atoms like to bond with you, and they make up everything.',
	"You're so ugly, all reflective surfaces perish around you.",
	"You taste just like my grandma's lemonade, She never did make good lemonade.",
	'You have the right to remain silent because whatever you say will probably be stupid anyway.'
];

const PINGS = [
	'Ugh, again? You always ask, and I tell you that I responded in {{ms}}ms',
	'B-baka, I responded... just in {{ms}}ms.',
	'H-here you go, I responded in {{ms}}ms.',
	'Here you go, not that it was worth my time. It only took me {{ms}}ms.',
	'Is this right? I\'ve responded in {{ms}}ms.',
	'{{user}}?, I\'ve responded in {{ms}}ms.',
	'{{user}}! You wasted {{ms}}ms of my time, ERGH.',
	'D-did I do it right? I responded in {{ms}}ms.',
	'I am here {{user}}, it only took me {{ms}}ms to respond!',
	'You made me {{ms}}ms older - just from asking!',
	'You didn\'t even bother to say "Hi", yet you want to know that I can respond in {{ms}}ms?!?!',
	'I just wanted to call to let you know that I\'ll be leaving the airport in {{ms}}ms.',
	'If you do the math correctly, you can obviously see that I responded in {{ms}} ms.',
	'Do you know how long it took to me to read that message? You pretty much wasted {{ms}}ms of my day!'
];


const PERMS = {
	ADMINISTRATOR: 'Administrator',
	VIEW_AUDIT_LOG: 'View Audit Log',
	MANAGE_GUILD: 'Manage Server',
	MANAGE_ROLES: 'Manage Roles',
	MANAGE_CHANNELS: 'Manage Channels',
	KICK_MEMBERS: 'Kick Members',
	BAN_MEMBERS: 'Ban Members',
	CREATE_INSTANT_INVITE: 'Create Instant Invite',
	CHANGE_NICKNAME: 'Change Nickname',
	MANAGE_NICKNAMES: 'Manage Nicknames',
	MANAGE_EMOJIS: 'Manage Emojis',
	MANAGE_WEBHOOKS: 'Manage Webhooks',
	VIEW_CHANNEL: 'Read Messages',
	SEND_MESSAGES: 'Send Messages',
	SEND_TTS_MESSAGES: 'Send TTS Messages',
	MANAGE_MESSAGES: 'Manage Messages',
	EMBED_LINKS: 'Embed Links',
	ATTACH_FILES: 'Attach Files',
	READ_MESSAGE_HISTORY: 'Read Message History',
	MENTION_EVERYONE: 'Mention Everyone',
	USE_EXTERNAL_EMOJIS: 'Use External Emojis',
	ADD_REACTIONS: 'Add Reactions',
	CONNECT: 'Connect',
	SPEAK: 'Speak',
	MUTE_MEMBERS: 'Mute Members',
	DEAFEN_MEMBERS: 'Deafen Members',
	MOVE_MEMBERS: 'Move Members',
	USE_VAD: 'Use Voice Activity'
};

const STATUSES = {
	online: '<:online:313956277808005120> Online',
	idle: '<:away:313956277220802560> Idle',
	dnd: '<:dnd:313956276893646850> Do Not Disturb',
	offline: '<:offline:313956277237710868> Offline'
};

module.exports = class enUSLang extends Language {

	constructor(...args) {
		super(...args);
		this.EIGHT_BALL = EIGHT_BALL;
		this.COMPLIMENTS = COMPLIMENTS;
		this.ROASTS = ROASTS;
		this.PERMISSIONS = PERMS;
		this.STATUSES = STATUSES;
		this.PINGS = PINGS;
		this.HUMAN_LEVELS = [
			'None',
			'Low',
			'Medium',
			'(╯°□°）╯︵ ┻━┻',
			'┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
		];

		this.EXPLICITLEVELS = [
			'Off',
			'No Role',
			'Everyone'
		];

		this.language = {
			DEFAULT: (key) => `${key} has not been localized for en-US yet.`,
			DEFAULT_LANGUAGE: 'Default Language',
			SETTING_GATEWAY_EXPECTS_GUILD: 'The parameter <Guild> expects either a Guild or a Guild Object.',
			SETTING_GATEWAY_VALUE_FOR_KEY_NOEXT: (data, key) => `The value ${data} for the key ${key} does not exist.`,
			SETTING_GATEWAY_VALUE_FOR_KEY_ALREXT: (data, key) => `The value ${data} for the key ${key} already exists.`,
			SETTING_GATEWAY_SPECIFY_VALUE: 'You must specify the value to add or filter.',
			SETTING_GATEWAY_KEY_NOT_ARRAY: (key) => `The key ${key} is not an Array.`,
			SETTING_GATEWAY_KEY_NOEXT: (key) => `The key ${key} does not exist in the current data schema.`,
			SETTING_GATEWAY_INVALID_TYPE: 'The type parameter must be either add or remove.',
			RESOLVER_INVALID_PIECE: (name, piece) => `${name} must be a valid ${piece} name.`,
			RESOLVER_INVALID_MSG: (name) => `${name} must be a valid message id.`,
			RESOLVER_INVALID_USER: (name) => `${name} must be a mention or valid user id.`,
			RESOLVER_INVALID_MEMBER: (name) => `${name} must be a mention or valid user id.`,
			RESOLVER_INVALID_CHANNEL: (name) => `${name} must be a channel tag or valid channel id.`,
			RESOLVER_INVALID_EMOJI: (name) => `${name} must be a custom emoji tag or valid emoji id.`,
			RESOLVER_INVALID_GUILD: (name) => `${name} must be a valid guild id.`,
			RESOLVER_INVALID_ROLE: (name) => `${name} must be a role mention or role id.`,
			RESOLVER_INVALID_LITERAL: (name) => `Your option did not match the only possibility: ${name}`,
			RESOLVER_INVALID_BOOL: (name) => `${name} must be true or false.`,
			RESOLVER_INVALID_INT: (name) => `${name} must be an integer.`,
			RESOLVER_INVALID_FLOAT: (name) => `${name} must be a valid number.`,
			RESOLVER_INVALID_REGEX_MATCH: (name, pattern) => `${name} must follow this regex pattern \`${pattern}\`.`,
			RESOLVER_INVALID_URL: (name) => `${name} must be a valid url.`,
			RESOLVER_STRING_SUFFIX: ' characters',
			RESOLVER_MINMAX_EXACTLY: (name, min, suffix) => `${name} must be exactly ${min}${suffix}.`,
			RESOLVER_MINMAX_BOTH: (name, min, max, suffix) => `${name} must be between ${min} and ${max}${suffix}.`,
			RESOLVER_MINMAX_MIN: (name, min, suffix) => `${name} must be greater than ${min}${suffix}.`,
			RESOLVER_MINMAX_MAX: (name, max, suffix) => `${name} must be less than ${max}${suffix}.`,
			REACTIONHANDLER_PROMPT: 'Which page would you like to jump to?',
			COMMANDMESSAGE_MISSING: 'Missing one or more required arguments after end of input.',
			COMMANDMESSAGE_MISSING_REQUIRED: (name) => `<:no:373304949234204682> This command requires you to add some \`${name}\` after the command.`,
			COMMANDMESSAGE_MISSING_OPTIONALS: (possibles) => `Missing a required option: (${possibles})`,
			COMMANDMESSAGE_NOMATCH: (possibles) => `Your option didn't match any of the possibilities: (${possibles})`,
			MONITOR_COMMAND_HANDLER_REPROMPT: (tag, error, time) => `${tag} | **${error}** | You have **${time}** seconds to respond to this prompt with a valid argument. Type **"ABORT"** to abort this prompt.`, // eslint-disable-line max-len
			MONITOR_COMMAND_HANDLER_REPEATING_REPROMPT: (tag, name, time) => `${tag} | **${name}** is a repeating argument | You have **${time}** seconds to respond to this prompt with additional valid arguments. Type **"CANCEL"** to cancel this prompt.`, // eslint-disable-line max-len
			MONITOR_COMMAND_HANDLER_ABORTED: 'Aborted',
			INHIBITOR_COOLDOWN: (remaining) => `You have just used this command. You can use this command again in ${remaining} seconds.`,
			INHIBITOR_DISABLED: 'This command is currently disabled',
			INHIBITOR_MISSING_BOT_PERMS: (missing) => `Insufficient permissions, missing: **${missing}**`,
			INHIBITOR_NSFW: 'You may not use NSFW commands in this channel.',
			INHIBITOR_PERMISSIONS: 'You do not have permission to use this command',
			INHIBITOR_REQUIRED_CONFIGS: (configs) => `The guild is missing the **${configs.join(', ')}** guild setting${configs.length !== 1 ? 's' : ''} and thus the command cannot run.`,
			INHIBITOR_RUNIN: (types) => `This command is only available in ${types} channels`,
			INHIBITOR_RUNIN_NONE: (name) => `The ${name} command is not configured to run in any channel.`,
			COMMAND_INVITE_SELFBOT: 'Why would you need an invite link for a selfbot...',
			COMMAND_INVITE: (client) => [
				`To add ${client.user.username} to your discord guild:`,
				client.invite,
				util.codeBlock('', [
					'The above link is generated requesting the minimum permissions required to use every command currently.',
					'I know not all permissions are right for every server, so don\'t be afraid to uncheck any of the boxes.',
					'If you try to use a command that requires more permissions than the bot is granted, it will let you know.'
				].join(' '))
			],
			COMMAND_INVITE_DESCRIPTION: 'Displays the join server link of the bot.',
			COMMAND_INFO: [
				"Sistine is built on top of a 'plug-and-play' framework named Klasa that is also built on top of the Discord.js library.",
				'Most of the code is modularized, which allows me to edit Klasa to suit their needs.',
				'',
				'Sistine currently offers a multitude of commands and upto 100 available commands for almost anything.',
				'She is mainly developed by `Kashall#1307` with the occasional help from other developers.',
				'',
				'More information can be found in her lounge server: https://discord.gg/jgPNHWy'
			],
			COMMAND_INFO_DESCRIPTION: 'Provides some information about this bot.',
			COMMAND_HELP_DESCRIPTION: 'Display help for a command.',
			COMMAND_HELP_NO_EXTENDED: 'No extended help available.',
			COMMAND_HELP_DM: '📥 | The list of commands you have access to has been sent to your DMs.',
			COMMAND_HELP_NODM: '❌ | You have DMs disabled, I couldn\'t send you the commands in DMs.',
			COMMAND_HELP_USAGE: (usage) => `usage :: ${usage}`,
			COMMAND_HELP_EXTENDED: 'Extended Help ::',
			COMMAND_SUBSCRIBE_NO_CHANNEL: 'This server does not have a configured announcement channel.',
			COMMAND_FUN_COMIC: 'Here\'s a comic from Explosm. C:',
			SYSTEM_HIGHEST_ROLE: 'This role\'s hierarchy position is higher or equal than me, I am not able to grant it to anyone.',
			SYSTEM_CHANNEL_NOT_POSTABLE: 'I am not allowed to send messages to this channel.',
			BAN_SUCCESS: (user, reason) => `**${user}** was successfully banned for __${reason}__.`,
			BAN_FAIL: 'That user is not bannable, you may have less permissions than that user.',
			KICK_SUCCESS: (user, reason) => `**${user}** was successfully kicked for __${reason}__.`,
			KICK_FAIL: 'That user is not kickable, you may have less permissions than that user.',
			SBAN_SUCCESS: (user, reason) => `**${user}** was successfully softbanned for __${reason}__.\nTheir messages from 24 hours to now have been deleted.`,
			SBAN_FAIL: 'That user is not softbannable, you may have less permissions than that user.',
			UNBAN_SUCCESS: (user, reason) => `**${user}** was successfully unbanned for __${reason}__.`,
			UNBAN_FAIL: 'That user cannot be unbanned, they may not be banned.',
			WARN_SUCCESS: (user, reason) => `**${user}** was successfully warned for __${reason}__.`,
			WARN_FAIL: 'That user cannot be warned, they may have higher permissions than you do.',
			PUNISH_USER_ERROR: command => `You cannot execute \`${command}\` on that user.`,
			SUCCESSFUL_PUNISH: (type, user, reason) => `Successfully ${type} ${user} for ${reason}.`,
			PUNISH_UNBAN_ERROR: 'That user is not banned',
			MODLOG_CASE_ERROR: 'There are no modlog cases under that account or number.',
			MODLOG_REASON_UNKOWN: (prefix, selected) => `No reason specified, write '${prefix}reason ${selected}' to claim this log.`,
			MODLOG_UPDATE_SUCCESS: selected => `Successfully updated the log ${selected}`,
			MODLOG_NOT_FOUND: 'The modlog channel does not exist, did it get deleted?',
			LOCKDOWN: (locked, channel) => `Successfully ${locked ? '' : 'un'}locked the channel ${channel}.`,
			RELEASELOCK: 'Lockdown released.',
			UNRELEASELOCK: 'Lockdown to prevent spam.',
			PRUNE_SUCCESS: (pruned, limit, filter) => `Successfully deleted ${pruned}/${limit} messages from __${filter}__.`,
			SOFTBAN_PROCESS: 'Softban process, removed one day worth of messages.',
			ANILIST_NO_RESULT: search => `☁ I could not find a result for "${search}".`,
			WEEB_SERVICES: 'Sistine - https://sistine.ml | Images provided by Weeb.SH',
			MUSIC_URL_NOTFOUND: ':musical_note: We couldn\'t find a valid song with what you provided us. Make sure that song is not a playlist.',
			MUSIC_ADDED_QUEUE: song => `:musical_note: \` ${song.title} \` was added to the music queue.`,
			MUSIC_PLAY: song => `:musical_note: Playing: \` ${song.title} \` as requested by: \`${song.requester} \``,
			MUSIC_AUTOPLAY: (author, enabled) => `:musical_note: YouTube AutoPlay has been \`${enabled ? 'enabled' : 'disabled'}\` by \`${author.tag}\``,
			MUSIC_USER_NOVOICE: ':musical_note: You are not connected to any voice channel that I can see.',
			MUSIC_NOCONNECT: ':musical_note: I do not have enough permissions to connect to your voice channel.',
			MUSIC_NOSPEAK: ':musical_note: I can connect... but not speak. Please turn on this permission so I may play music.',
			MUSIC_PAUSED: author => `:musical_note: Music was paused by ${author}.`,
			MUSIC_ALREADYPAUSED: ':musical_note: The stream is already paused.',
			MUSIC_ERR: err => `:musical_note: Something weird happened. - ${err}`,
			MUSIC_NOTPLAYING: status => `:musical_note: Not currently playing anything. Status: \`${status}\``,
			MUSIC_NOTDJ: ':musical_note: You can\'t execute this command when there are over 4 members. You must be at least a DJ Member.',
			MUSIC_PRUNEQ: music => `:musical_note: Pruned ${music}`,
			MUSIC_REMOVEDSONG: song => `:musical_note: Removed the song \` ${song.title} \` requested by \` ${song.requester}\`.`,
			MUSIC_OUTRANGE: music => `:musical_note: You went out of range, the queue has ${music} songs.`,
			MUSIC_RESUMED: author => `:musical_note: Music was resumed by ${author}.`,
			MUSIC_NOTPAUSED: ':musical_note: Music is already playing.',
			MUSIC_ALREADYVOTED: ':musical_note: You have already voted to skip this song.',
			DURATION: 'Duration',
			DESCRIPTION: 'Description',
			TIME_REMAIN: 'Time Remaining',

			COMMAND_ERROR: 'Whoop! You found an unwanted feature. I\'m just going to notify the deveopers.',
			// ADMIN COMMANDS

			//  ______     _____     __    __     __     __   __
			// /\  __ \   /\  __-.  /\ "-./  \   /\ \   /\ "-.\ \
			// \ \  __ \  \ \ \/\ \ \ \ \-./\ \  \ \ \  \ \ \-.  \
			//  \ \_\ \_\  \ \____-  \ \_\ \ \_\  \ \_\  \ \_\\"\_\
			//   \/_/\/_/   \/____/   \/_/  \/_/   \/_/   \/_/ \/_/

			// Announcement Command
			COMMAND_ANNOUNCEMENT_DESCRIPTION: 'Send new announcements, mentioning the announcement role.',
			COMMAND_ANNOUNCEMENT: (role) => `**Announcement** | ${role}:\n`,

			COMMAND_SUBSCRIBE_NO_ROLE: 'This server does not have a configured announcement role.',
			COMMAND_SUBSCRIBE_SUCCESS: (role) => `Successfully granted the role: **${role}**`,
			ALREADY_SUBSCRIBE: (active, guild) => `You are already ${active ? 'subscribed' : 'unsubscribed'} to ${guild}.`,
			COMMAND_UNSUBSCRIBE_SUCCESS: (role) => `Successfully removed the role: **${role}***`,

			// Echo Command

			COMMAND_ECHO_DESCRIPTION: 'Makes Sistine speak in this/another text channel.',
			COMMAND_ECHO_THROW: 'I have nothing to send there. Please include something to send.',

			// Blacklist Command

			COMMAND_BLACKLIST_DESCRIPTION: 'Blacklists or un-blacklists users and guilds from the bot.',
			COMMAND_BLACKLIST_SUCCESS: (usersAdded, usersRemoved, guildsAdded, guildsRemoved) => [
				usersAdded.length ? `**Users Added**\n${util.codeBlock('', usersAdded.join(', '))}` : '',
				usersRemoved.length ? `**Users Removed**\n${util.codeBlock('', usersRemoved.join(', '))}` : '',
				guildsAdded.length ? `**Guilds Added**\n${util.codeBlock('', guildsAdded.join(', '))}` : '',
				guildsRemoved.length ? `**Guilds Removed**\n${util.codeBlock('', guildsRemoved.join(', '))}` : ''
			].filter(val => val !== '').join('\n'),

			// Configure Command

			COMMAND_CONF_NOKEY: 'You must provide a key',
			COMMAND_CONF_NOVALUE: 'You must provide a value',
			COMMAND_CONF_GUARDED: (name) => `${util.toTitleCase(name)} may not be disabled.`,
			COMMAND_CONF_UPDATED: (key, response) => `Successfully updated the key **${key}**: \`${response}\``,
			COMMAND_CONF_KEY_NOT_ARRAY: 'This key is not array type. Use the action \'reset\' instead.',
			COMMAND_CONF_GET_NOEXT: (key) => `The key **${key}** does not seem to exist.`,
			COMMAND_CONF_GET: (key, value) => `The value for the key **${key}** is: \`${value}\``,
			COMMAND_CONF_RESET: (key, response) => `The key **${key}** has been reset to: \`${response}\``,
			COMMAND_CONF_NOCHANGE: (key) => `The value for **${key}** was already that value.`,
			COMMAND_CONF_SERVER_DESCRIPTION: 'Define per-server configuration.',
			COMMAND_CONF_SERVER: (key, list) => `**Server Configuration${key}**\n${list}`,
			COMMAND_CONF_USER_DESCRIPTION: 'Define per-user configuration.',
			COMMAND_CONF_USER: (key, list) => `**User Configuration${key}**\n${list}`,

			// Disable Command

			COMMAND_DISABLE: (type, name) => `+ Successfully disabled ${type}: ${name}`,
			COMMAND_DISABLE_DESCRIPTION: 'Re-disables or temporarily disables a command/inhibitor/monitor/finalizer/event. Default state restored on reboot.',
			COMMAND_DISABLE_WARN: 'You probably don\'t want to disable that, since you wouldn\'t be able to run any command to enable it again',

			// Enable Command

			COMMAND_ENABLE: (type, name) => `+ Successfully enabled ${type}: ${name}`,
			COMMAND_ENABLE_DESCRIPTION: 'Re-enables or temporarily enables a command/inhibitor/monitor/finalizer. Default state restored on reboot.',

			// Evaluation Command

			COMMAND_EVAL_DESCRIPTION: 'Evaluates arbitrary Javascript. Reserved for bot owner.',
			COMMAND_EVAL_EXTENDEDHELP: [
				'The eval command evaluates code as-in, any error thrown from it will be handled.',
				'It also uses the flags feature. Write --silent, --depth=number or --async to customize the output.',
				'The --silent flag will make it output nothing.',
				"The --depth flag accepts a number, for example, --depth=2, to customize util.inspect's depth.",
				'The --async flag will wrap the code into an async function where you can enjoy the use of await, however, if you want to return something, you will need the return keyword',
				'The --showHidden flag will enable the showHidden option in util.inspect.',
				'If the output is too large, it\'ll send the output as a file, or in the console if the bot does not have the ATTACH_FILES permission.'
			].join('\n'),
			COMMAND_EVAL_ERROR: (time, output, type) => `**Error**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT: (time, output, type) => `**Output**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_SENDFILE: (time, type) => `Output was too long... sent the result as a file.\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_SENDCONSOLE: (time, type) => `Output was too long... sent the result to console.\n**Type**:${type}\n${time}`,

			// Execute Command

			COMMAND_EXECUTE_DESCRIPTION: 'Allows you to run arbitrary commands. Developer Access-Only.',

			// Load Command

			COMMAND_LOAD: (time, type, name) => `✅ Successfully loaded ${type}: ${name}. (Took: ${time})`,
			COMMAND_LOAD_FAIL: 'The file does not exist, or an error occurred while loading your file. Please check your console.',
			COMMAND_LOAD_ERROR: (type, name, error) => `❌ Failed to load ${type}: ${name}. Reason:${util.codeBlock('js', error)}`,
			COMMAND_LOAD_DESCRIPTION: 'Load a piece from your bot.',

			// Reboot Command

			COMMAND_REBOOT: 'Rebooting...',
			COMMAND_REBOOT_DESCRIPTION: 'Reboots the bot.',

			// Reload Command

			COMMAND_RELOAD: (type, name) => `✅ Reloaded ${type}: ${name}`,
			COMMAND_RELOAD_ALL: (type) => `✅ Reloaded all ${type}.`,
			COMMAND_RELOAD_DESCRIPTION: 'Reloads a klasa piece, or all pieces of a klasa store.',

			// Transfer Command

			COMMAND_TRANSFER_ERROR: '❌ That file has been transfered already or never existed.',
			COMMAND_TRANSFER_SUCCESS: (type, name) => `✅ Successfully transferred ${type}: ${name}`,
			COMMAND_TRANSFER_FAILED: (type, name) => `Transfer of ${type}: ${name} to Client has failed. Please check your Console.`,
			COMMAND_TRANSFER_DESCRIPTION: 'Transfers a core piece to its respective folder',

			// Unload Command

			COMMAND_UNLOAD: (type, name) => `✅ Unloaded ${type}: ${name}`,
			COMMAND_UNLOAD_DESCRIPTION: 'Unloads the klasa piece.',

			// --------------------------------------
			//  ______   __  __     __   __
			// /\  ___\ /\ \/\ \   /\ "-.\ \
			// \ \  __\ \ \ \_\ \  \ \ \-.  \
			//  \ \_\    \ \_____\  \ \_\\"\_\
			//   \/_/     \/_____/   \/_/ \/_/
			// --------------------------------------

			// 8BALL Command

			COMMAND_8BALL: (author) => `:8ball: **${author}:** ${this.EIGHT_BALL[Math.floor(Math.random() * this.EIGHT_BALL.length)]}`,
			COMMAND_8BALL_DESCRIPTION: 'Just a fancy fortune-telling device from the 1940 Three Stooges.',

			// BANNER Command

			COMMAND_BANNER_DESCRIPTION: 'Creates a Banner with ASCII Symbolls from text you supply.',

			// Beautiful Command

			COMMAND_BEAUTIFUL: user => `:loading~3: _Admiring the painting of ${user}..._`,
			COMMAND_BEAUTIFUL_DESCRIPTION: 'Admire the beauty of another user, or yourself.',

			// Compliment Command

			COMMAND_COMPLIMENT: user => `:speech_balloon: ${user} – ${this.COMPLIMENTS[Math.floor(Math.random() * this.COMPLIMENTS.length)]}`,
			COMMAND_COMPLIMENT_DESCRIPTION: 'Generates a random compliment to send to a user.',

			// Crush Command

			COMMAND_CRUSH: user => `:loading~3: _Continuously gazing at ${user} for no awkward reason..._`,
			COMMAND_CRUSH_DESCRIPTION: 'Wouldn\'t Wolverine love this picture?',

			// Engwish Command

			COMMAND_ENGWISH_DESCRIPTION: 'English to Hewwo Translation',

			// Illegal Command

			COMMAND_ILLEGAL_INUSE: 'Trump is currently making something illegal, please wait...',
			COMMAND_ILLEGAL_ERROR: 'Cannot be longer than 10 characters or shorter than 1 character.',
			COMMAND_ILLEGAL_SYNTAX: user => `Well great, now non-standard unicode characters are illegal. Thanks ${user}.`,
			COMMAND_ILLEGAL_CONVINCE: thing => `:loading~3: _Convincing Trump that __${thing}__ should be illegal..._`,
			COMMAND_ILLEGAL_DESCRIPTION: 'Make President Trump make something illegal.',

			// Insult Command

			COMMAND_INSULT_DESCRIPTION: 'Insult someone with a random insult!',

			// Joke Command

			COMMAND_JOKE_DESCRIPTION: 'Sistine loves jokes, why not have her tell you some?',

			// Mock Command

			COMMAND_MOCK_ERROR: '❌ To prevent spam, I cannot mock bots.',
			COMMAND_MOCK_DESCRIPTION: 'Mocks the last/speificied message.',

			// Rate Command

			COMMAND_RATE_MYSELF: ':thinking: Really, I would always rate myself a 100/100.',
			COMMAND_RATE_WAIFU: (user, rating) => `:thinking: I would rate **${user}** a __${rating}/100.__`,
			COMMAND_RATE_DESCRIPTION: 'Allows me to rate anything you ask me to.',

			// Roast Command

			COMMAND_ROAST: user => `:fire: ${user} – ${this.ROASTS[Math.floor(Math.random() * this.ROASTS.length)]}`,
			COMMAND_ROAST_DESCRIPTION: 'Generates a random roast to send to a user. May include firey mixtape.',

			// Triggered Command

			COMMAND_TRIGGERING: tag => `:loading~1: _Triggering ${tag} for no really good reason..._`,
			COMMAND_TRIGGERING_DESCRIPTION: 'How easy is it to trigger someone?',

			// Whose That Pokemon Command

			COMMAND_WTP_EMBED_TITLE: 'You have 15 seconds. What\'s This Pokemon?',
			COMMAND_WTP_OUT_TIME: name => `You ran out of time, it was name was: **${name}**.`,
			COMMAND_WTP_INCORRECT: name => `Your answer was incorrect. The correct answer was: **${name}**.`,
			COMMAND_WTP_CORRECT: name => `That is correct! Its name is: **${name}**`,
			COMMAND_WTP_DESCRPTION: 'Who\'s That Pokemon?',

			// Would You Rather Command

			COMMAND_WYR_ERROR: 'An issue has appeared with `Would You Rather`, please try again in a little bit.',
			COMMAND_WYR_DESCRIPTION: 'Responds with a random would you rather question.',

			// --------------------------------------
			//  __     __   __     ______   ______     ______     __    __     ______     ______   __     ______     __   __     ______     __
			// /\ \   /\ "-.\ \   /\  ___\ /\  __ \   /\  == \   /\ "-./  \   /\  __ \   /\__  _\ /\ \   /\  __ \   /\ "-.\ \   /\  __ \   /\ \
			// \ \ \  \ \ \-.  \  \ \  __\ \ \ \/\ \  \ \  __<   \ \ \-./\ \  \ \  __ \  \/_/\ \/ \ \ \  \ \ \/\ \  \ \ \-.  \  \ \  __ \  \ \ \____
			//  \ \_\  \ \_\\"\_\  \ \_\    \ \_____\  \ \_\ \_\  \ \_\ \ \_\  \ \_\ \_\    \ \_\  \ \_\  \ \_____\  \ \_\\"\_\  \ \_\ \_\  \ \_____\
			//   \/_/   \/_/ \/_/   \/_/     \/_____/   \/_/ /_/   \/_/  \/_/   \/_/\/_/     \/_/   \/_/   \/_____/   \/_/ \/_/   \/_/\/_/   \/_____/
			// --------------------------------------

			// Anilist Commands
			COMMAND_ANILIST_APIERROR: 'Well, shots were fired. I encountered an API error and have sent a messenger pigeon to the developers.',
			COMMAND_ANILIST_NORESULTS: search => `No results were found for _${search}_. Make sure it is spelled correctly.`,
			COMMAND_ANILIST_MULTIRESULTS: (search, results) => `Query: _${search}_. Please reply with the number of chosen search.\n \`\`\`asciidoc\n${results}\`\`\``,
			COMMAND_ANILIST_CANCELLED: 'You cancelled the search.',

			// BotOrg & BotPW Listings Commands
			COMMAND_BOTLIST_ERROR: bot => `<:tickNo:373304949234204682> I was unable to find any listings for ${bot}.`,
			COMMAND_BOTLIST_FATAL: 'Well, shots were fired. I encountered an API error and have sent a messenger pigeon to the developers.',

			// PING Command

			COMMAND_PING: 'Ping?',
			COMMAND_PING_DESCRIPTION: 'Runs a connection test to Discord.',
			COMMAND_PINGPONG: (diff, user) => `${this.PINGS[Math.floor(Math.random() * this.PINGS.length)].replace('{{user}}', user).replace('{{ms}}', diff)}`,

			// Role Command

			COMMAND_ROLE_DESCRIPTION: 'Gets information on a role with a mention or id.',

			// Server Command

			COMMAND_SERVER_DESCRIPTION: 'Gets information on the server your currently looking at.',

			// Stats Command

			COMMAND_STATS: (memUsage, uptime, users, servers, channels, klasaVersion, discordVersion, processVersion, msg) => [
				'= STATISTICS =',
				'',
				`• Mem Usage  :: ${memUsage} MB`,
				`• Uptime     :: ${uptime}`,
				`• Users      :: ${users}`,
				`• Servers    :: ${servers}`,
				`• Channels   :: ${channels}`,
				`• Klasa      :: v${klasaVersion}`,
				`• Discord.js :: v${discordVersion}`,
				`• Node.js    :: ${processVersion}`,
				this.client.options.shardCount ? `• Shard      :: ${((msg.guild ? msg.guild.shardID : msg.channel.shardID) || this.client.options.shardId) + 1} / ${this.client.options.shardCount}` : ''
			],
			COMMAND_STATS_DESCRIPTION: 'Provides some details about the bot and stats.',

			// Subscribe & Unsubscribe Commands

			COMMAND_SUBSCRIBE_DESCRIPTION: 'Subscribe to this servers\' announcements.',
			COMMAND_UNSUBSCRIBE_DESCRIPTION: 'Unsubscribe to this servers\' announcements.',

			// Support Commands
			COMMAND_SUPPORT: ':wave: We have a support guild for Sistine! https://discord.gg/jgPNHWy \nIf you just need help with some of the commands, <https://sistine.ml/commannds> may help!',
			COMMAND_SUPPORT_DESCRIPTION: 'Get some of the Support Links for Sistine',

			// User Command
			COMMAND_USER_DESCRIPTION: 'Gets information on a mentioned user.',

			// --------------------------------------
			//  __    __     ______     _____     ______     ______     ______     ______   __     ______     __   __
			// /\ "-./  \   /\  __ \   /\  __-.  /\  ___\   /\  == \   /\  __ \   /\__  _\ /\ \   /\  __ \   /\ "-.\ \
			// \ \ \-./\ \  \ \ \/\ \  \ \ \/\ \ \ \  __\   \ \  __<   \ \  __ \  \/_/\ \/ \ \ \  \ \ \/\ \  \ \ \-.  \
			//  \ \_\ \ \_\  \ \_____\  \ \____-  \ \_____\  \ \_\ \_\  \ \_\ \_\    \ \_\  \ \_\  \ \_____\  \ \_\\"\_\
			//   \/_/  \/_/   \/_____/   \/____/   \/_____/   \/_/ /_/   \/_/\/_/     \/_/   \/_/   \/_____/   \/_/ \/_/
			// --------------------------------------


			COMMAND_SUCCESS: 'Successfully executed the task.',
			COMMAND_BAN_FAIL_BANNABLE: 'I am not able to ban this member, sorry.',
			COMMAND_BAN_DESCRIPTION: 'Bans the mentioned member.',
			COMMAND_BAN_SUCCESS: 'Successfully banned the member',
			POSITION: 'you may not execute this command on this member.',
			COMMAND_CASE_REASON: 'No reason specified, write',
			COMMAND_CASE_CLAIM: 'to claim this log.',
			COMMAND_CASE_SORRY: 'I am sorry dear',
			COMMAND_CASE_NO: 'but there is no modlog under that case.',
			COMMAND_CASE_DESCRIPTION: 'Check a case.',
			COMMAND_HISTORY_NO: 'There is no log under the',
			COMMAND_HISTORY_ACCOUNT: 'account.',
			COMMAND_HISTORY_THE_USER: 'the user',
			COMMAND_HISTORY_LOGS: 'has the following logs:',
			COMMAND_HISTORY_DESCRIPTION: 'Check the history for the mentioned member.',
			COMMAND_KICK_FAIL_KICKABLE: 'I am not able to kick this member, sorry.',
			COMMAND_KICK_SUCCESS: 'Successfully kicked the member',
			COMMAND_KICK_DESCRIPTION: 'Kicks the mentioned member.',
			COMMAND_LOCKDOWN_SUCCESSFULLY: 'Successfully',
			COMMAND_LOCKDOWN_DESCRIPTION: 'Lock/unlock the selected channel.',
			COMMAND_LOCKDOWN_LOCKED: 'locked the channel',
			COMMAND_LOCKDOWN_RELEASED: 'Lockdown released',
			COMMAND_LOCKDOWN_SPAM: 'Lockdown to prevent spam',
			COMMAND_PRUNE_SUCCESSFULLY: 'Successfully deleted',
			COMMAND_PRUNE_MESSAGES: 'messages from',
			COMMAND_PRUNE_DESCRIPTION: 'Prunes a certain amount of messages w/o filter.',
			COMMAND_REASON_DESCRIPTION: 'Edit the reason field from a case.',
			COMMAND_SOFTBAN_DESCRIPTION: 'Softbans the mentioned member.',
			COMMAND_UNBAN_DESCRIPTION: 'Unbans the mentioned user.',
			COMMAND_WARN_DESCRIPTION: 'Warns the mentioned member.',
			COMMAND_SOFTBAN_AUDIT_REASON: 'Softban process. Pruned one day worth of messages.',
			COMMAND_SOFTBAN_SUCCESSFULLY: 'Successfully softbanned the member',
			SORRY_DEAR: 'I am sorry dear',
			COMMAND_REASON_CASE: 'but there is no modlog under that case.',
			COMMAND_REASON_MODLOG: 'The modlog channel does not exist, did it get deleted?',
			COMMAND_REASON_SUCCESS: 'Successfully updated the log',
			CASE: 'Case',
			COMMAND_WARN_SUCCESS: 'Successfully warned the member',
			COMMAND_UNBAN_FAIL: 'this user is not banned.',
			COMMAND_UNBAN_SUCCESS: 'Successfully unbanned the member',

			// --------------------------------------
			//  __    __     __  __     ______     __     ______
			// /\ "-./  \   /\ \/\ \   /\  ___\   /\ \   /\  ___\
			// \ \ \-./\ \  \ \ \_\ \  \ \___  \  \ \ \  \ \ \____
			//  \ \_\ \ \_\  \ \_____\  \/\_____\  \ \_\  \ \_____\
			//   \/_/  \/_/   \/_____/   \/_____/   \/_/   \/_____/
			// --------------------------------------
			COMMAND_NOVIDEOFOUND: ':x: No available videos were found at that link.',
			// Add Command
			COMMAND_ADD_DESCRIPTION: 'Adds a song to the music queue.',
			COMMAND_ADD: (title, author) => `:headphones: Added **${title}** to the queue by **${author}**.`,
			COMMAND_AUTOPLAY_DESCRIPTION: 'Toggles Youtube\'s Autoplay Functionality',
			COMMAND_AUTOPLAY_EXTENDEDHELP: [
				'NOTE! This command does not make Maki play a song from the nowhere, it tells her whether to play the first',
				'non-duplicated (in a range of 10 songs) song from the related videos she has fetched in the latest added song.',
				'That is to say, Sistine receives a list of 10-15 related songs, she also saves the 10 previous played songs. If',
				'the song has already been played, it will be skipped and check the next, until finding a song that has not been',
				'played recently. This allows two things:\n- 1: Play music unlimitedly without playing the same song twice.\n- 2:',
				'Find new songs from YouTube.'
			].join(' '),
			COMMAND_AUTOPLAY: (enabled, author) => `:headphones: **AutoPlay** has been ${enabled ? 'enabled' : 'disabled'} by **${author}**.`,

			// --------------------------------------
			//  ______     __  __     ______     ______   ______
			// /\  __ \   /\ \/\ \   /\  __ \   /\__  _\ /\  ___\
			// \ \ \/\_\  \ \ \_\ \  \ \ \/\ \  \/_/\ \/ \ \  __\
			//  \ \___\_\  \ \_____\  \ \_____\    \ \_\  \ \_____\
			//   \/___/_/   \/_____/   \/_____/     \/_/   \/_____/
			// --------------------------------------


			COMMAND_ACHIEVEMENT_NAME: 'Achievement Get',
			COMMAND_ACHIEVEMENT_DESCRIPTION: 'What did you achieve today?',

			COMMAND_AVATAR_ERROR: user => `An avatar could not be fetched for ${user}.`,
			COMMAND_AVATAR_DESCRIPTION: 'Get a mentioned user avatar.',

			COMMAND_CAT_DESCRIPTION: 'Here kitty kitty. Grabs an random cat image from random.cat',
			COMMAND_DOG_DESCRIPTION: 'Come here boy! Grabs a random dog image from dog.ceo',
			COMMAND_MEME_DESCRIPTION: 'Have you heard about these meme\'s?',
			COMMAND_NEKO_DESCRIPTION: 'This command will return a Neko, a lewd Neko if used in a NSFW channel.',
			COMMAND_MOE_DESCRIPTION: 'Posts random anime images based on the type selected.',

			COMMAND_CUDDLE: (user, author) => `**${user.username}**, you were cuddled by **${author.username}**.`,
			COMMAND_CUDDLE_SOLO: user => `Just like hugging, you need someone else to cuddle you, **${user.username}**.`,
			COMMAND_CUDDLE_DESCRIPTION: 'I mean, who wouldn\'t want to cuddle with Sistine?',

			COMMAND_HUG: (user, author) => `**${user.username}**, you were hugged by **${author.username}**.`,
			COMMAND_HUG_SOLO: user => `Can't really hug yourself **${user.username}**, but here.`,
			COMMAND_HUG_DESCRIPTION: 'Why would\'t you want to hug Sistine?',

			COMMAND_KISS: (user, author) => `**${user.username}**, you were kissed by **${author.username}**.`,
			COMMAND_KISS_SOLO: user => `Kissing yourself **${user.username}**? Sorry 'bout that.`,
			COMMAND_KISS_DESCRIPTION: 'Not many ways to describe kissing another user.',

			COMMAND_PAT: (user, author) => `**${user.username}**, you were patted by **${author.username}**.`,
			COMMAND_PAT_SOLO: user => `Patting yourself **${user.username}**? Sorry 'bout that.`,
			COMMAND_PAT_DESCRIPTION: 'Ruffeling one\'s head is often a sign of close friendship in Japanese culture.',

			COMMAND_POKE: (user, author) => `**${user.username}**, you were poked by **${author.username}**.`,
			COMMAND_POKE_SOLO: user => `You poked yourself, **${user.username}**.`,
			COMMAND_POKE_DESCRIPTION: 'Pokeing someone, sometimes to get their attention.',

			COMMAND_SLAP: (user, author) => `**${user.username}**, you were slapped by **${author.username}**.`,
			COMMAND_SLAP_SOLO: user => `You slapped yourself, **${user.username}**. I don't think that helped.`,
			COMMAND_SLAP_DESCRIPTION: 'Apparently Sistine can get away with slapping users. Neat.',

			// Music Commands

			COMMAND_ADD_FAIL_REGION: url => `\`${url}\` is not available where Sistine is currently located.\nIf this is an issue, contact support and we may be able to move you to another server.`,
			COMMAND_ADD_FAIL_UNAVAILABLE: 'I looked far and wide, however my search resulted in not finding music of that sorts.',
			COMMAND_ADD_YTDL_NO_VIDEO: 'I found something, but I cant quite make out what it is... Seems like Youtube is having some issues today, try again later.',

			COMMAND_JOIN_FAIL: 'There seems to be an issue connecting to the voice channel.',
			COMMAND_JOIN_FULL: 'Your current channel is full, please make room for me.',
			// Social Commands
			COMMAND_DAILY_CLAIMED: (points, username) => `:money_with_wings: | **${username}**, you have claimed your daily ${points}¥.`,
			COMMAND_DAILY_DONATED: (points, username, sent) => `:money_with_wings: | **${username}**, you have donated your daily ${points}¥ to **${sent}**.`,
			COMMAND_DAILY_FROMNOW: dailyTimer => `<:tickNo:373304949234204682> You cannot claim your daily credits yet, please try again in ${dailyTimer}.`,


			COMMAND_REPUTATION_BOT: '<:tickNo:373304949234204682> Bots cannot send/recieve points.',
			COMMAND_REPUTATION_SELF: '<:tickNo:373304949234204682> You cannot give yourself a reputation points!',
			COMMAND_REPUTATION_SENT: user => `<:tickYes:373305832793833483> You have given your daily reputation point to **${user.username}**, neat.`,
			COMMAND_REPUTATION_FROMNOW: giver => `<:tickNo:373304949234204682> You cannot give another reputation point, please try again in ${Duration.toNow(giver.reputationTimer)}.`,
			// System Commands
			COMMAND_FEEDBACK: feedback => `<:tickNo:373304949234204682> Feedback must fit within Discord message regulations, so your message cannot ${feedback.length > 3 ? 'be less than 3 characters.' : 'be more than 700 characters.'}`,
			COMMAND_FEEDBACK_SEND: 'Your feedback has been sent with via messenger piegeon. You may recieve a reply.',

			COMMAND_GUILDLIST_ALREADY: (guild, type) => `<:tickNo:373304949234204682> \`${guild.name}[${guild.id}] is already ${type}.`,
			COMMAND_GUILDLIST_NOT: (guild, type) => `<:tickNo:373304949234204682> \`${guild.name}[${guild.id}] is not ${type}.`,
			COMMAND_GUILDLIST_ADDED: (guild, type) => `<:tickNo:373304949234204682> \`${guild.name}[${guild.id}] was added to the ${type}.`,
			COMMAND_GUILDLIST_REMOVED: (guild, type) => `<:tickNo:373304949234204682> \`${guild.name}[${guild.id}] was removed from the ${type}.`,


			// SOCIAL
			COMMAND_PROFILE_LOADING: username => `:loading~3: _Loading ${username}'s profile..._`,
			COMMAND_PROFILE_DESCRIPTION: 'Check yours or another user\'s profile.',
			COMMAND_PROFILE_TITLES: { GLOBAL_RANK: 'Global Rank', CREDITS: 'Credits', REPUTATION: 'Reputation', EXPERIENCE: 'Experience', LEVEL: 'Level' }
		};
	}

	async init() {
		await super.init();
	}

};
