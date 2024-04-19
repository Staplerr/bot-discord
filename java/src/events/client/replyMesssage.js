const { } = require('fs')

module.exports = (client) => {
    name: 'reply',
    client.on("messageCreate", (message) => {
        if (message.author.bot) {
          console.log('this message is created by bot.')
          return;
        }
        console.log(message);
      
        if (message.content == "joinvc") {
          console.log("joining voice channel");
          const channel = message.member.voice.channel;
          if (!channel) return message.channel.send("cannot join voice channel");
      
          const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
          });
          return;
        }
        fs.writeFile("../input.txt", message.content, (err) => {
          if (err) throw err;
        });
        fs.writeFile("../talker.txt", message.author.username, (err) => {
          if (err) throw err;
        });
      
        fs.readFile("../output.txt", "utf8", (err, data) => {
          console.log(data);
      
          if (data && data != null && data != "") {
            message.reply(data);
            fs.writeFile("../output.txt", "", (error) => {
              if (error) throw error;
            });
      
            if (err) {
              return callback(err);
            }
          }
        });
      });
}