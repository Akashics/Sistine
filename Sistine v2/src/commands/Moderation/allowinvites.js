const Command = require("../../library/Util/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["adblock", "antiinvites"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_ADBLOCK_DESCRIPTION"),
            quotedStringSupport: false,
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const toggle = !msg.guild.settings.automod.invites;
        await msg.guild.settings.update("automod.invites", toggle);
        return msg.sendMessage(`${toggle ? '✓' : '✗'} All guild invites are now being ${toggle ? "blocked" : "allowed"}.`);
    }

};