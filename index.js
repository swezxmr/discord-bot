const { Client, GatewayIntentBits, Partials } = require("discord.js");

const tokens = [
  process.env.TOKEN1,
  process.env.TOKEN2,
  process.env.TOKEN3,
  process.env.TOKEN4,
].filter(Boolean);

for (const token of tokens) {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions
    ],
    partials: [
      Partials.Message,
      Partials.Channel,
      Partials.Reaction
    ]
  });

  client.once("ready", () => {
    console.log(`${client.user.tag} aktif!`);
  });

  client.on("messageReactionAdd", async (reaction, user) => {
    if (user.bot) return;

    if (reaction.partial) await reaction.fetch();

    if (reaction.emoji.name === "😂") {
      try {
        await reaction.message.react("😂");
      } catch (e) {}
    }
  });

  client.login(token);
}
