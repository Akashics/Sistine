const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            guarded: true,
            hidden: true,
            aliases: ["enablecmd", "disablecommand", "enablecommand", "togglecommand"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_TOGGLE_COMMAND_DESCRPTION"),
            usage: "<command:cmd>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [cmd]) {
        if (msg.guild.settings.disabledCommands.indexOf(cmd.name) === -1) {
            await msg.guild.settings.update("disabledCommands", cmd.name, { action: "add" });
            return msg.sendMessage(`? ${cmd.name} command has been disabled.`);
        } else {
            await msg.guild.settings.update("disabledCommands", cmd.name, { action: "remove" });
            return msg.sendMessage(`? ${cmd.name} command has been enabled.`);
        }
    }

};