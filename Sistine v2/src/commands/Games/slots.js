const slots = ["??", "??", "??", "??", "??", "??", "??", "??", "??"];
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["slotsroll"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_SLOTS_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "[flowers:integer]"
        });
    }

    async run(msg, [flowers = 1]) {
        if (flowers < 1) return msg.reply(`${msg.language.get("CMD_SLOTS_INVALID")}`);
        await msg.author.settings.sync(true);
        if (msg.author.settings.flowers < flowers) return msg.reply(`? You don't have \`${flowers}\` flowers to use slots, use \`${msg.guild.settings.prefix}daily\` command to get some for free!`);

        const Mone = slots[Math.floor(Math.random() * slots.length)];
        const Mtwo = slots[Math.floor(Math.random() * slots.length)];
        const Mthree = slots[Math.floor(Math.random() * slots.length)];
        const Tone = slots[Math.floor(Math.random() * slots.length)];
        const Ttwo = slots[Math.floor(Math.random() * slots.length)];
        const Tthree = slots[Math.floor(Math.random() * slots.length)];
        const Bone = slots[Math.floor(Math.random() * slots.length)];
        const Btwo = slots[Math.floor(Math.random() * slots.length)];
        const Bthree = slots[Math.floor(Math.random() * slots.length)];

        if (Mone === Mtwo || Mone === Mthree || Mthree === Mtwo) {
            const flakesPercent = Math.round(flowers * 60 / 100) >= 1 ? Math.round(flowers * 50 / 100) : 1;
            const winFlakes = msg.author.settings.flowers + flowers + flakesPercent;
            const embed = new MessageEmbed()
                .setDescription(`${Tone} | ${Ttwo} | ${Tthree}\n${Mone} | ${Mtwo} | ${Mthree}\n${Bone} | ${Btwo} | ${Bthree}`)
                .setColor("#43A047");
            await msg.author.settings.update("flowers", winFlakes);
            return msg.sendMessage(`${msg.author}, You just won ? \`${flakesPercent}\`, you now have ? \`${msg.author.settings.flowers}\`! Good job!`, { embed: embed });
        }
        const embed = new MessageEmbed()
            .setDescription(`${Tone} | ${Ttwo} | ${Tthree}\n${Mone} | ${Mtwo} | ${Mthree}\n${Bone} | ${Btwo} | ${Bthree}`)
            .setColor("#d32f2f");
        await msg.author.settings.update("flowers", msg.author.settings.flowers - flowers);
        return msg.sendMessage(`${msg.author} You lost ? \`${flowers}\`, you now have ? \`${msg.author.settings.flowers}\`! Better luck next time!`, { embed: embed });
    }

};