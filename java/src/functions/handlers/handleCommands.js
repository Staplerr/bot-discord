const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10');
const fs = require("fs");
require("dotenv").config();

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

        const { commands, commandArray } = client;
        for (const file of commandFiles){
          const command = require(`../../commands/${folder}/${file}`);
          commands.set(command.data.name, command);
          commandArray.push(command.data.toJSON());
          console.log(`Command: ${command.data.name} has been passed through the handler`);

        }
    }

    const clientId = '1227002574327119943';
    const guildId = '1229154343714947156';
    const rest = new REST({ version: '10'}).setToken(process.env.BOT_TOKEN);
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: client.commandArray,
        });

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
  };
};
