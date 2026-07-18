const {
  Client,
  GatewayIntentBits,
  Partials
} = require("discord.js");

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
    await reaction.message.react("😂");
  }
});

client.login(process.env.TOKEN);
