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
let user_channel;
client.connection;

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.on("messageCreate", (message) => {
/* test switch cases
  switch (true) {
    case message.author.bot :
      return;
    case message.content.includes('joinvc') && message.mentions.users.get(client.user.id) :
      console.log('joining voice channel');
      message.reply('joining!');
      user_channel = message.member.voice.channel;
      if (!user_channel) {
        console.log('user in not in the channel.')
        message.reply('You indeed joinvc')
        return;
      }
      connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator:
        channel.guild.voiceAdapterCreator,
        });
    case message.content.includes('leavevc') :
      console.log('leaving voice channel');
      message.reply('Bye bye!');
      client.connection.destroy();
      return;
      */
      

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
     user_channel = message.member.voice.channel;
      if (!user_channel) return message.channel.send("cannot join voice channel");
        client.connection = joinVoiceChannel({
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
