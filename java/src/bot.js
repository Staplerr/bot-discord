const { Client,IntentsBitField, GatewayIntentBits, Collection } = require("discord.js");
const { joinVoiceChannel, voiceDiscord } = require("@discordjs/voice");
require("dotenv").config();
const { BOT_TOKEN } = process.env;
const fs = require("fs");

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,]
    ,} );

client.commands = new Collection();
client.buttons = new Collection();
client.commandArray = [];
client.color = 0x9af8fd
client.allowed_guild = ['1229154343714947156',];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.guildId != client.allowed_guild) {
    return;
  }
  // console.log(message);
  console.log(message)
  if (message.mentions.users.get(client.user.id)) {
    if (message.content.includes('joinvc')) {
      console.log("joining voice channel");
      message.reply('joining!')
      const channel = message.member.voice.channel;
      if (!channel) return message.channel.send("cannot join voice channel");
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
      return;
    };
  };
  fs.writeFile("../data/input.txt", message.content, (err) => {
    if (err) throw err;
  });
  fs.writeFile("../data/talker.txt", message.author.username, (err) => {
    if (err) throw err;
  });

  fs.readFile("../data/output.txt", "utf8", (err, data) => {
    console.log(data);

    if (!data) {
      console.log('no data')
    }

    else if (data) {
      message.reply(data);
      fs.writeFile("../data/output.txt", "", (error) => {
        if (error) throw error;
      });

      if (err) {
        return callback(err);
      }
    }
  });
});



client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(BOT_TOKEN);