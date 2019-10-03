const Command = require("../../library/Util/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["modlog", "managemodlogs"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            usage: "<channel|toggle> [Channel:channelname]",
            usageDelim: " ",
            description: language => language.get("COMMAND_MODLOG_DESCRPTION"),
            extendedHelp: "No extended help available.",
            subcommands: true
        });
    }

    async channel(msg, [Channel = msg.channel]) {
        const { errors } = await msg.guild.settings.update("channels.logs", Channel.id);
        if (errors.length) return msg.reply(`✗ An error has occured: ${errors[0]}`);
        return msg.sendMessage(`✓ Modlog channel has been set to ${Channel}.`);
    }

    async toggle(msg) {
        const { errors } = await msg.guild.settings.update("toggles.modlogs", !msg.guild.settings.toggles.modlogs);
        if (errors.length) return msg.reply(`✗ An error has occured: ${errors[0]}`);
        return msg.reply(`✓ Modlogs have been ${msg.guild.settings.toggles.modlogs ? "enabled" : "disabled"}.`);
    }

};